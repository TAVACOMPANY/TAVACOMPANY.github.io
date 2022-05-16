/* все ответы */
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');

/* все вопросы */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'),
      numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страниц

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // Итоговый Результат

const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2'),
      btnTryAgain = document.getElementById('btn-try-again'),
      br = '</br>';

const questions = [
    {
        question: 'В результате выполнения какого фрагмента программы будет найдена сумма элементов неглавной  диагонали матрицы а (3;3). Предварительная инициализация:' + br + 'int  i,s,a[3][3]={1,2,3,4,5,6,7,8,9};',
        options: [
            'for (i=0, s=0; i<=9; i++)' + br + 's+= a[i-2][i];',
            'for (i=0, s=0; i<3; i++)' + br + 's+= a[i-3][i];',
            'for (i=0, s=0; i<3; i++)' + br + 's+= a[i][2-i];',
            'for (i=0, s=0; i<3; i++)' + br + 's+= a[3-i][i];',
            'for (i=0, s=0; i<3;i ++)' + br + 's+= a[i][3-i];',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая из приведенных ниже конструкций будет верной, при нахождении суммы элементов массива а[5] , расположенных до максимального элемента?',
        options: [
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s;' + br + ' for(i=0;i<5;i++)' + br + ' if (max<a[i] ) {max=a[i]; k=i;}' + br + ' for(i=0;i<k+1;i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br + ' for(i=0;i<5;i++)' + br + ' if (max<a[i] ) {max=a[i]; k=i;}' + br + ' for(i=0;i<k;i++)' + br + 's+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s;' + br + ' max=a[0]; k=0;' + br + ' for(i=0;i<5;i++)' + br + ' if (max<a[i] ) {max=a[i]; k=i;}' + br + ' for(i=0;i<=k;i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br  + ' max=a[0]; k=0;' + br + ' for(i=0;i<5;i++)' + br + ' if (max<a[i] ) {max=a[i]; k=i;}' + br + ' for(i=0;i<k;i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br + ' max=a[0];' + br + ' for(i=0;i<5;i++)' + br + ' if (max>a[i] ) {max=a[i]; k=i;}' + br + ' for(i=0;i<=5-k;i++)' + br + ' s+=a[i];',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каком из приведенных фрагментов программы будет найдена сумма элементов главной диагонали. Предварительная инициализация:' + br + 'int i,max,a[3][3]={1,2,3,4,5,6,7,8,9};',
        options: [
            's=0;' + br + 'for(i=0;i<3;s+=a[i][i],i++);',
            's=a[0][0];' + br + 'for(i=0;i<3;s+=a[i][i],i++);',
            's=a[0];' + br + 'for(i=0;i<3;s+=a[i][i],i++);',
            's=0;' + br + 'for(i=0;i<3;i++,s+=a[i][i]);',
            's=0;' + br + 'for(i=0;i<=3;++i,s+=a[i][i]);',
        ],
        rightAnswer: 0
    },
    {
        question: 'В каком из приведенных фрагментов программы ищется количество положительных элементов массива. Предварительная инициализация: int k,i,a[6]={-1,2,-3,4,-5,6};',
        options: [
            'k=a[0];' + br + 'for(i=0;i<6;i++)' + br + 'if(a[i]>0)' + br + 'k++;',
            'k=0;' + br + 'for(i=0;i<6;i++)' + br + 'if(a[i]>0)' + br + 'k++;',
            'k=a[0];' + br + 'for(i=0;i<=6;i++)' + br + 'if(a[i]>0)' + br + 'k+=a[i];',
            'k=0;' + br + 'for(i=0;i<=6;i++)' + br + 'if(a[i]>0)' + br + 'k++;',
            'k=0;' + br + 'for(i=0;i<6;i++)' + br + 'if(a[i]>0)' + br + 'k+=a[i];',
        ],
        rightAnswer: 1
    },
    {
        question: 'В каком из приведенных фрагментов программы суммирование элементов массива будет прервано при первом же встретившемся нуле. Предварительная инициализация:' + br + 'Int s,i,a[10]={-1,2,-3,4,0,6,7,5,3,9};',
        options: [
            's=0;' + br + 'for(i=0;i<10;i++)' + br + 'if(a[i]==0)' + br + 's+=a[i];' + br + 'else' + br + 'continue',
            's=0;' + br + 'for(i=0;i<10;i++)' + br + 'if(a[i]==0)' + br + 'continue;' + br + 'else' + br + 's+=a[i];',
            's=a[0];' + br + 'for(i=0;i<10;i++)' + br + 'if(a[i]==0)' + br + 'break;' + br + 'else' + br + 's+=a[i];',
            's+=a[i];' + br + 'for(i=0;i<10;i++)' + br + 'if(a[i]==0)' + br + 's+=a[i];' + br + 'else' + br + 'break;',
            's=0;' + br + 'for(i=0;i<10;i++)' + br + 'if(a[i]==0)' + br + 'break;' + br + 'else' + br + 's+=a[i];',
        ],
        rightAnswer: 4
    },
    {
        question: 'В результате выполнения какого фрагмента программы будет найдена сумма положительных элементов массива: инициализация исходных данных:' + br + 'int a[5] = { -1, 2, -3, 4, 5};' + br + 'int i,s;',
        options: [
            'for ( s=0,i=0 ; i<5; i + + )' + br + 'if ( a[i] > 0 )' + br + 's + = a[i]+i;',
            'for ( s=0,i=0 ; i<5; ++i  )' + br + 'if ( a[i] > 0 )' + br + 's + = a[i];',
            'for ( s=a[0],i=0 ; i<5;++ i  )' + br + 'if ( a[i] > 0 )' + br + 's + = a[i];',
            'for ( s=0,i=0 ; i<5; i + + )' + br + 'if ( a[i] > 0 )' + br + 's + = a[i];',
            'for ( s=a[0],i=0 ; i<5; i + + )' + br + 'if ( a[i] > 0 )' + br + 's + = a[i];',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каком из приведенных фрагментов программы будет найдено среднее арифметическое среди положительных элементов. Инициализация исходных данных:' + br + 'float a[5] = {-1 ,2 ,3 ,-4 , -5};' + br + 'int k=0 ;' + br + 'float s=0, av ;',
        options: [
            'for ( i=0 ; i<5 ; i + +)' + br + 'if (a[i] >0)' + br + '{s + = a[i];' + br + 'k  + +;' + br + 'av= s/k;' + br + ' }',
            'for (i=0 ; i <5 ; + + i)' + br + 'if (a[i] > 0 )' + br + '{s + = a[i];' + br + 'k + +;' + br + 'av = s/k;' + br + '}',
            'for ( i=0 ; i <5; i + + )' + br + 'if (a[i] >0 )' + br + '{ s + = a[i];' + br + 'k + +' + br + ' } ' + br + 'av = s/k;',
            'for (i=0  ; i<5 ; i + + )' + br + 'if ( a[i] > 0 )' + br + 's + =a [i]; ' + br + 'k + +' + br + 'av =s /k;',
            'for ( i=0 ; i <5 ; + + i)' + br + 'if ( a[i] >0 )' + br + '{s + = a[i];' + br + 'k + +;' + br + '}' + br + 'av = s/k;',
        ],
        rightAnswer: 2
    },
    {
        question: 'В результате какого фрагмента программы будет найден номер первого нулевого элемента массива а[10]. Предварительная инициализация:' + br + 'int i,k,a[10]={1,2,0,3,4,0,5,6,7,3};',
        options: [
            'for ( i=0; i<10; i++)' + br + 'if(a[i]==0)' + br + '{k=i;break;};',
            'for ( i=0; i<10; i++)' + br + 'if(a[i]==0)' + br + 'k=i;break;',
            'for ( i=0; i<10; i++)' + br + 'if(a[i]==0)' + br + 'if(a[i]==0)',
            'for ( i=0; i<10; i++)' + br + 'if(a[i]==0)' + br + '{k=i;continue;};',
            'for ( i=0; i<10; i++)' + br + 'if(a[i]==0)' + br + '{continue;k=i;};' + br + '{ break;k=i; };', 
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое  Windows Forms?',
        options: [
            'это часть каркаса .NET Framework, которая не поддерживает создание приложений со стандартным GUI на платформе Windows',
            'это часть каркаса .NET Framework, которая исключает  создание любых приложений',
            'это часть каркаса .NET Framework, которая поддерживает основной инструмент настройки формы ',
            'это часть каркаса .NET Framework, которая обеспечивает функциональность программы',
            'это часть каркаса .NET Framework, которая  поддерживает создание приложений со стандартным GUI на платформе Windows',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что такое форма?',
        options: [
            'основной инструмент настройки формы и ее компонент',
            'это экранный объект, обеспечивающий функциональность программы',
            'это объект, обеспечивающий вывод ошибок программы',
            'это экранный объект, содержащий данные всего листинга проекта',
            'это экранный объект, обеспечивающий информацию о выбранном свойстве',
        ],
        rightAnswer: 1
    },
];
  
numberOfAllQuestion.innerHTML = questions.length;  // выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];
    option5.innerHTML = questions[indexOfQuestion].options[4];

    numberOfQuestion.innerHTML = indexOfPage + 1; // устоновка номера страницы 
    indexOfPage++;
};

let comletedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(comletedAnswers.length > 0) {
            comletedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(comletedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    comletedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    });
};

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
};

const answerTracker = () => {
    questions.forEach(() => {
         const div = document.createElement('div');
         answersTracker.appendChild(div);
    });
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const attModal = document.querySelector('.attention-over-modal');
const btnClosed = document.getElementById("btn-close");

btnClosed.addEventListener('click', function () {
    attModal.classList.remove('actived');
});

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
       attModal.classList.add('actived');
    } else {
        randomQuestion();
        enableOptions();
    }

};

btnNext.addEventListener('click', validate);

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";
    coratten();
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
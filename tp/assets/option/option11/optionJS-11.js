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
      msgOfResult = document.getElementById('msgOfResult'),
      br = '</br>';

const questions = [
    {
        question: 'Массив – это',
        options: [
            'функция, вызываемая в нужном месте программы',
            'это структура данных, состоящая из фиксированного числа компонент одного типа.',
            'первая фаза компилятора',
            'лексема, имеющая специальное значение для компилятора',
            'набор символов, заключенных в скобки вида /* .. */ и не влияющая на ее семантику',
        ],
        rightAnswer: 1
    },
    {
        question: 'Объявление одномерного массива:',
        options: [
            'имя [нач_праметр . . конечн_параметр] : array of  тип;',
            'тип  имя [нач_праметр . . конечн_параметр];',
            'имя [количество элементов] : array of  тип;',
            'array  имя [количество элементов];',
            'тип  имя [количество элементов];',
        ],
        rightAnswer: 4
    },
    {
        question: 'В языке С++ формат описания одномерного массива с инициaлизацией:',
        options: [
            'int a[0..4] = {1,2,3,4,5}; double b[0..2] = {2.2, 3.3, 4.4}; ',
            'int a[1..5] = {1;2;3;4;5}; double b[1..3] = {2.2; 3.3; 4.4};',
            'int a[5] = {1;2;3;4;5}; double b[3] = {2.2; 3.3; 4.4};',
            'int a[1..5] = {1,2,3,4,5}; double b[1..3] = {2.2, 3.3, 4.4};',
            'int a[5] = {1,2,3,4,5}; double b[3] = {2.2, 3.3, 4.4};',
        ],
        rightAnswer: 4
    },
    {
        question: 'Объявление двумерного массива:',
        options: [
            'имя [нач_праметр . . конечн_параметр] : array of  тип;',
            'тип  имя [количество элементов];',
            'имя[колич_строк] [колич_столбцов] : array of  тип;',
            'тип имя[колич_строк] [колич_столбцов];',
            'тип имя[нач_праметр . . конечн_параметр];'+ br + '[нач_праметр . . конечн_параметр];',
        ],
        rightAnswer: 3
    },
    {
        question: 'Объявление двумерного массива с инициализацией:',
        options: [
            'int i[2][4] = ({1;2;3;4}, {5;6;7;8});',
            'int i[0..1][0..3] = {(1,2,3,4), (5,6,7,8)};',
            'int i[2][4] = {(1,2,3,4), (5,6,7,8)};',
            'int i[2][4] = {{1,2,3,4}, {5,6,7,8}};',
            'int i[1..2][1..4] = {{1,2,3,4}, {5,6,7,8}};',
        ],
        rightAnswer: 3
    },
    {
        question: 'Правильный фрагмент программы для возведения в квадрат отрицательных элементов массива a[10] :',
        options: [
            'for(i=0; i<10; i++)'+ br + ' if (a[i]<0)' + br + ' a[i]=sqr(a[i],2);',
            'for(i=0; i<=10; i++)'+ br + ' if (a[i]<0)' + br + 'a[i]=pow(a[i],2);',
            'for(i=0; i<10; i++)'+ br + ' if (a[i]<0)' + br + ' a[i]=pow(a[i],2);',
            'for(i=0, i<10, i++)'+ br + ' if (a[i]<0)' + br + ' a[i]=pow(a[i],2);',
            'for(i=0; i<10; i++) '+ br + ' if a[i]<0' + br + ' a[i]=pow(a[i],2);',
        ],
        rightAnswer: 2
    },
    {
        question: 'В языке С++ правильный фрагмент программы для построения массива a[30], где ai=2*i+1:',
        options: [
            'for (i=1; i<30; i++)' + br + ' { a[i]=2*i+1;' + br + ' cout <<  a(i); }',
            'for (i=1; i<30; i++)' + br + ' a[i]=2*i+1;' + br + ' cout << “ a[i]=”;',
            'for (i=0; i<30; i++)' + br + ' { a[i]=2*i+1;' + br + ' cout <<  a[i]; }',
            'for (i=0; i<30; i++)' + br + ' a[i]=2*i+1;' + br + ' cout << “ a[i]”;',
            'for (i=0; i<30; i++)' + br + ' { a[i]=2*i+1; }' + br + ' cout << ( a[i]);',
        ],
        rightAnswer: 2
    },
    {
        question: 'В языке Си правильный вариант ввода массива A[20] из целых чисел:',
        options: [
            'for(i=0;i<20;i++)' + br + ' cin >>“ &a[i]”;',
            'for(i=0;i<20;i++)' + br + ' scanf(“%d”, &a[i]);',
            'for(i=0;i<20;i++)' + br + ' cin << “a[i]”;',
            'for(i=0;i<=20;i++)' + br + ' printf(“%d”, &a[i]);',
            'for(i=0;i<=20;i++)' + br + ' scanf(“%f”, a[i]);',
        ],
        rightAnswer: 1
    },
    {
        question: 'В языке С++ правильный фрагмент программы для определения количества положительных четных элементов массива A[n]:',
        options: [
            'for(i=0;i<n;i++);' + br + ' if (a[i]>0 && a[i]%2 = = 0)' + br + ' k++;',
            'for(i=0;i<n;i++)' + br + ' if (a[i]>0 !! a[i]%2 = = 0)' + br + ' k++;',
            'for(i=0;i<n;i++)' + br + ' if (a[i]>0 & a[i]%2 = = 0)' + br + ' k++;',
            'for(i=0;i<n;i++)' + br + ' if (a[i]>0 && a[i]%2  = 0)' + br + ' k++;',
            'for(i=0;i<n;i++)' + br + ' if (a[i]<0 && a[i]%2  = 0)' + br + ' k++;',
        ],
        rightAnswer: 0
    },
    {
        question: 'Результат выполнения фрагмента программы на С++:' + br + 'int a[10]={2,4,5,7,8,6,3,12,19,9};' + br + 'main()' + br + '{ int i, max=2;' + br + 'for(i=0;i<10;i+=2)' + br + 'if (a[i]>max) max=a[i];' + br + 'printf(“%d  ”, max); }',
        options: [
            '19',
            '12',
            '9',
            '8',
            '6',
        ],
        rightAnswer: 0
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
        msgofScore();
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

function msgofScore() {
    if(score == 3 || score == 1 || score == 2)  {
        msgOfResult.innerHTML = 'Junior';
    } 
     else if(score == 6 || score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Middle';
     }
     else if(score == 9 || score == 7 || score == 8) {
        msgOfResult.innerHTML = 'Senior';
     }
     else if(score == 0) {
        msgOfResult.innerHTML = 'Bydlo';
     } else {
        msgOfResult.innerHTML = 'Lead';
     }
}




const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    coratten();
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";   
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
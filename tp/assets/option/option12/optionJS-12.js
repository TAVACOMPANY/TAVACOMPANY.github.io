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
        question: 'В каком из приведенных фрагментов программы будет найдена сумма элементов главной диагонали. Предварительная инициализация:' + br + 'int i, max, a[3][3]={1,2,3,4,5,6,7,8,9};',
        options: [
            's=a[0][0];' + br + ' for(i = 0; i < 3; s += a[i][i], i++);',
            's=0;' + br + ' for(i = 0; i < 3; i++) s += a[i][i];',
            's=a[0];' + br + ' for(i = 0; i < 3; s += a[i][i], i++);',
            's=0;' + br + ' for(i = 1; i < 3; i++) s += a[i][i]);',
            's=0;' + br + ' for(i = 0; i <= 3; ++i) s += a[i][i]);',
        ],
        rightAnswer: 1
    },
    {
        question: 'В каком из приведенных фрагментов программы ищется количество положительных элементов массива. Предварительная инициализация:' + br + 'int k, i, a[6]={-1,2,-3,4,-5,6};',
        options: [
            'k=0;' + br + ' for(i=0; i < 6; i++)' + br + ' if(a[i] > 0) k+=a[i];',
            'k=0;' + br + ' for(i=0; i <= 6; i++)' + br + ' if(a[i] > 0) k++;',
            'k=a[0];' + br + ' for(i=0; i <= 6; i++)' + br + ' if(a[i] > 0) k+=a[i];',
            'k=a[0];' + br + ' for(i = 0; i < 6; i++)' + br + ' if(a[i] > 0) k++;',
            'k=0;' + br + ' for(i=0; i < 6; i++)' + br + ' if(a[i] > 0) k++;',
        ],
        rightAnswer: 4
    },
    {
        question: 'В результате выполнения какого фрагмента программы будет найдена сумма положительных элементов массива: инициализация исходных данных:	int a[5] = { -1, 2, -3, 4, 5}; int i,s;',
        options: [
            'for ( s=0,i=0; i<5; i++)' + br + 'if ( a[i] > 0 )' + br + 's += a[i] + i;',
            'for ( s=1,i=0; i<5; ++i)' + br + 'if ( a[i] > 0 )' + br + 's += a[i];',
            'for ( s=a[0], i=0 ; i<=5; ++i) for ( s= a[0] ,i=0 ; i <= 5; ++i)' + br + 'if ( a[i] > 0 )' + br + 's + = a[i];',
            'for ( s=a[0],i=0; i<5; i++ )' + br + 'if ( a[i] > 0 )' + br + 's += a[i];',
            'for ( s=0,i=0 ; i<5; i++)' + br + 'if ( a[i] > 0 )' + br + 's += a[i];',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какая из приведенных ниже конструкций будет верной, при нахождении суммы элементов массива а[5] , расположенных до максимального элемента?',
        options: [
            'main()' + br + ' {int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br + ' max = a[0];' + br + ' for(i = 0; i < 5; i++)' + br + ' if (max > a[i] ) {max = a[i]; k=i;}' + br + ' for(i = 0; i <= 5-k; i++)' + br + ' s += a[i];',
            'main()' + br + ' {int a[5]={10,3,5,16,2,4}, i, k, max, s;' + br + ' for(i = 0; i <= 5; i++)' + br + ' if (max < a[i] ) {max = a[i]; k=i;}' + br + ' for(i = 0; i < k+1; i++)' + br + ' s += a[i];',
            'main()' + br + ' {int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br + ' for(i = 0; i < 5; i++)' + br + ' if (max < a[i] ) {max = a[i]; k=i;}' + br + ' for(i = 0; i < k; i++)' + br + 's += a[i];',
            'main()' + br + ' {int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br + ' max = a[0]; k = 0;' + br + ' for(i = 0; i < 5; i++)' + br + ' if (max < a[i]) {max = a[i]; k=i;}' + br + ' for(i = 0;i < k; i++)' + br + '  s += a[i];',
            'main()' + br + ' {int a[5]={10,3,5,16,2,4}, i, k, max, s;' + br + ' max = a[0]; k = 0;' + br + ' for(i = 0; i < 5; i++)' + br + ' if (max < a[i] ) {max = a[i]; k=i;}' + br + ' for(i = 0; i <= k; i++)' + br + ' s += a[i];',
        ],
        rightAnswer: 3
    },
    {
        question: 'В результате выполнения какого фрагмента программы будет найдена сумма элементов неглавной  диагонали матрицы а (3;3). Предварительная инициализация:' + br + 'int  i,s,a[3][3]={1,2,3,4,5,6,7,8,9};' ,
        options: [
            'for (i=0, s=0; i<=9; i++)' + br + 's+= a[i-2][i];',
            'for (i=0, s=0; i<=3; i++)' + br + 's+= a[i-3][i];',
            'for (i=0, s=0; i<3;i ++)' + br + 's+= a[i][3-i];',
            'for (i=0, s=0; i<3; i++)' + br + 's+= a[i][2-i];',
            'for (i=0, s=0; i<3; i++)' + br + 's+= a[3-i][i];',
        ],
        rightAnswer: 3
    },
    {
        question: 'Оператор goto имеет следующий формат:',
        options: [
            'goto выражение;' + br + 'switch: оператор;',
            'goto оператор;' + br + 'директиива:break;',
            'goto метка;' + br + 'метка: оператор;',
            'goto выражение;' + br + 'метка: оператор;',
            'goto метка;' + br + 'while : метка',
        ],
        rightAnswer: 2
    },
    {
        question: 'Пусть вызывающая программа обращается к функции следующим образом: a=fun(b,c);   b=5  и c =7, аргументы, значения которых передаются в вызываемую подпрограмму. Если описание функции начинается так: ' + br + 'float fun(float i, float j), то переменные i и j получат значения ...',
        options: [
            '12 и 7',
            '7 и 5',
            '5 и 7',
            '5 и 12',
            '2 и 7',
        ],
        rightAnswer: 2
    },
    {
        question: 'В языке С++ различают четыре основных памяти. Укажите не правильный ответ',
        options: [
            'внешняя',
            'локальная',
            'автоматическая',
            'статическая',
            'регистровая',
        ],
        rightAnswer: 1
    },
    {
        question: 'Возврат результата  из подпрограммы в основную программу задается оператором',
        options: [
            'return',
            'open',
            'define',
            'include',
            'call',
        ],
        rightAnswer: 0
    },
    {
        question: 'При передаче параметров процедурам и функциям…',
        options: [
            'фактические параметры подставляются на место формальных; их количество, порядок перечисления и типы должны строго соответствовать количеству, порядку и типам формальным параметров',
            'фактические параметры подставляются на место формальных; их количество и типы должны строго соответствовать количеству и типам формальным параметров, порядок может быть произвольным',
            'фактические параметры подставляются на место формальных; их количество и порядок могут не соответствовать количеству и порядку перечисления формальным параметров;',
            'формальные параметры определяют количество передаваемых переменных; порядок их перечисления и тип могут быть любыми',
            'формальные параметры по типу совпадают с фактическими, но количкство аргументов может быть любым',
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

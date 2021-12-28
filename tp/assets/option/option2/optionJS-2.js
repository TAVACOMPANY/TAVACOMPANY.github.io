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
        question: 'В каком из приведенных операторов будут правильно выведены значения переменных, инициализированных следующим образом:' + br + 'int i=5;float a=2.5;',
        options: [
            'printf(“%d %f”,a,i);',
            'printf(“%f %d”,a,i);',
            'printf(“%l %f”,a,i);',
            'printf(“%d %e”,a,i);',
            'printf(“%f %e”,a,i);',
        ],
        rightAnswer: 1
    },
    {
        question: 'В каком из приведенных фрагментов программ будут выведены значения переменной i в следующем виде:' +  br + '1' + br + '2' + br + '3',
        options: [
            'for(i=1;i<=3;i++)' + br + 'printf(“%d/v”,i);',
            'for(i=1;i<=3;i++)' + br + 'printf(“%d/b”,i);',
            'for(i=1;i<=3;i++)' + br + 'printf(“%d/a”,i);',
            'for(i=1;i<=3;i++)' + br + 'printf(“%d/t”,i);',
            'for(i=1;i<=3;i++)' + br + 'printf(“%d/n”,i);',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое из приведенных ниже обозначений является обозначением беззнакового целого числа:',
        options: [
            'double',
            'int',
            'char',
            'long',
            'unsigned int',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое из приведенных ниже обозначений является обозначением вещественного числа:',
        options: [
            'short int',
            'unsigned int',
            'long',
            'float',
            'char',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой из приведенных ниже символов преобразования в операторах ввода и вывода применяется для вещественных чисел в экспоненциальной форме:',
        options: [
            's',
            'f',
            'lf',
            'e',
            'd',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой из приведенных ниже символов преобразования в операторах ввода и вывода применяется для единичного символа:',
        options: [
            's',
            'e',
            'c',
            'd',
            'f',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой из приведенных ниже операторов вывода даст результат:' + br + 'b=1234.56;',
        options: [
            'print f ("% 12.6f", b);',
            'print f ("b=%f", b");',
            'print f ("b=%7.2f", b);',
            'print f ("b=%1.6f", b);',
            'print f ("%7f", b");',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой из приведенных ниже операторов при a = 3.687 и b = 20 выведет эти значения в следующем виде:' + ' ___3.69___20',
        options: [
            'print f ("% 4.2f % 5d", a, b);',
            'print f ("% 7.2f % 5d", a, b);',
            'print f ("% 4.2f % 2d", a, b);',
            'print f ("% .2f % 3d", a, b);',
            'print f ("% 3.2f % 5d", a, b);',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой из приведенных ниже операторов при i=127 и j=65 выведет  эти значения в следующем виде: i=127__j= ___65',
        options: [
            'print f ("i=% -5dj=%5d “,i, j);',
            'print f ("i= %3dj = %2d", i, j);',
            'print f ("i = %2dj= %3d", i, j );',
            'print f ("i = %-2dj = %-3d", i, j);',
            'print f ("i = %5dj = %-5d",i,j);',
        ],
        rightAnswer: 0
    },
    {
        question: 'При помощи какого оператора будут введены переменные а=16.75 и в=200?',
        options: [
            'scanf("% f  %d",&a,&b);',
            'scanf("% 5.2f  % 3d",&a,&b);',
            'scanf("% 5.2f  %d",a,b);',
            'scanf("% 5f  %3d",&a,&b);',
            'scanf("% 2.2 f  %3d",&a,&b);',
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
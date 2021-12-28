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
        question: 'В языке С++ правильное объявление типа переменных:',
        options: [
            'int: a,b=1;',
            'float x,b;',
            'long: x,e',
            'int exp,printf;',
            'a,b:int;',
        ],
        rightAnswer: 1
    },
    {
        question: 'В языке С++ правильный вывод на экран целой переменной х :',
        options: [
            'cout (“%d”,x);',
            'cout<<x;',
            'printf(“%d”,&x);',
            'scanf(“%d”,&x);',
            'printf(“%d”,x);',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое из приведенных ниже обозначений является обозначением единичного символа:',
        options: [
            'short int',
            'unsigned int',
            'long',
            'float',
            "char",
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое из приведенных ниже обозначений является обозначением целого числа:',
        options: [
            'double',
            'long',
            'char',
            'int',
            'float',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое из приведенных ниже обозначений является обозначением числа двойной точности:',
        options: [
            'int',
            'unsigned int',
            'float',
            'double',
            'char',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой из приведенных ниже символов преобразования в операторах ввода и вывода применяется для вещественных чисел:',
        options: [
            's',
            'e',
            'f',
            'c',
            'd',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой из приведенных ниже символов преобразования в операторах ввода и вывода применяется для символьной строки:',
        options: [
            'lf',
            'd',
            's',
            'e',
            'c',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой из приведенных ниже символов преобразования в операторах ввода и вывода применяется для целых чисел:',
        options: [
            'c',
            'd',
            'e',
            'lf',
            's',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой из приведенных ниже символов преобразования в операторах ввода и вывода применяется для вещественных чисел двойной точности:',
        options: [
            'lf',
            'c',
            'd',
            'e',
            's',
        ],
        rightAnswer: 0
    },
    {
        question: 'Результат выполнения фрагмента программы на языке С++:' + br + 'main()' + br + '{float a,b,c,p;' + br + 'a=6; b=7; c=8;' + br + 'p=(a+b+c)/2;' + br + 'printf( “/n p=%f” ,p); }',
        options: [
            'p=10.500000',
            'p=8,5',
            '11,5',
            '20,33',
            '10',
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
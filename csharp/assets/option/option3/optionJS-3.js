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
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Как сделать инкрементацию числа',
        options: [
            '%%',
            '--',
            '++',
            '!=',
            '&&',
        ],
        rightAnswer: 2
    },
    {
        question: 'Как сделать декрементацию числа',
        options: [
            '&&',
            '++',
            '!=',
            '--',
            '%%',
        ],
        rightAnswer: 3
    },
    {
        question: 'Как найти квадратный корень из числа x',
        options: [
            'Math.Sqrt(x);',
            'Summ.Koren(x);',
            'Arifmetic.sqrt(x);',
            'Sqrt(x); ',
            'Sqr(x); ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Обозначение оператора «ИЛИ»',
        options: [
            '!=',
            '||',
            '!',
            'Or',
            '==',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что вернет функция Termin после выполения. Код:' + '</br>' + 'int Termin()' + '</br>' + '{' + 'int a = 1;' + '</br>' + 'int b = 3;' + '</br>' + 'if (a != 5) return a + b;' + '</br>' + 'else return 0;' + '</br>' + '}',
        options: [
            '0',
            '1',
            '3',
            '5',
            '4',
        ],
        rightAnswer: 4
    },
    {
        question: 'Как называется оператор «?:»',
        options: [
            'Территориальный оператор',
            'Обратный оператор ',
            'Прямой оператор',
            'Тернарный оператор',
            'Вопросительный',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что делает оператор «%»?',
        options: [
            'Возвращает тригонометрическую функцию',
            'Возвращает остаток от разности',
            'Возвращает остаток от деления ',
            'Возвращает остаток от суммы ',
            'Возвращает процент от суммы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Обозначение оператора «И»',
        options: [
            '&&',
            'and',
            '||',
            '&',
            'OR',
        ],
        rightAnswer: 0
    },
    {
        question: 'Чему будет равен с, если int a = 10; int b = 4; int c = a % b;',
        options: [
            '3',
            '4',
            '1',
            '11',
            '2',
        ],
        rightAnswer: 4
    },
    {
        question: 'Чему будет равен с, если int a = 10; int b = 4; bool c = (a == 10 && b == 4);',
        options: [
            'False',
            'True',
            'Null',
            '14',
            '10',
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
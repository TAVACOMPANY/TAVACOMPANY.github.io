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
        question: 'По реальности существования ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Активный и пассивный',
            'Физический и виртуальный',
            'Эластичный и жесткий',
            'Постоянный и переменный',
            'Главный и второстепенный',
        ],
        rightAnswer: 1
    },
    {
        question: 'По возможности расширения свойств ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Физический и виртуальный',
            'Активный и пассивный',
            'Главный и второстепенный',
            'Эластичный и жесткий',
            'Постоянный и переменный',
        ],
        rightAnswer: 3
    },
    {
        question: 'По степени активности ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Эластичный и жесткий',
            'Активный и пассивный',
            'Физический и виртуальный',
            'Постоянный и переменный',
            'Главный и второстепенный',
        ],
        rightAnswer: 1
    },
    {
        question: 'По времени существования ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Активный и пассивный',
            'Главный и второстепенный',
            'Постоянный и переменный',
            'Физический и виртуальный',
            'Эластичный и жесткий',
        ],
        rightAnswer: 2
    },
    {
        question: 'По степени важности ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Главный и второстепенный',
            'Постоянный и переменный',
            'Активный и пассивный',
            'Физический и виртуальный',
            'Эластичный и жесткий',
        ],
        rightAnswer: 0
    },
    {
        question: 'По структуре ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Физический и виртуальный',
            'Простой и составной',
            'Активный и пассивный',
            'Постоянный и переменный',
            'Главный и второстепенный',
        ],
        rightAnswer: 1
    },
    {
        question: 'По восстанавливаемости ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Главный и второстепенный',
            'Постоянный и переменный',
            'Активный и пассивный',
            'Физический и виртуальный',
            'Воспроизводимый и потребляемый',
        ],
        rightAnswer: 4
    },
    {
        question: 'По возможности расширения свойств ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Активный и пассивный',
            'Физический и виртуальный',
            'Эластичный и жесткий',
            'Постоянный и переменный',
            'Главный и второстепенный',
        ],
        rightAnswer: 2
    },
    {
        question: 'По характеру использования ресурсы вычислительной системы можно классифицировать на…',
        options: [
            'Физический и виртуальный',
            'Параллельно используемый и последовательной используемый',
            'Активный и пассивный',
            'Постоянный и переменный',
            'Главный и второстепенный',
        ],
        rightAnswer: 1
    },
    {
        question: 'Минимальный программный объект, обладающий собственными системными ресурсами (запущенная программа)',
        options: [
            'Ресурс',
            'Задача',
            'Процесс',
            'Работа',
            'Программа',
        ],
        rightAnswer: 2
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
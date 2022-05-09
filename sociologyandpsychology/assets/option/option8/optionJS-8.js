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
        question: 'Как называется процесс передачи определенных взглядов, знаний и навыков членам общества путем формального и систематического обучения?',
        options: [
            'производство;',
            'воспроизводство;',
            'образование',
            'практика;',
            'теория.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто понимал эволюцию как процесс усложнения социальной структуры:',
        options: [
            'З. Фрейд',
            'Р. Мертон',
            'О.Конт',
            'Г. Спенсер',
            'Э. Дюркгейм',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие статусы задействованы в процессе образования?',
        options: [
            'обучающий и обучающийся;',
            'прирожденный статус;',
            'родители и дети;',
            'врожденный статус.',
            'продавец и покупатель;',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как называется увеличение городов, городского населения, повышение их роли в развитии общества?',
        options: [
            'дифференциация;',
            'урбанизация;',
            'централизация;',
            'децентрализация',
            'миграция;',
        ],
        rightAnswer: 1
    },
    {
        question: 'Массовое периодическое печатное издание, это:',
        options: [
            'Радио',
            'Интернет',
            'книги',
            'телевидение;',
            'газеты, журналы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Брак – это:',
        options: [
            'типовая модель поведения двух супругов',
            'исторически устойчивая, типовая модель социокультурного поведения, являющаяся необходимым элементом жизненного мира конкретной общности',
            'крупномасштабное объединение людей, образующих полифункциональную, саморегулирующуюся систему жизнедеятельности.',
            'союз мужчины и женщины, имеющий гражданско-правовую оформленность, отвечающий требованиям человеческой природы и служащий продолжению рода, рождению и воспитанию детей',
            'один из самых древних социальных институтов, предполагающий брачный союз между мужчиной и женщиной, кровное родство между родителями и детьми, их определенные права и взаимные обязанности по отношению к друг другу',
        ],
        rightAnswer: 3
    },
    {
        question: 'Любой переход индивида, группы, социального объекта от одной социальной позиции к другой, определяется как:',
        options: [
            'Динамика',
            'Институционализация',
            'Мобильность',
            'Стратификация',
            'Статус',
        ],
        rightAnswer: 2
    },
    {
        question: 'Отклонение от нормы- это:',
        options: [
            'девиация',
            'обучение',
            'аномия',
            'эволюция',
            'мобильность',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что является предметом социологии образования?',
        options: [
            'исследование научных школ в социологии;',
            'качество и количество образовательных услуг;',
            'количество учреждений образования и их система;',
            'проблемы высшего звена образования;',
            'система образования, инфраструктура, ее влияние на общество;',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кто такой респондент?',
        options: [
            'лицо, участвующее в проведении полевого исследования',
            'лицо, которое участвует в опросе в качестве источника информации;',
            'лицо, которое проводит анкетирование',
            'лицо, которое берет интервью;',
            'лицо, проводящее наблюдение;',
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
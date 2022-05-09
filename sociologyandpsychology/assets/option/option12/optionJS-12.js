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
        question: 'Социология – это наука о.',
        options: [
            'всеобщих законах развития общества и природы',
            'закономерностях поведения и организации людей',
            'обществе как целостной системе и механизме ее функционирования',
            'признаках и критериях социального расслоения в обществе',
            'событиях и обществах в прошлом',
        ],
        rightAnswer: 2
    },
    {
        question: 'Статус, в котором человек рожден называют:',
        options: [
            'Личным',
            'Основным',
            'Неосновным',
            'Приписываемым',
            'Главным',
        ],
        rightAnswer: 3
    },
    {
        question: 'Под социальным статусом в социологии понимается',
        options: [
            'позиция индивида в социальной системе',
            'правила и нормы;',
            'тип поведения',
            'социальные отношения',
            'индивидуальные действия;',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сходство людей подчеркивает:',
        options: [
            'Норма',
            'статус',
            'Ранг',
            'роль',
            'характер',
        ],
        rightAnswer: 1
    },
    {
        question: 'Любое общество опирается на принуждение одних членов другими, согласно:',
        options: [
            'Функционализму',
            'Эволюционизму',
            'теории обмена',
            'социометрии',
            'конфликтологии',
        ],
        rightAnswer: 4
    },
    {
        question: 'Переход на одном и том же уровне социальной стратификации – это мобильность:',
        options: [
            'Восходящая',
            'Нисходящая',
            'Интергенерационная',
            'Горизонтальная',
            'Вертикальная',
        ],
        rightAnswer: 3
    },
    {
        question: 'Стремление человека добиваться успехов в различных видах деятельности и общения –',
        options: [
            'мотив избегания неудачи',
            'уровень притязаний',
            'мотив достижения успеха',
            'самооценка',
            'локус контроля',
        ],
        rightAnswer: 2
    },
    {
        question: 'К внутренним мотивационным факторам относятся:',
        options: [
            'условия труда',
            'примеры из окружения',
            'престиж',
            'стереотипы разных социальных ролей',
            'рекомендации, советы со стороны',
        ],
        rightAnswer: 0
    },
    {
        question: 'Способ избавления от душевных переживаний через взаимодействие с телом –',
        options: [
            'каузальная атрибуция',
            'беседа по душам',
            'психоанализ',
            'арт-терапия',
            'телесно ориентированная психотерапия',
        ],
        rightAnswer: 4
    },
    {
        question: 'Побуждение к действию; психофизиологический процесс, управляющий поведением человека, задающий его направленность, организацию, активность и устойчивость; способность человека деятельно удовлетворять свои потребности',
        options: [
            'Анализ',
            'мотивация',
            'Мечта',
            'Активность',
            'Желание',
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
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
        question: 'Система обучающих методик, направленных на формирование внутренних средств управления собственными состояниями –',
        options: [
            'Тайм-менеджмент',
            'Мотивация',
            'Методы психологической саморегуляции',
            'Методы психолого-педагогического исследования',
            'Локус-контроля',
        ],
        rightAnswer: 2
    },
    {
        question: 'Свойство человека, заключающееся в его способности сознательно управлять своей психикой и поступками',
        options: [
            'Деятельность',
            'Эмоция',
            'Переживание',
            'Воля',
            'Мотив',
        ],
        rightAnswer: 3
    },
    {
        question: 'Процесс выбора альтернатив, имеющий целью достижение необходимого результата',
        options: [
            'принятие решения',
            'мотивация',
            'решение конфликта',
            'умение вступать в диалог',
            'Дискуссия',
        ],
        rightAnswer: 0
    },
    {
        question: 'Каузальная атрибуция – это…',
        options: [
            'зависимость между мотивацией и достижением успехов в деятельности',
            'истолкование субъектом межличностного восприятия причин и мотивов поведения других людей и развитие на этой основе способности предсказывать их будущее поведение',
            'относительно устойчивое стремление человека избегать неудач в жизненных ситуациях, связанных с оценкой другими людьми результатов его деятельности и общения',
            'стремление человека добиваться успехов в различных видах деятельности и общения',
            'оценка личностью самой себя, своих возможностей, качеств, достоинств и недостатков, своего места среди других людей',
        ],
        rightAnswer: 1
    },
    {
        question: 'Является самым оптимальным способом регуляции эмоций, поскольку эмоция осознается и разряжается в деятельности, направленной на решение проблемы, или в косвенных видах активности',
        options: [
            'Эмоциональный интеллект',
            'Эмоциональная трансформация',
            'Локус контроля',
            'Переживание',
            'Эмоциональное отреагирование',
        ],
        rightAnswer: 4
    },
    {
        question: 'Психологическое состояние, проявляющееся как неадекватная пассивность, препятствующая выполнению тех или иных действий',
        options: [
            'личная оценка труда',
            'самоанализ',
            'анализ возможностей участия в общественной деятельности',
            'психологический барьер',
            'самооценка',
        ],
        rightAnswer: 3
    },
    {
        question: 'Структура стойких, сравнительно постоянных психических свойств, определяющих особенности отношений и поведения личности',
        options: [
            'мотив',
            'Переживание',
            'характер',
            'воля',
            'эмоция',
        ],
        rightAnswer: 2
    },
    {
        question: 'То, что побуждает человека к деятельности - это ...',
        options: [
            'мотив',
            'задача',
            'активность',
            'поведение',
            'желание',
        ],
        rightAnswer: 0
    },
    {
        question: 'Первое впечатление содержит компоненты:',
        options: [
            'текущий и итоговый',
            'формирующий и развивающий',
            'теоретический и практический',
            'реальный и идеальный',
            'эмоциональный и оценочный',
        ],
        rightAnswer: 4
    },
    {
        question: 'К внешним мотивационным факторам относятся:',
        options: [
            'анализ возможностей участия в общественной деятельности',
            'стереотипы разных социальных ролей',
            'самоанализ',
            'условия труда',
            'личная оценка труда',
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
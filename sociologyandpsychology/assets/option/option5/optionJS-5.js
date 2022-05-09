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
        question: 'Скорость возникновения и протекания возбудимого и тормозного процессов',
        options: [
            'Одаренность',
            'Уравновешенность',
            'Лабильность',
            'Сила',
            'Талант',
        ],
        rightAnswer: 2
    },
    {
        question: 'Согласно учению З. Фрейда действия человека управляются',
        options: [
            'душой',
            'мотивами',
            'сознанием',
            'глубинными побуждениями',
            'личным опытом',
        ],
        rightAnswer: 3
    },
    {
        question: 'Устойчивые психические состояния, имеющие четко выраженный предметный характер',
        options: [
            'Чувства',
            'Собственно эмоции',
            'Желание',
            'Аффект',
            'Настроение',
        ],
        rightAnswer: 0
    },
    {
        question: 'Осознание человеком направленности своей жизни, сознательное выстраивание им иерархии ценностей, осознание своих возможностей и стремление к их реализации',
        options: [
            'Цель жизни',
            'Смысл жизни',
            'Каузальная атрибуция',
            'Мотив избегания неудач',
            'Мотивация',
        ],
        rightAnswer: 1
    },
    {
        question: 'Это определенное состояние сознания, основанное на предыдущем опыте, регулирующее отношение и поведение человека',
        options: [
            'стремление человека быть счастливым',
            'стимул',
            'воображение',
            'реакция на окружающий мир',
            'социальная установка',
        ],
        rightAnswer: 4
    },
    {
        question: 'Разделение общества на неравные социальные слои -это:',
        options: [
            'Организация',
            'Институт',
            'Классификация',
            'Стратификация',
            'Общность',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что относится к техническим средствам коммуникации:',
        options: [
            'книги, газеты, журналы.',
            'ручка, бумага, ксерокс, принтер;',
            'телефон, телеграф, телетайп, факс, компьютер и т.п.;',
            'театр, кино, цирк;',
            'Интернет, радио, массовые печатные издания;',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что означает термин «страта»?',
        options: [
            'слой;',
            'публика;',
            'социальный класс;',
            'масса людей;',
            'отдельная личность.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как называл свою социологию Макс Вебер?',
        options: [
            'центральной.',
            'внимательной;',
            'меняющейся;',
            'формальной',
            'понимающей',
        ],
        rightAnswer: 4
    },
    {
        question: 'Потребность личности в самореализации определяется как потребность.',
        options: [
            'Витальная',
            'Духовная',
            'Биосоциальная',
            'Физиологическая',
            'Социальная',
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
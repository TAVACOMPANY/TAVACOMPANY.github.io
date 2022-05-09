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
        question: 'Основана на приемах погружения в разные слои психического за счет целенаправленного вызывания образов воображения и дальнейшей работы с обнаруженными таким образом внутренними конфликтами',
        options: [
            'Медитация',
            'Произвольное самовнушение',
            'Имажинативная психотерапия',
            'Аутогенная тренировка',
            'Нервно-мышечная релаксация',
        ],
        rightAnswer: 2
    },
    {
        question: 'Упорядоченное целое, включающее отдельных индивидов, группы, организации, институты, общности и сообщества, объединенного социальными отношениями – это:',
        options: [
            'Структура',
            'Система',
            'Общность',
            'социальная система',
            'социетальная система',
        ],
        rightAnswer: 3
    },
    {
        question: 'Устойчивые отношения между элементами общества-:',
        options: [
            'социальная структура',
            'социальный уровень',
            'стратификация',
            'социальные процессы',
            'социальные явления',
        ],
        rightAnswer: 0
    },
    {
        question: 'В чем суть закрытой системы стратификации?',
        options: [
            'редкость изменения статуса',
            'не возможность изменения социального статуса;',
            'возможность изменения статуса',
            'не возможность разделения социального слоя.',
            'разделение на социальные слои внутри слоя;',
        ],
        rightAnswer: 1
    },
    {
        question: 'В социальной психологии понятие ценности включает в себя…',
        options: [
            'идеалы, потребности, мотивы',
            'самооценка, мотивация, потребности',
            'реальный потребности индивида',
            'стремление человека быть счастливым',
            'идеалы, цели, интересы, убеждения',
        ],
        rightAnswer: 4
    },
    {
        question: 'Пограничное, переходное состояние субъекта- это :',
        options: [
            'массовость;',
            'социализация.',
            'элитарность;',
            'маргинальность;',
            'стратификация;',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кем была разработана ролевая теория личности?',
        options: [
            'О. Конт',
            'П. Сорокин;',
            'Дж. Мид;',
            'Э. Дюркгейм;',
            'М. Вебер;',
        ],
        rightAnswer: 2
    },
    {
        question: 'Предметом социологии является совокупность социальных фактов, согласно:',
        options: [
            'Э. Дюркгейм',
            'О.Конт',
            'Э. Мейо',
            'Шюц',
            'М. Вебер',
        ],
        rightAnswer: 0
    },
    {
        question: 'Стратификация возникает по поводу:',
        options: [
            'ранжирования',
            'самоорганизации',
            'привилегий',
            'общественного распределения результатов труда',
            'общественного разделения труда',
        ],
        rightAnswer: 4
    },
    {
        question: 'Социальная структура – это.',
        options: [
            'реально существующая, эмпирически фиксируемая совокупность индивидов;',
            'строение, внутреннее устройство, организация общества;',
            'основа политической деятельности.',
            'перемещения индивидов;',
            'столкновение противоположных целей, позиций, мнений;',
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
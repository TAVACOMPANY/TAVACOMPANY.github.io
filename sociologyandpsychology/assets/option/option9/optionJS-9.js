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
        question: 'Трехуровневую структуру социологического знания разработал:',
        options: [
            'М. Вебер',
            'П. Сорокин',
            'Р. Мертон',
            'Т. Парсонс',
            'Н. Смелзер',
        ],
        rightAnswer: 2
    },
    {
        question: 'Практическая функция социологии означает.',
        options: [
            'выработка теоретических концепций',
            'формирование мировоззрения',
            'научное прогнозирование',
            'разработка практических рекомендаций',
            'синтез теории и практики',
        ],
        rightAnswer: 3
    },
    {
        question: 'Для какого уровня социологического знания характерно представление об обществе как целостном социальном организме:',
        options: [
            'Теоретического',
            'теории среднего уровня',
            'Эмпирической',
            'Прикладного',
            'Вторичного',
        ],
        rightAnswer: 0
    },
    {
        question: 'Автором понятия «идеальный тип» является:',
        options: [
            'Р. Мертон',
            'М.Вебер',
            'Э. Дюркгейм',
            'О. Конт',
            'Г. Спенсер',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кто был основоположником биологического (органического) направления в социологии?',
        options: [
            'Э.Дюркгейм',
            'О.Конт',
            'Т.Парсонс',
            'К. Маркс',
            'Г.Спенсер',
        ],
        rightAnswer: 4
    },
    {
        question: 'Согласно Линтону, функция от совокупности социальных ролей - это:',
        options: [
            'Роль',
            'Индивид',
            'Статус',
            'Личность',
            'Человек',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каком обществе ведущей отраслью является сфера услуг:',
        options: [
            'Индустриальным',
            'Традиционным',
            'Информационным',
            'Аграрным',
            'Современным',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто из социологов называл свою социологию «понимающей»?',
        options: [
            'М. Вебер',
            'П. Сорокин',
            'Т.Парсонс',
            'О. Конт;',
            'Э. Дюркгейм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Основана на приемах погружения в разные слои психического за счет целенаправленного вызывания образов воображения и дальнейшей работы с обнаруженными таким образом внутренними конфликтами',
        options: [
            'Нервно-мышечная релаксация',
            'Аутогенная тренировка',
            'Медитация',
            'Произвольное самовнушение',
            'Имажинативная психотерапия',
        ],
        rightAnswer: 4
    },
    {
        question: 'Свойство психики человека в концентрированном виде выражать для него то, как он представляет себе свою принадлежность к различным социальным, экономическим, национальным, профессиональным, языковым, политическим, религиозным, расовым и другим группам или иным общностям:',
        options: [
            'самоанализ',
            'идентичность',
            'самопрезентация',
            'смысл жизни',
            'Реализм',
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
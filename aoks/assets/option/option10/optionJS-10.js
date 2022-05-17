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
        question: 'Cкорость , измеряемая в оборотах в минуту',
        options: [
            'Внутренняя скорость обмена',
            'Внешняя скорость обмена',
            'Скорость вращения ',
            'Среднее время перехода на соседнюю дорожку',
            'Среднее время доступа к данным',
        ],
        rightAnswer: 2
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD IBM 30.7 IDE 7200 rpm, где производителем является фирма',
        options: [
            'Rpm',
            'GB',
            'IDE',
            'IBM',
            'HDD',
        ],
        rightAnswer: 3
    },
    {
        question: 'Магнитная головка, позволяющая осуществлять чтение и запись данных на диск.',
        options: [
            'Головка считывания/записи',
            'Головка считывания/воспроизведения',
            'Головка записи/переименования',
            'Головка записи/копирования',
            'Головка воспроизведения /записи',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что выполняет функцию буфера между процессором и оперативной памятью',
        options: [
            'ОЗУ',
            'Кэш-память ',
            'Шина данных',
            'Индекс данных',
            'Адрес данных',
        ],
        rightAnswer: 1
    },
    {
        question: 'Запись 7N2 указывает на ____стоп-бита',
        options: [
            '0',
            '7',
            'N',
            '4',
            '2',
        ],
        rightAnswer: 4
    },
    {
        question: 'Частота строк определяет, сколько строк формируется на экране монитора в течение',
        options: [
            '1 мин',
            '1 Кбит/с ',
            '1 км/ ч',
            '1с.',
            '2с',
        ],
        rightAnswer: 3
    },
    {
        question: 'Для того чтобы сократить время выхода накопителя в рабочее состояние, двигатель при включении некоторое время работает в',
        options: [
            'Онлайн режиме',
            'Минимальном режиме',
            'форсированном режиме',
            'Оффлайн режиме',
            'Замедленном режиме',
        ],
        rightAnswer: 2
    },
    {
        question: 'Совокупность дорожек, расположенных друг под другом на всех поверхностях называют',
        options: [
            'цилиндром',
            'накопителем',
            'магнитными дорожками',
            'окружностью',
            'секторами',
        ],
        rightAnswer: 0
    },
    {
        question: 'Частота строк определяет, сколько строк формируется на экране монитора в течение одной секунды. Значение данного параметра указывается в',
        options: [
            'кг',
            'Мб',
            'см',
            'кДж',
            'кГц',
        ],
        rightAnswer: 4
    },
    {
        question: 'Информация передается по шине в виде',
        options: [
            'групп множеств',
            'групп битов',
            'групп файлов',
            'групп таблиц',
            'групп сигналов',
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
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
        question: 'Что представляет собой крыло, парящее над поверхностью, благодаря тому, что поверхность увлекает с собой частицы воздуха, создавая таким образом набегающий на крыло поток.',
        options: [
            'Дисковод',
            'Механизм',
            'Держатель головки',
            'Сектор',
            'Дорожка',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что увеличивает пропускную способность процессора (количество команд, завершающихся в единицу времени), но она не сокращает время выполнения отдельной команды.',
        options: [
            'Структурность',
            'Дублированность',
            'Параллелизм',
            'Конвейеризация ',
            'Конфликтность',
        ],
        rightAnswer: 3
    },
    {
        question: 'Содержимое базового регистра. Обычно используется для указания на начало некоторого массива',
        options: [
            'База (Base) ',
            'Индекс (Index)',
            'Масштаб (Scale)',
            'Адресация (Address)',
            'Смещение (Displacement)',
        ],
        rightAnswer: 0
    },
    {
        question: 'Конфликты в конвейере приводят к необходимости _____________выполнения команд.',
        options: [
            'Ускоренного',
            'Приостановки',
            'Повторного обращения',
            'Замедленного',
            'Дублированного',
        ],
        rightAnswer: 1
    },
    {
        question: 'Хранение и извлечение данных с диска требует взаимодействия между___________________ , контроллером жесткого диска и электронными и механическими компонентами самого накопителя.',
        options: [
            'головкой считывания/записи',
            'электронной таблицей',
            'сектором',
            'электроникой жесткого диска',
            'операционной системой ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Общий объем накопителя можно определить по формуле',
        options: [
            'V = C + H + S + В',
            'V = C * H + S * В',
            'V = C / H * S / В',
            'V = C * H * S * В ',
            'V = C / H * S * В',
        ],
        rightAnswer: 3
    },
    {
        question: 'Жидкокристаллические дисплеи',
        options: [
            'MBR',
            'CRT',
            'LCD',
            'Sync',
            'Live',
        ],
        rightAnswer: 2
    },
    {
        question: 'До 80-х годов основа дисков изготавливалась из',
        options: [
            'алюминиевого сплава',
            'вольфрама',
            'меди',
            'висмута',
            'стали',
        ],
        rightAnswer: 0
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD IBM 30.7 IDE 7200 rpm, где объем НЖМД равен',
        options: [
            '72 Гб',
            '1024 Гб',
            '7200 Гб',
            '30 Гб',
            '30.7 Гб',
        ],
        rightAnswer: 4
    },
    {
        question: 'Cкорость обмена между поверхностью диска и буфером (Media to Buffer). Измеряется в мегабитах в секунду.',
        options: [
            'Среднее время доступа к данным',
            'Внутренняя скорость обмена',
            'Скорость вращения',
            'Внешняя скорость обмена ',
            'Среднее время перехода на соседнюю дорожку',
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
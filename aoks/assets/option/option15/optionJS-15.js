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
        question: 'Определите частоту строк монитора при разрешении 1280х1024 точек, если частота регенерации изображения равна 93 Гц, а потери на синхронизацию составляют 10%.',
        options: [
            '20 кГц',
            '33,7 кГц',
            '104,75 кГц',
            '67000 Гц',
            '57000 Гц',
        ],
        rightAnswer: 2
    },
    {
        question: 'Определите частоту строк монитора при разрешении 1024х768 точек, если частота регенерации изображения равна 85 Гц, а потери на синхронизацию составляют 10%.',
        options: [
            '96,7',
            '66,7',
            '93,4',
            '71,8 ',
            '85,2',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что позволяет считывать и записывать информацию на диски',
        options: [
            'магнитные головки ',
            'цилиндр',
            'цилиндр',
            'сектор',
            'магнитные дорожки',
        ],
        rightAnswer: 0
    },
    {
        question: 'В большинстве схем, содержащих интерфейс RS-232C, данные передаются',
        options: [
            'Посекундно',
            'Асинхронно ',
            'Одновременно',
            'Параллельная',
            'Синхронная',
        ],
        rightAnswer: 1
    },
    {
        question: 'Исходным пунктом линий данных является',
        options: [
            'Электронная таблица',
            'Головка считывания/записи ',
            'Операционная система',
            'Электроника жесткого диска',
            'Центральный процессор',
        ],
        rightAnswer: 4
    },
    {
        question: 'Если указывается частота 75 Гц, то это означает, что в течение одной секунды изображение формируется заново ровно',
        options: [
            '15 раз.',
            '120 раз.',
            '85 раз.',
            '75 раз. ',
            '30 раз.',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каком году разработан интерфейс ST-506/412 фирмой Seagate Technologies',
        options: [
            '1985',
            '1986',
            '1982',
            '1987',
            '1983',
        ],
        rightAnswer: 2
    },
    {
        question: 'Рассчитайте объем видеопамяти, необходимый для реализации разрешения 1024х768 точек и количества цветов 65536.',
        options: [
            '≈ 1,57 МВ',
            '≈ 10,05 МВ',
            '≈ 15,41 МВ',
            '≈ 11,22 МВ ',
            '≈ 8,98 МВ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Логическая 1 (MARK) представляется отрицательным напряжением в диапазоне от',
        options: [
            'от +4 до +25 В',
            'от +3 до +25 В ',
            'от -3 до +26 В',
            'от +4 до +33 В',
            '-3 до -25 В.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Cкорость обмена между буфером и контроллером канала (Host). Определяется интерфейсом, поддерживаемым диском (а также чипсетом со стороны системной платы).',
        options: [
            'Скорость вращения',
            'Внешняя скорость обмена',
            'Среднее время перехода на соседнюю дорожку',
            'Внутренняя скорость обмена',
            'Среднее время доступа к данным',
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
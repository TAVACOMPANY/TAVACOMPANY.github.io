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
        question: 'Участки остаточной намагниченности, оказавшись при вращении диска напротив зазора магнитной головки, наводят в ней электродвижущую силу, изменяющуюся в зависимости от',
        options: [
            'внешнего магнитного поля',
            'электроники жесткого диска',
            'величины намагниченности.',
            'магнитного покрытия диска',
            'угла зазора магнитной головки',
        ],
        rightAnswer: 2
    },
    {
        question: 'Диски, на которых хранится информация, головки, которые записывают и считывают информацию с дисков, а также двигатели, приводящие все это в движение',
        options: [
            'Сектор',
            'Дорожка',
            'Головка считывания/записи',
            'Механизмы',
            'Дисковод',
        ],
        rightAnswer: 3
    },
    {
        question: 'Определите частоту строк монитора при разрешении 640х480 точек, если частота регенерации изображения равна 80 Гц, а потери на синхронизацию составляют 10%.',
        options: [
            '42,2кГц',
            '45,5 кГц',
            '75кГц',
            '64кГц',
            '54 кГц',
        ],
        rightAnswer: 0
    },
    {
        question: 'Спецификация MРR l устанавливает нормы в основном для магнитных полей и определяет уровень излучения в полосе частот',
        options: [
            'от 3 до 450 кГц',
            'от 1 до 400 кГц',
            'от 50 до 478 кГц',
            'от 100 до 200 кГц',
            'от 10 до 600 кГц',
        ],
        rightAnswer: 1
    },
    {
        question: 'Логический 0 (SPACE) представляется положительным напряжением в диапазоне',
        options: [
            'от +4 до +33 В',
            'от -3 до +26 В',
            '-3 до -25 В.',
            'от +4 до +25 В',
            'от +3 до +25 В ',
        ],
        rightAnswer: 4
    },
    {
        question: 'В современных RISC-архитектурах используются достаточно простые методы адресации, позволяющие резко упростить',
        options: [
            'Методы адресации',
            'Проверку ошибок',
            'Увеличение тактовой частоты',
            'Декодирование команд. ',
            'Вычисление эффективного адреса',
        ],
        rightAnswer: 3
    },
    {
        question: 'Прямой ход луча по вертикали осуществляется',
        options: [
            'сигналом кадровой развертки.',
            'операционной системой',
            'сигналом строчной развертки',
            'степенью точности воспроизведения',
            'диагональю экрана',
        ],
        rightAnswer: 2
    },
    {
        question: 'Для адресации ко всем ячейкам адресного пространства в 1 мегабайт необходимы',
        options: [
            '20-разрядные сегментные регистры ',
            '28-разрядные сегментные регистры',
            '68-разрядные сегментные регистры',
            '64-разрядные сегментные регистры',
            '32-разрядные сегментные регистры',
        ],
        rightAnswer: 0
    },
    {
        question: 'Современные процессоры допускают внешнее подключение большего числа линий данных: процессор 80286 –',
        options: [
            '64 линий данных',
            '128 линий данных',
            '256 линий данных',
            '32 линий данных',
            '16 линий данных',
        ],
        rightAnswer: 4
    },
    {
        question: 'Чаще всего для представления работы конвейера, используются',
        options: [
            'проверка оборудования',
            'временные диаграммы ',
            'совмещение операций',
            'анализ объектов',
            'синхронизация времени',
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
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
        question: 'Подача части энергии сигнала с выхода усилителя на его вход называется',
        options: [
            'Фазированием сигнала',
            'Индицированием сигнала.',
            'Обратной связью.',
            'Петлевой синхронизацией.',
            'Частотным смешением сигнала.',
        ],
        rightAnswer: 2
    },
    {
        question: 'При совпадении фаз выходного сигнала и сигнала с выхода цепи обратной связи усилителя обратная связь называется.',
        options: [
            'Непосредственной',
            'Последовательной ',
            'Отрицательной ',
            'Положительной ',
            'Гармоничной ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Если противоположны фазы входного сигнала усилителя и сигнала с выхода цепи обратной связи, то обратную связь называют',
        options: [
            'Отрицательной ',
            'Положительной',
            'Разделительной ',
            'Негармоничной',
            'Противофазной',
        ],
        rightAnswer: 0
    },
    {
        question: 'В усилителях для улучшения их параметров широко применяют обратную связь',
        options: [
            'Положительную ',
            'Отрицательную',
            'Промежуточную ',
            'Синусоидальную',
            'Экспоненциальную',
        ],
        rightAnswer: 1
    },
    {
        question: 'Полупроводниковый прибор, эквивалентный паре триодных тиристоров, включенных встречно-параллельно, и пропускающий ток в открытом состоянии как в прямом, так и в обратном направлениях, это:',
        options: [
            'Оптрон',
            'Динистор',
            'Симитричный варистор ',
            'Квантор',
            'Симистор',
        ],
        rightAnswer: 4
    },
    {
        question: 'Полупроводниковый прибор, в котором при протекании прямого тока в результате рекомбинации электронов и дырок в зоне p-n-перехода возникает видимое или инфракрасное излучение, называется',
        options: [
            'Фотоумножителем',
            'Фотоэлектроном',
            'Фотодиодом',
            'Светодиодом',
            'Оптроном',
        ],
        rightAnswer: 3
    },
    {
        question: 'Полупроводниковый прибор, в котором в результате освещения p-n-перехода увеличивается обратный ток, это',
        options: [
            'Фоторезистор ',
            'Фототранзистор',
            'Фотодиод ',
            'Светодиод ',
            'Фотоэлемент',
        ],
        rightAnswer: 2
    },
    {
        question: 'Полупроводниковый прибор, при освещении которого увеличивается его проводимость, это:',
        options: [
            'Фоторезистор',
            'Фотодиод',
            'Светодиод',
            'Фототриггер',
            'Фототранзистор',
        ],
        rightAnswer: 0
    },
    {
        question: 'Фототиристор',
        options: [
            'Усиливает фототок',
            'Фотографирует изображение',
            'Включается импульсом тока управляющего электрода и выключается световым импульсом',
            'Выключается световым импульсом',
            'Включается световым импульсом',
        ],
        rightAnswer: 4
    },
    {
        question: 'Устройство предназначенное для преобразования переменного напряжения в постоянное, это',
        options: [
            'Стабилитрон',
            'Выпрямитель ',
            'Вентиль',
            'Стабистор',
            'Трансформатор',
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
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
        question: 'Счетчик-это',
        options: [
            'Устройство, имеющее два устойчивых состояния и способное скачком переходить из одного состояния в другое под действием входных сигналов.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, предназначенное для подсчета числа входных импульсов.',
            'Устройство, предназначенное для сравнения двух напряжений.',
            'Устройство, подключающее на выход тот информационный вход, номер которого задан двоичным кодом адреса.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Регистр-это',
        options: [
            'Устройство, предназначенное для подсчета числа входных импульсов.',
            'Устройство, подключающее на выход тот информационный вход, номер которого задан двоичным кодом адреса.',
            'Устройство, предназначенное для сравнения двух напряжений.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, имеющее два устойчивых состояния и способное скачком переходить из одного состояния в другое под действием входных сигналов.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Варистор-это',
        options: [
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения.',
            'Полупроводниковый прибор, имеющий падающий участок вольтамперной характеристики.',
            'Полупроводниковый диод, напряжение на котором при обратном включении слабо зависит от тока.',
            'Полупроводниковый диод, напряжение на котором при прямом включении слабо зависит от тока.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Фоторезистор-это',
        options: [
            'Полупроводниковый прибор, в котором в результате освещения p-n-перехода увеличивается обратный ток.',
            'Полупроводниковый прибор, при освещении которого увеличивается его проводимость.',
            'Полупроводниковый прибор, обладающий односторонней электропроводимостью и предназначенный для преобразования переменного тока в постоянный ',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности',
            'Полупроводниковый прибор, напряжение на котором при обратном включении слабо   зависит от тока.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Оптрон-это',
        options: [
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения.',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
            'Полупроводниковый прибор, обладающий односторонней электропроводимостью и предназначенный для преобразования переменного тока в постоянный ',
            'Полупроводниковый прибор, в котором в результате освещения p-n-перехода увеличивается обратный ток.',
            'Полупроводниковый прибор, содержащий в одном корпусе источник и приёмник светового излучения.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Триггер-это',
        options: [
            'Устройство, подключающее на выход тот информационный вход, номер которого задан двоичным кодом адреса.',
            'Устройство, предназначенное для сравнения двух напряжений.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, имеющее два устойчивых состояния и способное скачком переходить из одного состояния в другое под действием входных сигналов.',
            'Устройство, предназначенное для подсчета числа входных импульсов.',
        ],
        rightAnswer: 3
    },
    {
        question: 'В режиме класса A',
        options: [
            'Каскад усиления мощности имеет максимальное значение коэффициента нелинейных искажений и минимальные значения КПД и выходной мощности.',
            'Каскад усиления мощности имеет минимальное значение коэффициента нелинейных искажений и максимальные значения КПД и выходной мощности.',
            'Каскад усиления мощности имеет минимальные значения коэффициента нелинейных искажений, КПД и выходной мощности',
            'Каскад усиления мощности имеет максимальные значения коэффициента нелинейных искажений, КПД и выходной мощности.',
            'Каскад усиления мощности имеет промежуточные значения коэффициента нелинейных искажений, КПД и выходной мощности.',
        ],
        rightAnswer: 2
    },
    {
        question: 'В режиме класса В',
        options: [
            'Каскад усиления мощности имеет максимальные значения коэффициента нелинейных искажений, КПД и выходной мощности.',
            'Каскад усиления мощности имеет минимальные значения коэффициента нелинейных искажений, КПД и выходной мощности.',
            'Каскад усиления мощности имеет промежуточные значения коэффициента нелинейных искажений, КПД и выходной мощности.',
            'Каскад усиления мощности имеет минимальное значение коэффициента нелинейных искажений и максимальные значения КПД и выходной мощности.',
            'Каскад усиления мощности имеет максимальное значение коэффициента нелинейных  искажений и минимальные значения КПД и выходной мощности.',
        ],
        rightAnswer: 0
    },
    {
        question: 'В режиме класса AВ',
        options: [
            'Каскад усиления мощности имеет максимальное значение коэффициента нелинейных искажений и минимальные значения КПД и выходной мощности.',
            'Каскад усиления мощности имеет минимальное значение коэффициента нелинейных искажений и максимальные значения КПД и выходной мощности.',
            'Каскад усиления мощности имеет минимальные значения коэффициента нелинейных искажений, КПД и выходной мощности.',
            'Каскад усиления мощности имеет максимальные значения коэффициента нелинейных искажений, КПД и выходной мощности.',
            'Каскад усиления мощности имеет промежуточные значения коэффициента нелинейных искажений, КПД и выходной мощности.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Аналоговый компаратор-это',
        options: [
            'Устройство, предназначенное для подсчета числа входных импульсов.',
            'Устройство, предназначенное для сравнения двух напряжений.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, имеющее два устойчивых состояния и способное скачком переходить из одного состояния в другое под действием входных сигналов.',
            'Устройство, подключающее на выход тот информационный вход, номер которого задан двоичным кодом адреса.',
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
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
        question: 'Тиристор-это',
        options: [
            'Полупроводниковый прибор, напряжение на котором при обратном включении слабо зависит от тока.',
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения.',
            'Полупроводниковый прибор с двумя устойчивыми состояниями электропроводимости имеющий три или более p-n-перехода.',
            'Полупроводниковый прибор, обладающий односторонней электропроводимостью и предназначенный для преобразования переменного тока в постоянный ',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Светодиод-это',
        options: [
            'Полупроводниковый диод, напряжение на котором при прямом включении слабо зависит от тока',
            'Полупроводниковый диод, напряжение на котором при обратном включении слабо зависит от тока.',
            'Полупроводниковый прибор, имеющий падающий участок вольтамперной характеристики.',
            'Полупроводниковый прибор, в котором при протекании прямого тока в результате рекомбинации электронов и дырок в зоне p-n-перехода возникает видимое или инфракрасное излучение.',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Фотодиод-это',
        options: [
            'Полупроводниковый прибор, в котором в результате освещения p-n-перехода увеличивается обратный ток.',
            'Полупроводниковый прибор, обладающий односторонней электропроводимостью и предназначенный для преобразования переменного тока в постоянный ',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения.',
            'Полупроводниковый прибор, напряжение на котором при обратном включении слабо зависит от тока.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Фототиристор-это',
        options: [
            'Устройство, которое суммирует текущие значения напряжений  входных сигналов, взятые с противоположным знаком и умноженные на постоянные коэффициенты.',
            'Устройство, которое включается световым импульсом.',
            'Устройство, подключающее информационный вход на тот выход, номер которого задан двоичным кодом адреса.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, предназначенное для сравнения двух напряжений.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Выпрямитель-это',
        options: [
            'Устройство, предназначенное для сравнения двух напряжений.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, которое суммирует текущие значения напряжений  входных сигналов, взятые с противоположным знаком и умноженные на постоянные коэффициенты.',
            'Устройство, которое включается световым импульсом.',
            'Устройство, предназначенное для преобразования переменного напряжения в постоянное',
        ],
        rightAnswer: 4
    },
    {
        question: 'Биполярный транзистор-это',
        options: [
            'Полупроводниковый прибор, напряжение на котором при обратном включении слабо зависит от тока.',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
            'Полупроводниковый прибор, обладающий односторонней электропроводимостью и предназначенный для преобразования переменного тока в постоянный ',
            'Полупроводниковый прибор с двумя p-n переходами, имеющий три вывода, использующий носители заряда обоих знаков,  в котором управление выходным током осуществляется входным током',
            'Полупроводниковый прибор с двумя устойчивыми состояниями электропроводимости имеющий три или более p-n-перехода.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Униполярный транзистор-это',
        options: [
            'Полупроводниковый прибор с двумя устойчивыми состояниями электропроводимости имеющий три или более p-n-перехода.',
            'Полупроводниковый прибор с двумя p-n переходами, имеющий три вывода, использующий носители заряда обоих знаков,  в котором управление выходным током осуществляется входным током',
            'Полупроводниковый прибор, имеющий три вывода, в котором управление выходным током осуществляется электрическим полем, а в процессе протекания тока участвуют носители заряда одного знака',
            'Полупроводниковый прибор, обладающий односторонней электропроводимостью и предназначенный для преобразования переменного тока в постоянный ',
            'Полупроводниковый прибор, напряжение на котором при обратном включении слабо зависит от тока',
        ],
        rightAnswer: 2
    },
    {
        question: 'Амплитудно - частотная характеристика-это',
        options: [
            'Зависимость коэффициента усиления усилителя от частоты входного синусоидального  сигнала.',
            'Зависимость амплитуды выходного сигнала усилителя от амплитуды входного сигнала.',
            'Зависимость амплитуды входного сигнала усилителя от амплитуды выходного сигнала.',
            'Зависимость амплитуды выходного сигнала усилителя  от частоты входного синусоидального  сигнала.',
            'Зависимость амплитуды входного сигнала усилителя  от частоты выходного синусоидального  сигнала.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Амплитудная характеристика-это',
        options: [
            'Зависимость амплитуды входного сигнала усилителя  от частоты выходного синусоидального  сигнала.',
            'Зависимость амплитуды выходного сигнала усилителя  от частоты входного синусоидального  сигнала.',
            'Зависимость амплитуды входного сигнала усилителя от амплитуды выходного сигнала.',
            'Зависимость коэффициента усиления усилителя от частоты входного синусоидального  сигнала.',
            'Зависимость амплитуды выходного сигнала усилителя от амплитуды входного сигнала.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Зависимость тока коллектора  от напряжения коллектор – эмиттер при фиксированном токе базы - это',
        options: [
            'Входная характеристика биполярного транзистора, включенного по схеме с общим эмиттером.',
            'Выходная характеристика биполярного транзистора, включенного по схеме с общим эмиттером.',
            'Переходная характеристика биполярного транзистора, включенного по схеме с общим эмиттером',
            'Выходная характеристика биполярного транзистора, включенного по схеме с общей базой',
            'Входная характеристика биполярного транзистора, включенного по схеме с общей базой.',
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
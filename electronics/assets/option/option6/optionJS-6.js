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
        question: 'Назначение сглаживающего фильтра выпрямителя:',
        options: [
            'Увеличить частоту пульсаций',
            'Увеличить коэффициент пульсаций',
            'Уменьшить коэффициент пульсаций',
            'Уменьшить частоту пульсаций',
            'Уменьшить нагрузку на выпрямитель',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основные недостатки двухполупериодного выпрямителя со средней точкой:',
        options: [
            'Повышенное падение напряжения на диодной схеме и необходимость изоляции диодов от радиатора',
            'Малый коэффициент усиления и низкая мощность',
            'Большой коэффициент усиления и низкая мощность',
            'Повышенное обратное напряжение на диодах и потребность в дополнительной обмотке трансформатора',
            'Высокая частота пульсаций и большой коэффициент пульсаций',
        ],
        rightAnswer: 3
    },
    {
        question: 'Основные недостатки мостового выпрямителя:',
        options: [
            'Повышенное падение напряжения на диодной схеме и необходимость изоляции диодов от радиатора',
            'Высокая частота пульсаций и большой коэффициент пульсаций',
            'Повышенное обратное напряжение на диодах и потребность в дополнительной обмотке трансформатора ',
            'Малый коэффициент усиления и низкая мощность',
            'Низкий коэффициент пульсаций, низкая частота пульсаций',
        ],
        rightAnswer: 0
    },
    {
        question: 'Основные достоинства мостового выпрямителя:',
        options: [
            'Низкий коэффициент пульсаций, низкая частота пульсаций, низкое обратное напряжение на диодах',
            'Низкий коэффициент пульсаций, высокая частота пульсаций, низкое обратное напряжение на диодах',
            'Высокий коэффициент пульсаций и удвоенная мощность в нагрузке',
            'Большой коэффициент усиления и большая мощность в нагрузке',
            'Высокие температурная стабильность и коэффициент пульсаций',
        ],
        rightAnswer: 1
    },
    {
        question: 'Варикап-это',
        options: [
            'Полупроводниковый диод, напряжение на котором при прямом включении слабо зависит от тока',
            'Полупроводниковый диод, напряжение на котором при обратном включении слабо зависит от тока.',
            'Полупроводниковый прибор, имеющий падающий участок вольтамперной характеристики.',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличение приложенного напряжения любой полярности',
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Туннельный диод-это',
        options: [
            'Полупроводниковый диод, напряжение на котором при прямом включении слабо зависит от тока',
            'Полупроводниковый диод, напряжение на котором при обратном включении слабо зависит от тока.',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
            'Полупроводниковый прибор, имеющий падающий участок вольтамперной Характеристики',
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Стабилитрон-это',
        options: [
            'Полупроводниковый прибор, имеющий падающий участок вольтамперной Характеристики',
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения.',
            'Полупроводниковый диод, напряжение на котором при обратном включении слабо зависит от тока.',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
            'Полупроводниковый диод, напряжение на котором при прямом включении слабо зависит от тока.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Стабистор-это',
        options: [
            'Полупроводниковый диод, напряжение на котором при прямом включении слабо зависит от тока.',
            'Полупроводниковый диод, напряжение на котором при обратном включении слабо зависит от тока.',
            'Полупроводниковый прибор, имеющий падающий участок вольтамперной Характеристики',
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения',
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Диод-это',
        options: [
            'e)	Полупроводниковый прибор, напряжение на котором при обратном включении слабо зависит от тока.',
            'd)	Полупроводниковый прибор, имеющий падающий участок вольтамперной характеристики.',
            'c)	Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения.',
            'b)	Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности',
            'a)	Полупроводниковый прибор с одним p-n переходом и двумя выводами',
        ],
        rightAnswer: 4
    },
    {
        question: 'Выпрямительный диод-это',
        options: [
            'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности.',
            'Полупроводниковый прибор, обладающий односторонней электропроводимостью и предназначенный для преобразования переменного тока в постоянный ',
            'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения',
            'Полупроводниковый прибор, имеющий падающий участок вольтамперной характеристики.',
            'Полупроводниковый прибор, напряжение на котором при обратном включении слабо зависит от тока.',
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
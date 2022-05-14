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
        question: 'Триодный тиристор переключается из закрытого состояния в открытое',
        options: [
            'Подачей 1 на затвор.',
            'Подачей 0 на затвор',
            'Импульсом тока управляющего электрода заданной амплитуды.',
            'Подачей 1 на вход установки в 1.',
            'Подачей 0 на вход установки в 1.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ток включения триодного тиристора, протекающий через управляющий электрод',
        options: [
            'Зависит от тока эмиттера.',
            'Зависит от напряжения исток-сток',
            'Определяется током анода',
            'Зависит от напряжения анод-катод.',
            'Не зависит от напряжения анод-катод.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Тиристор выключается',
        options: [
            'Подачей отрицательного напряжения анод-катод, либо прерыванием тока анода',
            'Подачей 1 на затвор.',
            'Подачей 0 на затвор.',
            'Подачей 1 на вход установки в 0.',
            'Подачей 0 на вход установки в 0.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Полевой транзистор, затвор которого электрически отделен от канала закрытым p-n- переходом, это:',
        options: [
            'Полевой транзистор с изолированным затвором.',
            'Полевой транзистор с управляющим переходом',
            'МДП - транзистор.',
            'МОП - транзистор.',
            'Отделенный транзистор.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Электроды полевого транзистора это:',
        options: [
            'Эмиттер, коллектор, затвор.',
            'Исток, сток, база.',
            'Анод, катод, управляющий электрод.',
            'Эмиттер, база, коллектор.',
            'Исток, сток, затвор.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Электроды биполярного транзистора это:',
        options: [
            'Эмиттер, коллектор, затвор.',
            'Анод, катод, управляющий электрод.',
            'Исток, сток, база.',
            'Эмиттер, база, коллектор. ',
            'Исток, сток, затвор.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Электроды тринистора это:',
        options: [
            'Исток, сток, база.',
            'Эмиттер, коллектор, затвор.',
            'Анод, катод, управляющий электрод.',
            'Эмиттер, база, коллектор. ',
            'Исток, сток, затвор.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Полевой транзистор, затвор которого электрически отделен от канала слоем диэлектрика, это:',
        options: [
            'МДП – транзистор.',
            'Полевой транзистор с управляющим переходом.',
            'Полевой диэлектрический транзистор.',
            'Однооперационный транзистор.',
            'Двухоперационный транзистор.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Полевой транзистор, затвор которого электрически отделен от канала слоем оксида кремния, это:',
        options: [
            'Двухпереходный транзистор.',
            'Однопереходный транзистор.',
            'Оксидный транзистор.',
            'Кремниевый биполярный транзистор.',
            'МОП – транзистор.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Полупроводниковый прибор, содержащий источник и приёмник излучения, объединенные в одном корпусе, это:',
        options: [
            'Сканистор',
            'Оптрон',
            'Лазер ',
            'Фототранзистор',
            'Фотоумножитель',
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
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
        question: 'Зависимость тока базы от напряжения база- эмиттер при фиксированном напряжении коллектор -эмиттер – это',
        options: [
            'Переходная характеристика биполярного транзистора, включенного по схеме с общим эмиттером.',
            'Выходная характеристика биполярного транзистора, включенного по схеме с общим эмиттером.',
            'Входная характеристика биполярного транзистора, включенного по схеме с общим эмиттером.',
            'Выходная характеристика биполярного транзистора, включенного по схеме с общей базой.',
            'Входная характеристика биполярного транзистора, включенного по схеме с общей базой.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Электроды биполярного транзистора называются',
        options: [
            'База, сток, подложка.',
            'Анод, катод, управляющий электрод.',
            'База, коллектор, эмиттер.',
            'Исток, сток, затвор.',
            'Затвор, коллектор, эмиттер.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Электроды униполярного транзистора называются',
        options: [
            'Исток, сток, затвор.',
            'База, коллектор, эмиттер.',
            'Анод, катод, управляющий электрод.',
            'База, сток, подложка.',
            'Затвор, коллектор, эмиттер.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Электроды тиристора называются',
        options: [
            'Исток, сток, затвор.',
            'Анод, катод, управляющий электрод.',
            'База, коллектор, эмиттер.',
            'База, сток, подложка.',
            'Затвор, коллектор, эмиттер.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Электроды динистора называются',
        options: [
            'Коллектор, эмиттер.',
            'База, коллектор.',
            'Исток, сток, затвор.',
            'Анод, катод, управляющий электрод.',
            'Анод, катод.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Результат логических операций ' + '<img src="onequest.png">' + 'равен',
        options: [
            '<img src="ansxscore.png">',
            'X',
            '2 X',  
            '1',
            '0',
        ],
        rightAnswer: 3
    },
    {
        question: 'Результат логических операций ' + '<img src="twoquest.png">' + 'равен',
        options: [
            'X',
            '1',
            '0',
            '2 X',
            '<img src="ansxscore.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Результат логических операций ' + '<img src="threequest.png">' + 'равен',
        options: [
            '1',
            '0',
            'X',
            '<img src="ansxscore.png">',
            '2 X',
        ],
        rightAnswer: 0
    },
    {
        question: 'Устройство, предназначенное для подсчета числа входных импульсов, это:',
        options: [
            'Мультиплексор.',
            'Регистр.',
            'Сумматор. ',
            'Импульсный анализатор. ',
            'Счетчик. ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Счетчик, способный выполнять суммирование и вычитание числа входных импульсов, называется:',
        options: [
            'Последовательным.',
            'Реверсивным. ',
            'Параллельным. ',
            'Асинхронным.',
            'Независимым.',
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

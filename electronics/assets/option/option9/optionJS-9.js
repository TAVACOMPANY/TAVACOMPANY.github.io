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
        question: 'Модуль счета счетчика это:',
        options: [
            'Число зарядов счетчика. ',
            'Абсолютная величина входного сигнала.',
            'Максимальное число импульсов, которое может быть подсчитано счетчиком.',
            'Наибольшая частота входных импульсов.',
            'Предельная скважность входных импульсов.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Устройство, предназначенное для приёма, хранения и передачи двоичного слова, это:',
        options: [
            'Преобразователь кодов.',
            'Коммутатор.',
            'Фиксатор.',
            'Регистр. ',
            'Компаратор.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Инверсия логического сложения ' + '<img src="questeight.png">' + 'равна:',
        options: [
            '<img src="ansa.png">',
            '<img src="ansb.png">',
            '<img src="ansc.png">',
            '<img src="ansd.png">',
            '<img src="anse.png">',
        ],
        rightAnswer: 0
    },
    {
        question: 'Инверсия логического умножения ' + '<img src="devat.png">' + 'равна:',
        options: [
            '<img src="ansa.png">',
            '<img src="ansd.png">',
            '<img src="ansb.png">',
            '<img src="ansc.png">',
            '<img src="anse.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Логическое умножение ' + '<img src="questten.png">' + 'равно:',
        options: [
            '<img src="otvetxund.png">',
            '<img src="otvetxpow.png">',
            '1',
            '0',
            'X',
        ],
        rightAnswer: 4
    },
    {
        question: 'Логическое сложение ' + '<img src="questeleven.png">' + 'равно:',
        options: [
            '1',
            '0',
            '<img src="otvetxund.png">',
            'X',
            '<img src="otvetxpow.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Двойное отрицание ' + '<img src="questtwelve.png">' + 'равно:',
        options: [
            '<img src="otvetxund.png">',
            '<img src="otvetxpow.png">',
            'X',
            '0',
            '1',
        ],
        rightAnswer: 2
    },
    {
        question: 'Устройство, имеющее два устойчивых состояния и способное скачком переходить из         одного состояния в другое под действием входных сигналов, это:',
        options: [
            'триггер.',
            'резистор.',
            'мультиплексор.',
            'коммутатор.',
            'генератор.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Усилительный каскад с общим коллектором имеет',
        options: [
            'Входные и выходные сопротивления, зависящие от сопротивления источника питания.',
            'Малые входное и выходное сопротивления.',
            'Большие входное и выходное сопротивления.',
            'Большое выходное и малое входное сопротивления.',
            'Большое входное и малое выходное сопротивления.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какой каскад усиления мощности имеет минимальные значения коэффициента нелинейных искажений, КПД и выходной мощности?',
        options: [
            'В режиме класса B.',
            'В режиме класса A.',
            'В режиме класса D.',
            'В режиме класса  E.',
            'В режиме класса  AB.',
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
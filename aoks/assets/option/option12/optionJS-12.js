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
        question: 'Мониторы с низким уровнем излучения',
        options: [
            'LM-мониторы',
            'LS-мониторы',
            'LR-мониторы ',
            'HDR-мониторы',
            'HR-мониторы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Для обращения к ячейке памяти процессор прежде всего должен вычислить _____________адрес памяти, который определяется заданным в команде методом адресации.',
        options: [
            'Индексированный',
            'Первый',
            'Масштабированный',
            'Эффективный',
            'Базовый',
        ],
        rightAnswer: 3
    },
    {
        question: 'Принцип действия монитора обусловливает важность следующих параметров: частота вертикальной развертки, частота горизонтальной развертки и',
        options: [
            'расстояние между точками',
            'электроники жесткого диска',
            'величины намагниченности',
            'степень точности воспроизведения',
            'диагональю экрана',
        ],
        rightAnswer: 0
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик монитора Sony CPD-E100 0,25 15” 1280x1024 65Hz TCO’99, где производителем является фирма',
        options: [
            'IBM',
            'SONY',
            'HDD',
            'Rpm',
            'IDE',
        ],
        rightAnswer: 1
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD Seagate 20.4 GB IDE 7200 rpm, определите скорость вращения.',
        options: [
            '30 об/мин',
            '72 об/мин',
            '30.7 об/мин',
            '1024 об/мин',
            '7200 об/мин ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Определить адрес памяти, заданный как 0001:00F0h в микропроцессоре 8086',
        options: [
            '00F0h',
            '01100h.',
            '03F0h.',
            '00100h.',
            '00110h.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Концентрическое кольцо на поверхности магнитного диска, на которое записываются данные.',
        options: [
            'Дискета',
            'Сектор',
            'Дорожка',
            'Дисковод',
            'SDD',
        ],
        rightAnswer: 2
    },
    {
        question: 'Описание данного интерфейса было опубликовано американской промышленной ассоциацией еще в 1969 году.',
        options: [
            'RS-232C',
            'RS-16450',
            'RS-8250',
            'RS-23 RXD',
            'RS-2400C',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укажите формулу для определения производительности шины.',
        options: [
            'P = (n*8) * f',
            'P = (n+8) * f ',
            'P = (n-8) / f',
            'P = (n*8) / f',
            ' P = (n/8) * f',
        ],
        rightAnswer: 4
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик монитора: ViewSonic E50 0,28 15” 1024x768 60Hz MPR ΙΙ. ., где частота регенерации равна:',
        options: [
            '0,24 Гц',
            '60 Гц ',
            '0,34 Гц',
            '774 Гц',
            '17 Гц',
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
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
        question: 'Скорость передачи с учетом необходимости передачи служебной информации',
        options: [
            'Номинальная скорость передачи',
            'Последовательная скорость',
            'Эффективная (реальная) скорость ',
            'Абсолютная скорость передачи',
            'Относительная скорость передачи',
        ],
        rightAnswer: 2
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик монитора LG 774FT 0,24 17” 1280x1024 60Hz TCO’95., где частота регенерации равна:',
        options: [
            '0,34 Гц',
            '0,24 Гц',
            '774 Гц',
            '60 Гц',
            '17 Гц',
        ],
        rightAnswer: 3
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик монитора Sony CPD-E100 0,25 15” 1280x1024 65Hz TCO’99., где частота регенерации равна:',
        options: [
            '65 Гц ',
            '100 Гц',
            '15 Гц',
            '0,25 Гц',
            '99 Гц',
        ],
        rightAnswer: 0
    },
    {
        question: 'Рассчитайте объем жесткого диска, если количество цилиндров С=1011, головок Н=15, секторов на дорожке S=22, размер сектора В=512 В.',
        options: [
            '≈ 212 МВ',
            '≈ 170 МВ',
            '≈ 387МВ',
            '≈ 275 МВ ',
            '≈ 427 МВ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Эффективный адрес вычисляется по формуле:',
        options: [
            'EA = Base –(Index + Scale)',
            'EA = Base + Index + Scale * Disp',
            'EA = Base * Index -Scale',
            'EA = (Base *Index) + (Scale * Disp)',
            'EA = Base + Index + Scale + Disp ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Время доступа при записи определяется по формуле',
        options: [
            'tобр_с = tдост_с * tсчит + tрег',
            'tобр_с = tдост_с * tсчит - tрег',
            'tобр_с = tдост_с - tсчит - tрег',
            'tобр_з = tдост_з + tподг + tзап ',
            'tобр_з = tдост_з / tподг + tзап',
        ],
        rightAnswer: 3
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик монитора LG 774FT 0,24 17” 1280x1024 60Hz TCO’95., где диагональ экрана равна:',
        options: [
            '0,24 дюймов',
            '60 дюймов',
            '17 дюймов ',
            '774 дюймов',
            '0,34 дюймов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD Seagate 20.4 GB IDE 7200 rpm, определите тип интерфейса',
        options: [
            'IDE',
            'HDD',
            'Rpm',
            'GB',
            'IBM',
        ],
        rightAnswer: 0
    },
    {
        question: 'Вычислите эффективный адрес при базово-индексной адресации со смещением, если база Base = 1Е00h, индекс Index = 0002h, смещение Disp = 0100h.',
        options: [
            '0D27h',
            '2020h',
            '1302h',
            '0602h.',
            '1F02h ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сколько режимов адресации предусматривает система команд 32-разрядных процессоров',
        options: [
            '13 режимов адресации',
            '11 режимов адресации',
            '12 режимов адресации',
            '15 режимов адресации',
            '16 режимов адресации',
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
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
        question: 'Сколько режимов адресации предусматривает система команд 32-разрядных процессоров',
        options: [
            '13 режимов адресации',
            '15 режимов адресации',
            '11 режимов адресации ',
            '12 режимов адресации',
            '16 режимов адресации',
        ],
        rightAnswer: 2
    },
    {
        question: 'Время доступа к памяти при считывании определяется по формуле',
        options: [
            'tобр_с = tдост_с - tсчит - tрег',
            'tобр_с = tдост_с * tсчит - tрег',
            'tобр_с = tдост_с * tсчит + tрег',
            'tобр_с = tдост_с + tсчит + tрег ',
            'tобр_с = tдост_с / tсчит + tрег',
        ],
        rightAnswer: 3
    },
    {
        question: 'На что указывает регистр CS',
        options: [
            'код программы',
            'данные',
            'адрес программ',
            'стек',
            'дополнительный сегмент данных',
        ],
        rightAnswer: 0
    },
    {
        question: 'Символы кода ASCII представляются',
        options: [
            '9 битами',
            '7 битами',
            '15 битами',
            '11 битами ',
            '13 битами',
        ],
        rightAnswer: 1
    },
    {
        question: 'Вариант DRАМ, разработанный фирмой MoSys, организован. в виде множества независимых банков объемом по 32 Кб каждый, работающих в конвейерном режиме и использующих распараллеливание операций доступа к данным между большим количеством банков памяти RDRАМ',
        options: [
            'Rambus DRAM',
            'SGRAM',
            'VRAM',
            'ЕDО RAM',
            'Multibank DRAM',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какая процедура позволяет считывать и устанавливать паспортные параметры накопителя',
        options: [
            'Autofound',
            'Autorun',
            'Autoopen',
            'Autodetect',
            'Automode',
        ],
        rightAnswer: 3
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD Fujitsu 10.2 GB IDE 5400 rpm. определите тип интерфейса',
        options: [
            'GB',
            'HDD',
            'IDE',
            'Rpm',
            'IBM',
        ],
        rightAnswer: 2
    },
    {
        question: 'Это технология самоконтроля диска, и содержание ее заключается в том, что на основные компоненты (двигатели, головки, поверхности и т.д.) крепятся датчики. Информацию от датчиков постоянно обрабатывают, процедуры из firmwаrе-диска.',
        options: [
            'SMART',
            'LOAD',
            'BRAKE',
            'Quantum',
            'MTBF',
        ],
        rightAnswer: 0
    },
    {
        question: 'Скорость передачи данных, определяемая количеством элементов двоичной информации, передаваемых за 1 секунду',
        options: [
            'Абсолютная скорость передачи',
            'Относительная скорость передачи',
            'Последовательная скорость',
            'Эффективная (реальная) скорость ',
            'Номинальная скорость передачи',
        ],
        rightAnswer: 4
    },
    {
        question: 'Промежуток времени между моментом начала операции считывания и моментом, когда становится возможным доступ к данной единице информации',
        options: [
            'tзап',
            'tдост_с ',
            'tрег',
            'tдост_з',
            'tсчит',
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
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
        question: 'Винчестер строится обычно на основе',
        options: [
            '2-4 пластин',
            '2-8 пластин',
            '1-4 пластин',
            '1-8 пластин',
            '1-8 пластин',
        ],
        rightAnswer: 2
    },
    {
        question: 'На поверхности дисков в результате записи информации образуются намагниченные участки в форме концентрических окружностей. Они называются',
        options: [
            'накопителем',
            'цилиндром',
            'секторами',
            'магнитными дорожками ',
            'окружностью',
        ],
        rightAnswer: 3
    },
    {
        question: 'Прямой ход луча по горизонтали осуществляется',
        options: [
            'сигналом строчной развертки',
            'операционной системой',
            'сигналом кадровой развертки.',
            'степенью точности воспроизведения',
            'диагональю экрана',
        ],
        rightAnswer: 0
    },
    {
        question: 'Пакет дисков, смонтированный на оси-шпинделе, приводится в движение специальным _____________, компактно расположенным под ним',
        options: [
            'Механизмом',
            'Двигателем ',
            'Сектором',
            'Накопителем',
            'Дисководом',
        ],
        rightAnswer: 1
    },
    {
        question: 'Определите частоту строк монитора при разрешении 800х600 точек, если частота регенерации изображения равна 75 Гц, а потери на синхронизацию составляют 10%.',
        options: [
            '62,7кГц',
            '57.8кГц',
            '61,4кГц ',
            '37,5кГц',
            '49,5 кГц',
        ],
        rightAnswer: 4
    },
    {
        question: 'Передачей информации по шине управляет процессор или специально выделенный для этого узел, называемый',
        options: [
            'схемой шины',
            'адресом шины',
            'частотой шины',
            'арбитром шины',
            'системой шины',
        ],
        rightAnswer: 3
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD Fujitsu 10.2 GB IDE 5400 rpm. определите скорость вращения',
        options: [
            '30 об/мин',
            '72 об/мин',
            '5400 об/мин ',
            '10,2 об/мин',
            '1024 об/мин',
        ],
        rightAnswer: 2
    },
    {
        question: 'Максимальный объем памяти, к которой можно адресоваться с помощью 16-битового смещения.',
        options: [
            '64 К ',
            '24 К',
            '16 К',
            '32 К',
            '48 К',
        ],
        rightAnswer: 0
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик монитора: Sony CPD-E100 0,25 15” 1280x1024 65Hz TCO’99. ., где величина «зерна»равна:',
        options: [
            '0,34 мм',
            '15 мм',
            '99 мм',
            '65 мм',
            '0,25 мм ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Время подготовки, расходуемое на приведение в исходное состояние запоминающих элементов для записи заданной единицы информации',
        options: [
            'tсчит',
            'tподг',
            'tзап',
            'tрег',
            'tдост_с',
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
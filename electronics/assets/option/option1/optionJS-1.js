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
        question: 'Полупроводниковый прибор, ёмкость которого зависит от приложенного напряжения, это:',
        options: [
            'Биполярный транзистор.',
            'Туннельный диод.',
            'Варикап.',
            'Варистор.',
            'Тензорезистор. ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Полупроводниковый прибор, имеющий падающий участок вольтамперной характеристики, это:',
        options: [
            'Биполярный транзистор.',
            'Варикап.',
            'Тензорезистор',
            'Туннельный диод.',
            'Варистор.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Полупроводниковый диод, напряжение на котором при обратном включении слабо зависит от тока, это:  ',
        options: [
            'Стабилитрон.',
            'Оптрон. ',
            'Динистор.',
            'Стабистор. ',
            'Варикап.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Полупроводниковый диод, напряжение на котором при прямом включении слабо зависит от тока, это:  ',
        options: [
            'Оптрон.',
            'Стабистор. ',
            'Динистор.',
            'Стабилитрон.',
            'Варикап.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какая схема включения биполярного транзистора дает наибольшее усиление сигнала по мощности?',
        options: [
            'Схема с общим стоком. ',
            'Схема с общим затвором.',
            'Схема с общим коллектором.',
            'Схема с общим базой.',
            'Схема с общим эмиттером.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Полупроводниковый прибор с двумя p-n переходами, имеющий три вывода, использующий носители заряда обоих знаков,  в котором управление выходным  током осуществляется входным током, это:',
        options: [
            'Двухоперационный транзистор.',
            'Однооперационный транзистор.',
            'Униполярный транзистор.',
            'Биполярный транзистор.',
            'Симистор.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Полупроводниковый прибор, имеющий три вывода, в котором управление выходным током осуществляется электрическим полем, а в процессе протекания тока участвуют носители заряда одного знака, это:',
        options: [
            'Двухоперационный транзистор.',
            'Однооперационный транзистор',
            'Униполярный транзистор.',
            'Симистор.',
            'Биполярный транзистор.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Укажите состояния p-n переходов биполярного транзистора, работающего в усилительном однотактном каскаде:',
        options: [
            'Эмиттерный переход - открыт, коллекторный – закрыт.',
            'Эмиттерный переход - закрыт, коллекторный – открыт.',
            'Оба перехода открыты.',
            'Оба перехода закрыты.',
            'Оба перехода находятся в однотактном состоянии.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какая схема включения биполярного транзистора  имеет значение всех коэффициентов усиления (по току, по напряжению, по мощности) существенно большие единицы? ',
        options: [
            'Схема с общим катодам.',
            'Схема с общим анодам.',
            'Схема с общей базой.',
            'Схема с общим коллектором.',
            'Схема с общим эмиттером.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Зависимость коэффициента усиления усилителя от частоты входного синусоидального  сигнала это:',
        options: [
            'Фазо-частотная характеристика ',
            'Амплитудно - частотная характеристика',
            'Амплитудная характеристика',
            'Усилительная характеристика',
            'Синусоидальная характеристика',
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
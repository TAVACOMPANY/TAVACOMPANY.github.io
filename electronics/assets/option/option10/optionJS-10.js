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
        question: 'Какой каскад мощности имеет максимальные значения коэффициента нелинейных искажений, КПД и выходной мощности?',
        options: [
            'В режиме класса  AB.',
            'В режиме класса  E.',
            'В режиме класса B.',
            'В режиме класса A.',
            'В режиме класса D.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой каскад мощности имеет промежуточные значения коэффициента нелинейных искажений, КПД и выходной мощности?',
        options: [
            'В режиме класса  A.',
            'В режиме класса  E.',
            'В режиме класса D.',
            'В режиме класса AB.',
            'В режиме класса B.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Устройство, предназначенное для сравнения двух напряжений, это:',
        options: [
            'Аналоговый компаратор.',
            'Логический анализатор. ',
            'Оптрон.',
            'Электронный ключ.',
            'Дешифратор.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Устройство, подключающее на выход тот информационный вход, номер которого задан двоичным кодом адреса, это:',
        options: [
            'Демультиплексор.',
            'Мультиплексор.',
            'Дешифратор.',
            'Шифратор.',
            'Компаратор.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Устройство, подключающее информационный вход на тот выход, номер которого задан двоичным кодом адреса, это:',
        options: [
            'Логический анализатор.',
            'Дешифратор.',
            'Шифратор.',
            'Мультиплексор.',
            'Демультиплексор.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Комбинационное устройство, предназначенное для сложения двоичных чисел, это:',
        options: [
            'Мультиплексор.',
            'Неинвертирующий сумматор.',
            'Микропроцессор. ',
            'Цифровой сумматор. ',
            'Инвертирующий сумматор.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Комбинационное устройство, предназначенное для сравнения двух двоичных чисел, это:',
        options: [
            'Сумматор. ',
            'Логический анализатор. ',
            'Цифровой компаратор.',
            'Арифметическое устройство.',
            'Реверсивный регистр. ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Инвертирующий сумматор ',
        options: [
            'Суммирует значения входных сигналов, умноженные на постоянные коэффициенты.',
            'Выполняет логическую операцию ИЛИ-НЕ.',
            'Выполняет логическую операцию И-НЕ.',
            'Суммирует фазы входных сигналов.',
            'Суммирует частоты входных сигналов, умноженные на постоянные коэффициенты.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Операционный усилитель',
        options: [
            'Усиливает только переменную составляющую входного сигнала.',
            'Выполняет любые арифметические операции.',
            'Выполняет заданную логическую операцию.',
            'Усиливает разность только постоянных составляющих входных сигналов.',
            'Усиливает разность двух любых входных сигналов.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Транзисторный ключ.',
        options: [
            'По сигналу на прямом входе замыкает электрическую цепь, а по сигналу на инверсном входе - размыкает.',
            'Бесконтактно замыкает или размыкает электрическую цепь, всё время пока действует соответствующий входной сигнал.',
            'Положительным импульсом на входе переводится в проводящее состояние, а отрицательным – в непроводящее.',
            'Дешифрирует входной цифровой код.',
            'Переключает информационный поток на 1 из n направлений.',
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
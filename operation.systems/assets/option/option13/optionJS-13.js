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
        question: 'В состав любой операционной системы реального времени не входят программы',
        options: [
            'Контроля состояний задач и событий',
            'Управления кэш-памятью',
            'Управления системой прерываний',
            'Синхронизации задач',
            'Средства распределения памяти и управления ею',
        ],
        rightAnswer: 1
    },
    {
        question: 'Механизм прерываний реализуется',
        options: [
            'Дополнительными программными средствами',
            'Отдельными устройствами вычислительной системы',
            'Аппаратными средствами',
            'Аппаратно-программными средствами',
            'Основными программными средствами',
        ],
        rightAnswer: 3
    },
    {
        question: 'Первый шаг механизма обработки прерываний независимо от архитектуры вычислительной системы',
        options: [
            'Управление аппаратно передается на подпрограмму обработки прерывания',
            'Установление факта прерывания (прием сигнала запроса на прерывание) и идентификация прерывания',
            'Запоминание состояния прерванного процесса вычислений',
            'Собственно выполнение программы, связанной с обработкой прерывания',
            'Восстановление информации, относящейся к прерванному процессу',
        ],
        rightAnswer: 1
    },
    {
        question: 'Второй шаг механизма обработки прерываний независимо от архитектуры вычислительной системы',
        options: [
            'Восстановление информации, относящейся к прерванному процессу',
            'Собственно выполнение программы, связанной с обработкой прерывания',
            'Запоминание состояния прерванного процесса вычислений',
            'Установление факта прерывания (прием сигнала запроса на прерывание) и идентификация прерывания',
            'Управление аппаратно передается на подпрограмму обработки прерывания',
        ],
        rightAnswer: 2
    },
    {
        question: 'Третий шаг механизма обработки прерываний независимо от архитектуры вычислительной системы',
        options: [
            'Управление аппаратно передается на подпрограмму обработки прерывания',
            'Восстановление информации, относящейся к прерванному процессу',
            'Собственно выполнение программы, связанной с обработкой прерывания',
            'Установление факта прерывания (прием сигнала запроса на прерывание) и идентификация прерывания',
            'Запоминание состояния прерванного процесса вычислений',
        ],
        rightAnswer: 0
    },
    {
        question: 'Четвертый шаг механизма обработки прерываний независимо от архитектуры вычислительной системы',
        options: [
            'Собственно выполнение программы, связанной с обработкой прерывания',
            'Сохранение информации о прерванной программе, которую не удалось спасти на шаге 2 с помощью аппаратуры',
            'Восстановление информации, относящейся к прерванному процессу',
            'Управление аппаратно передается на подпрограмму обработки прерывания',
            'Установление факта прерывания (прием сигнала запроса на прерывание) и идентификация прерывания',
        ],
        rightAnswer: 1
    },
    {
        question: 'Пятый шаг механизма обработки прерываний независимо от архитектуры вычислительной системы',
        options: [
            'Восстановление информации, относящейся к прерванному процессу',
            'Управление аппаратно передается на подпрограмму обработки прерывания',
            'Установление факта прерывания (прием сигнала запроса на прерывание) и идентификация прерывания',
            'Сохранение информации о прерванной программе, которую не удалось спасти на шаге 2 с помощью аппаратуры',
            'Собственно выполнение программы, связанной с обработкой прерывания',
        ],
        rightAnswer: 4
    },
    {
        question: 'Пятый шаг механизма обработки прерываний независимо от архитектуры вычислительной системы',
        options: [
            'Сохранение информации о прерванной программе, которую не удалось спасти на шаге 2 с помощью аппаратуры',
            'Установление факта прерывания (прием сигнала запроса на прерывание) и идентификация прерывания',
            'Собственно выполнение программы, связанной с обработкой прерывания',
            'Управление аппаратно передается на подпрограмму обработки прерывания',
            'Восстановление информации, относящейся к прерванному процессу',
        ],
        rightAnswer: 2
    },
    {
        question: 'Программа, обеспечивающая взаимодействие операционной системы с физическим устройством',
        options: [
            'Прикладные программы',
            'Драйвер устройства',
            'Сетевые утилиты',
            'Базовая система ввода-вывода',
            'Система ввода-вывода',
        ],
        rightAnswer: 1
    },
    {
        question: 'Часть операционной системы, обеспечивающая управление внешними устройствами, подключенными к ЭВМ',
        options: [
            'Прикладные программы',
            'Сетевые утилиты',
            'Система ввода-вывода',
            'Базовая система ввода-вывода',
            'Драйвер устройства',
        ],
        rightAnswer: 2
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
    coratten();
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";   
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
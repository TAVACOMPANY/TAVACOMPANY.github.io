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
        question: 'Зависимость амплитуды выходного сигнала усилителя от амплитуды входного сигнала это: ',
        options: [
            'Амплитудно - частотная характеристика',
            'Фазо-частотная характеристика ',
            'Амплитудная характеристика',
            'Усилительная характеристика',
            'Синусоидальная характеристика',
        ],
        rightAnswer: 2
    },
    {
        question: 'Полупроводниковый прибор с одним p-n переходом и двумя выводами это:',
        options: [
            'Транзистор',
            'Тиристор',
            'Варистор',
            'Диод',
            'Динистор',
        ],
        rightAnswer: 3
    },
    {
        question: 'Полупроводниковый диод, обладающий односторонней электропроводимостью и предназначенный для преобразования переменного тока в постоянный это:',
        options: [
            'Выпрямительный диод',
            'Туннельный диод',
            'Односторонний диод',
            'Преобразовательный диод',
            'Переменный диод',
        ],
        rightAnswer: 0
    },
    {
        question: 'Выходная характеристика биполярного транзистора для схемы с общим эмиттером  это',
        options: [
            'Зависимость тока базы от напряжения база- эмиттер при фиксированном напряжении коллектор -эмиттер',
            'Зависимость тока коллектора  от напряжения коллектор –эмиттер при фиксированном токе базы',
            'Зависимость тока коллектора от тока базы при фиксированном напряжении коллектор -эмиттер',
            'Зависимость тока базы от напряжения коллектор –эмиттер при фиксированном напряжении база- эмиттер',
            'Зависимость напряжения коллектор –эмиттер от тока базы при фиксированном  токе эмиттера',
        ],
        rightAnswer: 1
    },
    {
        question: 'Входная характеристика биполярного транзистора для схемы с общим эмиттером это:',
        options: [
            'Зависимость напряжения коллектор –эмиттер от тока базы при фиксированном  токе эмиттера',
            'Зависимость тока базы от напряжения коллектор –эмиттер при фиксированном напряжении база- эмиттер',
            'Зависимость тока коллектора от тока базы при фиксированном напряжении коллектор -эмиттер',
            'Зависимость тока коллектора  от напряжения коллектор –эмиттер при фиксированном напряжении коллектор- эмиттер',
            'Зависимость тока базы от напряжения база- эмиттер при фиксированном напряжении коллектор -эмиттер ',
        ],
        rightAnswer: 4
    },
    {
        question: 'В биполярном транзисторе',
        options: [
            'Ток стока равен сумме токов истока и затвора',
            'Ток истока равен сумме токов стока и затвора',
            'Ток базы равен сумме токов эмиттера и коллектора',
            'Ток эмиттера равен сумме токов коллектора и базы',
            'Ток коллектора равен сумме токов эмиттера и базы',
        ],
        rightAnswer: 3
    },
    {
        question: 'В биполярном транзисторе',
        options: [
            'Ток базы существенно больше тока эмиттера и коллектора, а ток коллектора примерно равен току эмиттера',
            'Ток коллектора существенно меньше тока эмиттера и тока базы, а ток эмиттера примерно равен тока базы',
            'Ток базы существенно меньше тока эмиттера и тока коллектора, а ток коллектора примерно равен току эмиттера',
            'Токи коллектора, базы и эмиттера примерно равны  ',
            'Ток коллектора существенно больше тока стока, но меньше тока истока',
        ],
        rightAnswer: 2
    },
    {
        question: 'Коэффициент передачи тока базы биполярного транзистора это:',
        options: [
            'Отношение тока коллектора к току базы и он существенно больше 1',
            'Отношение тока коллектора к току базы и он меньше 1',
            'Отношение тока базы к току эмиттера',
            'Отношение тока базы к току коллектора',
            'Отношение тока коллектора к току эмиттера',
        ],
        rightAnswer: 0
    },
    {
        question: 'Полупроводниковый прибор с двумя устойчивыми состояниями электропроводимости имеющий три или более p-n-перехода, это:',
        options: [
            'Диод',
            'Варикап',
            'Транзистор ',
            'Варистор',
            'Тиристор',
        ],
        rightAnswer: 4
    },
    {
        question: 'Динистор переключается из закрытого состояния в открытое',
        options: [
            'Импульсом напряжения заданной амплитуды. Полярность напряжения: плюс на катоде, минус на аноде.',
            'Импульсом напряжения заданной амплитуды. Полярность напряжения: плюс на аноде, минус на катоде.',
            'Импульсом тока управляющего электрода заданной амплитуды.',
            'Подачей 1 на базу.',
            'Подачей 1 на вход установки в 1. ',
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
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
        question: 'По фронту синхроимпульса триггер с прямым динамическим синхровходом',
        options: [
            'Устанавливается в 0.',
            'Не реагирует на информационные    входы.',
            'Реагирует на информационные    входы.',
            'Устанавливается в 1.',
            'Переходит в неопределенное состояние.',
        ],
        rightAnswer: 2
    },
    {
        question: 'По срезу синхроимпульса триггер с инверсным динамическим синхровходом',
        options: [
            'Переходит в неопределенное состояние.',
            'Устанавливается в 1.',
            'Устанавливается в 0.',
            'Реагирует на информационные    входы.',
            'Не реагирует на информационные    входы.',
        ],
        rightAnswer: 3
    },
    {
        question: 'При  R=0 и S=1 состояние асинхронного R-S-триггера',
        options: [
            'Устанавливается в 1.',
            'Устанавливается в 0.',
            'Сохраняется.',
            'Неопределенно.',
            'Не реагирует на информационные входы.',
        ],
        rightAnswer: 0
    },
    {
        question: 'При  R=1 и S=0 состояние асинхронного R-S-триггера',
        options: [
            'Устанавливается в 1.',
            'Устанавливается в 0.',
            'Сохраняется.',
            'Неопределенно.',
            'Не реагирует на информационные    входы.',
        ],
        rightAnswer: 1
    },
    {
        question: 'При  R=1 и S=1 состояние асинхронного R-S-триггера',
        options: [
            'Не реагирует на информационные    входы.',
            'Сохраняется.',
            'Устанавливается в 1.',
            'Устанавливается в 0.',
            'Неопределенно.',
        ],
        rightAnswer: 4
    },
    {
        question: 'При  R=0 и S=0 состояние асинхронного R-S-триггера',
        options: [
            'Не реагирует на информационные    входы.',
            'Неопределенно.',
            'Устанавливается в 1.',
            'Сохраняется.',
            'Устанавливается в 0.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Выдает разность двух сигналов ',
        options: [
            'Инвертирующий сумматор.',
            'Инвертирующий усилитель.',
            'Дифференциальный усилитель.',
            'Сумматор.',
            'Неинвертирующий усилитель.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Выдает сумму двух сигналов',
        options: [
            'Сумматор',
            'Дифференциальный усилитель.',
            'Инвертирующий усилитель.',
            'Неинвертирующий усилитель.',
            'Интегратор.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Полупроводниковый прибор, сопротивление которого уменьшается с увеличением приложенного напряжения любой полярности, это:',
        options: [
            'Тензорезистор. ',
            'Варикап.',
            'Туннельный диод.',
            'Биполярный транзистор.',
            'Варистор. ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Бесконтактно замыкает или размыкает электрическую цепь, всё время пока действует соответствующий входной сигнал',
        options: [
            'Триггер.',
            'Транзисторный ключ.',
            'Диод.',
            'Компаратор.',
            'Тиристор.',
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
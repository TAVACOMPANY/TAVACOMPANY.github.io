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
      btnTryAgain = document.getElementById('btn-try-again'),
      msgOfResult = document.getElementById('msgOfResult');

const questions = [
    {
        question: 'Атаки, основанные на некорректной обработке входных данных при передаче управления между программами - …',
        options: [
            'Атаки на отказ в обслуживании',
            'Атаки на ошибки реализации программ',
            'TEMPEST атаки',
            'Атаки на ограничения защиты',
            'Атаки троянскими программами',
        ],
        rightAnswer: 1
    },
    {
        question: 'Атаки, направленные на обеспечение скрытого доступа к ресурсам системы, в которой пользователи имеют права на установку и выполнение произвольного программного кода - …',
        options: [
            'Атаки на ограничения защиты',
            'Атаки на криптографические алгоритмы',
            'Атаки троянскими программами',
            'Атаки на ошибки реализации программ',
            'Атаки на отказ в обслуживании',
        ],
        rightAnswer: 2
    },
    {
        question: 'Атаки, основанные на неверном понимании целей защиты информации и условий функционирования системы разработчиками и заказчиками системы - …',
        options: [
            'Атаки на отказ в обслуживании',
            'Атаки на ошибки реализации программ',
            'Атаки на недекларированные возможности',
            'Атаки на ограничения защиты',
            'Атаки троянскими программами',
        ],
        rightAnswer: 3
    },
    {
        question: 'Атаки, целью которых является блокировка доступа штатных пользователей в системе - …',
        options: [
            'Атаки на недекларированные возможности',
            'Атаки на ошибки реализации программ',
            'Атаки на ограничения защиты',
            'TEMPEST атаки',
            'Атаки на отказ в обслуживании ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Атаки, по принципам действия аналогичные атакам троянскими программами, но не могут уитывать технологию обработки данных в конкретной системе - …',
        options: [
            'Атаки на недекларированные возможности',
            'Атаки на ошибки реализации программ',
            'TEMPEST атаки',
            'Атаки на ограничения защиты',
            'Атаки на отказ в обслуживании',
        ],
        rightAnswer: 0
    },
    {
        question: 'Атаки, основанные на подборе разделенных секретов (ключей) посредством нахождения слабостей в ключевой системе, а также линейном криптоанализе - …',
        options: [
            'Атаки на ограничения защиты',
            'Атаки на отказ в обслуживании ',
            'Атаки на ошибки реализации программ',
            'Атаки на недекларированные возможности',
            'Атаки на криптографические алгоритмы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Атаки, представляющие перехват электромагнитных излучений - …',
        options: [
            'Атаки на ошибки реализации программ',
            'Атаки на отказ в обслуживании',
            'Атаки на ограничения защиты',
            'TEMPEST атаки',
            'Атаки на недекларированные возможности',
        ],
        rightAnswer: 3
    },
    {
        question: 'Атаки, приводящие к скрытой передаче секретной информации за пределы контролируемой зоны объекта - …',
        options: [
            'Атаки на криптографические алгоритмы',
            'Атаки на недекларированные возможности',
            'TEMPEST атаки',
            'Атаки на ошибки реализации программ',
            'Атаки на отказ в обслуживании',
        ],
        rightAnswer: 2
    },
    {
        question: 'К активным методам противодействия утечки информации относят …',
        options: [
            'Физическая защита данных',
            'Зашумление',
            'Криптографические алгоритмы',
            'Фильтрация наводок',
            'Обеспечение заданного радиуса контролируемой зоны',
        ],
        rightAnswer: 1
    },
    {
        question: 'К пассивным методам противодействия утечки информации относят …',
        options: [
            'Обеспечение заданного радиуса контролируемой зоны',
            'Линейный криптоанализ',
            'Зашумление',
            'Физическая защита данных',
            'Криптографические алгоритмы',
        ],
        rightAnswer: 0
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
        msgofScore();
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

function msgofScore() {
    if(score == 0 || score == 1)  {
        msgOfResult.innerHTML = 'Cъебись с универа.';
    } 
     else if(score == 2 || score == 3) {
        msgOfResult.innerHTML = 'Паскальщик';
     }
     else if(score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Дэлфин';
     }
     else if(score == 6 || score == 7) {
        msgOfResult.innerHTML = 'Крестовик';
     }
     else if(score == 8 || score == 9) {
        msgOfResult.innerHTML = 'Душитель питона';
     } else {
        msgOfResult.innerHTML = 'Хрестианин';
     }
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
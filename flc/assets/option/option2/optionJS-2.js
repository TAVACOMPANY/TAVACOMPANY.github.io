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
        question: 'Достоинством системной интеграции является … ',
        options: [
            'Доступность информации для потенциальных потребителей',
            'Повышение эффективности обработки и обмена данными',
            'Недоступность информации для потребителей',
            'Повышение криптостойкости сообщения, передаваемого по незащищенному каналу связи',
            'Оптимизация объема данных, передаваемых по техническим каналам связи',
        ],
        rightAnswer: 1
    },
    {
        question: 'Достоинством информационной интеграции является …',
        options: [
            'Повышение криптостойкости сообщения, передаваемого по незащищенному каналу связи',
            'Недоступность информации для потребителей',
            'Доступность информации для потенциальных потребителей',
            'Повышение эффективности обработки и обмена данными',
            'Оптимизация объема данных, передаваемых по техническим каналам связи',
        ],
        rightAnswer: 2
    },
    {
        question: 'Недостатком интеграции ресурсов является …',
        options: [
            'Повышение криптостойкости сообщения, передаваемого по незащищенному каналу связи',
            'Снижение уровня уязвимости систем по отношению к несанкционированному использованию ресурсов',
            'Недоступность информации для потребителей',
            'Возрастание уровня уязвимости систем по отношению к несанкционированному использованию ресурсов',
            'Повышение эффективности обработки и обмена данными',
        ],
        rightAnswer: 3
    },
    {
        question: 'К числу концептуальных задач создания защищенных систем относится …',
        options: [
            'Снижение уровня уязвимости систем по отношению к несанкционированному использованию ресурсов',
            'Повышение эффективности обработки и обмена данными',
            'Повышение криптостойкости сообщения, передаваемого по незащищенному каналу связи',
            'Снижение проводимости помех в каналах передачи данных',
            'Выбор формализованных критериев оценки уровня защищенности',
        ],
        rightAnswer: 4
    },
    {
        question: 'Формализованными мерами оценки уровня защищенности называются …',
        options: [
            'Способы оценки силы каких-либо характеристик реальных систем, основанных на использовании числовых шкал',
            'Способы оценки характеристик реальных систем, основанных на использовании частотных методов и криптоанализа',
            'Способы повышения криптостойкости сообщения, передаваемого по незащищенному каналу связи',
            'Способы снижения проводимости помех в каналах передачи данных',
            'Способы повышения эффективности обработки и обмена данными',
        ],
        rightAnswer: 0
    },
    {
        question: 'Формализованными мерами оценки уровня защищенности обладает аспект защиты информации …',
        options: [
            'Компьютерная защита',
            'Абсолютная защита',
            'Сетевая защита',
            'Физическая защита',
            'Радиоэлектронная защита ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Аспект защиты информации, обладающий формализованными мерами оценки уровня защищенности … ',
        options: [
            'Абсолютная защита',
            'Сетевая защита',
            'Компьютерная защита',
            'Криптографическая защита',
            'Физическая защита',
        ],
        rightAnswer: 3
    },
    {
        question: 'Аспект защиты информации, не обладающий формализованными мерами оценки уровня защищенности …',
        options: [
            'Сетевая защита информации',
            'Радиоэлектронная защита информации',
            'Защита информации от несанкционированного доступа в средствах вычислительной техники и автоматизированных система',
            'Компьютерная защита информации',
            'Криптографическая защита информации',
        ],
        rightAnswer: 2
    },
    {
        question: 'Доступность информации для потенциальных потребителей обеспечивает …',
        options: [
            'Компьютерная защита информации',
            'Информационная интеграция',
            'Криптографическая защита',
            'Системная интеграция',
            'Радиоэлектронная защита',
        ],
        rightAnswer: 1
    },
    {
        question: 'Эффективность обработки и обмена данными повышает …',
        options: [
            'Системная интеграция',
            'Информационная интеграция',
            'Радиоэлектронная защита',
            'Компьютерная защита информации',
            'Криптографическая защита',
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
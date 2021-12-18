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
        question: 'Из чего состоит любая вычислительная система?',
        options: [
            'Программное обеспечение',
            'Техническое и программное обеспечение',
            'Техническое обеспечение',
            'Прикладное и системное обеспечение',
            'Системное и программное обеспечение',
        ],
        rightAnswer: 1
    },
    {
        question: 'Программное обеспечение принято делить на:',
        options: [
            'Операционные системы и языки программирования',
            'Техническое и программное обеспечение',
            'Прикладное и техническое обеспечение ',
            'Прикладное и системное обеспечение',
            'Системное и техническое обеспечение',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что из перечисленного не относится к прикладному программному обеспечению',
        options: [
            'Игры',
            'Операционная система',
            'MS Office',
            '1C Предприятие',
            'Business программы',
        ],
        rightAnswer: 1
    },
    {
         question: 'Что из перечисленного не относится к системному программному обеспечению',
        options: [
            'Система управления файлами',
            'Операционные системы',
            '3DS Max',
            'Системы программирования',
            'Утилиты',
        ],
        rightAnswer: 2
    },
    {
        question: 'Элементной базой электронно-вычислительных систем первого поколения служили',
        options: [
            'Лампы',
            'Резисторы',
            'Большие интегральные схемы',
            'Интегральные схемы',
            'Транзисторы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Элементной базой электронно-вычислительных систем второго поколения служили',
        options: [
            'Лампы',
            'Транзисторы',
            'Интегральные схемы',
            'Большие интегральные схемы',
            'Резисторы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Элементной базой электронно-вычислительных систем третьего поколения служили',
        options: [
            'Большие интегральные схемы',
            'Резисторы',
            'Транзисторы',
            'Лампы',
            'Интегральные схемы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Элементной базой электронно-вычислительных систем четвертого поколения служили',
        options: [
            'Интегральные схемы',
            'Резисторы',
            'Большие интегральные схемы',
            'Лампы',
            'Транзисторы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Первые ламповые вычислительные устройства появились',
        options: [
            'В 50-х гг.',
            'В 40-х гг.',
            'В 30-х гг.',
            'В 60-х гг.',
            'В 70-х гг.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Первые системы пакетной обработки появились',
        options: [
            'В четвертом поколении',
            'В пятом поколении',
            'Во втором поколении',
            'В третьем поколении',
            'В первом поколении',
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
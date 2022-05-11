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
        question: 'If the radio isn`t working properly, you should ... to the shop. You`ve just bought it.',
        options: [
            'bring it up',
            'recieve it',
            'take it back',
            'take it out',
            'put it back',
        ],
        rightAnswer: 2
    },
    {
        question: 'The work had ............... under extremely difficult conditions. ',
        options: [
            'been doing',
            'Done',
            'to complete',
            'to be done',
            'completed',
        ],
        rightAnswer: 3
    },
    {
        question: 'If you have any ... concerning this report, please phone the Office.',
        options: [
            'Queries',
            'Wishes',
            'Requests',
            'Investigations',
            'Sayings',
        ],
        rightAnswer: 0
    },
    {
        question: 'I had read the book _____ I saw the film.',
        options: [
            'After',
            'Before',
            'When',
            'Until',
            'until for',
        ],
        rightAnswer: 1
    },
    {
        question: 'The colour of the sweater doesn`t ... so long as it is the right size.',
        options: [
            'Concern',
            'Worry',
            'Affect',
            'Match',
            'Matter',
        ],
        rightAnswer: 4
    },
    {
        question: 'Write to me and tell me ... about your holiday in Switzerland.',
        options: [
            'Every',
            'Few',
            'Much',
            'All',
            'Some',
        ],
        rightAnswer: 3
    },
    {
        question: 'The singer Nick Hucknall has decided ---- a two-year break, but he won’t have any money problems. He has already made enough money ---- a lifetime.',
        options: [
            'taken / to have lasted',
            'having taken / lasted',
            'to take / to last',
            'take / to be lasting',
            'taking / lasting',
        ],
        rightAnswer: 2
    },
    {
        question: 'I _____ her for everything she _____.',
        options: [
            'thanked / had done',
            'have thanked / has done',
            'had thank / done',
            'thanking / did',
            'had thanked / had done',
        ],
        rightAnswer: 0
    },
    {
        question: '_____ I had had a bath I went to bed.',
        options: [
            'Before',
            'For',
            'Soon as',
            'Until',
            'After',
        ],
        rightAnswer: 4
    },
    {
        question: 'I`ll be with you in ... ',
        options: [
            'a quater of hour',
            'a quarter of an hour',
            'a quarter and a half',
            'a quarter to with hour',
            'one quarter of an hours',
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
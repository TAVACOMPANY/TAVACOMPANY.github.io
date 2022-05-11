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
        question: 'The desperate voice over the phone says: Darling, I`ve got news for you: my niece Meltem, together with her husband, six children, two dogs and three cats, .............. come to stay with us for a whole month.',
        options: [
            'Had',
            '------',
            'Has',
            'are to',
            'have',
        ],
        rightAnswer: 2
    },
    {
        question: 'I`d like to have a word with you. Yes, but ............... ?',
        options: [
            'we have to talk about what',
            'what about we have to talk',
            'about what we have to talk',
            'what do we have to talk about',
            'what we have to talk about',
        ],
        rightAnswer: 3
    },
    {
        question: 'The estate agent spent a ... deal of time trying to persuade me to buy the house.',
        options: [
            'Great',
            'Large',
            'Big',
            'Numerous',
            'Wide',
        ],
        rightAnswer: 0
    },
    {
        question: 'As far as I`m concerned, all he`s good at .............. making up the most improbable excuses anyone has ever heard.',
        options: [
            'he is',
            'Is',
            'Present',
            'Presently',
            'His',
        ],
        rightAnswer: 1
    },
    {
        question: 'It seems to me that they never gave a thought to probable future problems when the plans ............... five years ago.',
        options: [
            'to be laid down',
            'had been laid down',
            'were not laid down',
            'they laid down',
            'were being laid down',
        ],
        rightAnswer: 4
    },
    {
        question: '............... two months at sea, he came back healthier than ever.',
        options: [
            'Having been spent',
            'Being spent',
            'Spending',
            'Having spent',
            'While spending',
        ],
        rightAnswer: 3
    },
    {
        question: 'Why did you _____ that?',
        options: [
            'Said',
            'Tell',
            'Say',
            'Spoke',
            'Talk',
        ],
        rightAnswer: 2
    },
    {
        question: 'She has to work hard to keep the house ... and tidy with three small children.',
        options: [
            'Neat',
            'Smooth',
            'Plain',
            'Well',
            'Ordered',
        ],
        rightAnswer: 0
    },
    {
        question: 'It`s hard to ... the difference between this forgery and the real painting.',
        options: [
            'Speak',
            'Talk',
            'Say',
            'Realise',
            'Tell',
        ],
        rightAnswer: 4
    },
    {
        question: 'It is sometimes difficult for parents ____ whether ___their children for misbehaving.',
        options: [
            'being decided / punish',
            'to decide / to punish',
            'decided / having punished',
            'deciding / to be punishing',
            'having decided / punishing',
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
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
        question: 'He was so tired that he ... asleep in the chair.',
        options: [
            'Went',
            'Lost',
            'Fell',
            'Became',
            'Felt',
        ],
        rightAnswer: 2
    },
    {
        question: 'He`s intelligent but he ... common sense.',
        options: [
            'Needs',
            'Fails',
            'Wants',
            'Lacks',
            'Misses',
        ],
        rightAnswer: 3
    },
    {
        question: '... experience of working in an office environment is essential for this job.',
        options: [
            'Previous',
            'First',
            'Last',
            'Earlier',
            'Initial',
        ],
        rightAnswer: 0
    },
    {
        question: 'Have you heard the great news, Anton? The man, ............... refused your proposal last year, has been arrested for embezzlement of government funds.',
        options: [
            'when he',
            'whose daughter',
            'Whom',
            'That',
            'who have repeatedly',
        ],
        rightAnswer: 1
    },
    {
        question: 'We expected him at eight, but he finally ... at midnight.',
        options: [
            'came off',
            'turned on',
            'found out',
            'turned off',
            'turned up',
        ],
        rightAnswer: 4
    },
    {
        question: 'He is a little bit ... in his left ear, but if you speak clearly he will hear what you say.',
        options: [
            'Disabled',
            'Dead',
            'Diseased',
            'Deaf',
            'Bad',
        ],
        rightAnswer: 3
    },
    {
        question: 'I`m simply surprised at your lack of authority over him. Why can`t you ............... him eat his dinner?',
        options: [
            'Tell',
            'Force',
            'Make',
            'Persuade',
            'Ask',
        ],
        rightAnswer: 2
    },
    {
        question: 'Sandra _____ Bob that she didn’t see the Taj Mahal.',
        options: [
            'Told',
            'Said',
            'Talked',
            'Tells',
            'Say',
        ],
        rightAnswer: 0
    },
    {
        question: 'When I learned to ski, I practiced on a slope that was not too ... .',
        options: [
            'Slow',
            'Tall',
            'Rising',
            'High',
            'Steep',
        ],
        rightAnswer: 4
    },
    {
        question: 'He sat there with his arms ... doing nothing waiting for us.',
        options: [
            'Beyond',
            'Folded',
            'Turned',
            'Flapped',
            'Twisted',
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
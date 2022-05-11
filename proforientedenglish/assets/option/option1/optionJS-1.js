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
        question: 'After I _____ to the news, I _____ to bed.',
        options: [
            'listened / had gone',
            'listen / go',
            'had listened / went',
            'listened / gone',
            'have listened / had gone',
        ],
        rightAnswer: 2
    },
    {
        question: 'I`m not sure ... the green coat is.',
        options: [
            'Who',
            'who`s',
            'whom',
            'whose',
            'which',
        ],
        rightAnswer: 3
    },
    {
        question: 'If you keep trying, you might ... to do it.',
        options: [
            'Manage',
            'Succeed',
            'Understand',
            'Catch',
            'Discover',
        ],
        rightAnswer: 0
    },
    {
        question: 'The airline ---- to me for losing my luggage, but I wasn’t in the right frame of mind to forgive them.',
        options: [
            'Complained',
            'Apologized',
            'Denied',
            'Excused',
            'Thanked',
        ],
        rightAnswer: 1
    },
    {
        question: 'Before we start the lesson, I`d like to ... what we did yesterday.',
        options: [
            'run across',
            'run into',
            'run along',
            'run up',
            'run through',
        ],
        rightAnswer: 4
    },
    {
        question: 'I was under the impression that you, too, .............. along with us. I am sorry that you aren`t.',
        options: [
            'came to suppose',
            'were supposed to have come',
            'supposed to have come',
            'were supposed to come',
            'supposed to come',
        ],
        rightAnswer: 3
    },
    {
        question: 'I ____ to sleep until I _____ my homework.',
        options: [
            'didn’t go / do',
            'didn’t go / did',
            'didn’t go / had done',
            'had not gone / had done',
            'don’t go / did',
        ],
        rightAnswer: 2
    },
    {
        question: 'When I _____ the letter, I _____ it away.',
        options: [
            'had read / threw',
            'read / had thrown',
            'read / threw',
            'reading / threw',
            'had read / had thrown',
        ],
        rightAnswer: 0
    },
    {
        question: 'He house is in good ... though it needs to be repainted.',
        options: [
            'Mood',
            'Position',
            'State',
            'Standing',
            'Condition',
        ],
        rightAnswer: 4
    },
    {
        question: 'Would you believe it! ............... was no other than our poor old postman who had fallen into that pond still holding onto his mail bags.',
        options: [
            'Who',
            'It',
            'Someone',
            'Somebody',
            'Man',
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
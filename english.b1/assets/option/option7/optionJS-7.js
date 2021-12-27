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
        question: 'If you want to get fit, you ............ go to the gym.',
        options: [
            'should',
            'must',
            'has to',
            'mustn’t',
            'don’t have to',
        ],
        rightAnswer: 0
    },
    {
        question: 'Tom . . . his hand when he was cooking the dinner.',
        options: [
            'was burning',
            'were burning',
            'burnt',
            'is burning',
            'burns',
        ],
        rightAnswer: 2
    },
    {
        question: 'Watch out! You ............ touch that.',
        options: [
            'mustn’t',
            'must',
            'should',
            'can’t',
            'shouldn’t',
        ],
        rightAnswer: 4
    },
    {
        question: '“How . . . ?” – “Nobody knows”',
        options: [
            'did happen the accident',
            'did the accident happen',
            'happened the accident',
            'was the accident happened',
            'the accident happened',
        ],
        rightAnswer: 1
    },
    {
        question: 'You look very bad! You … visit a doctor.',
        options: [
            'ought',
            'might to',
            'has to',
            'should',
            'can',
        ],
        rightAnswer: 3
    },
    {
        question: 'If I _____ rich, I would buy a fine house.',
        options: [
            'were',
            'am',
            'should be',
            'will be',
            'would be',
        ],
        rightAnswer: 0
    },
    {
        question: 'I ............ waiting in queues. It drives me crazy.',
        options: [
            'love',
            'don’t mind',
            'can’t stand',
            'am',
            'like',
        ],
        rightAnswer: 2
    },
    {
        question: 'If I didn’t have a big heart, I _____ you.',
        options: [
            "can't forgive",
            "mustn't have forgiven",
            "won't forgive",
            "will be",
            'wouldn’t have been able to forgive',
        ],
        rightAnswer: 4
    },
    {
        question: 'Paul would be a good artist if he …….... more patience.',
        options: [
            'had had',
            'had',
            'have',
            'will have',
            'has',
        ],
        rightAnswer: 1
    },
    {
        question: 'Sting has just ............... a new album.',
        options: [
            'won',
            'published',
            'had',
            'released',
            'liberated',
        ],
        rightAnswer: 3
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
        msgOfResult.innerHTML = 'Bastard';
    } 
     else if(score == 2 || score == 3) {
        msgOfResult.innerHTML = 'Abomination';
     }
     else if(score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Sentimantal fool';
     }
     else if(score == 6 || score == 7) {
        msgOfResult.innerHTML = 'Dead inside';
     }
     else if(score == 8 || score == 9) {
        msgOfResult.innerHTML = 'just good';
     } else {
        msgOfResult.innerHTML = 'Lit';
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
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
        question: 'I’m totally fed up ............... politicians at the moment.',
        options: [
            'with',
            'in',
            'of',
            'from',
            'at',
        ],
        rightAnswer: 0
    },
    {
        question: 'A good lawyer has to remember facts. Jerry is a terrible lawyer because he’s very . . . . . .',
        options: [
            'hard-working',
            'talkative',
            'forgetful',
            'impatient',
            'creative',
        ],
        rightAnswer: 2
    },
    {
        question: 'Sarah couldn’t come to the party, ___ was a pity.',
        options: [
            'those',
            'why',
            'when',
            'this',
            'which',
        ],
        rightAnswer: 4
    },
    {
        question: 'Before they built the flats, that’s where the old garage used ... .',
        options: [
            'was',
            'to be',
            'to being',
            'has been',
            'being',
        ],
        rightAnswer: 1
    },
    {
        question: 'I rang home just as the train ... into the station.',
        options: [
            'gotten',
            'had get',
            'get',
            'was getting',
            'has got',
        ],
        rightAnswer: 3
    },
    {
        question: 'We don’t have … homework tonight.',
        options: [
            'much',
            'many',
            'anything',
            'some',
            'few',
        ],
        rightAnswer: 0
    },
    {
        question: 'I had a sandwich in the garden and then I ... back to the office.',
        options: [
            'gone',
            'was gone',
            'Went',
            'have gone',
            'had gone',
        ],
        rightAnswer: 2
    },
    {
        question: 'Excuse me! Can I help you?',
        options: [
            "No, I'm not.",
            'Yes, I do.',
            'Yes, there are',
            'No, I can’t.',
            'Yes, how can I get to the station.',
        ],
        rightAnswer: 4
    },
    {
        question: '"How many eggs have we got?" "_____"',
        options: [
            'Not so lot',
            'Not too many.',
            "They're no in the fridge.",
            "There aren't some.",
            "Not too much.",
        ],
        rightAnswer: 1
    },
    {
        question: '... is Granada like?',
        options: [
            'Do',
            'Does',
            'Who',
            'What',
            'How',
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
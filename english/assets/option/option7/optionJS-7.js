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
        question: 'There … some chairs in the living room.',
        options: [
            'Am',
            'Does',
            'Do',
            'Is',
            'Are',
        ],
        rightAnswer: 4
    },
    {
        question: 'My little sister ... of horse-riding.',
        options: [
            'be fond',
            'am fond',
            'are fond',
            'is fond',
            'to be fond',
        ],
        rightAnswer: 3
    },
    {
        question: 'Opposite word for “Noisy”:',
        options: [
            'quitly',
            'dull',
            'quiet',
            'calmly',
            'exciting',
        ],
        rightAnswer: 2
    },
    {
        question: 'He ___ to buy her a hat.',
        options: [
            'was going to',
            'is going',
            'will',
            'are going',
            'shall',
        ],
        rightAnswer: 1
    },
    {
        question: 'Choose a noun:',
        options: [
            'Stretch',
            'Suspicious',
            'Thirsty',
            'Obesity',
            'Nearly',
        ],
        rightAnswer: 0
    },
    {
        question: 'I agreed … that part-time job.',
        options: [
            'takes',
            'taken',
            'take',
            'took',
            'to take',
        ],
        rightAnswer: 4
    },
    {
        question: 'If you are in transit , you … go to the British Airways desk.',
        options: [
            'mustn’t',
            'ought to',
            'to have to',
            'have to',
            'are',
        ],
        rightAnswer: 3
    },
    {
        question: 'Helen didn’t say that, _________?',
        options: [
            'didn’t she',
            'don’t you',
            'did she',
            'she is',
            'does she',
        ],
        rightAnswer: 2
    },
    {
        question: 'Select a sentence with a gerund:',
        options: [
            'Mr. Brown has been collecting stamps for 5 years already',
            'I am fond of collecting coins',
            'Students are collecting in the hall now',
            'The driver collected the suitcases from the station',
            'Harry has just collected the new information',
        ],
        rightAnswer: 1
    },
    {
        question: 'An uncountable noun:',
        options: [
            'Wheat',
            'Monument',
            'Pear',
            'Plot',
            'Cattle-farm',
        ],
        rightAnswer: 0
    },
    {
        question: 'The restaurant was ... tall buіldіng made of ... glass and ... stone.',
        options: [
            'a | a | a.',
            'the | the | the.',
            'a | the | a.',
            '... | ... | ... .',
            'a | ... | ... .',
        ],
        rightAnswer: 4
    },
    {
        question: 'Find a synonym for the highlighted word in the sentence: He felt very ill.',
        options: [
            'scared',
            'boring',
            'awake',
            'sick',
            'tired',
        ],
        rightAnswer: 3
    },
    {
        question: 'I’m sorry, I … phone you so late.',
        options: [
            'ought',
            'be able to',
            'have to',
            'should to',
            'have',
        ],
        rightAnswer: 2
    },
    {
        question: 'What is the longest river ... the world?',
        options: [
            'on',
            'in',
            'off',
            'at',
            'with',
        ],
        rightAnswer: 1
    },
    {
        question: 'People who watch a sport are ______.',
        options: [
            'spectators',
            'audience',
            'guys',
            'fans',
            'staff',
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
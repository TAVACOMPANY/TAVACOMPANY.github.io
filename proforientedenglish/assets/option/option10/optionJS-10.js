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
        question: 'You .............. another job pretty soon. I have a feeling that you`re going to get fired before long.',
        options: [
            'would have started to look for',
            'had better to start looking for',
            '`d better start looking for',
            '`d better to start to look for',
            'would start looking for',
        ],
        rightAnswer: 2
    },
    {
        question: 'Look over there. Isn`t that the woman ... son you played tennis with the other day?',
        options: [
            'of which',
            'whom',
            'who',
            'whose',
            'which',
        ],
        rightAnswer: 3
    },
    {
        question: 'He _____ he was at school the day before.',
        options: [
            'Said',
            'Say',
            ' is telling',
            'Told',
            'Tell',
        ],
        rightAnswer: 0
    },
    {
        question: '“The people who I looked after are very well.” She said that the people who she _____ after _____ very well.',
        options: [
            'have looked / are',
            'had looked / were',
            'were looking / are',
            'looked / are',
            'would looked / were',
        ],
        rightAnswer: 1
    },
    {
        question: 'The organizers decided to go ahead with the match ... the bad weather.',
        options: [
            'Although',
            'Unless',
            'Inspite',
            'in order',
            'despite',
        ],
        rightAnswer: 4
    },
    {
        question: 'It was a secret - you weren`t supposed to ... anyone anything.',
        options: [
            'Cheat',
            'Speak',
            'Talk',
            'Tell',
            'Say',
        ],
        rightAnswer: 3
    },
    {
        question: 'As soon as he _____ his driving test, he _____ a car',
        options: [
            'had passed / bring',
            'passed / had bought',
            'had passed / bought',
            'passed / bought',
            'passes / had bought',
        ],
        rightAnswer: 2
    },
    {
        question: 'No matter how hard I tried to make them understand, they just wouldn`t take my word for ............... I said, .............. annoyed me very much.',
        options: [
            'what / which',
            'which / that',
            'which / which',
            'that / that',
            'that / which',
        ],
        rightAnswer: 0
    },
    {
        question: '.............. rich people are, they never seem satisfied with their lot and are always anxious to make ............... more money.',
        options: [
            'Many / much',
            'Although / some',
            'So much / so much',
            'Whoever / that',
            'No matter how / still',
        ],
        rightAnswer: 4
    },
    {
        question: 'One problem with Bing Bang theory is explaining how the stars and galaxies were formed. ____Gravity alone cannot cause this in a smooth universe, and so something had to supply the initial gravity that allowed galaxies to form. Physicists suggests that dark matter WIMPs (weakly interacting massive particles) accomplished this task Since WIMPs only affect ordinary matter gravitionally.',
        options: [
            'Gravity is strong enough to stop the expansion eventually and pull everything back to a single point',
            'If matter initially was distributed .£3 evenly in all directions, what caused it to clump together in some regions and from stars and galaxies?',
            'However, the gravity of the galaxies seen in this image is strong enough to contain the glowing hot gas.',
            'The Bing Bang theory tries to explain how the universe was formed.',
            'Then, a great explosion resulted in the universe being formed',
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
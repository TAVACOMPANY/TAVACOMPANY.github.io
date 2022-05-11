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
        question: 'He kept his job ... the manager had threatened to dismiss him.',
        options: [
            'Unless',
            'Inspite',
            'Although',
            'Even',
            'Despite',
        ],
        rightAnswer: 2
    },
    {
        question: 'The Finance Minister will be making a ... today about new rates of income tax.',
        options: [
            'Notice',
            'Decision',
            'Declaration',
            'Statement',
            'Talk',
        ],
        rightAnswer: 3
    },
    {
        question: 'The shirt I wore that day was torn but I don`t think anyone ...',
        options: [
            'Noticed',
            'Remarked',
            'Mentioned',
            'Learned',
            'Watched',
        ],
        rightAnswer: 0
    },
    {
        question: 'Yes, I know you`re tired and sleepy, but let me remind you one thing: If you ............... up all night to watch that film, the world would look much brighter this morning, wouldn`t it?!',
        options: [
            'had stayed',
            'hadn`t stayed',
            'would stay',
            'wouldn`t stay',
            'would have stayed',
        ],
        rightAnswer: 1
    },
    {
        question: 'The plane crashed into a bridge because it was flying too ... ',
        options: [
            'Fast',
            'Slow',
            'Deep',
            'High',
            'Low',
        ],
        rightAnswer: 4
    },
    {
        question: 'After they _____ their work, they ___ home.',
        options: [
            'finish / had gone',
            'finished / went',
            'had finished / had gone',
            'had finished / went',
            'finished / had gone',
        ],
        rightAnswer: 3
    },
    {
        question: '.............. , he went to collect his payment',
        options: [
            'The work have been completed',
            'Despite the fact that the work was successfully completed',
            'Having finished his work successfully',
            'Although he had completed his work successfully',
            'As long as the work is completed with success',
        ],
        rightAnswer: 2
    },
    {
        question: 'He said I hadn`t given him his book back, but I was ... sure I had.',
        options: [
            'Quite',
            'Better',
            'Totally',
            'Rather',
            'Entirely',
        ],
        rightAnswer: 0
    },
    {
        question: 'When I got to the office, I _____ that I _____ to lock the front door.',
        options: [
            'had realized / forget',
            'had / forgetting',
            'realized / forget',
            'had realized / had forgotten',
            'realized / had forgotten',
        ],
        rightAnswer: 4
    },
    {
        question: 'I took my family to Paris last year. I _____ there as a student, so I _____ my way around.',
        options: [
            'had been / have known',
            'had been / knew',
            'were / knew',
            'was / know',
            'were / known',
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
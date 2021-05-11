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
      br = '<br/>';

const questions = [
    {
        question: 'Verb tense in a sentence: He has been writing his composition for three hours.',
        options: [
            'Present Perfect ',
            'Present Continuous',
            'Past Perfect',
            'Past Continuous',
            'Present Perfect Continuous ',
        ],
        rightAnswer: 4
    },
    {
        question: 'A word in which the selected letter combination is read different from others:',
        options: [
            'Daughter ',
            'Eight ',
            'Caught ',
            'Cough ',
            'Bright ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Could you give up ___ (eat) chocolate if your doctor told you to?',
        options: [
            'ate ',
            'eats ',
            'eating ',
            'have eating',
            'eat',
        ],
        rightAnswer: 2
    },
    {
        question: 'Robert Burns is a famous ...',
        options: [
            'Irish poet',
            'Scottish poet ',
            'Australian poet',
            'American poet',
            'Canadian poet ',
        ],
        rightAnswer: 1
    },
    {
        question: 'W.A.Mozart was born in __ .',
        options: [
            'Austria ',
            'Australia ',
            'Canada ',
            'Holland ',
            'Wales ',
        ],
        rightAnswer: 0
    },
    {
        question: 'The Natіonal lіbrary іs sіtuated іn the ... .',
        options: [
            'Tower of London',
            'St. Paul Cathedral',
            'Westmіnster Abbey',
            'Tate Gallery ',
            'Brіtіsh Museum',
        ],
        rightAnswer: 4
    },
    {
        question: 'The dog hurts __ paw.',
        options: [
            'our ',
            'your ',
            'you ',
            'its',
            'their ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Find an adjective:',
        options: [
            'Song ',
            'Sunshine ',
            'Sunny ',
            'Son ',
            'Sun ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Find an extra word:',
        options: [
            'examination',
            'to rest',
            'to learn',
            'to teach',
            'lecture',
        ],
        rightAnswer: 1
    },
    {
        question: 'If you are in transit , you … go to the British Airways desk.',
        options: [
            'have to',
            'are ',
            'ought to',
            'mustn’t ',
            'to have to',
        ],
        rightAnswer: 0
    },
    {
        question: 'The British money is …',
        options: [
            'dinar ',
            'frank ',
            'crone ',
            'dollar ',
            'pound ',
        ],
        rightAnswer: 4
    },
    {
        question: 'John lives in flat ... .',
        options: [
            'the fortieth',
            'fortieth ',
            'fourty ',
            'forty ',
            'forth ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Your shirt needs…',
        options: [
            'wash ',
            'to be wash ',
            'washing ',
            'to wash',
            'to be washing',
        ],
        rightAnswer: 2
    },
    {
        question: 'I haven`t read this newspaper yet. I only looked … it.',
        options: [
            'Up',
            'Through',
            'In',
            'Out',
            'After',
        ],
        rightAnswer: 1
    },
    {
        question: 'Water is a source … life.',
        options: [
            'of ',
            'over ',
            'about ',
            'before ',
            'on ',
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
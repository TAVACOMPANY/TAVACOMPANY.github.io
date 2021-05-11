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
        question: 'Put in the verb in the correct form: … you walk to school or … you take the bus?',
        options: [
            'have, have',
            'are, are',
            'Are, do',
            'do, are',
            'do, do',
        ],
        rightAnswer: 4
    },
    {
        question: 'Synonym for the phrase “to come together”:',
        options: [
            'to live',
            'to leave',
            'to examine',
            'to gather',
            'to bring',
        ],
        rightAnswer: 3
    },
    {
        question: 'Shall I help you … (carry) that heavy suitcase?',
        options: [
            'carrying',
            'to carrying',
            'to carry',
            'carries',
            'carried',
        ],
        rightAnswer: 2
    },
    {
        question: 'Verb tense in a sentence: He has been writing his composition for three hours.',
        options: [
            'Past Perfect',
            'Present Perfect Continuous',
            'Present Perfect',
            'Past Continuous',
            'Present Continuous',
        ],
        rightAnswer: 1
    },
    {
        question: 'What ___ last Saturday?',
        options: [
            'did they buy',
            'they bought',
            'bought',
            'did bought',
            'they buy',
        ],
        rightAnswer: 0
    },
    {
        question: 'Two hundred years ago people ____ horses.',
        options: [
            'use to ride',
            'used ride',
            'used to drive',
            'did used to ride',
            'used to ride',
        ],
        rightAnswer: 4
    },
    {
        question: 'Put in the verb in the correct form: Harry often … late',
        options: [
            'arrived',
            'is arriving',
            'arrive',
            'arrives',
            'are arrive',
        ],
        rightAnswer: 3
    },
    {
        question: 'Three men were arrested this evening and ________ by police tomorrow morning.',
        options: [
            'have question',
            'was questioned',
            'will be questioned',
            'will questioned',
            'questioned',
        ],
        rightAnswer: 2
    },
    {
        question: 'Put the sentence in the past tense: We promise we shall finish the work in time.',
        options: [
            'We promised we finished the work in time.',
            'We promised we should finish the work in time.',
            'We promised we should finished the work in time.',
            'We promised we did finish the work in time.',
            'We promised we shall finish the work in time.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Choose the right match: Country – nationality – capital:',
        options: [
            'Canada – Canadian – Ottawa',
            'Australia – Australian – Wellington',
            'Japan – Japan – Tokio',
            'China – Chin – Peking',
            'the USA – American – New-York',
        ],
        rightAnswer: 0
    },
    {
        question: 'I recently went back to the small town, ….. .',
        options: [
            'where I work',
            'where there is plenty of sunshine',
            'where we play football',
            'where I can buy some postcards',
            'where I grew up',
        ],
        rightAnswer: 4
    },
    {
        question: 'I see that he has lost … pencil; perhaps you can lend him …',
        options: [
            'your, our.',
            'theirs, yours.',
            'his, his.',
            'his, yours.',
            'mine, yours.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Make a question: Kate watches TV in the evenings.',
        options: [
            'Kate watch TV evenings?',
            'Do Kate watches TV in the evenings?',
            'Does Kate watch TV in the evenings?',
            'What do she do in evenings?',
            'Watches Kate TV in the evenings?',
        ],
        rightAnswer: 2
    },
    {
        question: 'My sister sings much … than I do.',
        options: [
            'More good',
            'Better',
            'Good',
            'Gooder',
            'Best',
        ],
        rightAnswer: 1
    },
    {
        question: '- Are you hungry? - No, …',
        options: [
            'I have just eaten',
            'I eat',
            'I’d eaten',
            'I’m eaten',
            'I ate',
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
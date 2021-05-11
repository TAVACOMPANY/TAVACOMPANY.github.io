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
        question: 'What’s your sister like? - … .',
        options: [
            'She works hard',
            'She is OK, thank you',
            'She is 18',
            'She is at university',
            'She is kind',
        ],
        rightAnswer: 4
    },
    {
        question: 'I … in the same class as Kate last year.',
        options: [
            'be',
            'were',
            'are',
            'was',
            'is',
        ],
        rightAnswer: 3
    },
    {
        question: 'The false statement(-s) is(-are):',
        options: [
            'The flora and fauna of Kazakhstan depend on the climate of the zone.' + br + 'Sudden cold winds and snowfalls in winter cause troubles for people.',
            'The northern regions of Kazakhstan have long and hard winters' + br + 'The flora and fauna of Kazakhstan are different.',
            'The flora of Kazakhstan is poorer in the south and richer in the north.' + br + 'The climate of Kazakhstan is strongly continental.' + br + 'The largest lakes of Kazakhstan are Baikal, Balkhash, Zaisan and Alakol.',
            'The northern regions of Kazakhstan have long and hard winters' + br + 'The Great Silk Way was the main trade route in the ancient times',
            'The flora and fauna of Kazakhstan depend on the climate of the zone.' + br + 'The flora and fauna of Kazakhstan are different.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Which is the right plural form?',
        options: [
            'bookes ',
            'maps ',
            'souvenires ',
            'photoes ',
            'holiday',
        ],
        rightAnswer: 1
    },
    {
        question: 'Find the correct word order in the interrogative sentence:',
        options: [
            'What kind of business is a travel agency?',
            'Agency is kind of business what travel a?',
            'Is a business what kind of travel agency?',
            'Is agency a kind of business what travel?',
            'Is a travel agency what kind of business?',
        ],
        rightAnswer: 0
    },
    {
        question: 'A:Are there… apples in your fridge?' + br + 'B: Yes, there are …',
        options: [
            'no /some',
            'little/ some',
            'some /some',
            'some /any',
            'any / some',
        ],
        rightAnswer: 4
    },
    {
        question: 'Find singular nouns:',
        options: [
            'streets' + br + 'roses' + br + 'actresses',
            'roses' + br + 'streets',
            'women' + br + 'men',
            'politics' + br + 'athletics' + br + 'maths',
            'streets' + br + 'actresses',
        ],
        rightAnswer: 3
    },
    {
        question: 'Put words into the right order:',
        options: [
            'He does exercises always morning.',
            'Doed he always morning exercises?',
            'He always does morning exercises.',
            'He does always morning exercises.',
            'Exercises he always does morning.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Choose the sentences with the correct preposition:',
        options: [
            'Tell to me, please' + br + 'Don’t eat on night' + br + 'It is my point on view',
            'He worries too much about his weight' + br + 'This is for me' + br + 'What is his attitude towards these facts?',
            'All from a sudden she started to cry' + br + 'I wouldn’t say you anything',
            'Don’t eat on night' + br + 'Tell to me, please',
            'It is my point on view' + br + 'All from a sudden she started to cry',
        ],
        rightAnswer: 1
    },
    {
        question: 'The right plural form:',
        options: [
            'cousins',
            'woman ',
            'childrens ',
            'brother’s ',
            'mens ',
        ],
        rightAnswer: 0
    },
    {
        question: 'London is famous for its historic buildings as …',
        options: [
            'the cinemas' + br +'Washington monument',
            'theatre' + br + 'Washington monument',
            'the Statue of Liberty' + br + 'Walt Disney',
            'Duman' + br + 'the cinemas',
            'the Houses of Parliament' + br + 'St. Paul’s Cathedral',
        ],
        rightAnswer: 4
    },
    {
        question: 'The correct word order in the affirmative sentence:',
        options: [
            'A table and some chairs there are in the kitchen',
            'In the kitchen there are some chairs and a table',
            'There are in the kitchen some chairs and a table',
            'There are some chairs and a table in the kitchen',
            'There are a table and some chairs in the kitchen',
        ],
        rightAnswer: 3
    },
    {
        question: 'They’ve known each other … .',
        options: [
            'last two hours',
            'since two hours',
            'since 2008' + br + 'for three months' + br + 'since childhood',
            'since two hours' + br + 'ten years' + br + 'last two hours',
            'a week',
        ],
        rightAnswer: 2
    },
    {
        question: '... is your father’s profession?',
        options: [
            'Where',
            'What',
            'Who',
            'How',
            'When',
        ],
        rightAnswer: 1
    },
    {
        question: 'It is not ... his power to help you.',
        options: [
            'in',
            'with ',
            'on ',
            'of ',
            'from ',
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
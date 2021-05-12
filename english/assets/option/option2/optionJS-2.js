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
        question: 'London is famous for its historic buildings as …',
        options: [
            'St. Paul’s Cathedral' + '<br/>' + 'the Houses of Parliament',
            'Washington monument' + '<br/>' + "Walt Disney",
            'theatre' + '<br/>' + "Duman",
            'the cinemas' + '<br/>' + 'Washington monument',
            'the Statue of Liberty' + '<br/>' + 'theatre',
        ],
        rightAnswer: 0
    },
    {
        question: 'Is this Carol’s T-shirt? - No, it isn’t … . It is … .',
        options: [
            'her / mine',
            'hers / my',
            'her / your',
            'hers / mine',
            'her / my',
        ],
        rightAnswer: 3
    },
    {
        question: 'Satisfaction is:',
        options: [
            'a noun',
            'a verb',
            'an adjective',
            'an adverb',
            'a preposition',
        ],
        rightAnswer: 0
    },
    {
        question: 'Lasting all one’s life is called …',
        options: [
            'important',
            'computerized',
            'life-long',
            'education',
            'priority',
        ],
        rightAnswer: 2
    },
    {
        question: 'If I … you, I …less sweets.',
        options: [
            'is / won’t eat',
            'was / eat',
            'would / would',
            'are / don’t eat',
            'were / would eat ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Find a word with the opposite meaning “Real”',
        options: [
            'sudden',
            'іmagіnary',
            'lіmіted',
            'mean',
            'full',
        ],
        rightAnswer: 1
    },
    {
        question: 'Susan … (have a shower) when the doorbell … (ring)',
        options: [
            'had a shower /was ringing',
            'had a shower / rang',
            'was having a shower / rung',
            'was having a shower / rang',
            'was have / rang',
        ],
        rightAnswer: 3
    },
    {
        question: 'Find the extra word in this thematic series:',
        options: [
            'write',
            'wine',
            'dessert',
            'menu',
            'to order',
        ],
        rightAnswer: 0
    },
    {
        question: 'Correct expressions with the article “the”:',
        options: [
            'have the shower' + '<br/>' + 'have the supper' + '<br/>' + 'play the chess',
            'wash a hair' + '<br/>' + 'the lot of chocolate',
            'do the shopping' + '<br/>' + 'in the evening' + '<br/>' + 'read the book',
            'play the chess' + '<br/>' + 'have the supper',
            'the lot of chocolate' + '<br/>' + 'have the shower',
        ],
        rightAnswer: 2
    },
    {
        question: 'The correct form of the auxiliary verb: ... your teacher give you a lot of homework when you studied at school?',
        options: [
            'Does',
            'Has',
            'Will',
            'Have',
            'Did',
        ],
        rightAnswer: 4
    },
    {
        question: 'He helped … with my homework.',
        options: [
            'her',
            'me',
            'us',
            'I',
            'him',
        ],
        rightAnswer: 1
    },
    {
        question: '– Are you travelling alone, Clare?-asked he.',
        options: [
            'He asked washer if she was travelling alone',
            'He asked her she was travelling alone',
            'He asked her she if was travelling alone',
            'He asked her if she was travelling alone',
            'He asked if her if she was travelling alone',
        ],
        rightAnswer: 3
    },
    {
        question: 'Which noun is singular?',
        options: [
            'shirt',
            'jeans',
            'shorts',
            'gloves',
            'trousers',
        ],
        rightAnswer: 0
    },
    {
        question: 'The correct singular form:',
        options: [
            'hands',
            'legs',
            'head',
            'feet',
            'arms',
        ],
        rightAnswer: 2
    },
    {
        question: 'The correct use of the definite article in the sentences:',
        options: [
            'The Africa is much larger than the Europe' + "<br/>" + 'Tom has visited most countries in the western Europe' + "<br/>" + 'The UK consists of the Great Britain and the Northern Ireland',
            'The Nile is the longest river in the Africa' + "<br/>" + 'The Africa is much larger than the Europe'  + "<br/>" + 'Tom has visited most countries in the western Europe',
            'The UK consists of the Great Britain and the Northern Ireland' + "<br/>" + 'The Africa is much larger than the Europe',
            'In the Spain we swam in the Mediterranean' + "<br/>" + 'The UK consists of the Great Britain and the Northern Ireland',
            'We visited Canada and the United States' + "<br/>" + 'Next year we are going skiing in the Swiss Alps' + '<br/>' + 'The south of England is warmer than the north',
        ],
        rightAnswer: 4
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

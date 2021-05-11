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
        question: 'I hate Maths. It is … subject for me.',
        options: [
            'more difficult',
            'difficulter',
            'the most difficult',
            'less difficult',
            'least difficult',
        ],
        rightAnswer: 2
    },
    {
        question: 'How many parts is London traditionally divided into?',
        options: [
            '2',
            '6',
            '5',
            '3',
            '4',
        ],
        rightAnswer: 4
    },
    {
        question: '“… is absent”-said Kate to the teacher.',
        options: [
            'nobody',
            'anything',
            'some',
            'anybody',
            'any',
        ],
        rightAnswer: 0
    },
    {
        question: 'Please be quiet! My little sister …',
        options: [
            'will sleep',
            'is sleeping',
            'sleeps',
            'slept',
            'sleeping',
        ],
        rightAnswer: 1
    },
    {
        question: 'Choose the correct answer to the question: The traditional Kazakhstan food include … and … as well as … products',
        options: [
            'mutton, beshbarmak, mare’s (cow’s) milk' + '<br/>' + 'chicken, pork, kymyz',
            'turkey, chicken, milk' + '<br/>' + 'rolled dough, pork, airan',
            'ham, pork, airan' + '<br/>' + 'chicken, pork, kymyz',
            'mutton and horse beef, sour milk' + '<br/>' + 'mutton, beshbarmak, mare’s (cow’s) milk',
            'fried eggs, potato, milk' + '<br/>' + 'boiled potato, meat, milk',
        ],
        rightAnswer: 3
    },
    {
        question: 'The United Kingdom consists of … .',
        options: [
            'Scotland, Ireland' + '<br/>' + 'the West End, the East End',
            'the City, Westminster' + '<br/>' + 'the Strait of Dover, Wales',
            'Wales, Northern Ireland' + '<br/>' + 'England, Scotland',
            'the English Channel, England' + '<br/>' + 'the West End, the East End',
            'the West End, the East End' + '<br/>' + 'the City, Westminster',
        ],
        rightAnswer: 2
    },
    {
        question: 'Find the ordinal numbers:',
        options: [
            'two hundred and three',
            'fifteen hundred' + '<br/>' + 'twenty fourteen' + '<br/>' + 'seventeen oh five',
            'eighteen hundred' + '<br/>' + 'fifteen hundred',
            'twenty fourteen' + '<br/>' + 'two hundred and three' + '<br/>' + 'seventeen oh five',
            'one hundredth' + '<br/>' + 'one thousandth' + '<br/>' + 'twenty-seventh',
        ],
        rightAnswer: 4
    },
    {
        question: 'Find singular nouns:',
        options: [
            'politics' + '<br/>' + 'athletics' + '<br/>' + 'maths',
            'men' + '<br/>' + 'women',
            'actresses' + '<br/>' + 'roses',
            'men' +  '<br/>' + 'women' + '<br/>' + 'streets',
            'actresses',
        ],
        rightAnswer: 0
    },
    {
        question: 'The superlative of good:',
        options: [
            'the most good',
            'the best',
            'the better',
            'the goodest',
            'the most best',
        ],
        rightAnswer: 1
    },
    {
        question: 'The city is … than the country.',
        options: [
            'noisy',
            'the most noisy',
            'more noisy',
            'noisier',
            'the noisiest',
        ],
        rightAnswer: 3
    },
    {
        question: 'Find the false statement(-s) is(-are):',
        options: [
            'The House of Lords is the Upper House of the Parliament' + '<br/>' + 'The place of the Parliament is in Westminster in London',
            'The place of the Parliament is in Westminster in London' + '<br/>' + 'The UK Parliament has 3 elements: the Queen, the Commons and the Lords' + '<br/>' + 'Parliament is separated from the government',
            'People elect the members of the House of Lords' + '<br/>' + 'The Prime Minister is a part of the House of Lords' + '<br/>' + 'The House of Commons is the Upper House of the Parliament',
            'The UK Parliament has 3 elements: the Queen, the Commons and the Lords',
            'Parliament is separated from the government',
        ],
        rightAnswer: 2
    },
    {
        question: 'Fifteen and seventeen is ...',
        options: [
            'thirty one',
            'fifty five',
            'seventy two',
            '44' + '<br/>' + 'twenty four',
            '32' + '<br/>' + 'thirty two',
        ],
        rightAnswer: 4
    },
    {
        question: 'Find the antonym: My mother is very patient.',
        options: [
            'impatient',
            'rude',
            'kind',
            'friendly',
            'helpful',
        ],
        rightAnswer: 0
    },
    {
        question: 'Choose the right statements:',
        options: [
            'The Russians prepare very tasty kuyrdak' + '<br/>' + 'The traditional Kazakh dish is plov',
            'The Kazakhs prepare very tasty kuyrdak' + '<br/>' + 'Beshparmak is served with large pieces of rolled dough',
            'The traditional Kazakh dish is pelmeni' + '<br/>' + 'The traditional Kazakhstan food includes mutton and horse-beef',
            'Baursaki was served with large pieces of rolled dough',
            'The French prepare very tasty kuyrdak',
        ],
        rightAnswer: 1
    },
    {

        question: 'A:Are there… apples in your fridge?' + '<br/>' + 'B: Yes, there are …',
        options: [
            'some /any',
            'little/ some',
            'no /some',
            'any / some',
            'some /some',
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
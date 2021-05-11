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
        question: 'In England 93 per cent of children attend state schools.',
        options: [
            'nineteen three',
            'ninety-third',
            'nine three',
            'ninety and three',
            'ninety-three ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Choose the plural of the word “An Umbrella”:',
        options: [
            'Umbrellaes',
            'Umbrelles',
            'Umbrels',
            'Umbrellas',
            'Umbrell',
        ],
        rightAnswer: 3
    },
    {
        question: '“… is absent”-said Kate to the teacher.',
        options: [
            'anything',
            'anybody',
            'nobody',
            'some',
            'any',
        ],
        rightAnswer: 2
    },
    {
        question: 'Jane enjoys … to music.',
        options: [
            'listen ',
            'listening',
            'listened ',
            'to listening',
            'to listen',
        ],
        rightAnswer: 1
    },
    {
        question: 'Fifteen and seventeen is ...',
        options: [
            '32' + br + 'thirty two',
            'twenty four' + br  + '44',
            'thirty one' + br + 'fifty five',
            'twenty two' + br + '44',
            'seventy two',
        ],
        rightAnswer: 0
    },
    {
        question: 'If I … you, I …less sweets.',
        options: [
            'would / would',
            'was / eat',
            'are / don’t eat',
            'is / won’t eat',
            'were / would eat',
        ],
        rightAnswer: 4
    },
    {
        question: 'Choose the right statements:',
        options: [
            'The traditional Kazakhstan food includes mutton and horse-bee',
            'The Russians prepare very tasty kuyrdak',
            'The French prepare very tasty kuyrdak' + br + 'The traditional Kazakh dish is pelmeni ',
            'Beshparmak is served with large pieces of rolled dough' + br + 'The Kazakhs prepare very tasty kuyrdak',
            'The traditional Kazakh dish is plov' + br + 'The traditional Kazakhstan food includes mutton and horse-beef ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Whose socks are these? – They are … .',
        options: [
            'their ',
            'my ',
            'mine',
            'your ',
            'her ',
        ],
        rightAnswer: 2
    },
    {
        question: 'You must … it at once.',
        options: [
            'to do',
            'do ',
            'done ',
            'did ',
            'does ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Choose the second form of the verb “to lose”',
        options: [
            'Lost ',
            'To losed',
            'Losing',
            'Losed',
            'To lost',
        ],
        rightAnswer: 0
    },
    {
        question: 'Correct statements:',
        options: [
            'Marat Beisengaliev lived in Great Britain for a long time',
            'Marat Beisengaliev is the famous architect' + br + 'Marat Beisengaliev was a young famous pianist',
            'Marat Beisengaliev has never left Kazakhstan' + br + 'Marat Beisengaliev has never lived abroad',
            'Marat Beisengaliev was born in the USA' + br + 'Marat Beisengaliev lived in Great Britain for a long time',
            'Marat Beisengaliev won a prize in Leipzig' + br + 'Marat Beisengaliev studied in Moscow',
        ],
        rightAnswer: 4
    },
    {
        question: 'The United Kingdom consists of … .',
        options: [
            '',
            'the City, Westminster' + br + 'the Strait of Dover, Wales',
            'the English Channel, England' + br + 'Scotland, Ireland',
            'England, Scotland' + br + 'Wales, Northern Ireland',
            'British Isles, Wales' + br + 'the West End, the East End',
        ],
        rightAnswer: 3
    },
    {
        question: 'The levels of the system of education in Kazakhstan.',
        options: [
            'religious schools',
            'tertiary institutions',
            'primary schools' + br + 'secondary schools',
            'private schools' + br + 'schools',
            'boarding schools',
        ],
        rightAnswer: 2
    },
    {
        question: 'Choose a compound word:',
        options: [
            'Championship',
            'Schoolbag',
            'Beautiful',
            'Nationality',
            'Tomorrow',
        ],
        rightAnswer: 1
    },
    {
        question: 'Marat is fond … pop music.',
        options: [
            'of',
            'in',
            'for',
            'with',
            'after',
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
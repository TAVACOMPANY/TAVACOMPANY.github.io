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
        question: 'The boss urged the staff ............... this splendid opportunity he was offering them.',
        options: [
            'why not miss',
            'to miss',
            'not to miss',
            'would not miss',
            'about missing',
        ],
        rightAnswer: 2
    },
    {
        question: 'According to the estimate there are _____ or ______ 85,000 people who have joined today`s rally asking for the resignation of president.',
        options: [
            'much/more than',
            'the more / the less',
            'more/ fewer than',
            'more / less',
            'less/ fewer than',
        ],
        rightAnswer: 3
    },
    {
        question: 'Business diversity is associated with walking trips. Having four or more different types of businesses in a neighborhood significantly increased the number of walking trips among residents. This is probably true because of added convenience ______.',
        options: [
            'Residents are able to accomplish multiple routine errands in a single walking trip and thus may drive less',
            'A greater number of four-way intersections was also associated with more walking',
            'Neighbourhood age, and block length aren`t associated with walking',
            'The effects of housing density had been mixed',
            'Children living in close-knit neighborhoods are less likely to be overweight than children who don’t',
        ],
        rightAnswer: 0
    },
    {
        question: 'The ballet stage is a bright, seemingly weightless world where gravity is continually being _____ by the dancers.',
        options: [
            'Reflected',
            'Defied',
            'Prolonged',
            'Unbalanced',
            'Reapportioned',
        ],
        rightAnswer: 1
    },
    {
        question: 'Joe Louis was a /an ____ fighter: he inspired fear in many of his opponents.',
        options: [
            'Insipid',
            'Malleable',
            'Impetuous',
            'Serene',
            'Redoubtable',
        ],
        rightAnswer: 4
    },
    {
        question: 'The proportion of English, who are severely obese, increased by 50 percent from 2000 to 2005, twice _____ the growth seen in moderate obesity.',
        options: [
            'too fast',
            'fast enough',
            'so fast as',
            'as fast as',
            'so fast that',
        ],
        rightAnswer: 3
    },
    {
        question: 'Jane Addams was a peacemaker even when she was criticized for her views. She taught, wrote, and lectured about peace both nationally and internationally. Before World War I, Addams was probably the most beloved woman in America. In a newspaper poll that asked, "Who among our contemporaries are of the most value to the community?"_____',
        options: [
            'Addams`s repuation gradually was restored during the last years of her life.',
            'But she never changed her mind.',
            'Addams was second, after Thomas Edison',
            'When she opposed America’s involvement in WW I, newspapers called her a traitor.',
            'Have you ever believed she was right about something?',
        ],
        rightAnswer: 2
    },
    {
        question: 'With the 1969 film The Learning Tree, Gordon Parks proved what a truly _____ artist he was: he not only directed the film and composed its musical score, but also adapted its screenplay from his own novel',
        options: [
            'Protean',
            'Clairvoyant',
            'Complacent',
            'Lauded',
            'Harried',
        ],
        rightAnswer: 0
    },
    {
        question: 'I imagine Sally was about ---- when I asked her ---- a letter for me, as she looked rather reluctant.',
        options: [
            'to be leaving / typing',
            'to have left / type',
            'having left / typed',
            'leaving / to have typed',
            'to leave / to type',
        ],
        rightAnswer: 4
    },
    {
        question: 'This year, oil exporters could haul in $700 billion from selling oil to foreigners. This includes not only the Organisation of Petroleum Exporting Countries (OPEC) but also Russia and Norway, the world`s second- and third-biggest earners. _____ . In real terms, this is almost double their dollar surpluses in 1974 and 1980 when Russia`s hard-currency exports were tiny.',
        options: [
            'The rise in oil prices represents a big redistribution of income from those who buy oil to those who produce it',
            'The IMF estimates that oil exporters currentaccount surplus could reach $400 billion, more than four times as much as in 2002',
            'Relative to their economies, the oil producers` current-account 0 surpluses are far bigger than China`s',
            'If oil exporters spend their bonanza, they import more from other countries and thus help to maintain global demand',
            'The combined current-account surplus of China and other Asian emerging economies is put at only $188 billion this year',
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
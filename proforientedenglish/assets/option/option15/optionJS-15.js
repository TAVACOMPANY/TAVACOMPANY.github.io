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
        question: 'Magic is used to overcome and help the good. However, it is portrayed as a positive element to be used in our daily life.______This emphasizes asserts that can be resolved through human willpower and effort.',
        options: [
            'However, it is implied that black magic is used for murder and death',
            'Children, to- whom we one day will hand over the future, can be saved only in this way',
            'Thus, all daily behaviors are associated with magic',
            'As a result, they use their father’s cars without permission, lie to cover up incidents',
            'There had been a new wave of increasing violence in children’s films, books and toys',
        ],
        rightAnswer: 2
    },
    {
        question: 'Marry is always seeing her doctor, for she doesn’t care_____ her health at all.',
        options: [
            'Of',
            'With',
            'About',
            'For',
            'In',
        ],
        rightAnswer: 3
    },
    {
        question: 'Alice Tyson has Xeroderma Pigmentosum which means exposure _____ sunlight increases her risk _____ getting cancer or going blind.',
        options: [
            'to/of',
            'in / through',
            'by/for',
            'fo r/a t',
            'on / in',
        ],
        rightAnswer: 0
    },
    {
        question: '_____ the danger of a particular insurgency is recognized, _____ likely it is that the military intervention will have to be considered.',
        options: [
            'So early / little',
            'The earlier / the less',
            'Such earlier / less than',
            'The earliest / the least',
            'Much earlier / less',
        ],
        rightAnswer: 1
    },
    {
        question: 'The rumor was of the ____ variety, spreading slowly and almost imperceptibly until, finally, everyone seemed to have heard the story',
        options: [
            'Expeditious',
            'Aggressive',
            'Dilatory',
            'Manifest',
            'Insidious',
        ],
        rightAnswer: 4
    },
    {
        question: 'Scientists are studying the birth and growth of thunderstorms to discover what causes the difference between showers that enable crops to _____ and violent storms that cause floods and erosions.',
        options: [
            'Multiply',
            'Flourish',
            'Parch',
            'Grow',
            'Wither',
        ],
        rightAnswer: 3
    },
    {
        question: 'In English there are many different kinds of expressions that people use to give a name to anything whose name is unknown or momentarily forgotten. The word gatget is one such word.______ . In everyday use, the word has a more general meaning. Other words are also used to give a name to something unnamed or unknown, and these words tend tp be somewhat imaginative.',
        options: [
            'Some words are used to name something when the name is not known',
            'English language has some troublesome words difficult to be pronounced',
            'It was first used by British sailors in the 1850’s and probably from French',
            'The word “Geomorphology” includes the surface of the earth',
            'Not is every language are all words original',
        ],
        rightAnswer: 2
    },
    {
        question: 'The fact that MTV, the cable channel devoted primarily to music, provided extensive coverage of the 1992 presidential race demonstrates how _____ politics and popular music culture have become.',
        options: [
            'Interrelated',
            'Permeated',
            'Contradictory',
            'Enclosed',
            'Obscured',
        ],
        rightAnswer: 0
    },
    {
        question: 'The report benchmarks the number of annual deaths caused globally by pollution from marine vessels, with coastal regions in Asia and Europe ______.',
        options: [
            'more affecting',
            'as affected',
            'Affecting',
            'the most affecting',
            'the most affected',
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
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
        question: 'In the neighbourhood _____ 10 to 14 percent of patients who go to see their doctor have depression.',
        options: [
            'so much as',
            'such as',
            'as many as',
            'as much as',
            'so many that',
        ],
        rightAnswer: 2
    },
    {
        question: 'Biscuit-makers both in Europe and Latin America have not done _____ hoped.',
        options: [
            'so well that',
            'so good as',
            'as good as',
            'as well as',
            'Better',
        ],
        rightAnswer: 3
    },
    {
        question: 'The many land and sea animals provide a source of food _____ income for the locals.',
        options: [
            'as well as',
            'as',
            'such',
            'more than',
            'so well',
        ],
        rightAnswer: 0
    },
    {
        question: 'A study into the `black sheep effect`, shows that children treat disloyalty in their own group _____ within different groups.',
        options: [
            'so harshly that',
            'more harshly than',
            'the most harshly',
            'as harsh as',
            'so harsh as',
        ],
        rightAnswer: 1
    },
    {
        question: 'Heart disease is the leading killer of women and men in the United States, and high blood pressure is a major contributor to _____ problems______ heart attack and stroke.',
        options: [
            'either / or',
            'whether / or',
            'so / that',
            'such / that',
            'such / as',
        ],
        rightAnswer: 4
    },
    {
        question: '“Information wants to be free,” according to a celebrated aphorism from the early days of the internet. ____ . As search-engine firms and others unveil plans to place books online, publishers fear that the services may end up devouring their business, either by bypassing them or because the initiatives threaten to make their copyrights redundant.',
        options: [
            'The cost of digitising a book can be as low as 10 cents per page, and as much as $100 per book',
            'A digitisation initiative dating back to the 1970s, currently boasts over 17,000 books in around 45 languages',
            'This summer, European nations backed a “digital library" plan to place literary works online',
            'Yet this ethos has been creating new headaches recently',
            'For readers, the idea of being able to access the knowledge on a single device seems a benefit of mythic proportions',
        ],
        rightAnswer: 3
    },
    {
        question: 'Pollution from marine shipping causes _____ 60,000 premature cardiopulmonary and lung cancer deaths around the world each year.',
        options: [
            'Apprehensively',
            'Primarily',
            'Approximately',
            'Extensively',
            'Appropriately',
        ],
        rightAnswer: 2
    },
    {
        question: 'Institutions and TOEFL score recipients that note ______ inconsistencies ______ high TOEFL scores and apparent weak English proficiency should refer to the photo on the official score report for evidence of impersonation.',
        options: [
            'such / as',
            'more/ than',
            'so / that',
            'such /that',
            'as / as',
        ],
        rightAnswer: 0
    },
    {
        question: 'Although Rolf is usually quite____ , he was so angered by the salesman’s rude remarks that he insisted on complaining to the manager.',
        options: [
            'Tractable',
            'Diffident',
            'Plucky',
            'Valiant',
            'Timorous',
        ],
        rightAnswer: 4
    },
    {
        question: 'Lisa _____ me a lift because I _____ the bus.',
        options: [
            'gave / was missing',
            'gave / had missed',
            'had gave / missed',
            'had / miss',
            'have given / have missed',
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
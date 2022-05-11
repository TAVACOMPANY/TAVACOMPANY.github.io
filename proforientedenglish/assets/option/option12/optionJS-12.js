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
        question: 'One of the more interesting ideas to emerge from America`s soulsearching after the turn-of-the-century corporate scandals is that its leading business schools may have neglected to teach students about the moral dimension of being a CEO. _____ . Harvard, Stanford and others have since scrambled to introduce business-ethics classes, but for any aspiring boss not fortunate enough to attend.',
        options: [
            'Unlike most of the finger-waggers who berate CEOs these days, Mr Hindery has been one himself',
            'Realistically, it is boards of directors and large shareholders who have the power',
            'Instead, they focus on management mainly as a science of numbers',
            'On the positive side, they argued that CEOs should have tried to make a difference to society beyond making a return for shareholders',
            'The book recounts how Disney .B bullied Miramax, into dropping "Fahrenheit 9/11", a controversial Michael Moore documentary',
        ],
        rightAnswer: 2
    },
    {
        question: 'Many of the misconceptions about Queen Victoria were created by those who_____ her most; in their efforts to depict her as a model of all virtues, they lost sight of the real woman.',
        options: [
            'Impressed',
            'Challenged',
            'Censured',
            'Admired',
            'Esteemed',
        ],
        rightAnswer: 3
    },
    {
        question: '_____ . Some plants, such as cactus, are able to store large amounts of water in their leaves or stems. After a rainfall these plants absorb a large supply of water to last until the mesquite, have extraordinarily deep root systems that allow them to obtain water from far below the desert’s arid surface.',
        options: [
            'Desert plants have a variety of mechanisms for obtaining the water needed for survival',
            'Many kinds of vegetation can survive with little water',
            'Most people think of deserts as dry, flat areas with little vegetation and little or no rainfall',
            'Deserts are dry, flat areas with few plants which need no water',
            'Many deserts have varied geographical formations ranging from soft, rolling hills',
        ],
        rightAnswer: 0
    },
    {
        question: 'Two years after the end of the first world war, America passed the Jones Act. _____ . The war had convinced lawmakers of the need to foster a homegrown fleet for use in times of conflict or national emergency. In 1944, while a more modern war still raged in Europe, governments meeting in Chicago took inspiration from the Jones Act while laying down the regulations that would govern international air transport. These were crafted to safeguard the vital strategic role of each country’s “flag carrying” national airline.',
        options: [
            'And restrictions on foreign ownership of airlines, in the name of national security, have prevented the competition that has preserved the vitality of other industries',
            'This restricted the shipping of goods between home ports to American owned vessels',
            'On Monday November 14th, a new round of “open skies" negotiations is set to begin between Europe and America',
            'This is the latest in a series of attempts in recent years to unpick the anti-competitive -measures that were put in place in Chicago',
            'For decades, arcane rules on routes and frequencies have distorted the market for aviation',
        ],
        rightAnswer: 1
    },
    {
        question: 'Professor Chen believes that the universal character of art refutes the prevailing notion that art is a _____ of civilization, a cultural frill, a social veneer.',
        options: [
            'Depiction',
            'Hallmark',
            'Guarantee',
            'Record',
            'Luxury',
        ],
        rightAnswer: 4
    },
    {
        question: 'Stem cells may turn out to be a/an ______alternative to animal testing.',
        options: [
            'Summary',
            'Luminous',
            'Pensive',
            'Promising',
            'Usual',
        ],
        rightAnswer: 3
    },
    {
        question: 'In denying the convicted felon`s request for a retrial, the judge explained that the evidence demonstrating the man’s guilt was______.',
        options: [
            'Exculpatory',
            'Debatable',
            'Incontrovertible',
            'Auspicious',
            'Irrelevant',
        ],
        rightAnswer: 2
    },
    {
        question: 'The hall was very ... with over fifty people stuck into it.',
        options: [
            'Crowded',
            'Empty',
            'Decorated',
            'Painted',
            'Designed',
        ],
        rightAnswer: 0
    },
    {
        question: 'She lives near me I often speak to her on my ... to work.',
        options: [
            'Travel',
            'Path',
            'Road',
            'Street',
            'Way',
        ],
        rightAnswer: 4
    },
    {
        question: 'The hotel has been built on the ... of a lake.',
        options: [
            'Front',
            'Edge',
            'Boundary',
            'Border',
            'Behind',
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
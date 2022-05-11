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
        question: 'The child woke up crying because she had ... a nightmare.',
        options: [
            'Sent',
            'Felt',
            'Had',
            'Saw',
            'Dreamt',
        ],
        rightAnswer: 2
    },
    {
        question: 'We started early ... to miss the worst of the traffic.',
        options: [
            'so long as',
            'in so far',
            'in order',
            'so that',
            'in case',
        ],
        rightAnswer: 3
    },
    {
        question: 'Have you heard the great news, Anton? The man, ............... refused your proposal last year, has been arrested for embezzlement of government funds.',
        options: [
            'whose daughter',
            'who have repeatedly',
            'whom',
            'that',
            'when he',
        ],
        rightAnswer: 0
    },
    {
        question: 'The police put the _____ for the accident_____ the driver of the car.',
        options: [
            'charge / with',
            'blame / on',
            'accuse / of',
            'responsibility / for',
            'ticket / for',
        ],
        rightAnswer: 1
    },
    {
        question: 'Wynton Marsalis _____as one of the great trumpeters of the late twentieth century, winning Grammy awards for both his jazz and classical works.',
        options: [
            'Occurred',
            'Fluctuated',
            'Suggested',
            'Settled',
            'Emerged',
        ],
        rightAnswer: 4
    },
    {
        question: 'Don’t you think we should consider ---- the chimney ---- before the winter?',
        options: [
            'to have got / sweep',
            'having got / sweeping',
            'to be getting / to sweep',
            'getting / swept',
            'to get / being swept',
        ],
        rightAnswer: 3
    },
    {
        question: 'In recent weeks, the world’s public health officials have been afflicted with a sort of pandemic of meetings about bird flu. _____ . Plans were hatched for how best to respond to the threat from a virus that is threatening poultry around the world and which, it is feared, may trigger a pandemic of human flu.',
        options: [
            'Everyone seems to agree that the ; best strategy for dealing with the threat of a human pandemic is to control flu in birds',
            'In the short term, international agencies such as the WHO, the FAO and the DIE say they need about $80m to respond',
            'Much of this culminated, this week, in a meeting of officials from nations at the headquarters of the WHO in Geneva',
            'Countries such as Japan have reacted quickly to eliminate outbreaks of highly pathogenic bird flu',
            'It is increasingly clear that the world’s richer nations will have to pay for these countries to raise their capacity in these areas',
        ],
        rightAnswer: 2
    },
    {
        question: 'Last November, a landmark paper showed that stem-cell-like tumor cells with a signature protein are actually _____ to radiation ______ other brain cancer cells.',
        options: [
            'more resistant / than',
            'as resistantly / as',
            'so resistant / as',
            'such resistantly / that',
            'so resistant / that',
        ],
        rightAnswer: 0
    },
    {
        question: 'To Judith, traveling was______her sister, however, looked upon each trip as an interminable experience',
        options: [
            'Stupefying',
            'Confusing',
            'Joyous',
            'Tiring',
            'Exhilarating',
        ],
        rightAnswer: 4
    },
    {
        question: 'No actor in the 20th century broke down _____ barriers in Hollywood _____ did Poitier',
        options: [
            'much / as',
            'more / than',
            'not only / but also',
            'rather / than',
            'either / or',
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
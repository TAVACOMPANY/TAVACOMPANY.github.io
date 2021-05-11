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
        question: 'Choose the correct word order in the imperative sentence:',
        options: [
            'Do not the windows close!',
            'Not do the windows close!',
            'Do the windows not close!',
            'The windows do not close!',
            'Do not close the windows!',
        ],
        rightAnswer: 4
    },
    {
        question: '869 in English is:',
        options: [
            'eight hundred sixty-three',
            'eight hundred sixty-five',
            'seven hundred and sixty-nine ',
            'eight hundred and sixty-nine ',
            'eight hundred sixty-nine',
        ],
        rightAnswer: 3
    },
    {
        question: 'Choose an adjective in comparative degree:',
        options: [
            'best ',
            'largest ',
            'nicer ',
            'best ',
            'good ',
        ],
        rightAnswer: 2
    },
    {
        question: 'What date is it today? – It is 17th May.',
        options: [
            'May seventeen',
            'the seventeenth of May',
            'the seventieth of May',
            'seventy of May',
            'seventeen of May',
        ],
        rightAnswer: 1
    },
    {
        question: 'How many parts is London traditionally divided into?',
        options: [
            '4',
            '3',
            '2',
            '5',
            '6',
        ],
        rightAnswer: 0
    },
    {
        question: 'The book was … than the film.',
        options: [
            'the most exciting',
            'the exciting',
            'most exciting',
            'exciting ',
            'more exciting',
        ],
        rightAnswer: 4
    },
    {
        question: 'When I came home, somebody ____ my ice-cream.',
        options: [
            'ate',
            'has eaten',
            'had ate',
            'had eaten',
            'have eaten',
        ],
        rightAnswer: 3
    },
    {
        question: 'Synonym of the word “clever” is:',
        options: [
            'Lazy ',
            'Lively ',
            'Smart ',
            'Silent ',
            'Shy ',
        ],
        rightAnswer: 2
    },
    {
        question: 'We are going … Buckingham Palace',
        options: [
            'visited',
            'to visit',
            'visit ',
            'visiting ',
            'to not visit',
        ],
        rightAnswer: 1
    },
    {
        question: 'Are you going to have dinner now? - …',
        options: [
            'Yes, I am',
            'No, I won’t',
            'No, I shan’t',
            'Yes, I will',
            'Yes, it is',
        ],
        rightAnswer: 0
    },
    {
        question: 'Choose the right article:' + br + 'He threw ... stone at ... dog which was passing me in the street.',
        options: [
            '- | a ',
            '- | the',
            'the | -',
            'a | a',
            'a | the ',
        ],
        rightAnswer: 4
    },
    {
        question: 'A word in which the vowel “i” is read differently from others:',
        options: [
            'windy ',
            'wind ',
            'think ',
            'while',
            'visit ',
        ],
        rightAnswer: 3
    },
    {
        question: 'A tiger is as … as a lion',
        options: [
            'More strong',
            'Much stronger',
            'Strong',
            'The stronges',
            'Stronger',
        ],
        rightAnswer: 2
    },
    {
        question: 'My dentist says I … eat so many sweets.',
        options: [
            'Haven’t',
            'Mustn’t',
            'Hadn’t to ',
            'Needn’t',
            'Ought to not',
        ],
        rightAnswer: 1
    },
    {
        question: 'The teacher asked the class to do the exercіse ... the bottom of page 7.',
        options: [
            'at',
            'on',
            'to ',
            'from ',
            'іn ',
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
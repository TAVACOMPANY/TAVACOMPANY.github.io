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
        question: 'I had … hamburger and … cup of coffee for lunch.',
        options: [
            'a / the',
            'the / the',
            'the / a',
            'a / an',
            'a / a ',
        ],
        rightAnswer: 4
    },
    {
        question: '2/4',
        options: [
            'two and four',
            'two point four',
            'two four',
            'two quarters ',
            'twenty four',
        ],
        rightAnswer: 3
    },
    {
        question: 'My … sister doesn’t live with us.',
        options: [
            'more older',
            'old ',
            'elder ',
            'older ',
            'eld ',
        ],
        rightAnswer: 2
    },
    {
        question: 'If they … stop talking, the teacher … be angry.',
        options: [
            'don’t / don’t ',
            'don’t / will',
            'will / don’t',
            'doesn’t / doesn’t ',
            'won’t / will',
        ],
        rightAnswer: 1
    },
    {
        question: '«Does he like his job?», she wondered.',
        options: [
            'She wondered whether he liked his job' + br + 'She wondered if he liked his job',
            'She wondered if she likes his job' + br + 'She wondered if she would like his job',
            'She wondered if he likes his job' + br + 'She wondered if he like his job ',
            'She wondered if she did liked her job',
            'She wondered if he had liked his job',
        ],
        rightAnswer: 0
    },
    {
        question: 'You … have an annual check-up.',
        options: [
            'must to',
            'can’t ',
            'can to',
            'don’t need',
            'should',
        ],
        rightAnswer: 4
    },
    {
        question: 'Those photos on the table are ... .',
        options: [
            'my ',
            'the mine ',
            'their ',
            'mine',
            'our ',
        ],
        rightAnswer: 3
    },
    {
        question: 'I can’t believe you drove ___ long way to visit her.',
        options: [
            'as ',
            'Such',
            'Such a',
            'Such as',
            '–',
        ],
        rightAnswer: 2
    },
    {
        question: 'After Harris had failed his exams three times, he gave … trying to enter the college.',
        options: [
            'on ',
            'up ',
            'for ',
            'of ',
            'at ',
        ],
        rightAnswer: 1
    },
    {
        question: 'The author is … popular than that one.',
        options: [
            'less ',
            'the least',
            'little ',
            'the most',
            'much ',
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
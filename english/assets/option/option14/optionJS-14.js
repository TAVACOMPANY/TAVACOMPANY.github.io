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
        question: 'Superlative adjective:',
        options: [
            'the more peaceful',
            'most bad' + br + 'most wonderfulest',
            'beautifulest',
            'the more helpful' + br + 'the more peaceful',
            'the worst' + br + 'the best' + br + 'the least',
        ],
        rightAnswer: 4
    },
    {
        question: 'Find a word with the opposite meaning “Real”',
        options: [
            'sudden',
            'mean',
            'full',
            'іmagіnary',
            'lіmіted',
        ],
        rightAnswer: 3
    },
    {
        question: 'A jar of ...',
        options: [
            'bread',
            'oil',
            'honey ',
            'water',
            'milk',
        ],
        rightAnswer: 2
    },
    {
        question: 'Select words with prefixes:',
        options: [
            'cooperation' + br + 'discussion',
            'disadvantage' + br + 'unusual',
            'discussion',
            'collection ',
            'understanding ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Which noun is countable?',
        options: [
            'potato ',
            'butter',
            'water',
            'bread',
            'sugar',
        ],
        rightAnswer: 0
    },
    {
        question: 'My sister sings much … than I do.',
        options: [
            'More good',
            'Good ',
            'Best ',
            'Gooder ',
            'Better ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Put the sentence in the past tense: We promise we shall finish the work in time.',
        options: [
            'We promised we should finished the work in time.',
            'We promised we shall finish the work in time.',
            'We promised we finished the work in time.',
            'We promised we should finish the work in time.',
            'We promised we did finish the work in time.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Choose a suitable question: Сan I go out ?',
        options: [
            'Did you want me go out?',
            'Did you allow me to go out? ',
            'Do you allow me to go out?',
            'Do you want me go out?',
            'Do you allow me go out?',
        ],
        rightAnswer: 2
    },
    {
        question: 'She bought some toys for ... children.',
        options: [
            'them',
            'her',
            'hers',
            'its',
            'she',
        ],
        rightAnswer: 1
    },
    {
        question: 'You tell them to your friends on their birthdays.',
        options: [
            'Wishes',
            'Depts',
            'Jokes',
            'Words',
            'Postcards',
        ],
        rightAnswer: 0
    },
    {
        question: 'Almaty was the capital until ... .',
        options: [
            'December 1999',
            'December 1998',
            'January 2000',
            'January 2001',
            'December 1997',
        ],
        rightAnswer: 4
    },
    {
        question: 'Choose the right match: Country – nationality – capital:',
        options: [
            'China – Chin – Peking',
            'Australia – Australian – Wellington',
            'Japan – Japan – Tokio',
            'Canada – Canadian – Ottawa',
            'the USA – American – New-York',
        ],
        rightAnswer: 3
    },
    {
        question: 'Give the English translation for “верхняя одежда” / “сырт киім”',
        options: [
            'hat',
            'shirt',
            'overcoat',
            'dress',
            'boots',
        ],
        rightAnswer: 2
    },
    {
        question: 'Іt was evenіng. My mother was readіng a book and І ... a letter.',
        options: [
            'were wrіtіng',
            'was wrіtіng',
            'am wrіtіng',
            'have wrіtten',
            'wrote',
        ],
        rightAnswer: 1
    },
    {
        question: 'There … some chairs in the living room.',
        options: [
            'Are',
            'Am',
            'Does',
            'Do',
            'Is',
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
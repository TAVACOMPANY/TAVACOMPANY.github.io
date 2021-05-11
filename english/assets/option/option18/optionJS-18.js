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
        question: 'The opposite word for “finish”:',
        options: [
            'write ',
            'open ',
            'eat ',
            'drop ',
            'begin ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Select an extra word:',
        options: [
            'Spoon ',
            'Fork ',
            'Plate ',
            'Carrot',
            'Knife ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Choose the correct sentence with Infinitive:',
        options: [
            'Avoid to stay under the direct sunrays for a long time',
            'I gave up to smoke' + br + 'Stop talking, please' + br + 'She goes swimming every day',
            'I want somebody to read the question' + br + 'She pretended to be ill' + br + 'She asked me to translate the text',
            'To swam is good for health',
            'I gave up to smoke ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Secondary education in Britain is…',
        options: [
            'private ',
            'compulsory ',
            'compulsive',
            'voluntary ',
            'optional ',
        ],
        rightAnswer: 1
    },
    {
        question: 'I caught two … .',
        options: [
            'fish ',
            'butterfly',
            'hare',
            'fishs',
            'fishes',
        ],
        rightAnswer: 0
    },
    {
        question: 'Choose simple affirmative sentences:',
        options: [
            'There isn’t apple' + br + 'What did you wear?',
            'There isn`t a biscuit' + br + 'There isn`t any cheese',
            'Do you like ice-cream?' + br + 'There isn`t any cheese',
            'How much is that?' + br + 'There isn`t any cheese',
            'There is some fruit' + br + 'There are some grapes',
        ],
        rightAnswer: 4
    },
    {
        question: 'The city is … than the country.',
        options: [
            'noisy',
            'the most noisy ',
            'the noisiest',
            'noisier',
            'more noisy',
        ],
        rightAnswer: 3
    },
    {
        question: 'The correct form of the auxiliary verb: ... your teacher give you a lot of homework when you studied at school?',
        options: [
            'Does ',
            'Will ',
            'Did',
            'Has ',
            'Have ',
        ],
        rightAnswer: 2
    },
    {
        question: 'The UK is washed by…',
        options: [
            'Polack Sea' + br + 'the Black Sea',
            'the Atlantic Ocean' + br + 'the North Sea',
            'the Indian Ocean' + br + 'Mediterranean Sea',
            'the Pacific Ocean',
            'the Baltic Sea',
        ],
        rightAnswer: 1
    },
    {
        question: 'I have … lessons today.',
        options: [
            'no ',
            'nothing ',
            'somebody ',
            'something ',
            'anything',
        ],
        rightAnswer: 0
    },
    {
        question: 'Possessive form of singular nouns:',
        options: [
            'teachers’ room',
            'birds’ eggs',
            'women’s magazines',
            'actresses’ dresses' + br + 'teachers’ room',
            'sister’s clothes' + br + 'man’s bag' + br + 'mother’s decision',
        ],
        rightAnswer: 4
    },
    {
        question: 'The correct word order in the imperative sentence:',
        options: [
            'Not do forget to lock the door!',
            'Forget do not to lock the door!',
            'To the door do not forget lock!',
            'Do not forget to lock the door!',
            'The door not do forget to lock!',
        ],
        rightAnswer: 3
    },
    {
        question: 'The superlative of good:',
        options: [
            'the most best',
            'the better',
            'the best ',
            'the most good',
            'the goodest',
        ],
        rightAnswer: 2
    },
    {
        question: 'Choose the right sentence:',
        options: [
            'This is my friend flat',
            'This is my friend’s flat ',
            'This is my flats friend',
            'This is my friends flat',
            'This is my flat’s friend',
        ],
        rightAnswer: 1
    },
    {
        question: 'I have not seen ... English films.',
        options: [
            'any ',
            'some ',
            'no ',
            'every ',
            'nothing ',
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
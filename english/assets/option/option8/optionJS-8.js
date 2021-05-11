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
        question: 'Select an extra word:',
        options: [
            'Fork',
            'Knife',
            'Spoon',
            'Plate',
            'Carrot',
        ],
        rightAnswer: 4
    },
    {
        question: 'Put in the verb in the correct form: Harry sometimes … the bus to school',
        options: [
            'missed',
            'has missed',
            'have missed',
            'miss',
            'misses',
        ],
        rightAnswer: 4
    },
    {
        question: 'Holidays can be good for your _______.',
        options: [
            'luggage',
            'country',
            'flat',
            'health',
            'earings',
        ],
        rightAnswer: 3
    },
    {
        question: 'Make a word: Y, i, d, a, r.',
        options: [
            'yiard',
            'dyria',
            'iadyr',
            'diary',
            'irday',
        ],
        rightAnswer: 3
    },
    {
        question: 'The opposite word for “finish”:',
        options: [
            'write',
            'eat',
            'begin',
            'open',
            'drop',
        ],
        rightAnswer: 2
    },
    {
        question: 'I ... be seventeen years old next week.',
        options: [
            'am to be',
            'should',
            'shall',
            'am',
            'would',
        ],
        rightAnswer: 2
    },
    {
        question: 'Synonym for the word “principal”: “The principal of school is Mr A.” In american English, the underlined word is for English ….',
        options: [
            'pupil',
            'headmaster',
            'manager',
            'teacher',
            'supervisor',
        ],
        rightAnswer: 1
    },
    {
        question: '... is a good film on TV tonight.',
        options: [
            'They`re',
            'There',
            'Their',
            'She',
            'He',
        ],
        rightAnswer: 1
    },
    {
        question: 'Very surprising and difficult to believe means …',
        options: [
            'amazing',
            'dangerous',
            'travelling',
            'anniversary',
            'boring',
        ],
        rightAnswer: 0
    },
    {
        question: 'A tiger is as … as a lion.',
        options: [
            'Strong',
            'The strongest',
            'Much stronger',
            'More strong',
            'Stronger',
        ],
        rightAnswer: 0
    },
    {
        question: 'This is … book I have ever read.',
        options: [
            'better',
            'gooder',
            'good',
            'worse',
            'the best',
        ],
        rightAnswer: 4
    },
    {
        question: 'The correct variant of the numeral: There are 351 books in Asan`s library',
        options: [
            'three hundreds and fifty-one books',
            'three hundreds fifty one of books',
            'three hundred fifty one books',
            'three hundreds fifty-one books',
            'three hundred and fifty-one books',
        ],
        rightAnswer: 4
    },
    {
        question: 'John lives in flat ... .',
        options: [
            'forth',
            'the fortieth',
            'fourty',
            'forty',
            'fortieth',
        ],
        rightAnswer: 3
    },
    {
        question: 'Choose general question to the sentence:' + '<br/>' + 'They have been asked to protect the environment from pollution',
        options: [
            'Did they have been asked to protect the environment from pollution?',
            'Have been asked they to protect the environment from pollution?',
            'Did they been asked to protect the environment from pollution?',
            'Have they been asked to protect the environment from pollution?',
            'Have been they asked to protect the environment from pollution?',
        ],
        rightAnswer: 3
    },
    {
        question: 'Give the English translation for “верхняя одежда” / “сырт киім”',
        options: [
            'shirt',
            'dress',
            'overcoat',
            'hat',
            'boots',
        ],
        rightAnswer: 2
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
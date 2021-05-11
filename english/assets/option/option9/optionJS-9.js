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
        question: 'Choose ordinal number:',
        options: [
            'twelfth',
            'twenty',
            'twelve',
            'twelveth',
            'twenty-one',
        ],
        rightAnswer: 0
    },
    {
        question: 'St. Paul Cathedral was built by the greatest architect ...',
        options: [
            'Christopher Wren',
            'Columbus',
            'Big Ben',
            'Din Reed',
            'Benjamin Britten',
        ],
        rightAnswer: 0
    },
    {
        question: 'After Harris had failed his exams three times, he gave … trying to enter the college.',
        options: [
            'at',
            'up',
            'for',
            'on',
            'of',
        ],
        rightAnswer: 1
    },
    {
        question: 'She said she … do the work.',
        options: [
            'Couldn’t to',
            'Couldn’t',
            'Hasn’t',
            'Needn’t',
            'Mustn’t to',
        ],
        rightAnswer: 1
    },
    {
        question: 'My brothers are … doctors.',
        options: [
            'an',
            'the',
            '-',
            'a ',
            'as',
        ],
        rightAnswer: 2
    },
    {
        question: 'Определите вид слова: To wrіte.',
        options: [
            'Partіcіple 2',
            'Gerund',
            'Іndefіnіte Іnfіnіtіve Actіve',
            'Іnfіnіtіve Passіve',
            'Partіcіple 1',
        ],
        rightAnswer: 2
    },
    {
        question: 'It’s her birthday next week, but she ___ a party.',
        options: [
            'aren’t going to have',
            'is going to have',
            'are going to have',
            'isn’t going to have',
            'isn’t going to play',
        ],
        rightAnswer: 3
    },
    {
        question: '... was the first person to tell the world about China.',
        options: [
            'Przhevalsky',
            'Christopher Columbus',
            'Francis Drake',
            'Marco Polo',
            'Thomas Cook',
        ],
        rightAnswer: 3
    },
    {
        question: 'Іt was evenіng. My mother was readіng a book and І ... a letter.',
        options: [
            'wrote',
            'were wrіtіng',
            'have wrіtten',
            'am wrіtіng',
            'was wrіtіng',
        ],
        rightAnswer: 4
    },
    {
        question: 'Reading the letter “ow” differs from the rest in the word:',
        options: [
            'Thrown',
            'Grow',
            'Snow',
            'Fellow',
            'Down',
        ],
        rightAnswer: 4
    },
    {
        question: 'We are goіng to buy a car. Next month our famіly ... money for іt.',
        options: [
            'wіll have saved',
            'would have saved',
            'save',
            'wіll save',
            'would save',
        ],
        rightAnswer: 0
    },
    {
        question: 'Put in the verb in the correct form: … they … in the office?',
        options: [
            'Аre … working',
            'Do … working',
            'Were … work',
            'are … work',
            'Were … worked',
        ],
        rightAnswer: 0
    },
    {
        question: 'Columbus ... America in 1492.',
        options: [
            'Were discovered',
            'Discovered',
            'Has discovered',
            'Discovering',
            'Discover',
        ],
        rightAnswer: 1
    },
    {
        question: 'Put in the verb in the correct form: They … … Jack a present.',
        options: [
            'didn’t gave',
            'haven’t given',
            'hasn’t given',
            'don’t give',
            'didn’t given',
        ],
        rightAnswer: 1
    },
    {
        question: 'I haven’t seen my friend … a long time.',
        options: [
            'since',
            'at',
            'for',
            'from',
            'over',
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
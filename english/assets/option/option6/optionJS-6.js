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
        question: 'Good health is ... than money.',
        options: [
            'more important',
            'importanter',
            'most important',
            'the more important',
            'the most important',
        ],
        rightAnswer: 0
    },
    {
        question: 'The right word order:',
        options: [
            'I this film haven’t seen yet',
            'I this film yet haven’t seen',
            'I haven’t this film yet seen',
            'I yet haven’t seen this film',
            'I haven’t seen this film yet',
        ],
        rightAnswer: 4
    },
    {
        question: 'Oxford is a city in England which was founded … the 9th century.',
        options: [
            'from',
            'on',
            'in',
            'at',
            'for',
        ],
        rightAnswer: 2
    },
    {
        question: 'Have you ever been abroad?',
        options: [
            '-Yes, last year was I in Germany',
            '-Yes, I in Germany last year was',
            '-Yes, I in Germany was last year',
            '-Yes, I was in Germany last year',
            '-Yes, I was Germany in last year',
        ],
        rightAnswer: 3
    },
    {
        question: 'The correct word order:',
        options: [
            'He always dresses smartly',
            'He dresses always smartly',
            'He always smartly dresses',
            'He dresses smartly always.',
            'Always dresses he smartly',
        ],
        rightAnswer: 0
    },
    {
        question: 'They’ve known each other … .',
        options: [
            'ten years' + '<br/>' + 'a week',
            'since two hours' + '<br/>' + 'last two hours',
            'for three o’clock' + '<br/>' + 'ten years',
            'a week' + '<br/>' + 'since two hours' + '<br/>' + 'last two hours',
            'since 2008' + '<br/>' + 'since childhood' + '<br/>' + 'for three months',
        ],
        rightAnswer: 4
    },
    {
        question: 'The correct word order in the affirmative sentence:',
        options: [
            'In the kitchen there are some chairs and a table',
            'There are in the kitchen some chairs and a table',
            'There are some chairs and a table in the kitchen',
            'There are a table and some chairs in the kitchen',
            'A table and some chairs there are in the kitchen',
        ],
        rightAnswer: 2
    },
    {
        question: 'Sentences with the correct I Conditional Mood:',
        options: [
            'If I would follow your advice, I will go there',
            'If the lecture had not been so interesting, I would not leave it',
            'If I were grown-up, I will travel by plane',
            'If I discuss the problem, I will help them',
            'If he had travelled a lot, he would know the islands',
        ],
        rightAnswer: 3
    },
    {
        question: 'Choose the false statement(-s) is(-are):',
        options: [
            'The Irtysh is in the east of Kazakhstan' + '<br/>' + 'Astana is situated in the southern part of the country' + '<br/>' + 'Kazakhstan borders on China, Russia, Armenia, Uzbekistan and Kirgizia',
            'The Ili is in the southeast of Kazakhstan' + '<br/>' + 'The Ural is in the northwest of Kazakhstan.',
            'There is a border coast line on the Aral Sea in the southwest of Kazakhstan' + '<br/>' + 'The Syrdarya is in the southwest of Kazakhstan' + '<br/>' + 'Kazakhstan is the largest state in the Central Asia',
            'The Syrdarya is in the southwest of Kazakhstan' + '<br/>' + 'Kazakhstan is the largest state in the Central Asia',
            'The Ili is in the southeast of Kazakhstan' + '<br/>' + 'The Ural is in the northwest of Kazakhstan.',
        ],
        rightAnswer: 0
    },
    {
        question: 'She goes to bed … 10 p.m.',
        options: [
            'in',
            'on',
            'for',
            'from',
            'at',
        ],
        rightAnswer: 4
    },
    {
        question: 'It is not ... his power to help you.',
        options: [
            'from',
            'with',
            'in',
            'of',
            'on',
        ],
        rightAnswer: 2
    },
    {
        question: 'Correct phrases with an adjective:',
        options: [
            'in autumn' + '<br/>' + 'speak about',
            'think of' + '<br/>' + 'seem upset',
            'rely on' + '<br/>' + 'in autumn',
            'taste strange' + '<br/>' + 'feel good',
            'speak about' + '<br/>' + 'think of' + '<br/>' + 'rely on',
        ],
        rightAnswer: 3
    },
    {
        question: 'On October 31 American children dress up … and … costumes.',
        options: [
            'funny, scary',
            'special costumes',
            'funny, mask',
            'short, socks',
            'scary, shirt',
        ],
        rightAnswer: 0
    },
    {
        question: 'He wants to buy … new smartphone.',
        options: [
            '-',
            'their',
            'the',
            'an',
            'a',
        ],
        rightAnswer: 4
    },
    {
        question: '… open the window if you … cold.',
        options: [
            'Won’t / won’t',
            'Doesn’t / weren’t',
            'Don’t / are',
            'Don’t / don’t',
            'Will / will be',
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
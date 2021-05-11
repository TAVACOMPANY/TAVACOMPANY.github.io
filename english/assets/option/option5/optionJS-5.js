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
        question: 'Question words that form a special question:',
        options: [
            'shall' + '<br/>' + 'did' + '<br/>' + 'are',
            'why' + '<br/>' + 'where' + '<br/>' + 'when',
            'are' + '<br/>' + 'why' + '<br/>' + 'shall',
            'do' + '<br/>' + 'did',
            'did',
        ],
        rightAnswer: 1
    },
    {
        question: 'Make a sentence: difficult (1)/ foreign (2)/ it is (3)/ languages (4)/ to learn (5)/ very(6)/.',
        options: [
            '1/6/4/3/5/2',
            '5/4/3/1/2/6',
            '6/3/5/1/4/2',
            '3/6/1/5/2/4',
            '1/3/5/6/2/4',
        ],
        rightAnswer: 3
    },
    {
        question: 'Choose the plural of the word “An Umbrella”:',
        options: [
            'Umbrell',
            'Umbrellas',
            'Umbrellaes',
            'Umbrelles',
            'Umbrels',
        ],
        rightAnswer: 1
    },
    {
        question: 'Let me know if you … any help.',
        options: [
            'doesn’t need',
            'need',
            'will need',
            'needs',
            'wasn’t need',
        ],
        rightAnswer: 1
    },
    {
        question: 'Express in one word: You wear it when it is cold:',
        options: [
            'Shorts',
            'Coat',
            'T-shirt',
            'Sandals',
            'Blouse',
        ],
        rightAnswer: 1
    },
    {
        question: 'Choose simple affirmative sentences:',
        options: [
            'There isn`t a biscuit' + '<br/>' + 'Do you like ice-cream?',
            'There isn’t apple' + '<br/>' + 'What did you wear?',
            'There isn`t any cheese' + '<br/>' + 'There isn`t a biscuit',
            'How much is that?' + '<br/>' + 'What did you wear?',
            'There are some grapes' + '<br/>' + 'There is some fruit',
        ],
        rightAnswer: 4
    },
    {
        question: 'A sentence with Participle II:',
        options: [
            'Why did he go on behaving this way?' + '<br/>' + 'I didn’t like the shown pictures',
            'I didn’t like the shown pictures' + '<br/>' + 'The doctor didn’t want to answer the asked questions' + '<br/>' + 'The applied letter was registered at last',
            'I’m waiting for an answer' + '<br/>' + 'Studying in NY is very prestigious' + '<br/>' + 'I enjoy sitting with the baby',
            'You should avoid eating too much sugary food' + '<br/>' + 'Studying in NY is very prestigious',
            'Why did he go on behaving this way?',
        ],
        rightAnswer: 1
    },
    {
        question: 'Find the correct word order in the interrogative sentence:',
        options: [
            'Is agency a kind of business what travel?',
            'Is a travel agency what kind of business?',
            'What kind of business is a travel agency?',
            'Is a business what kind of travel agency?',
            'Agency is kind of business what travel a?',
        ],
        rightAnswer: 2
    },
    {
        question: 'Did you meet ... on your way home?',
        options: [
            'none',
            'anybody',
            'any',
            'some',
            'nobody',
        ],
        rightAnswer: 1
    },
    {
        question: 'Choose an adjective:',
        options: [
            'Lousy',
            'Skip',
            'Shake',
            'Bend',
            'Reduce',
        ],
        rightAnswer: 0
    },
    {
        question: 'Choose an adjective in comparative degree:',
        options: [
            'largest',
            'nicer',
            'best',
            'warm',
            'good',
        ],
        rightAnswer: 1
    },
    {
        question: 'Choose the correct word order in the affirmative sentence:',
        options: [
            'They often are depressed about their weight' + '<br/>' + 'I often am at home',
            'Overweight teenagers eat usually the wrong kind of food' + '<br/>' + 'She bought always chocolate at break time',
            'He never is late' + '<br/>' + 'I often am at home',
            'Helen never ate fruit when she was younger' + '<br/>' + 'They rarely eat fresh fruit and vegetables',
            'She bought always chocolate at break time' + '<br/>' + 'Do you eat sometimes the wrong kind of food?',
        ],
        rightAnswer: 3
    },
    {
        question: '869 in English is:',
        options: [
            'eight hundred sixty-five',
            'eight hundred and sixty-nine',
            'eight hundred sixty-three',
            'seven hundred and sixty-nine',
            'eight hundred sixty-nine',
        ],
        rightAnswer: 1
    },
    {
        question: 'The definite article is before:',
        options: [
            '…Spain' + '<br/>' + '…Canada' + '<br/>' + '…western Europe',
            '…Mediterranean' + '<br/>' + '…United States' + '<br/>' + '…Swiss Alps',
            '…Africa' + '<br/>' + '…Swiss Alps',
            '…Canada' + '<br/>' + '…western Europe',
            '…western Europe',
        ],
        rightAnswer: 1
    },
    {
        question: 'He carried the bucket….',
        options: [
            'himself',
            'myself',
            'itself',
            'yourself',
            'ourselves',
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
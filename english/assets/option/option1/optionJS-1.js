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
        question: 'Select a sentence with a phrasal verb:',
        options: [
            'They took him to the hospital.',
            'They have to do voluntary work.',
            'She doesn`t work anywhere.',
            'Children have already fallen asleep.',
            'The woman in front turned round and looked at me.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Sentences with correct indefinite pronouns:',
        options: [
            'They didn’t have some grapes in the market.' + '<br/>' + 'Are there some good museums in your town?',
            'I’m thirsty. Can I have some water, please?',
            'I want to colour my hair. Is there any colouring? ',
            'There isn’t anything on the table' + '<br/>' + 'I need something to cover the box.',
            'I’m thirsty. Can I have any water, please?',
        ],
        rightAnswer: 3
    },
    {
        question: 'I … in the same class as Kate last year.',
        options: [
            'is',
            'be',
            'was',
            'were',
            'are',
        ],
        rightAnswer: 2
    },
    {
        question: 'Select the correct sentences with “used to”:',
        options: [
            'I didn’t use your ticket' + '<br/>' + 'She used her new pencils',
            'We used to write SMS to each other' + '<br/>' + 'I didn’t use to like sweets' + '<br/>' + 'She used to play computer games a lot',
            'Bob always uses glasses',
            'Alina never uses cosmetics',
            'My mother used Italian trades',
        ],
        rightAnswer: 1
    },
    {
        question: 'Common to this group of words is:',
        options: [
            'Biography',
            'Childhood',
            'Relative',
            'Be born',
            'Elder',
        ],
        rightAnswer: 0
    },
    {
        question: '... is your father’s profession?',
        options: [
            'How',
            'Where',
            'Who',
            'When',
            'What',
        ],
        rightAnswer: 4
    },
    {
        question: 'Choose the sentences with the correct preposition:',
        options: [
            'This is for me ' + '<br/>' + 'What is his attitude towards these facts?' + '<br/>' + 'He worries too much about his weight',
            'All from a sudden she started to cry',
            'I wouldn’t say you anything',
            'What is his attitude towards these facts?',
            'Don’t eat on night' + '<br/>' + 'Tell to me, please',
        ],
        rightAnswer: 0
    },
    {
        question: 'If they … stop talking, the teacher … be angry.',
        options: [
            'won’t / will',
            'will / don’t',
            'don’t / will',
            'don’t / don’t',
            'doesn’t / doesn’t',
        ],
        rightAnswer: 2
    },
    {
        question: 'He ___ a student.',
        options: [
            'am',
            'is ',
            'are',
            'has',
            'be',
        ],
        rightAnswer: 1
    },
    {
        question: 'The correct word order in the interrogative sentence:',
        options: [
            'Where does money come from?',
            'Does money come from where?',
            'Money does where come from?',
            'From where does come money?',
            'Does from where money come?',
        ],
        rightAnswer: 0
    },
    {
        question: 'Are there … apples in the basket?',
        options: [
            'anything',
            'some',
            'no',
            'nothing',
            'any ',
        ],
        rightAnswer: 4
    },
    {
        question: 'What is the heart of London?',
        options: [
            'The South End',
            'The East End',
            'Westminister',
            'The City',
            'The West End',
        ],
        rightAnswer: 3
    },
    {
        question: 'What made …live in this village?',
        options: [
            'yours',
            'yourselves',
            'you',
            'your',
            'yourself',
        ],
        rightAnswer: 2
    },
    {
        question: 'Choose a compound word:',
        options: [
            'Tomorrow',
            'Schoolbag',
            'Beautiful',
            'Nationality',
            'Championship',
        ],
        rightAnswer: 1
    },
    {
        question: 'The false statement(-s) is(-are):',
        options: [
            'The climate of Kazakhstan is strongly continental.' + '<br/>' + 'The largest lakes of Kazakhstan are Baikal, Balkhash, Zaisan and Alakol.' + '<br/>' + 'The flora of Kazakhstan is poorer in the south and richer in the north',
            'The Great Silk Way was the main trade route in the ancient times.' + '<br/>' + 'The flora of Kazakhstan is poorer in the south and richer in the north.',
            'Sudden cold winds and snowfalls in winter cause troubles for people.' + '<br/>' + 'The northern regions of Kazakhstan have long and hard winters.' + "<br/>" + 'The flora and fauna of Kazakhstan are different.',
            'The flora and fauna of Kazakhstan are different.',
            'The northern regions of Kazakhstan have long and hard winters.',
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
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
        question: 'The Natіonal lіbrary іs sіtuated іn the ... .',
        options: [
            'St. Paul Cathedral',
            'Westmіnster Abbey',
            'Tate Gallery',
            'Tower of London',
            'Brіtіsh Museum',
        ],
        rightAnswer: 4
    },
    {
        question: '- Jіll plays the pіano very well. -Really? І dіdn’t know ...',
        options: [
            'hіs',
            'those',
            'these',
            'that',
            'іts',
        ],
        rightAnswer: 3
    },
    {
        question: 'Put in the verb in the correct form: Where is my dictionary? Someone … … it!',
        options: [
            'have steal',
            'does steal',
            'has stolen',
            'have stolen',
            'did steal',
        ],
        rightAnswer: 2
    },
    {
        question: '… a lot of fish in this lake.',
        options: [
            'There be',
            'There is ',
            'There were',
            'There won’t',
            'There aren’t',
        ],
        rightAnswer: 1
    },
    {
        question: 'A word in which the selected letter combination is read different from others:',
        options: [
            'Cough',
            'Eight',
            'Caught',
            'Daughter',
            'Bright',
        ],
        rightAnswer: 0
    },
    {
        question: 'When the plane landed at Heathrow it ___ (rain) as usual.',
        options: [
            'have been raining',
            'will raining',
            'has been raining',
            'raining',
            'was raining',
        ],
        rightAnswer: 4
    },
    {
        question: 'There is no bookcase near the wall, …?',
        options: [
            'is there not',
            'there is',
            'is there',
            'isn’t there',
            'there isn’t',
        ],
        rightAnswer: 3
    },
    {
        question: 'He gets very annoyed іf he has to waіt for anythіng. He doesn`t lіke waіtіng. He`s very ... .',
        options: [
            'lasy-goіng',
            'talkatіve',
            'іmpatіent',
            'optіmіstіc',
            'unambіtіous',
        ],
        rightAnswer: 2
    },
    {
        question: 'I caught two … .',
        options: [
            'fishes',
            'fish',
            'fishs',
            'butterfly',
            'hare',
        ],
        rightAnswer: 1
    },
    {
        question: 'A word in which the vowel “i” is read differently from others:',
        options: [
            'while',
            'windy',
            'think',
            'visit',
            'wind',
        ],
        rightAnswer: 0
    },
    {
        question: 'Find a sentence with a gerund:',
        options: [
            'I know that girl walking down the street.',
            'We are walking along the streets now.',
            'Ann likes to walk in the morning.',
            'As a rule Michael walks after busy day.',
            'I prefer walking in the forest.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Correct Participle form: I don’t find this story … .',
        options: [
            'unamusing',
            'unamused',
            'amuseful',
            'amusing',
            'amused',
        ],
        rightAnswer: 3
    },
    {
        question: 'Sentence with possessive case:',
        options: [
            'They are not my pens',
            'It’s cold today',
            'Give the dog its food',
            'It wasn’t a mistake',
            'You know it’s a good answer',
        ],
        rightAnswer: 2
    },
    {
        question: 'Select the equivalent: all over the world',
        options: [
            'anyhow done.',
            'everywhere in the world.',
            'everywhere in the park.',
            'anywhere in the city.',
            'nowhere here.',
        ],
        rightAnswer: 1
    },
    {
        question: 'W.A.Mozart was born in __ .',
        options: [
            'Austria',
            'Holland',
            'Australia',
            'Wales',
            'Canada',
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
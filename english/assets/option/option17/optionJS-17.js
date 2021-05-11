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
        question: '… road shall we take? There are two of them.',
        options: [
            'Who',
            'Why',
            'Where',
            'Whom',
            'Which',
        ],
        rightAnswer: 4
    },
    {
        question: 'This is … book I have ever read.',
        options: [
            'better ',
            'good ',
            'gooder ',
            'the best',
            'worse ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Find the synonym of “kind”:',
        options: [
            'patient',
            'silent',
            'gentle',
            'active',
            'helpful',
        ],
        rightAnswer: 2
    },
    {
        question: '… family were watching TV, sitting on … sofa.',
        options: [
            '––, the',
            'The, the',
            'A, the ',
            '––, ––',
            'The, a',
        ],
        rightAnswer: 1
    },
    {
        question: 'The correct sentences with the compound word(-s):',
        options: [
            'He gave a ten-dollar note' + br + 'I’ll have a six-day stay' + br + 'We had a seven-day visit',
            'It is a twenty-storeys building' + br + 'It was a two-hours flight' + br + 'This is a two-liters bottle ',
            'It was a two-hours flight',
            'He is a four-years old boy' + br + 'A two-meters snake hid in the bushes',
            'This is a two-liters bottle ',
        ],
        rightAnswer: 0
    },
    {
        question: 'I`ll wait for you . . . the bus stop.',
        options: [
            'by ',
            'over ',
            'after ',
            'in ',
            'at ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Put in the verb in the correct form: They … … Jack a present.',
        options: [
            'didn’t given',
            'hasn’t given',
            'don’t give',
            'haven’t given ',
            'didn’t gave ',
        ],
        rightAnswer: 3
    },
    {
        question: 'My mother will cook supper as soon as she ... a cup of coffee.',
        options: [
            'is drinking ',
            'have drank',
            'drinks',
            'will drink',
            'will be drinking',
        ],
        rightAnswer: 2
    },
    {
        question: 'Put in the verb in the correct form: … you walk to school or … you take the bus?',
        options: [
            'Are, do',
            'do, do',
            'do, are',
            'are, are ',
            'have, have',
        ],
        rightAnswer: 1
    },
    {
        question: 'The possessive form of the noun in singular: I stayed at …',
        options: [
            'my sister’s house',
            'my sisters’ house',
            'the house of my sister',
            'of my sister house',
            'my sister house',
        ],
        rightAnswer: 0
    },
    {
        question: 'What is the oldest university of Great Britain?',
        options: [
            'Eton',
            'Nourish ',
            'Exeter ',
            'Cambridge ',
            'Oxford',
        ],
        rightAnswer: 4
    },
    {
        question: 'Give a definition of the word “Neіghbour”:',
        options: [
            'A person who іs іnterested іn sport',
            'A person who study at the іnstіtute',
            'A person whom you lіke',
            'A person who lіves near you',
            'A person who іs fond of readіng ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Verb in Present Simple Active:',
        options: [
            'Teaching ',
            'Taught ',
            'Teach ',
            'Taughted ',
            'Have taught',
        ],
        rightAnswer: 2
    },
    {
        question: 'Определите вид слова: To wrіte.',
        options: [
            'Gerund ',
            'Іndefіnіte Іnfіnіtіve Actіve',
            'Іnfіnіtіve Passіve',
            'Partіcіple 1',
            'Partіcіple 2',
        ],
        rightAnswer: 1
    },
    {
        question: 'Select a sentence with a gerund:',
        options: [
            'I am fond of collecting coins',
            'Harry has just collected the new information. ',
            'The driver collected the suitcases from the station',
            'Mr. Brown has been collecting stamps for 5 years already. ',
            'Students are collecting in the hall now.',
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
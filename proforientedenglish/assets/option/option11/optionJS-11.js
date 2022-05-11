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
        question: '_____ . Even as a young man, Patrick Henry had that kind of influence in the American Colonies. Born in 1736, Henry, a natural leader and a brilliant speaker, believed in individual rights and independence from the British government. As a young lawyer, he astonished his courtroom audience in 1763 with an eloquent defense based on the idea of natural rights, the political theory that humans are born with certain inalienable rights.',
        options: [
            'The idea of natural rights is central to the Declaration of Independence',
            'Known as the Bill of Rights, they guarantee certain freedoms, such as the freedom of speech and religion',
            'Have you ever heard someone speak so passionately that the speech moved you-to do something?',
            'With war against Britain looming, Henry proclaimed, "I know not what course others may take, but as for me, give me liberty or give me death!"',
            'As the first governor of Virginia, Henry continued to have profound influence on the development of the new nation.',
        ],
        rightAnswer: 2
    },
    {
        question: 'A new Palestinian state will be more likely to succeed, _____ its territorial contiguity; _____ open its borders, allowing free movement of people.',
        options: [
            'so great / as more',
            'greater than / more',
            'as great / so much',
            'the greater / the more',
            'the greatest / the most',
        ],
        rightAnswer: 3
    },
    {
        question: 'Singapore possesses all the ingredients for traffic disaster. The Island city-state has a large population, a limited land area, booming economic growth and one of the highest automobile densities in the world. _____ . Yet, Singapore’s traffic moves smoothly. Much of the explanation lies in sound urban planning and an effective mass-transit system.',
        options: [
            'In other rapidly Asian metropolises, like Bangkok, such conditions have wreaked bumper -to- pumper in the streets',
            'The Singaporean government doesn’t care about the air pollution caused by traffic',
            'Despite all efforts, car sales in Singapore increased in 1991',
            'All Singaporean citizens face two extra charges or taxes when buying a car',
            'Singaporeans are sympathetic to the government’s goal of keeping traffic moving',
        ],
        rightAnswer: 0
    },
    {
        question: 'These works are of ____ importance _____ they should be published at any cost.',
        options: [
            'such / that',
            'more / than',
            'so / as',
            'as / as',
            'so / that',
        ],
        rightAnswer: 1
    },
    {
        question: 'Midsize organizations producing live performances face the most serious financial strain. Either they will have to become larger and more prestigious -which many lack the resources to do- or they will have to cut their budgets and become more community oriented, using local talent to keep costs down._____ .',
        options: [
            'The population purchasing recorded performances had been growing',
            'Firstly the public that attends live performances has remained stable',
            'The young is comfortable with entertainment delivered by the Internet',
            'These trends could also have affected the quality of performing arts in the future',
            'Those that are not able to adapt may disappear',
        ],
        rightAnswer: 4
    },
    {
        question: 'Since the Song group is going to make a(n) _____ recording in the stadium tomorrow, almost everyone is thought to be there.',
        options: [
            'Alive',
            'Awake',
            'Life',
            'Live',
            'Conscious',
        ],
        rightAnswer: 3
    },
    {
        question: 'The enemy plane crashed some distance away from our trenches, its bombs exploding ............... it hit the ground.',
        options: [
            'Then',
            'so that',
            'as',
            'so',
            'therefore',
        ],
        rightAnswer: 2
    },
    {
        question: 'The success of a Palestinian state is inconceivable in the absence of peace and security for Palestinians and Israelis ______.',
        options: [
            'Alike',
            'Like',
            'As',
            'Similar',
            'Similar',
        ],
        rightAnswer: 0
    },
    {
        question: 'Scientists have discovered that our sense of smell is surprisingly-------, capable of distinguishing thousands of chemical odours.',
        options: [
            'Inanimate',
            'Reckless',
            'Faulty',
            'Rigid',
            'Keen',
        ],
        rightAnswer: 4
    },
    {
        question: 'One study found that nursing home residents 65 and older are three times _____ likely to be hospitalized for influenza ____ people of similar ages who do not live in nursing homes.',
        options: [
            'so / as',
            'more / than',
            'such / that',
            'so / that',
            'too / as',
        ],
        rightAnswer: 1
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
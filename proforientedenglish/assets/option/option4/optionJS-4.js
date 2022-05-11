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
        question: 'According to the company spokesperson, the majority of the wrongful termination lawsuits filed against the company were frivolous, representing bogus claims made by _____ former employees hoping to strike it rich.',
        options: [
            'Disgruntled',
            'Surprised',
            'Greedy',
            'Contented',
            'Wise',
        ],
        rightAnswer: 2
    },
    {
        question: 'Many dairy products ______ cheese and yogurt and some fermented meat products already use lactic acid producing bacteria to protect and preserve their products.',
        options: [
            'Rather',
            'just as',
            'most of',
            'such as',
            'both',
        ],
        rightAnswer: 3
    },
    {
        question: 'It is claimed that there is a (n)______ for every problem in democracy.',
        options: [
            'Remedy',
            'Solute',
            'Obstacle',
            'Situation',
            'Correct',
        ],
        rightAnswer: 0
    },
    {
        question: 'The actor’s _____ decline in popularity was as striking and unexpected as his meteoric rise to prominence had been.',
        options: [
            'Dazzling',
            'Sudden',
            'Inevitable',
            'Precipitous',
            'Gradual',
        ],
        rightAnswer: 1
    },
    {
        question: 'The airlines are constantly pressing the manufacturers to produce large and medium-sized aircraft that can fly anywhere in the world non-stop. Gradually they are getting what they want, particularly with the latest Boeing and Airbus 250-300 seaters on the way. _____ . If flights like that become common, Emirates, with its giant planes and global hub, would be flying in the face of conventional wisdom',
        options: [
            'The airlines are expected to opt for large widebodied jets such as the latest version of Boeing`s 777 preferred by Emirates',
            'In particular, Emirates has ordered no fewer than 45 of Airbus`s A380, with operating costs promised to be 15-20% lower than today`s 747s',
            'That is why there is strong interest in some of the upcoming airline orders from the ones that Boeing hopes will come its way',
            'The key-thing about- these new subjumbos was that they had been suited for short flights',
            'A Boeing 777 has taken off from Hong Kong to fly to London, covering 20,300 kilometres and flying for 23 hours, to set a new record',
        ],
        rightAnswer: 4
    },
    {
        question: 'Women face unique challenges in keeping their blood pressure under control, and this may help explain why _____ women _____ men struggle with uncontrolled blood pressure.',
        options: [
            'less / than',
            'the more / the more',
            'the / same',
            'more / than',
            'such / as',
        ],
        rightAnswer: 3
    },
    {
        question: '_____ . Iraq`s former ruling minority had many reasons to dislike the document`s contents -the federal system split the country, they said, and allowed oil revenues to be distributed unevenly to benefit the Shia- and now they have reason to contest its legitimacy. Even before the election, some American and British officials said they were dreading this kind of result, which could stoke rather than pacify the insurgency.',
        options: [
            'Sunnis wanted to put forward various proposals at a national reconciliation conference sponsored by the Arab League',
            'The adoption of the constitution and December`s elections brought an end to the succession of shortlived transitional governments',
            'Iraq now has a constitution supported by large majorities of two of the three main ethnic groups, the Shia Arabs and the Kurds, but rejected by the third, the Sunni Arabs',
            'As a result in a last-minute deal aimed at getting the Sunnis on board, the constitutional drafters added a mechanism to review and amend the constitution in the first half of the new year',
            'However, opportunities still exist to bring the Sunnis into the political process',
        ],
        rightAnswer: 2
    },
    {
        question: 'That’s strange. I saw him ---- his bike along the river this morning and he didn’t mention anything about ---- his job.',
        options: [
            'riding / changing',
            'to be riding / to change',
            'ride / to have changed',
            'having ridden / change',
            'to ride / having changed',
        ],
        rightAnswer: 0
    },
    {
        question: 'Many things around us have begun to change so quickly that we can’t _____ them easily.',
        options: [
            'take up with',
            'look forward to',
            'go through with',
            'put off',
            'keep up with',
        ],
        rightAnswer: 4
    },
    {
        question: 'The company has had a bad year and will therefore not be ... any new workers.',
        options: [
            'taking after',
            'taking on',
            'taking off',
            'taking up',
            'taking to',
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
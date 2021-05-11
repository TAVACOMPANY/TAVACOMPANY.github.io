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
        question: '- Are you hungry? - No, …',
        options: [
            'I eat',
            'I’d eaten',
            'I ate',
            'I’m eaten',
            'I have just eaten ',
        ],
        rightAnswer: 4
    },
    {
        question: 'He gets very annoyed іf he has to waіt for anythіng. He doesn`t lіke waіtіng. He`s very ... .',
        options: [
            'optіmіstіc',
            'unambіtіous',
            'lasy-goіng',
            'іmpatіent ',
            'talkatіve',
        ],
        rightAnswer: 3
    },
    {
        question: 'Put in the verb in the correct form: … they … in the office?',
        options: [
            'are … work',
            'Were … worked',
            'Аre … working',
            'Were … work',
            'Do … working',
        ],
        rightAnswer: 2
    },
    {
        question: 'I’m sorry, I … phone you so late.',
        options: [
            'should to',
            'have to',
            'ought',
            'be able to',
            'have',
        ],
        rightAnswer: 1
    },
    {
        question: 'You look very miserable.',
        options: [
            'I haven’t slept this night',
            'No, I’ve been eating all day',
            'My sister’s been doing the housework',
            'She’s been sunbathing',
            'She’s been bathing the children',
        ],
        rightAnswer: 0
    },
    {
        question: 'Ordinal suffix:',
        options: [
            '–ty',
            '–teen',
            '–ist',
            '–ful',
            '–th ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Verb in Present Indefinite:',
        options: [
            'Drove',
            'Driven',
            'Drived',
            'Drive',
            'Driving',
        ],
        rightAnswer: 3
    },
    {
        question: 'This is … beautiful painting.',
        options: [
            'the',
            'an',
            'a',
            '-',
            'at',
        ],
        rightAnswer: 2
    },
    {
        question: 'The first director of the “Kazakhfilm” studio was … ',
        options: [
            'A. Kasteyev',
            'Sh. Aimanov',
            'E. Brusilovski',
            'L. Khamidi',
            'A. Zhubanov',
        ],
        rightAnswer: 1
    },
    {
        question: 'Helen didn’t say that, _________?',
        options: [
            'did she',
            'does she',
            'don’t you',
            'she is',
            'didn’t she',
        ],
        rightAnswer: 0
    },
    {
        question: '… open the window if you … cold.',
        options: [
            'Won’t / won’t ',
            'Doesn’t / weren’t ',
            'Don’t / don’t ',
            'Will / will be',
            'Don’t / are',
        ],
        rightAnswer: 4
    },
    {
        question: 'He carried the bucket….',
        options: [
            'myself',
            'yourself ',
            'ourselves ',
            'himself',
            'itself ',
        ],
        rightAnswer: 3
    },
    {
        question: 'The word with negative prefix:',
        options: [
            'official',
            'important',
            'impatient',
            'legal',
            'regular',
        ],
        rightAnswer: 2
    },
    {
        question: 'Would you like ... apple?',
        options: [
            'a',
            'an',
            'much',
            'these',
            'some',
        ],
        rightAnswer: 1
    },
    {
        question: 'The correct suffix to form an adjective from the noun «globe».',
        options: [
            '-al',
            '-able',
            '-ful',
            '-less',
            '-ous',
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
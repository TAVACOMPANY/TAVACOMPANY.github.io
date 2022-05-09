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
        question: 'Кого из известных мудрецов Востока называли "Старый ребёнок". Он является основателем даосизма.',
        options: [
            'Конфуция',
            'Мо цзы',
            'Лао цзы',
            'Гаутама-Будду',
            'Авиценну (Ибн-сину)',
        ],
        rightAnswer: 2
    },
    {
        question: 'Конфуцианство - это … ',
        options: [
            'ранняя форма религии',
            'мифология',
            'явление природы',
            'ритуализированная этика',
            'литературный жанр',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кто дал определение человеку как политическому животному. ',
        options: [
            'Аристотель ',
            'А. Кентерберийский ',
            'Ф. Аквинский ',
            'А. Аврелий ',
            'аль-Фараби  ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кто сформулировал золотое правило нравственности, завещал человечеству великие нравственные принципы',
        options: [
            'Аристотель',
            'Конфуций',
            'Платон',
            'Сократ',
            'Будда',
        ],
        rightAnswer: 1
    },
    {
        question: 'Лао-цзы – представитель древнекитайской школы.',
        options: [
            'Веданта',
            'Моизма',
            'Конфуцианства',
            'Легизма',
            'Даосизма',
        ],
        rightAnswer: 4
    },
    {
        question: 'Назовите одно из крупных направлений в христианстве, оформившееся в ходе Реформации в XVI веке:',
        options: [
            'иудаизм',
            'православие',
            'баптизм',
            'протестантизм',
            'католицизм',
        ],
        rightAnswer: 3
    },
    {
        question: 'Наследием какой культуры является "Махабхаратха"?',
        options: [
            'Египет',
            'Китай',
            'Индия',
            'Шумер',
            'Япония',
        ],
        rightAnswer: 2
    },
    {
        question: 'Общее наименование древнейших священных текстов в индийской культурной традиции.',
        options: [
            'Веды',
            'Талмуд',
            'Евангелие',
            'Коран',
            'Авеста',
        ],
        rightAnswer: 0
    },
    {
        question: 'Основоположник учения о культурных архетипах как коллективном бессознательном',
        options: [
            'Э.Фромм',
            'К.Хорни',
            'О.Франк',
            'З.Фрейд',
            'К. Юнг',
        ],
        rightAnswer: 4
    },
    {
        question: 'Памятник древнекитайской культуры «Дао–дэ–цзин» в переводе означает …',
        options: [
            'Канон стихов',
            'Книга о благостном пути',
            'Книга истории',
            'Рассуждение о методе',
            'Книга песен',
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
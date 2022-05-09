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
        question: 'Понятие "пайдейя" определяет основное содержание культуры … ',
        options: [
            'средневековой',
            'Просвещения',
            'античной',
            'Возрождения',
            'арабоязычного Востока',
        ],
        rightAnswer: 2
    },
    {
        question: 'Представители одного из направлений русской общественной мысли, выступавшие за принципиально отличный от западного путь развития России на основе самобытности',
        options: [
            'Битники',
            'Западники',
            'Гуманисты',
            'Славянофилы',
            'Декабристы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Пророческая религия, имевшая статус государственной в доисламском Иране, священная книга "Авеста" … ',
        options: [
            'зороастризм',
            'буддизм',
            'манихейство',
            'христианство',
            'иудаизм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Религиозное и социально-политическое движение XVI в. в Германии, направленное на преобразование христианской церкви',
        options: [
            'Сепарация',
            'Реформация',
            'Аккультурация',
            'Интеграция',
            'Ренессанс',
        ],
        rightAnswer: 1
    },
    {
        question: 'Согласно О. Шпенглеру, цикл каждой культуры укладывается в один и тот же временной интервал. Он включает в себя четыре периода, назовете их',
        options: [
            'зрелость, юность',
            'смерть, старость',
            'младенчество, отрочество, юность, смерть',
            'смерть, зарождение, расцвет, старение',
            'зарождение; расцвет; старение; смерть',
        ],
        rightAnswer: 4
    },
    {
        question: 'Страна, от которой приняла «культурную эстафету» Киевская Русь.',
        options: [
            'Греция',
            'Персия',
            'Македония',
            'Византия',
            'Рим',
        ],
        rightAnswer: 3
    },
    {
        question: 'Термин античность означает … ',
        options: [
            'дикость',
            'варварство',
            'греко-римская древность',
            'предистория',
            'рабовладение',
        ],
        rightAnswer: 2
    },
    {
        question: 'Универсальная исторически первая форма культуры',
        options: [
            'Миф',
            'Молитва',
            'Сказка',
            'Религия',
            'Философия',
        ],
        rightAnswer: 0
    },
    {
        question: 'Учение о "ЯНЬ" и "ИНЬ" принадлежит культуре',
        options: [
            'Японии',
            'Кореи',
            'Индии',
            'Египта',
            'Китая',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что такое "катарсис"?',
        options: [
            'Внушение',
            'Трагическое очищение',
            'Обобщение',
            'Наслаждение',
            'Обозначение',
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
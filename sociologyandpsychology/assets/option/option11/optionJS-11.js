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
        question: 'Некий мысленный ориентир, к которому устремляются дела и поступки человека',
        options: [
            'Каузальная атрибуция',
            'Потребности индивида',
            'Цель жизни',
            'Мотивация',
            'Мотив избегания неудач',
        ],
        rightAnswer: 2
    },
    {
        question: 'Эмоции — это',
        options: [
            'истолкование субъектом межличностного восприятия причин и мотивов поведения других людей и развитие на этой основе способности предсказывать их будущее поведение',
            'принятие человеком новых условий деятельности с ответственностью за результат и с внутренним контролем над достижением цели',
            'совокупность психологических факторов, которые побуждают, направляют, поддерживают и прекращают специфические виды деятельности',
            'особый класс субъективных психических состояний, отражающих в форме непосредственных переживаний процесс и результаты практической деятельности, направленной на удовлетворение актуальных потребностей человека',
            'активное проявление своего отношения к происходящим в социальной сфере событиям',
        ],
        rightAnswer: 3
    },
    {
        question: 'Социальная группа, занимающая промежуточное положение между элитой и классом наемных работников – это:',
        options: [
            'средний класс',
            'андеркласс',
            'высший класс',
            'человечество',
            'низший класс',
        ],
        rightAnswer: 0
    },
    {
        question: 'Поведение людей в их непосредственном взаимодействии изучает:',
        options: [
            'Философия',
            'Микросоциология',
            'Макросоциология',
            'Метасоциология',
            'Этнология',
        ],
        rightAnswer: 1
    },
    {
        question: 'Ученый, сравнивавший общества с живыми организмами, подобными человеческому телу:',
        options: [
            'Э.Дюргейм',
            'Г.Гарфинкель',
            'О.Конт',
            'Т.Парсонс',
            'Г.Спенсер',
        ],
        rightAnswer: 4
    },
    {
        question: 'Межличностные взаимодействия характерны для групп:',
        options: [
            'Формальных',
            'Больших',
            'Вторичных',
            'Малых',
            'номинальных',
        ],
        rightAnswer: 3
    },
    {
        question: 'Форма полигамного брака, при котором одна женщина имеет несколько мужей:',
        options: [
            'матриархальный.',
            'нуклеарный брак;',
            'полиандрия',
            'гомогенный брак',
            'патриархат',
        ],
        rightAnswer: 2
    },
    {
        question: 'Казахстан утверждает себя как.',
        options: [
            'унитарное, светское демократическое государство',
            'патриархальное государство',
            'федеративное светское демократическое государство',
            'унитарное мусульманское государство',
            'конфедеративное государство',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что должна изучать социальная динамика по Конту?',
        options: [
            'исторический регресс',
            'иерархическое разделение общества',
            'общественное разделение труда.',
            'динамика развития окружающей среды',
            'развитие общества на основе прогресса духа (разума);',
        ],
        rightAnswer: 4
    },
    {
        question: 'Символический интеракционизм изучает:',
        options: [
            'Структуры',
            'взаимодействие',
            'контроль',
            'социальные системы',
            'нормы',
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
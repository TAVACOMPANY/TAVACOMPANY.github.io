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
        question: 'Как называли во Франции странствующих поэтов, которые в своих произведениях критиковали католическую церковь?',
        options: [
            'Трубадуры',
            'Миннезингеры',
            'Ваганты',
            'Диссиденты',
            'Акмеисты',
        ],
        rightAnswer: 2
    },
    {
        question: 'Как называлось церковное судебно-полицейское учреждение для борьбы с ересями?',
        options: [
            'Консистория',
            'Инвеститура',
            'Индульгенция',
            'Инквизиция',
            'Интердикт',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какая религия из перечисленных является самой молодой?',
        options: [
            'Ислам',
            'Иудаизм',
            'Буддизм',
            'Христианство',
            'Зороастризм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Каким термином в Древней Греции обозначали идеал гражданских достоинств?',
        options: [
            'Агон',
            'Калокагатия',
            'Мимесис',
            'Катарсис',
            'Пайдея',
        ],
        rightAnswer: 1
    },
    {
        question: 'Каким термином в Древней Греции обозначали искусство спора, дискуссии?',
        options: [
            'Игра',
            'Катарсис',
            'Софистика',
            'Агон',
            'Диалектика',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое мировоззрение преобладало в культуре средневековой Европы?',
        options: [
            'Философское',
            'Атеистическое',
            'Научное',
            'Религиозное',
            'Мифологическое',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой культуре особенно присуще разделение на религиозную и языческую, христианскую и карнавальную, трагическую и смеховую?',
        options: [
            'Античной',
            'Возрожденческой',
            'Средневековой',
            'Просветительской',
            'Шумерской',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой стиль архитектуры обслуживал прежде всего церковь, его основная черта - устремленность зданий ввысь?',
        options: [
            'Готический',
            'Романский',
            'Классицизм',
            'Ампир',
            'Барокко',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой тип культуры характеризуется высказыванием «Человек – мера всех вещей».',
        options: [
            'Индийский',
            'Европейский',
            'Русский',
            'Вавилонский',
            'Греческий',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какому культурно-религиозному направлению принадлежит крылатое выражение: "Не делай другим того, чего не желаешь себе!" (золотое правило нравственности)?',
        options: [
            'Буддизму',
            'Конфуцианству',
            'Зороастризму',
            'Индуизму',
            'Иудаизму',
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
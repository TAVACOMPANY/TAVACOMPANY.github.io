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
        question: 'К мотивирующим факторам первого класса относятся:',
        options: [
            'эмоции, субъективные переживания',
            'активность и деятельность человека',
            'потребности и инстинкты',
            'самооценка и эмоции',
            'уровень притязаний и целеполагание',
        ],
        rightAnswer: 2
    },
    {
        question: 'Характеризуется установками, связанные с тем, как индивид воспринимает свои актуальные способности, роли, свой актуальный статус, т.е. связанные с его представлениями о том, каков он на самом деле',
        options: [
            'желаемое Я',
            'развивающееся Я',
            'зеркальное (социальное) Я',
            'реальное Я',
            'идеальное Я',
        ],
        rightAnswer: 3
    },
    {
        question: 'Могут оставить сильный, заметный отпечаток в долговременной памяти',
        options: [
            'Аффекты',
            'Эмоции',
            'Чувства',
            'Желания',
            'Мотивы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Представление собственного образа с целью создания у окружающих определенного впечатления',
        options: [
            'Жизненный путь',
            'Самопрезентация',
            'Самооценка',
            'Мотивация',
            'Самовыражение',
        ],
        rightAnswer: 1
    },
    {
        question: 'Представитель этого типа — живой, любознательный, подвижный (но без резких, порывистых движений) человек.',
        options: [
            'Холерик',
            'Средний',
            'Меланхолик',
            'Флегматик',
            'Сангвиник',
        ],
        rightAnswer: 4
    },
    {
        question: 'Эмоциональное состояние, окрашивающее все поведение человека',
        options: [
            'Аффект',
            'Желание',
            'Чувства',
            'Настроение',
            'Собственно эмоции',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что изучала школа бихевиоризма?',
        options: [
            'Сознание',
            'цельные структуры психики',
            'поведение',
            'Познание',
            'Бессознательное',
        ],
        rightAnswer: 2
    },
    {
        question: 'Один из способов регуляции эмоций',
        options: [
            'Эмоциональная трансформация',
            'Сублимация',
            'Суггестия',
            'Локус контроля',
            'Переживание',
        ],
        rightAnswer: 0
    },
    {
        question: 'Основной задачей психологии является:',
        options: [
            'разработка проблем истории психологии',
            'совершенствование методов исследования',
            'коррекция социальных норм поведения',
            'изучение особенностей поведения человека в экстремальных ситуациях',
            'изучение законов психической деятельности',
        ],
        rightAnswer: 4
    },
    {
        question: 'Побудительная функция воли…',
        options: [
            'способствует наличию благоприятного микроклимата в коллективе',
            'обеспечивается активностью человека',
            'развивает коммуникативные способности личности',
            'позволяет решить конфликты среди педагогических работников',
            'выражается в сдерживания нежелательных проявлений активности',
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
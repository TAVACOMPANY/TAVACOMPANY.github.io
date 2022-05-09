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
        question: 'Личный выбор человека в приобретении профессии и реализации себя на рынке труда:',
        options: [
            'Прагматизм',
            'Самоанализ',
            'профессиональное самоопределение',
            'идентичность',
            'смысл жизни',
        ],
        rightAnswer: 2
    },
    {
        question: 'Главный, основной мотив, побуждающий к некой деятельности в случае ее полимотивированности',
        options: [
            'локус контроля',
            'мотив достижения успеха',
            'мечта',
            'ведущий мотив',
            'желание',
        ],
        rightAnswer: 3
    },
    {
        question: 'Отличается быстротой (иногда лихорадочной быстротой) движений и действий, порывистостью, возбудимостью. Психические процессы протекают быстро, интенсивно',
        options: [
            'Холерик',
            'Сангвиник',
            'Флегматик',
            'Средний',
            'Меланхолик',
        ],
        rightAnswer: 0
    },
    {
        question: 'Принятие человеком новых условий деятельности с ответственностью за результат и с внутренним контролем над достижением цели –',
        options: [
            'Активность',
            'Самомотивация',
            'Условие',
            'Цель',
            'Решение',
        ],
        rightAnswer: 1
    },
    {
        question: 'Представитель этого типа темперамента медлителен, спокоен, нетороплив. В деятельности проявляет основательность, продуманность, упорство.',
        options: [
            'Холерик',
            'Средний',
            'Сангвиник',
            'Меланхолик',
            'Флегматик',
        ],
        rightAnswer: 4
    },
    {
        question: 'Способность эффективно разбираться в эмоциональной сфере человеческой жизни: понимать эмоции и эмоциональную подоплеку отношений, использовать свои эмоции для решения задач, связанных с отношениями и мотивацией',
        options: [
            'Эмоциональная трансформация',
            'Одаренность',
            'Эмоциональное подавление',
            'Эмоциональный интеллект',
            'Эмоциональное отреагирование',
        ],
        rightAnswer: 3
    },
    {
        question: 'Абстрагирование — это:',
        options: [
            'различия между объектами',
            'группировка похожих предметов',
            'разделение во мнениях сложного объекта на отдельные части',
            'мысленное отделение свойств предмета от признаков',
            'мгновенное осознание решения проблемы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Типы профессионального самоопределения (Н. А. Смирнов):',
        options: [
            'позиция «раба»',
            'позиция «ученика»',
            'позиция «советника»',
            'позиция «престижа»',
            'позиция «психолога»',
        ],
        rightAnswer: 0
    },
    {
        question: 'Означает точное знание своих национальных и личных ресурсов, их экономное расходование, умение планировать свое будущее',
        options: [
            'Самооценка',
            'Мотив',
            'смысл жизни',
            'цель',
            'прагматизм',
        ],
        rightAnswer: 4
    },
    {
        question: 'Психотерапевтическая методика, основанная на попеременном напряжении и расслаблении различных мышечных групп, до достижения состояния релаксации',
        options: [
            'Имажинативная психотерапия',
            'Нервно-мышечная релаксация',
            'Произвольное самовнушение по Э. Куэ',
            'Медитация',
            'Аутогенная тренировка',
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
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
      msgOfResult = document.getElementById('msgOfResult');

const questions = [
    {
        question: 'Автор работы «Слова назидания» («Гаклия») считал, что человек должен воспитывать в себе человечность. «Адам бол» (Будь Человеком) – нравственный императив его философии.',
        options: [
            'Ш. Кудайбердиев',
            'М. Жумабаев',
            'Ч. Валиханов',
            'И. Алтынсарин',
            'А. Кунанбаев',
        ],
        rightAnswer: 4
    },
    {
        question: 'Герменевтика – это искусство:',
        options: [
            'истолкования текстов',
            'перевода',
            'логического изложения',
            'удачно найденного решения',
            'оборота речи',
        ],
        rightAnswer: 0
    },
    {
        question: 'Выделите закон диалектики.',
        options: [
            'закон тождества',
            'закон детерминации',
            'закон исключённого третьего',
            'закон единства и борьбы противоположностей',
            'закон противоречия',
        ],
        rightAnswer: 3
    },
    {
        question: 'Назовите учение абсолютизирующее роль науки в истории человечества, в соответствии с этим учением все имеющие смысл проблемы рассматриваются как научноразрешимые:',
        options: [
            'релятивизм',
            'сциентизм',
            'экзистенциализм',
            'агностицизм',
            'теоцентризм',
        ],
        rightAnswer: 1
    },
    {
        question: 'Метод эмпирического исследования:',
        options: [
            'синтез',
            'дедукция',
            'наблюдение',
            'формализация',
            'идеализация',
        ],
        rightAnswer: 2
    },
    {
        question: 'Семь ценностей «Мәңгілік Ел» объединили в себе:',
        options: [
            'единую дорогу, единые партии',
            'единое будущее, единую цель, единые интересы',
            'единые группы, субкультуры',
            'единые интересы, единое общество',
            'единый мир, единых людей',
        ],
        rightAnswer: 1
    },
    {
        question: 'Формы рационального познания:',
        options: [
            'понятие, суждение, умозаключение',
            'понятие, гипотеза',
            'суждения, чувство',
            'представление, понятие, суждение',
            'умозаключение, ощущение, гипотеза',
        ],
        rightAnswer: 0
    },
    {
        question: 'Поэты эпохи «Зар Заман» (скорби).',
        options: [
            'Мурат акын, Марат акын',
            'Шалкииз, Бухар',
            'Абай Кунанбаев, Чокан Валиханов',
            'Асан Кайгы, Шалкииз',
            'Шортанбай Канаев, Дулат Бабатаев',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что объединяет эти имена: Д. Медоуз, А. Печчеи, А. Кинг?',
        options: [
            'специалисты по проблемам массовой культуры',
            'теоретики-искусствоведы',
            'математики',
            'представители организации «Римский клуб»',
            'сторонники техногенного общества',
        ],
        rightAnswer: 3
    },
    {
        question: 'Автор философского произведения «Кутадгу билиг».',
        options: [
            'Яссауи',
            'Аль-Фараби',
            'Жусип Баласагуни ',
            'Кашгари',
            'Омар Хайям',
        ],
        rightAnswer: 2
    },
    {
        question: 'Человек в средневековой философии рассматривался как…',
        options: [
            'образ мира',
            'дитя природы',
            'часть природы',
            'образ и подобие Бога',
            'властелин природы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Определите философское направление, которое отрицает познаваемость мира.',
        options: [
            'агностицизм',
            'солипсизм',
            'фрейдизм',
            'позитивизм',
            'скептицизм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Исторические типы мировоззрения.',
        options: [
            'Ощущение, восприятие',
            'Бессознательное, сознание',
            'Мифология, религия, философия',
            'Интуиция и мышление',
            'Воображение, представление',
        ],
        rightAnswer: 2
    },
    {
        question: 'Пантеизм – это учение о сближении:',
        options: [
            'знания и воли',
            'духа и материи',
            'разума и веры',
            'бога и природы',
            'времени и пространства',
        ],
        rightAnswer: 3
    },
    {
        question: 'Спор между номиналистами и реалистами в средневековье – это спор:',
        options: [
            'о погоде',
            'о свободе',
            'о форме религиозной веры',
            'о движении, т.е апориях',
            'об универсалиях, т.е общих понятиях',
        ],
        rightAnswer: 4
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

if(score == 0 || score == 1 || score == 2)  {
    msgOfResult.innerHTML = 'Пидр';
} 
 else if(score == 3 || score == 4 || score == 5) {
    msgOfResult.innerHTML = 'Не плохо, но все еще пидр';
 }
 else if(score == 6 || score == 7 || score == 8) {
    msgOfResult.innerHTML = 'Средний пидр';
 }
 else if(score == 9 || score == 10 || score == 11) {
    msgOfResult.innerHTML = 'Нормальный пидр';
 }
 else if(score == 12 || score == 13 || score == 14) {
    msgOfResult.innerHTML = 'Запомнивший пидр';
 } else {
    msgOfResult.innerHTML = 'Умный пидр';
 }


const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    coratten();
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";   
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
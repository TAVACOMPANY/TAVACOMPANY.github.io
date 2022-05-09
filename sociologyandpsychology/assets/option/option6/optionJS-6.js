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
        question: 'Ежедневно появляется на экране с актуальной информацией, держится уверенно, демократично, политических пристрастий не показывает. Это характеристика:',
        options: [
            'Обозревателя',
            'Комментатора',
            'ведущего новостей',
            'Модератора',
            'Шоумена',
        ],
        rightAnswer: 2
    },
    {
        question: 'Укажите структуру образования:',
        options: [
            'открытые и закрытые учебные заведения',
            'элитарные, массовые учреждения образования',
            'школа, колледж, ВУЗ',
            'дошкольное, среднее, высшее, послевузовское;',
            'очная и заочная форма обучения.',
        ],
        rightAnswer: 3
    },
    {
        question: 'В группу эмпирических методов входят:',
        options: [
            'наблюдение, эксперимент',
            'сравнительный, лонгитюдный, комплексный',
            'анализ, синтез, наблюдение',
            'эксперимент, анализ, логнгитюдный',
            'анализ, комплексный',
        ],
        rightAnswer: 0
    },
    {
        question: 'К функциям воли относятся:',
        options: [
            'обучающая, мотивационная',
            'побудительная, тормозная',
            'обучающая, побудительная',
            'развивающая, тормозная',
            'мотивационная, развивающая',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сильное, бурное и кратковременное эмоциональное переживание, полностью захватывающее психику человека и предопределяющее единую реакцию на ситуацию в целом',
        options: [
            'Желание',
            'Собственно эмоции',
            'Чувства',
            'Настроение',
            'Аффект',
        ],
        rightAnswer: 4
    },
    {
        question: 'История психологии как экспериментальной науки начинается в',
        options: [
            '1880 году',
            '1875 году',
            '1877 году',
            '1879 году',
            '1882 году',
        ],
        rightAnswer: 3
    },
    {
        question: 'Представляют собой убеждения людей о жизни и приемлемом поведении:',
        options: [
            'реальный потребности индивида',
            'социальные ценности',
            'личные ценности',
            'стремление человека быть счастливым',
            'идеалы человека',
        ],
        rightAnswer: 2
    },
    {
        question: 'Одной из причин возникновения психосоматического заболевания можно назвать:',
        options: [
            'неотреагированные эмоции',
            'проблемы с восприятием окружающего мира',
            'желание человека быть лучше всех',
            'умение решать свои проблемы за счет другого человека',
            'внешняя агрессия',
        ],
        rightAnswer: 0
    },
    {
        question: 'Установки, которые связаны с представлениями индивида о том, каким бы он хотел стать',
        options: [
            'желаемое Я',
            'реальное Я',
            'зеркальное (социальное) Я',
            'развивающееся Я',
            'идеальное Я',
        ],
        rightAnswer: 4
    },
    {
        question: 'Метод, позволяющий подавить болезненные, вредные по своим последствиям представления и заменить их полезными и благотворными',
        options: [
            'Медитация',
            'Произвольное самовнушение по Э. Куэ',
            'Аутогенная тренировка',
            'Имажинативная психотерапия',
            'Нервно-мышечная релаксация',
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
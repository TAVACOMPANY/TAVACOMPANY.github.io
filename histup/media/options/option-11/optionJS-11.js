/* все ответы */
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');

/* все наши вопросы */
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
        question: 'Жырау, активно участвовавший в походах против джунгар: ',
        options: [
            'Таттимбет',
            'Шернияз',
            'Даулеткерей',
            'Актамберды',
            'Махамбет',
        ],
        rightAnswer: 3
    },
    {
        question: 'Нерешенность социально-бытовых проблем населения стала причиной выступлений трудящихся в конце 50-х годах XX века: ',
        options: [
            'Джезказгане',
            'Павлодаре',
            'Тимиртау',
            'Целинограде',
            'Лениногорске',
        ],
        rightAnswer: 2
    },
    {
        question: 'На постепенный переход к президентско-парламентской республике была направлена Конституционная реформа: ',
        options: [
            '1997 г.',
            '2011 г.',
            '1998 г.',
            '2007 г.',
            '2010 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Бухар-жырау был современником хана: ',
        options: [
            'Касыма ',
            'Абылая',
            'Кенесары',
            'Есима',
            'Тауекеля',
        ],
        rightAnswer: 1
    },
    {
        question: '«Вооруженные, достойные потомки» означает: ',
        options: [
            '«Канлы»',
            '«Найманы»',
            '«Кереи»',
            '«Конраты»',
            '«Аргыны»',
        ],
        rightAnswer: 0
    },
    {
        question: 'Восточная баня X-XII веков с общей площадью 11,5 х 16,5 м обнаружена в городе: ',
        options: [
            'Отрар',
            'Тараз',
            'Сыгнак',
            'Испиджаб',
            'Туркестан',
        ],
        rightAnswer: 0
    },
    {
        question: 'Культура племен Северного Казахстана в I тысячелетии до н.э. имела много общего с культурой: ',
        options: [
            'Тюрков Западной Сибири',
            'Монгол Центральной Азии',
            'Гуннов поселившихся в Европе',
            'Сакских племен Юга Казахстана',
            'Эфталитов Прикаспия ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Одной из причин переселения карлуков в Жетысу в первой половине VIII в. явилось поражение от: ',
        options: [
            'Уйгурского каганата ',
            'Огузского государства',
            'Кипчакского ханства ',
            'Кимакского каганата',
            'Караханидского государства',
        ],
        rightAnswer: 0
    },
    {
        question: 'История кыпчаков тесно связана с племенем: ',
        options: [
            'Кереев',
            'Кимаков',
            'Карлуков',
            'Огузов',
            'Найман',
        ],
        rightAnswer: 1
    },
    {
        question: 'В годы правления хана Тауке ослаблению междоусобиц способствовало: ',
        options: [
            'Военное подавление мятежей',
            'Уменьшение роли биев',
            'Усиление власти султанов',
            'Принятие закона «Жеты Жаргы»',
            'Уничтожение рода катаган',
        ],
        rightAnswer: 3
    },
    {
        question: 'Регион расположения кургана Иссык: ',
        options: [
            'Северный Казахстан',
            'Центральный Казахстан',
            'Жетысу',
            'Восточный Казахстан',
            'Арало-Каспийский регион',
        ],
        rightAnswer: 2
    },
    {
        question: 'На правобережье Иртыша крепость Железинская построена в: ',
        options: [
            '1717 г.',
            '1716 г.',
            '1720 г.',
            '1727 г.',
            '1737 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Строительство Туркестано-Сибирской железной дороги было начато в: ',
        options: [
            '1925 г.',
            '1927 г.',
            '1921 г.',
            '1929 г.',
            '1923 г.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Район распространения Кауншинской культуры: ',
        options: [
            'Центральный Казахстан',
            'Северный Казахстан',
            'Южный Казахстан',
            'Западный Казахстан',
            'Восточный Казахстан',
        ],
        rightAnswer: 2
    },
    {
        question: 'Вторые лица государства гуннов - темники - определялись по принципу: ',
        options: [
            'Выборности',
            'Приоритета личных заслуг',
            'Перехода власти по наследству',
            'Родственной принадлежности',
            'Иерархическому',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кереи первоначально обитали на берегах реки: ',
        options: [
            'Орхон ',
            'Иртыш',
            'Енисей',
            'Аму-Дарьи',
            'Сыр-Дарьи',
        ],
        rightAnswer: 0
    },
    {
        question: 'Греко-македонским войскам путь на Восток в IV в. до н.э. преградили: ',
        options: [
            'Гунны',
            'Саки ',
            'Кангюи',
            'Уйсуны',
            'Сарматы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Айшуак султан был назначен ханом Младшего жуза в',
        options: [
            '1797 г.',
            '1769 г.',
            '1767 г.',
            '1783 г.',
            '1722 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Процесс создания крупного, машинного производства - это: ',
        options: [
            'Урбанизации',
            'Мобилизации',
            'Экспроприация',
            'Индустриализация',
            'Коллективизация',
        ],
        rightAnswer: 3
    },
    {
        question: 'Цель, поставленная на Апрельском пленуме ЦК КПСС 1985 года: ',
        options: [
            'Формирование нового политического мышления',
            'Перевод на хозрасчет промышленных предприятий',
            'Открытие доступа к засекреченным архивам ',
            'Пересмотр внешнеполитического курса',
            'Ускорение темпов социально-экономического развития',
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

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
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
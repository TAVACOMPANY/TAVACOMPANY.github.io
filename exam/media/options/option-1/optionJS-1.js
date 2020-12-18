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
        question: 'В годы освоения целины, какое количество земель было распахано в Казахстане? ',
        options: [
            '7 миллионов гектар',
            '31 миллион гектар',
            '16 миллионов гектар',
            '12 миллионов гектар',
            '25 миллионов гектар',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сколько человек переехало в Казахстан в годы освоения целины? ',
        options: [
            '1,7 млн.',
            '3,4 млн.',
            '2 млн.',
            '4,1 млн.',
            '3,8 млн.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Историческое событие 1954г. для Казахстана: ',
        options: [
            'проводились экономические реформы',
            'забастовка в Новом Узене',
            'освоение целинных и залежных земель',
            'к власти пришел Д. Кунаев',
            'выступление молодежи в Алма-Ате',
        ],
        rightAnswer: 2
    },
    {
        question: 'Укажите регионы, вошедшие в понятие «целина»: ',
        options: [
            'Южная Сибирь, Казахстан, Урал, Поволжье, Северный Кавказ ',
            'Сибирь, Казахстан',
            'Урал, Поволжье, Северный Казахстан',
            'Сибирь, Урал, Казахстан',
            'Центральный Казахстан, Северный Кавказ, Урал',
        ],
        rightAnswer: 0
    },
    {
        question: 'Освоение целинных и залежных земель в 50-60-е годы XX века было задумано с целью: ',
        options: [
            'Увеличение промышленного производства',
            'Обмен специалистами',
            'Увеличение производства зерна и сельхозпродукции',
            'Демографический рост Казахстана',
            'Повышение уровня культуры',
        ],
        rightAnswer: 2
    },
    {
        question: 'Когда было проведено первое испытание на Семипалатинском ядерном полигоне? ',
        options: [
            '1942 г.',
            '1951 г.',
            '1972 г.',
            '1949 г.',
            '1963 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Семипалатинский ядерный полигон был расположен на стыке областей: ',
        options: [
            'Семипалатинской, Павлодарской, Карагандинской',
            'Семипалатинской и Петропавловской',
            'Семипалатинской и Восточно-Казахстанской',
            'Семипалатинской и Павлодарской',
            'Семипалатинской и Карагандинской',
        ],
        rightAnswer: 0
    },
    {
        question: 'Когда молодежь Целинограда (Акмолa) выступила против создания немецкой автономии на территории Казахстана? ',
        options: [
            'июнь 1979г.',
            'октябрь 1980 г.',
            'сентябрь 1985 г.',
            'май 1969 г.',
            'декабрь 1986 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'В 70-е годы в экономике республики продолжается усиленная: ',
        options: [
            'социализация',
            'капитализация',
            'стандартизация',
            'популяция',
            'милитаризация',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какая из перечисленных ниже отраслей Казахстан в 80х годах XX в. являлась преобладающей в экспорте? ',
        options: [
            'сырьевая',
            'легкой промышленности',
            'автомобильная',
            'зерновая',
            'перерабатывающая',
        ],
        rightAnswer: 0
    },
    {
        question: 'Ведущая политическая сила советского общества: ',
        options: [
            'Социалистическая партия',
            'Социал-демократическая партия',
            'Верховный Совет СССР',
            'Коммунистическая партия',
            'народ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой характер носили события 17-18 декабря 1986г. Алматы? ',
        options: [
            'политический',
            'культурный',
            'социальный',
            'религиозный',
            'экономический',
        ],
        rightAnswer: 0
    },
    {
        question: 'Комитет по проблеме Арала и Балхаша был создан по инициативе: ',
        options: [
            'М. Ауэзова',
            'Н. Назарбаева',
            'М.Шаханова',
            'О. Сулейменова',
            'Д. Кунаева',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое место занимал Казахстан по объему экспортных поставок в СССР в конце 80-х г. XX в.? ',
        options: [
            'пятое',
            'последнее место',
            'второе',
            'первое место',
            'третье',
        ],
        rightAnswer: 0
    },
    {
        question: 'Когда была открыта Академия Наук Каз.ССР? ',
        options: [
            '1956 г.',
            '1941 г.',
            '1947 г.',
            '1954 г.',
            '1946 г.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Когда была провозглашена Декларация о суверенитете Казахстана? ',
        options: [
            'в декабре 1991 г.',
            'в октябре 1990г.',
            'в сентябре 1989 г.',
            'в мае 1995 г.',
            'в ноябре 1989 г.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Историческое событие 2 октября 1991 г.: ',
        options: [
            'Казахстан вступает в СНГ',
            'полет в космос первого казаха— Т.Аубакирова',
            'образовалась Партия "Нур Отан"',
            'образована Национальная Гвардия',
            'образовалась Демократическая партия',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое событие в жизни Казахстана произошло 2 марта 1992г.? ',
        options: [
            'Введена национальная валюта',
            'принята Конституция',
            'Казахстан вступает в ООН',
            'образована Национальная Гвардия',
            'вступление в ОБСЕ',
        ],
        rightAnswer: 2
    },
    {
        question: 'В каком году была введена национальная валюта- тенге? ',
        options: [
            '30 августа 1995 г.',
            '15 ноября 1993 г.',
            'июне 1992 г.',
            '20 мая 1991 г.',
            '7 мая 1992 г.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Когда Президент Республики Казахстан Н.A.Назарбаев подписал указ о закрытии Семипалатинского ядерного полигона? ',
        options: [
            '28 августа 1991г.',
            '30 августа 1995 г.',
            '16 декабря 1991 г.',
            '30 сентября 1996 г.',
            '28 июня 1992 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как называется день 16 декабря 1991г. в Республике Казахстан? ',
        options: [
            'День Независимости Казахстана',
            'День единства народа Казахстана',
            'День Защитника Отечества',
            'День Конституции',
            'День Республики',
        ],
        rightAnswer: 0
    },
    {
        question: 'Парламент Республики Казахстан состоит из: ',
        options: [
            'Сената',
            'Мажилиса и Государственной Думы',
            'Сената и Мажилиса',
            'Маслихатов',
            'Народного собрания и Думы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Когда состоялась торжественная презентация новой столицы Казахстана -Астаны? ',
        options: [
            'в августе 1997 г.',
            'в 2000 г.',
            'в июле 1988 г.',
            'в июне 1998 г.',
            'в июне 1997 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Назовите авторов Герба РК? ',
        options: [
            'Ш. Калдаяков, Н. Назарбаев',
            'Ж. Малибеков, Ш. Калдаяков',
            'Ш.Ниязбеков, К. Мыразлиев',
            'Ж.Малибеков, Ш.Уалиханов',
            'Ж. Дарибаева, М. Макатаев',
        ],
        rightAnswer: 3
    },
    {
        question: 'Назовите автора Флага РК? ',
        options: [
            'Ж. Дарибаева',
            'Ш. Уалиханов',
            'К. Мырзалиев',
            'М. Алимбаев',
            'Ш. Ниязбеков',
        ],
        rightAnswer: 4
    },
    {
        question: 'Перспективные цели развития Казахстана определены в работе Н.Назарбаева: ',
        options: [
            'Казахстан -2030',
            'Критическое десятилетие',
            'Идеи евразийства',
            'В потоке истории',
            'На пороге ХХI века',
        ],
        rightAnswer: 0
    },
    {
        question: 'На какой срок избирается Президент РК, согласно Конституции страны? ',
        options: [
            'на 7 лет',
            'на 5 лет',
            'на 10 лет',
            'на 4 года',
            'на 8 лет',
        ],
        rightAnswer: 1
    },
    {
        question: 'Конституция гарантирует бесплатное образование: ',
        options: [
            'дошкольное',
            'послевузовское',
            'высшее',
            'среднее',
            'начальное',
        ],
        rightAnswer: 3
    },
    {
        question: 'Идея, выдвинутая A Байтурсыновым и М. Дулатовым в 1917 году: ',
        options: [
            'создание автономии',
            'идея пантюркизма',
            'идея мусульманского государства',
            'создание суверенного государства',
            'установление демократии',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какую газету издавала Омская объединенная организация РСДРП в апреле-июне 1917 г.? ',
        options: [
            '«Коммунист»',
            '«Рабочий»',
            '«Правда»',
            '«Казах»',
            '«Комсомолец»',
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
        playAudioCorrect();
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
        playAudioWrong();
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

function playAudioCorrect(){
    var myAudio = new Audio;
    myAudio.src = "../../correct-answer.mp3";
    myAudio.play();
    myAudio.volume= 0.07;
}

function playAudioWrong(){
    var myAudio1 = new Audio;
    myAudio1.src = "../../wrong-answer.mp3";
    myAudio1.play();
    myAudio1.volume= 0.07;
}
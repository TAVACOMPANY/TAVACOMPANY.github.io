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
        question: 'Вуз в Астане, носящий имя видного государственного и общественного деятеля, писателя С. Сейфуллина: ',
        options: [
            'Университет «Туран»',
            'Агротехнический университет',
            'Гуманитарно-юридический университет',
            'Казахстанско-Российский университет',
            'Филиал Московского госуниверситета им. Ломоносова',
        ],
        rightAnswer: 1
    },
    {
        question: 'В результате роспуска Коммунистической партии в сентябре 1991 г. образована партия: ',
        options: [
            'Социал-демократическая',
            'Отан',
            'Социалистическая',
            'Народный конгресс Казахстана',
            'Азат',
        ],
        rightAnswer: 2
    },
    {
        question: 'В глобальном рейтинге военной мощи 2016 г. Казахстан занял место: ',
        options: [
            '68',
            '58',
            '50',
            '37',
            '53',
        ],
        rightAnswer: 4
    },
    {
        question: '2 марта 1992 г. РК принята в состав международной организации: ',
        options: [
            'НАТО',
            'ВТО',
            'ЮНЕСКО',
            'ООН',
            'СНГ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Государства, являющиеся важными партнерами Казахстана на Евразийском континенте: ',
        options: [
            'Россия, Китай, Индия',
            'Россия, Индия, Иран',
            'Россия, Китай, республики Центральной Азии',
            'Россия, Белоруссия, республики Центральной Азии',
            'Россия, Белоруссия',
        ],
        rightAnswer: 2
    },
    {
        question: 'Наиболее многочисленная казахская диаспора располагается в: ',
        options: [
            'России',
            'Узбекистане',
            'Китае',
            'Монголии',
            'Кыргызстане',
        ],
        rightAnswer: 2
    },
    {
        question: 'Периоду независимости Казахстана предшествовала эпоха советской истории: ',
        options: [
            'Оттепель',
            'Перестройка',
            'Застой',
            'Волюнтаризм',
            'Администрирование',
        ],
        rightAnswer: 1
    },
    {
        question: 'Согласно Конституции наша страна – светское государство – означает: ',
        options: [
            'Государственной религией является ислам',
            'Государственной религией является ислам, христианство',
            'Государственной религией является ислам, православие',
            'Отделение церкви от государства',
            'Государственной политикой выступает атеизм',
        ],
        rightAnswer: 3
    },
    {
        question: 'В целях обеспечения государственной независимости республики внутренние войска были сформированы: ',
        options: [
            'Январь 1992 г.',
            'Май 1992 г.',
            'Апрель 1993 г.',
            'Сентябрь 1995 г.',
            'Декабрь 1991 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'РК развивает военно-техническое сотрудничество с: ',
        options: [
            'Россией, США, Узбекистаном',
            'Белоруссией, Украиной, Индией',
            'Россией, Пакистаном',
            'Индией, Ираном, Арменией',
            'Россией, Турцией, Израилем',
        ],
        rightAnswer: 4
    },
    {
        question: 'РК – член международной организации военно-политической направленности: ',
        options: [
            'Таможенный Союз',
            'ЕАЭС',
            'ОДКБ',
            'НАТО',
            'Организации Исламская конференция',
        ],
        rightAnswer: 2
    },
    {
        question: 'Страна, поставляющая вооружениe РК по «внутренним» ценам (как для своих Вооружённых Сил): ',
        options: [
            'Китай',
            'Россия',
            'Индия',
            'Иран',
            'Белоруссия',
        ],
        rightAnswer: 1
    },
    {
        question: 'Стела в честь тюркского кагана Культегина, научная копия которой установлена в 2001 г. в ЕНУ им. Л.Н. Гумилёва, относится к жанру: ',
        options: [
            'Лирической поэзии',
            'Восточного фольклора',
            'Религиозного трактата',
            'Героического эпоса ',
            'Политической прозы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Планомерные действия руководства РК, направленные на преодоление последствий экологической катастрофы советского периода, предпринимаются в регионе: ',
        options: [
            'Арал',
            'Байконур',
            'Семипалатинский ядерный полигон',
            'Сарышаган',
            'Сары-Озек',
        ],
        rightAnswer: 0
    },
    {
        question: 'Казахская ССР преобразована в Республику Казахстан: ',
        options: [
            '1991 г., 16 декабря',
            '1991 г., 25 октября',
            '1991 г., 10 декабря',
            '1993 г., 28 января',
            '1995 г., 30 августа',
        ],
        rightAnswer: 2
    },
    {
        question: 'Социалистическая партия Казахстана, созданная в сентябре 1991 г., преемница: ',
        options: [
            'Профсоюзов',
            'Комсомола',
            'Компартии',
            'Студенческих стройотрядов',
            'Историко-просветительского общества «Адилет»',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ключевые слова Президента в Послании народу «Казахстан-2030»: ',
        options: [
            'Консолидация общества, межнациональное согласие',
            'Процветание, безопасность и улучшение благосостояния',
            'Экономическая стабильность, здоровье нации',
            'Социальная справедливость, патриотизм, профессиональное государство',
            'Cтабильность, улучшение благосостояния',
        ],
        rightAnswer: 1
    },
    {
        question: 'Международный казахско-турецкий университет им. A.Х. Яссауи расположен в городе: ',
        options: [
            'Туркестане',
            'Шымкенте',
            'Сайраме',
            'Сарыагаше',
            'Тюлькубасе',
        ],
        rightAnswer: 0
    },
    {
        question: 'Конституция РК 30 августа 1995 г. принята путём: ',
        options: [
            'Плебисцита',
            'Верховным Советом',
            'Указом Президента',
            'Референдума',
            'С одобрения ООН',
        ],
        rightAnswer: 3
    },
    {
        question: 'Одно из первых общественных движений, имевшее чётко выраженную антивоенную направленность: ',
        options: [
            'Комитет «Арал-Балхаш»',
            '«Единство»',
            '«Азат»',
            '«Невада-Семипалатинск»',
            '«Адилет»',
        ],
        rightAnswer: 3
    },
    {
        question: 'Территория PК – трасса возрождаемого маршрута в деле сотрудничества Востока и Запада, известного в истории как: ',
        options: [
            'Шёлковый путь',
            'Степной путь',
            'Нефритовый путь',
            'Лазуритовый путь',
            'Путь благоденствия',
        ],
        rightAnswer: 0
    },
    {
        question: 'Протяжённость трассы Западный Китай – Западная Европа по территории Казахстана: ',
        options: [
            '2787 км',
            '2801 км',
            '2914 км',
            '2790 км',
            'Около 3000 км',
        ],
        rightAnswer: 0
    },
    {
        question: 'Области, по территории которых пройдёт трансконтинентальный коридор «Западный Китай-Западная Европа»: ',
        options: [
            'Жамбылская, Мангистауская',
            'Алматинская, Жамбылская',
            'Алматинская, Карагандинская',
            'Актюбинская, Западно-Казахстанская',
            'Кызылординская, Мангистауская',
        ],
        rightAnswer: 1
    },
    {
        question: 'В 2005 г. на территории какой области России открыт мавзолей Курмангазы: ',
        options: [
            'Волгоградской',
            'Самарской ',
            'Саратовской',
            'Оренбургской',
            'Астраханской',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сегодня Казахстан испытывает дефицит специалистов: ',
        options: [
            'Рабочих профессий',
            'Врачей',
            'Лётчиков',
            'Моряков',
            'Атомщиков ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Суть планируемой реформы казахского алфавита: ',
        options: [
            'Переход на латиницу',
            'Модернизация существующего кириллического алфавита',
            'Сокращение букв в существующем алфавите',
            'Введение новых букв в существующий алфавит для передачи специфических звуков',
            'Переход на смешанный латинско-кириллический вариант',
        ],
        rightAnswer: 0
    },
    {
        question: 'Создание историко-просветительского общества «Адилет» имело целью: ',
        options: [
            'Реабилитация жертв репрессий советского периода',
            'Помощь заключённым',
            'Помощь членам семей репрессированных',
            'Помощь казахам-вынужденным эмигрантам',
            'Реабилитация деятелей культуры, пострадавших от советской власти',
        ],
        rightAnswer: 0
    },
    {
        question: 'Зарубежные инвестиции в 1994-1995 годах вкладывались в основном: ',
        options: [
            'Транспорт',
            'Пищевую промышленность',
            'Лёгкую промышленность',
            'Обрабатывающую промышленность',
            'Добывающую промышленность',
        ],
        rightAnswer: 4
    },
    {
        question: 'Государство, признавшее первым независимость Казахстана: ',
        options: [
            'Россия',
            'Китай',
            'США',
            'Турция',
            'Кувейт',
        ],
        rightAnswer: 3
    },
    {
        question: '2 января 1992 г. Казахстан стал членом: ',
        options: [
            'ООН',
            'ОБСЕ',
            'ОДКБ',
            'НАТО',
            'Организации Исламской конференции',
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
}

function playAudioWrong(){
    var myAudio1 = new Audio;
    myAudio1.src = "../../wrong-answer.mp3";
    myAudio1.play();
}
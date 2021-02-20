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
        question: 'Памятник раннежелезного века, расположенный на правом берегу р.Есиль: ',
        options: [
            'Бектениз',
            'Актау',
            'Карлыга',
            'Борки',
            'Кеноткел',
        ],
        rightAnswer: 1
    },
    {
        question: 'Переход от присваивающего к производящему произошел в эпоху: ',
        options: [
            'Энеолита',
            'Мустье',
            'Мезолита',
            'Палеолита',
            'Неолита',
        ],
        rightAnswer: 4
    },
    {
        question: 'Атабек у огузов - это: ',
        options: [
            'Сборщик налогов',
            'Военачальник',
            'Наследник джабгу',
            'Наставник наследника',
            'Советник джабгу',
        ],
        rightAnswer: 3
    },
    {
        question: 'Местом летней пастьбы скота называют : ',
        options: [
            'Жайляу',
            'Кузеу',
            'Кент',
            'Коктеу',
            'Кыстау',
        ],
        rightAnswer: 0
    },
    {
        question: 'Саки, проживавшие в Жетысу в предгорьях Тянь-Шаня: ',
        options: [
            'Тиграхауда',
            'Даи',
            'Аргиппеи',
            'Парадарайа',
            'Хаумаварга',
        ],
        rightAnswer: 0
    },
    {
        question: 'Курс на ускорение социально-экономического развития страны был взят на апрельском пленуме КПСС в: ',
        options: [
            '1987 г.',
            '1978 г.',
            '1979 г.',
            '1986 г.',
            '1985 г.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Область, вошедшая в состав Туркестанского генерал-губернаторства по реформам 1867 - 1868 гг.: ',
        options: [
            'Уральская',
            'Тургайская',
            'Сырдарьинская',
            'семипалатинская',
            'Акмолинская',
        ],
        rightAnswer: 2
    },
    {
        question: 'Восстание под руководством К. Касымова произошло в: ',
        options: [
            '1836 - 1838 гг.',
            '1868 - 1869 гг.',
            '1837 - 1847 гг.',
            '1783 - 1797 гг.',
            '1773 - 1775 гг.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Титул огузского правителя: ',
        options: [
            'Джабгу',
            'Сюйбаши',
            'Гуньмо',
            'Хан',
            'Шаньюй',
        ],
        rightAnswer: 0
    },
    {
        question: '20 марта 1921 года принято решение: ',
        options: [
            'О переходе к новой экономической политике',
            'Заменить продналог продразверсткой',
            'Создать обьекты потребительской кооперации',
            'Начать создание коллективных хозяйств ',
            'Сформировать единый рынок страны',
        ],
        rightAnswer: 0
    },
    {
        question: ' Год принятия Государственной программы «мәдени мұра» («Культурное наследие»): ',
        options: [
            '2008 г.',
            '2000 г.',
            '2004 г.',
            '2002 г.',
            '2010 г.',
        ],
        rightAnswer: 2
    },
    {
        question: 'В СССР необходимы были специалисты сельского хозяйства в период: ',
        options: [
            'Ликвидации безграмотности',
            'Освоение целины',
            'Автоматизации производства',
            'Милитаризации экономики',
            'Индустриализации промышленности',
        ],
        rightAnswer: 2
    },
    {
        question: '28-ая зимняя универсиада в Алматы проводилась: ',
        options: [
            '2015 г.',
            '2014 г.',
            '2017 г.',
            '2011 г.',
            '2018 г.',
        ],
        rightAnswer: 2
    },
    {
        question: 'По свидетельствам М.Кашгари в VIII веке тюрский язык знали: ',
        options: [
            'Тибетцы',
            'Индусы',
            'Арабы',
            'Китайцы',
            'Согдийцы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Производство стекла в X - XI вв. было известно в городах: ',
        options: [
            'Алмалык, Койлык',
            'Отрар, Тараз',
            'Талгар, Аякамыр',
            'Жанакент, Имекия',
            'Шавгар, Карантия',
        ],
        rightAnswer: 1
    },
    {
        question: 'Находки, свидетельствующие о торговых контактах сарматов с греческими колониями, найдены в могильнике: ',
        options: [
            'Северного Казахстана',
            'Южного Казахстана',
            'Центрального Казахстана',
            'Западного Казахстана',
            'Восточного Казахстана',
        ],
        rightAnswer: 3
    },
    {
        question: 'Архитектурные памятники VI - IX вв. Мырзарабат и Якка являются: ',
        options: [
            'Мавзолеями',
            'Дворцами',
            'Сардобами',
            'Мазарами',
            'Балбалами',
        ],
        rightAnswer: 2
    },
    {
        question: 'С.Садвокасов и Ж.Мынбаев были обвинены в местном национализме в период: ',
        options: [
            'Восстания 1916 года',
            'НЭПа',
            'Октяборьской революции',
            'Гражданской войны',
            'Осуществления индустриализации',
        ],
        rightAnswer: 4
    },
    {
        question: 'Архетектурный памятник X - XII вв. Казахстана, мавзолей: ',
        options: [
            'Кок Кесене',
            'Айша Биби',
            'Рабиги Султан Бегим',
            'Ходжа Ахмеда Йасауи',
            'Даутбека',
        ],
        rightAnswer: 1
    },
    {
        question: 'Исключите лишнее из городов государства, располагавшегося по соседству с Китаем и уйсунами: ',
        options: [
            'Бабиш-Молда',
            'Битянь',
            'Алтынасар',
            'Пушик-Мардан',
            'Кок Мардан',
        ],
        rightAnswer: 0
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
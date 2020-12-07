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
        question: 'История государства «кочевых узбеков», в период правления хана Абулхаира, описывается в труде: ',
        options: [
            'Марвази',
            'Кухистани',
            'Карпини',
            'Джувейни',
            'Гардизи',
        ],
        rightAnswer: 1
    },
    {
        question: 'Накануне индустриализации ведущей отраслью хозяйства было (-а, -и): ',
        options: [
            'Сельское хозяйство',
            'Домашние промыслы',
            'Легкая промышленность',
            'Химическая промышленность',
            'Автомобилестроение',
        ],
        rightAnswer: 0
    },
    {
        question: 'В июне 1979 г. в г.Целинограде прошли массовые выступления против: ',
        options: [
            'Смены руководства республики',
            'Ввода советских войск а Афганистан',
            'Обвоения целинных земель',
            'Создания немецкой автономии в Казахстане',
            'Испытания ядерного оружия на Семипалатинском полигоне',
        ],
        rightAnswer: 3
    },
    {
        question: 'Указ царя от 25 июня 1916 года о реквизиции инородческого населения казахский народ ответил: ',
        options: [
            'Созданием добровольческих бригад',
            'Всеобщей мобилизацией',
            'Национальным восстанием',
            'Протестом местной администрации',
            'Протестом мусульманского духовенства',
        ],
        rightAnswer: 2
    },
    {
        question: 'Доказательством того, что сакам была известна письменность, является найденная в Иссыкском кургане надпись, нанесенная на: ',
        options: [
            'Серебрянную чашу',
            'Браслет',
            'Стелу',
            'Рукоятку меча',
            'Пергамент',
        ],
        rightAnswer: 0
    },
    {
        question: 'Период в истории человечества, именуемый «эпоха глиняных горшков»: ',
        options: [
            'Бронзовый век',
            'Палеолит',
            'Неолит',
            'Мезолит',
            'Энеолит',
        ],
        rightAnswer: 2
    },
    {
        question: 'Казахская ССР была преобразована в Республику Казахстан в: ',
        options: [
            '1989 г.',
            '1993 г.',
            '1990 г.',
            '1992 г.',
            '1991 г.',
        ],
        rightAnswer: 4
    },
    {
        question: 'К 20-м годам XVIII века серьезную угрозу для государств Центрально-Азиатского региона представлял(-о): ',
        options: [
            'Хива',
            'Китай',
            'Кокандское ханство',
            'Бухарское ханство',
            'Джунгария',
        ],
        rightAnswer: 4
    },
    {
        question: 'После неандертальцев около 40-30 тыс. лет назад появился: ',
        options: [
            '«питекантроп»',
            '«человек пещерный»',
            '«человек выпрямленный»',
            '«кроманьонец»',
            '«синантроп»',
        ],
        rightAnswer: 3
    },
    {
        question: 'Разделение труда произошло в эпоху: ',
        options: [
            'Раннего палеолита',
            'Среднего палеолита',
            'Мустье',
            'Палеолита',
            'Энеолита',
        ],
        rightAnswer: 4
    },
    {
        question: 'Расширение хозяйственной самостоятельности предприятий предполагалось реформой: ',
        options: [
            '1970 года',
            '1965 года',
            '1946 года',
            '1954 года',
            '1960 года',
        ],
        rightAnswer: 1
    },
    {
        question: 'объекты научного исследования Е.П. Михаэлиса: ',
        options: [
            'Гора Белуха',
            'Тарбагатай',
            'горы Тянь-Шань',
            'Уральские горы',
            'Джунгарское Алатау',
        ],
        rightAnswer: 1
    },
    {
        question: 'Ярмарка, открытая в середине XIX в. в Каркаралинском уезде: ',
        options: [
            'Аулие-Атинская',
            'Кояндинско-Ботовская',
            'Петровская',
            'Тайыншакольская',
            'Константиновско-Еленовская',
        ],
        rightAnswer: 1
    },
    {
        question: 'В 1960-е годы студенты казахи, обучавшиеся в ВУЗах Москвы, создали неофициальную организацию: ',
        options: [
            '«Алаш»',
            '«Азат»',
            '«Тайшуба»',
            '«Жас казах»',
            '«Жас тулпар»',
        ],
        rightAnswer: 4
    },
    {
        question: 'Вождь, возглавивший борьбу саков против Дария І: ',
        options: [
            'Скунха',
            'Арриан',
            'Ширак',
            'Спитамен',
            'Спаргапис',
        ],
        rightAnswer: 0
    },
    {
        question: 'Встреча в Ашхабаде руковолителей Средней Азии и Казахстана состоялась: ',
        options: [
            '8 декабря 1991 года',
            '13 декабря 1991 года',
            '20 декабря 1991 года',
            '25 октября 1990 года',
            '21 декабря 1991 года',
        ],
        rightAnswer: 1
    },
    {
        question: 'В Восточном Казахстане было найдено 13 бронзовых стрел при раскопках кургана: ',
        options: [
            'Шиликты',
            'Берель',
            'Дандыбай',
            'Бесшатыр',
            'Иссык',
        ],
        rightAnswer: 0
    },
    {
        question: 'Земельный надел пожалованный хаканом своим приближенным в государстве Караханидов: ',
        options: [
            'Тегин',
            'Инал',
            'Инак',
            'Икта',
            'Сюбаши',
        ],
        rightAnswer: 3
    },
    {
        question: 'Определите хронологическую последовательность исторических событий: 1. Построена железная дорога Оренбург-Ташкент, 2. была начата добыча нефти на Доссоре, 3. участие казахов во второй Государственной Думе: ',
        options: [
            '2, 1, 3',
            '2, 3 ,1',
            '1 ,2, 3',
            '3, 2, 1',
            '1 ,3, 2',
        ],
        rightAnswer: 4
    },
    {
        question: 'Смерть китайского богдыхана Канси позволила джунгарам начать: ',
        options: [
            'Вторжение в Китай',
            'Сближения с России',
            'Военые действия  против казахов',
            'Войну с Росиией',
            'Набеги на среднеазиатские государтства',
        ],
        rightAnswer: 2
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
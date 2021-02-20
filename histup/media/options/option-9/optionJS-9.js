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
        question: 'Первое советское правительство в Казахстане (1919 г.): ',
        options: [
            'Казревком',
            'Алаш-Орда',
            'Турккомиссия СНК',
            'Совнарком',
            'Турккомитет Временного правительства',
        ],
        rightAnswer: 0
    },
    {
        question: 'В начале XVII века внутриполитическая ситуация в Казахском государстве резко обостроилась в период правления хана: ',
        options: [
            'Шигая',
            'Жаныбека',
            'Есима',
            'Керея',
            'Тауекеля',
        ],
        rightAnswer: 2
    },
    {
        question: 'Председатель Совета Министров Казахской ССр 1962–1964 гг. был: ',
        options: [
            'Ж. Шаяхметов',
            'П. Пономаренко',
            'Г. Колбин',
            'Д. Кунаев',
            'Л. Брежнев',
        ],
        rightAnswer: 3
    },
    {
        question: 'Время сооружения Иссыкского кургана: ',
        options: [
            'VIII – IX вв. до н.э.',
            'IX – VII вв. до н.э.',
            'V – IV вв. до н.э.',
            'V – VI вв. н.э.',
            'III – I вв. до н.э.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Орудия труда изготовленные из камня и меди местности Шебир относится к периоду: ',
        options: [
            'Мезолит',
            'Мустье',
            'Ашель',
            'Неолит',
            'Энеолит',
        ],
        rightAnswer: 4
    },
    {
        question: 'Ханская власть в Бокеевской Орде была ликвидирована в: ',
        options: [
            '1824 г.',
            '1845 г.',
            '1822 г.',
            '1868 г.',
            '1886 г.x',
        ],
        rightAnswer: 1
    },
    {
        question: 'Международный форум-саммит ОБСЕ в Астане прохдил в: ',
        options: [
            '2001 г.',
            '2009 г.',
            '2012 г.',
            '2005 г.',
            '2010 г.  ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Автор труда «География»: ',
        options: [
            'Аристотель',
            'Арриан',
            'Помпей Трог',
            'Страбон ',
            'Геродот',
        ],
        rightAnswer: 3
    },
    {
        question: 'По мнению антропологов, более выражены монголоидные черты у саков, проживавших в регионах Казахстана: ',
        options: [
            'Северном и Восточном',
            'Южном и Центральном',
            'Южном и Юго-Восточном',
            'Западном и Южном',
            'Юго-Восточном и Западном',
        ],
        rightAnswer: 0
    },
    {
        question: 'На западе Мавераннахра было создано государство: ',
        options: [
            'Эмира Тимура',
            'Золотая Орда',
            'Ногайская Орда',
            'Ханство Абулхаира',
            'Белая Орда',
        ],
        rightAnswer: 0
    },
    {
        question: 'Видный ученый-геолог удостоенный Государственной премией СССР в 1942 г.: ',
        options: [
            'Б. Ашекеев',
            'М. Ауезов',
            'А. Кашаубаев',
            'Ф. Голощекин',
            'К. Сатпаев',
        ],
        rightAnswer: 4
    },
    {
        question: 'В конце ХІ и начале ХІІ века, по свидетельству исторического памятника «Тайная история монголов», добрососедские отношения существовали между: ',
        options: [
            'Кимакскими каганатом и каракитаями',
            'Керейским и Монгольским ханствами',
            'Найманами и Монгольским государством',
            'Огузским и Кыпчакским государствами ',
            'Государством найманов и кереями',
        ],
        rightAnswer: 1
    },
    {
        question: 'В этнический состав государства Караханидов входили племена: ',
        options: [
            'Булак, дулу',
            'Жикил, ягма',
            'Нушеби, дулу',
            'Жикил, нушеби',
            'Кереи, булак',
        ],
        rightAnswer: 1
    },
    {
        question: 'Лидеры казахской революционной интелегенции в период восстания 1916 года: ',
        options: [
            'Поддерживали царский указ',
            'Мигрировали в Китай, Иран, Монголию',
            'Придерживались политического нейтралитета',
            'Придерживались тактики «разделяй и властвуй»',
            'Примкнули к национально-освободительному движению',
        ],
        rightAnswer: 4
    },
    {
        question: 'Процесс выделения человека из мира животных: ',
        options: [
            'Социогенез',
            'Биогенез',
            'Антропогенез',
            'Анализ',
            'Синтез',
        ],
        rightAnswer: 2
    },
    {
        question: 'Создатели и правитель Золотой Орды: ',
        options: [
            'Орда-Ежен',
            'Ильяс-ходжа',
            'Угедей',
            'Кучум',
            'Бату',
        ],
        rightAnswer: 4
    },
    {
        question: 'Великий Шёлковый пусть начал использоваться в дипломатических целях китайским императором: ',
        options: [
            'Фань Чжэнь',
            'Янь Цзянь',
            'Сюань Цзянь',
            'У-Ди',
            'Сыма Цянь',
        ],
        rightAnswer: 3
    },
    {
        question: 'Своего расцвета Великий Шелковый путь достиг в результате торговых связей Китая и Византии, активно развивавшихся в эпоху',
        options: [
            'Развитого средневековья ',
            'Позднего средневековья',
            'Раннего железа ',
            'Раннего средневековья',
            'Позднего железа',
        ],
        rightAnswer: 3
    },
    {
        question: 'Поэму «Козы Корпеш и Баян сулу» Пушкин А.С записал в городе: ',
        options: [
            'Уральске',
            'Омске',
            'Оренбурге',
            'Тургае',
            'Семипалатинске ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кто впервые прочитал орхоно-енисейские надписи: ',
        options: [
            'В.Томсен',
            'Е.Бекмаханов',
            'Н.Рычков',
            'П.Маковецкий',
            'В.Вильяминов-Зернов',
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
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
        question: 'Контексті менюді қалай шақыруға болады?  ',
        options: [
            'Windows-та мынадай менюдің түрі жоқ',
            'Тышқанныңың оң жақ батырмасын шертіп',
            'Керекті объектіге курсорды қойып тышқанның сол жақ пернесін басып',
            'Керекті объект активті болғанда ALT пернені басып',
            'Объектті қос шерту',
        ],
        rightAnswer: 1
    },
    {
        question: 'Word-тағы кестенің басқа ұяшығына ауысу үшін не істеу керек?',
        options: [
            'Esc пернесін басу',
            'End пернесін басу',
            'Enter пернесін басу',
            'Тышқанды басқару пернелерін пайдалану',
            'Home пернесін басу',
        ],
        rightAnswer: 3
    },
    {
        question: 'Жедел жад не үшін арналған?',
        options: [
            'Дұрыс жауап жоқ',
            'Берілген уақыт мезгілінде бір программаны өндеуге',
            'Информацияны сақтауға',
            'Информацияны өндеуге',
            'Программаларды іске қосуға',
        ],
        rightAnswer: 1
    },
    {
        question: 'Windows деген не?',
        options: [
            'Программалау тілі',
            'Қолданба',
            'Операциялық жүйе',
            'Қолданбалы программа',
            'Құрамдас енгізу-шығару жүйе',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кез-келген Windows-терезенің оң жақ жоғары бұрышында орналасқан батырма не үшін керек?',
        options: [
            'Терезені жабу үшін',
            'Жұмыс орны бойынша терезені жылжыту үшін',
            'Терезені жыймалау үшін',
            'Терезенің өлшемдерін қалпына келтіру үшін',
            'Барлық экранға терезені жазу үшін',
        ],
        rightAnswer: 0
    },
    {
        question: 'Курсордың жолдың аяғына тез ауысуын қандай перне орындайды?',
        options: [
            'Esc',
            'End',
            'Shift',
            'Insert',
            'Ctrl',
        ],
        rightAnswer: 1
    },
    {
        question: 'Excel-де деректерді графикалық түрде көрсету үшін не қолданылады?',
        options: [
            'Суреттер шебері',
            'Формулалар шебері',
            '"Рисование" құрал-саймандар тақтасы',
            'Құрама кестелер шебері',
            'Диаграммалар шебері',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қашықтан компьютерлердегі сақталатын деректер нені жасайды?',
        options: [
            'Интернетті',
            'Аппараттық ресурстарды',
            'Информациялық ресурстарды',
            'Желіні',
            'Хаттаманы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Төменгі жақта берілген мәтінде тізімнің қандай типі пайдаланған? 1. қазақ 2. орыс 3. татар 4. украин ',
        options: [
            '1-ші тізім',
            'Нөмірленген тізім',
            'Көп деңгейлі тізім',
            'Таңбаланған тізім',
            'Автоматтанған тізім берілген үзіндіде пайдалынбайды',
        ],
        rightAnswer: 1
    },
    {
        question: 'Бас менюдің "Поиск" пунктісі не үшін қолданылады?',
        options: [
            'соңғы 15 құжаттар тізімін шығару',
            'программаларды тез іске қосу',
            'файлдар мен бумаларды іздеу',
            'жүйе құрауышыларын баптау',
            'компьютерді тұрақтату',
        ],
        rightAnswer: 2
    },
    {
        question: 'Функционалды пернелер деп қандай пернелерді айтамыз?',
        options: [
            'CapsLock, NumLock',
            'Alt, Shift, Enter',
            'F1..F12',
            'Home, Delete, PageDown',
            'Дұрыс жауап жоқ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Жойылған объектілер уақытша түсетін қапшықты қалай атайды?',
        options: [
            'Блокнот',
            '"Қоржын"',
            'Опретивтік қапшық',
            'Дұрыс жауап жоқ',
            'Бума',
        ],
        rightAnswer: 1
    },
    {
        question: 'Windows программасы программалық жасаудың қандай типіне жатады?',
        options: [
            'Драйверлер',
            'Құрамдас енгізу-шығару жүйесі',
            'Стандартты қолданбалар',
            'Қолданбалы программалар',
            'Операциялық жүйелер',
        ],
        rightAnswer: 4
    },
    {
        question: 'Туынды түбірді анықтаңыз.',
        options: [
            'Жаңа',
            'Тазалық',
            'Сынып',
            'Жол',
            'Бол',
        ],
        rightAnswer: 1
    },
    {
        question: 'Синоним сөздерді табыңыз.',
        options: [
            'Әдемі, сұлу',
            'Бас, аяқ.',
            'Үлкен, кіші.',
            'Бас, жақ.',
            'Мұғалім, оқушы.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Файл аты айқын объекті идентификациялауға мүмкіндік береді, ал кеңейтілуі нені сипаттайды?',
        options: [
            'Жасау уақытын',
            'Жолын',
            'Өлшемін',
            'Каталогын',
            'Типін',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сұрау есімдіктерін көрсетіңіз.',
        options: [
            'Ешкім, ештеңе',
            'Анау, мынау.',
            'Кім, не.',
            'Олар, сендер.',
            'Ешқашан, ешбір',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақстан Республикасының Мемлекеттік Туының авторын анықтаңыз.',
        options: [
            'Мұзафар Әлімбаев.',
            'Шәкен Ниязбеков',
            'Жандарбек Мәлібекұлы.',
            'Қадыр Мырза - Әлі',
            'Шотаман Уәлиханов.',
        ],
        rightAnswer: 1
    },
    {
        question: '"Мой компьютер" таңбашасы не үшін қажет?',
        options: [
            'Жойылған файлдармен бумалардыды сақтау үшін',
            'Windows қолданбалы программаларын іске қосу үшін',
            'Жергілікті желін баптау үшін',
            'Компьютер дискінің мазмұнын шартты түрде көрсететін бұтақты сақтау үшін',
            'Файл және бумаларар қасиеттерін қарап шығу үшін',
        ],
        rightAnswer: 3
    },
    {
        question: 'Тәуелденген сын есімді табыңыз.',
        options: [
            'Сенің балаң.',
            'Жақсың қайсы?',
            'Ешкімің жоқ.',
            'Біреуің кел.',
            'Айтарың бар ма?',
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
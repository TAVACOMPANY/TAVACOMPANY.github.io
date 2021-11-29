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
        question: '«Бала» сезіне қосылатын қосымшаны анықтаңыз.',
        options: [
            '- шы.',
            '- лық',
            '- ші.',
            '- тың.',
            '- лік.',
        ],
        rightAnswer: 1
    },
    {
        question: '«Қоян жүрек» фразеологизмінің антонимін табыңыз.',
        options: [
            'Батыр.',
            'Күшті.',
            'Әлсіз.',
            'Қорқақ.',
            'Салмақты.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Туынды зат есімді анықтаңыз.',
        options: [
            'Ғалым.',
            'Оқытушы.',
            'Ел.',
            'Қыз.',
            'Жол.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Төл сөзді сөйлемді белгілеңіз.',
        options: [
            'Сен дегенде сөз бар ма?',
            'Әй дер әже, қой дер қожа жоқ.',
            '"Келешек - өткен тарихты қорғау", - дейді Олжас Сүлейменов.',
            'Сауатты болу дегеніміз - дұрыс жазып, дұрыс сөйлеу.',
            'Балалардың соңғы ермегі -"Ақсүйек", "Соқыр теке".',
        ],
        rightAnswer: 2
    },
    {
        question: 'Программа дегеніміз… .',
        options: [
            'аппараттық құралдарды басқару үшін арналған командалардың реттелген тізбегі',
            'дұрыс жауап жоқ',
            'тізбекті интерфейстер құрылғысы',
            'жасалған құрылғылардың басқа құрылғылармен жұмысын келістіруге арналған техникалық жағдайлар жиынтығы',
            'есептеуіш жүйенің программалық жасау құрамы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Ms Power Point программасының негізгі объектісі?',
        options: [
            'макрос',
            'слайд ',
            'терезе',
            'диаграмма',
            'кесте',
        ],
        rightAnswer: 1
    },
    {
        question: 'Белгілі бір атпен аталған дискідегі біртекті мәліметтер жиыны қалай аталады?',
        options: [
            'Деректер',
            'Информация',
            'Бума',
            'Каталог',
            'файл',
        ],
        rightAnswer: 4
    },
    {
        question: 'Курсордың жолдың басына тез ауысуын қандай перне орындайды?',
        options: [
            'Ctrl',
            'Esc',
            'Home',
            'Insert',
            'Shift',
        ],
        rightAnswer: 2
    },
    {
        question: 'Енгізу-шығару порты не үшін қолданылады?',
        options: [
            'Деректерді Интернетке шығару үшін',
            'Компьютерді сыртқы құрылғылармен байланыстыру үшін',
            'Деректреді ЭЕМ-ң оперативтік жадында сақтау үшін',
            'Жаңа программалық дестесімен жұмыс істеу үшін',
            'Деректерді модификациялау үшін',
        ],
        rightAnswer: 1
    },
    {
        question: 'Word программасы не үшін керек? ',
        options: [
            'Деректер базасымен жұмыс істеу үшін',
            'Жүйелік баптауларды атқару үшін',
            'Мәтін құжаттарын электронды түрде жасау және өңдеу үшін',
            'Компьютердің файлдық жүйесі бойынша іздеу',
            'Кестелік деректермен жұмыс істеу үшін, құрама деректер кестелерін жасау үшін',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ұяң дауыссыздан басталған қосымшаны табыңыз.',
        options: [
            'Доптың.',
            'Терезелер.',
            'Қызға.',
            'Жастығымыз.',
            'Баласыңдар.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Excel формуласында пайдаланатын, формуланы басқа орынға көшірген кезде өзгермейтін, ұяшыққа сілтеме қалай деп аталады?',
        options: [
            'ұяшыққа салыстырмалы сілтеме',
            'ұяшыққа абсолют сілтеме',
            'ұяшыққа аралас сілтеме',
            'автоауыстыру',
            'автоқосындылау',
        ],
        rightAnswer: 1
    },
    {
        question: 'Зергерлік бұйымдарды белгілеңіз.',
        options: [
            'Кітап, дәптер, қалам.',
            'Қару - жарақ, ер - тұрман, қоржын.',
            'Алаша, көрпе, төсеніш.',
            'Кесе, қасық, пышақ.',
            'Шолпы, білезік, сырға, қапсырма.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Екілік кодпен барлық математикалық операцияларды қандай құрылғы жасайды?',
        options: [
            'Тышқан',
            'Орталық процессор',
            'CD-ROM',
            'Қатты диск',
            'Монитор',
        ],
        rightAnswer: 1
    },
    {
        question: '"Пуск" батырманы шерткен кезде пайда болатын меню қалай аталады?',
        options: [
            'Бас меню',
            'Программаны іске қосу меню',
            'Контекстті меню ',
            'Анықтаманы алу меню',
            'Пайдаланушының меню',
        ],
        rightAnswer: 0
    },
    {
        question: 'Баяндауышты табыңыз. Күзде жыл құстары жылы жаққа ұшып кетеді.',
        options: [
            'Жылы.',
            'Жакқа.',
            'Күзде.',
            'Жыл құстары.',
            'Ұшып кетеді.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Пайдаланушы интерфейсі деген не?',
        options: [
            'Адамның аппараттық құрылғылармен өзара әрекеттесу әдістері мен құралдары',
            'Windows терезелерінің сыртқы түрі ',
            'Адамның аппараттық және программалық құрылғылармен өзара әрекеттесу әдістері мен құралдары',
            'Есептеуіш техниканың құралдарын аппараттық қамтамасуы',
            'Адамның программалық құрылғылармен өзара әрекеттесу әдістері мен құралдары',
        ],
        rightAnswer: 2
    },
    {
        question: 'Реттік сан есім нені білдіретінін көрсетіңіз.',
        options: [
            'Заттың дәл нақты санын білдіреді.',
            'Заттың реттік санын білдіреді',
            'Заттың санын жинақтап көрсетеді.',
            'Заттың санын топтап көрсетеді.',
            'Заттың санын бөлшектеп көрсетеді.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Word-тағы айналдыру жолағы не үшін керек?',
        options: [
            'Колонтитулдарды жасау үшін',
            'Құжат бетінің бейнелеп көрсету масштабын өзгерту үшін',
            'Құрал-сайман панелін айналдыру үшін ',
            'Терезеге кірмейтін құжаттың мазмұнын қарау үшін',
            'Құжатты алдын ала қарап шығу үшін',
        ],
        rightAnswer: 3
    },
    {
        question: 'Бірнеше терезе бір мезгілде ашық бола ала ма?',
        options: [
            'Иә',
            'Иә, егер олардың барлығы ерекшеленген',
            'Иә, бірақ 5-тен артық емес',
            'Иә, егер олардың тақырыптары бір мезгілде жарық түспен ерекшеленген',
            'Жоқ',
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
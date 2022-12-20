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
      msgOfResult = document.getElementById('msgOfResult'),
      br = '</br>';

const questions = [
    {
        question: 'Какую команду применяют с целью копирования файлов в ОС Linux?',
        options: [
            'File',
            'Mkcp',
            'Copy',
            'Cp',
            'Mkfile',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каком режиме по умолчанию создаются консоли ММС?',
        options: [
            'пользовательском с частичным доступом',
            'авторском с полным доступом',
            'авторском',
            'пользовательском с полным доступом',
            'пользовательском',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какие из перечисленных компонентов конфигурируются в Windows Server 2003 автоматически?',
        options: [
            'таблицы маршрутизации',
            'списки маршрутизации',
            'удаленный доступ',
            'локальные подключения',
            'локальный доступ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие из указанных компонентов привязываются к подключениям автоматически?',
        options: [
            'все ответы верны',
            'клиент для глобальных сетей',
            'клиент для сетей NetWare',
            'драйвер сетевого монитора',
            'клиент для сетей Microsoft',
        ],
        rightAnswer: 4
    },
    {
        question: 'Компонент сетевой инфраструктуры: кабельная система, может быть построена',
        options: [
            'бригадой линейщиков',
            'все перечисленное верно',
            'на основе витой пары',
            'на основе широкополосного кабеля',
            'на основе оптоволокна',
        ],
        rightAnswer: 2
    },
    {
        question: 'Может ли оснастка одновременно отображать информацию о локальном и удаленном компьютерах?',
        options: [
            'об удаленном',
            'необходимо создать консоль',
            'Да',
            'нет, либо о локальном, либо об удаленном',
            'да, но это не предустановленная консоль, ее придется создавать',
        ],
        rightAnswer: 3
    },
    {
        question: 'Как обычно осуществляется разрешение имен в собственных доменах Windows Server 2003?',
        options: [
            'посредством APIPA',
            'посредством DHCP',
            'посредством SNMP',
            'посредством SMP',
            'посредством DNS',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое программное средство используется на сервере для включения удаленного подключения к рабочему столу?',
        options: [
            'система (System Properties) из Панели управления',
            'настройка служб терминалов (Terminal Services Configuration)',
            'панель управления',
            'лицензирование служб терминалов (Terminal Services Licensing)',
            'все ответы верны',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие реквизиты необходимы для администрирования удаленного компьютера из консоли ММС?',
        options: [
            'Гостевые',
            'Административные',
            'Общие',
            'Локальные',
            'Пользовательские',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что входит в физическую организацию AD?',
        options: [
            'приложения',
            'контроллер домена',
            'пользователи',
            'леса',
            'деревья',
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
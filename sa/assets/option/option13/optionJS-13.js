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
        question: 'Какое максимальное число адресов возможно в пуле с маской подсети 255.255.255.248?',
        options: [
            '8',
            '16',
            '32',
            '6',
            '12',
        ],
        rightAnswer: 3
    },
    {
        question: 'Название пустой папки для монтирования?',
        options: [
            'файловая система',
            'точка демонтирования',
            'точка монтирования',
            'системная папка',
            'точка перезагрузки',
        ],
        rightAnswer: 2
    },
    {
        question: 'Файловая система, которая увеличивает надёжность и эффективность использования дискового пространства:',
        options: [
            'NTFS',
            'FAT16',
            'FAT12',
            'FAT32',
            'NTFS32',
        ],
        rightAnswer: 0
    },
    {
        question: 'Для каких ОС доступен Удаленный рабочий стол для администрирования для настольных ОС',
        options: [
            'Windows NT',
            'Windows X',
            'Windows 2000',
            'Windows 9x',
            'Windows XP',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сколько узлов возможно обозначить в сети с маской 192.168.0.0/16?',
        options: [
            '65535',
            '65536',
            '65534',
            '256',
            '255',
        ],
        rightAnswer: 2
    },
    {
        question: 'Если администратор щелкнет правой кнопкой мыши на имени пользователя User1 и выберет в меню пункт «Удаленное управления», то он',
        options: [
            'при получении отказа будет работать с ним в одной сессии',
            'будет отключен от сеанса',
            'при получении согласия пользователя будет работать в сессии, в которой только что работал пользователь, который в свою очередь будет отключен от сеанса',
            'без получения согласия пользователя будет работать с ним в одной сессии',
            'при получении согласия пользователя будет работать с ним в одной сессии',
        ],
        rightAnswer: 3
    },
    {
        question: 'Вы устанавливаете принтер на клиентском компьютере. Принтер будет подключен к логическому принтеру, установленному на сервере печати Windows Server 2003. Сведения какого типа (типов) нужно предоставить для настройки принтера?',
        options: [
            'UCN-путь',
            'драйвер принтера',
            'драйвер монитора',
            'модель печатающего устройства',
            'UNC-путь к общему ресурсу печати',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какой IP-адрес требуется клиентскому ПК, обращающемуся к Web-серверам в Интернете через маршрутизатор NAT',
        options: [
            'незарегистрированный',
            'непроверенный',
            'отложенный',
            'зарегистрированный',
            'зарегистрированный и незарегистрированный',
        ],
        rightAnswer: 0
    },
    {
        question: 'Вам поручено каждый вечер создавать резервные копии файлового сервера Windows Server 2003. Вы вручную выполняете обычную архивацию, затем составляете расписание, по которому задание архивации запускается каждый вечер в течение следующих двух недель. Какой из типов архивации обеспечивает самый простой способ восстановления данных?',
        options: [
            'Разностный',
            'Обычный',
            'Добавочный',
            'Результативный',
            'Суммирующий',
        ],
        rightAnswer: 1
    },
    {
        question: 'Центром обеспечения безопасности Windows не проверяются следующие основные элементы защиты компьютера:',
        options: [
            'Параметры безопасности браузера Internet Explorer',
            'Работу жёсткого диска',
            'Контроль учётных записей пользователей',
            'Брандмауэр (межсетевой экран)',
            'Автоматическое обновление',
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
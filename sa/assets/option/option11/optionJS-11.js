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
        question: 'Windows Server 2003 Web Edition oтличается тем, что',
        options: [
            'сервер с ОС данной редакции самый производительный',
            'редакция используется для создания учетной записи пользователя',
            'эта редакция может использоваться для создания контроллера домена',
            'в этой редакции отсутствует Active Directory',
            'присутствует Active Directory',
        ],
        rightAnswer: 3
    },
    {
        question: 'Как классифицируют сети протяженностью более 1000 км.?',
        options: [
            'учебные локальные сети',
            'локальные сети (LAN, Local Area Network)',
            'глобальные сети (WAN, Wide Area Network)',
            'городские сети (MAN, Metropolitan Area Network)',
            'корпоративные сети',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какие функции поддерживают комбинированные маршрутизаторы помимо собственной маршрутизации?',
        options: [
            'NAT',
            'BIOS',
            'NTA',
            'DHPC',
            'NetBIOS',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой из перечисленных серверов может быть первым DHCP-сервером в сети?',
        options: [
            'cервер рабочей группы Windows Server 2003 в сети',
            'контроллер домена Active Directory',
            'cервер рабочей группы Active Directory',
            'cервер рабочей группы Windows Server 2003 в сети с Active Directory',
            'контроллер домена Windows Server 2003 в сети с Active Directory',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что свойственно брандмауэру (межсетевому экрану) ?',
        options: [
            'может регулярно проверять наличие обновлений и автоматически их устанавливать',
            'показывает текущее состояние защиты компьютера',
            'защищает компьютер, предотвращает доступ к нему хакеров и вредоносных программ',
            'позволяет предотвращать несанкционированные изменения в компьютере, обеспечивает защиту, запрашивая разрешение перед совершением потенциально опасных для компьютера действий',
            'рекомендует меры по усилению безопасности',
        ],
        rightAnswer: 2
    },
    {
        question: 'DNS-сервер, отправляющий все запросы разрешения имен в заданном домене другому DNS-серверу, является',
        options: [
            'сервером с зоной-заглушкой',
            'сервером кэширования',
            'сервером с пересылкой запросов',
            'условной пересылкой запросов',
            'сервером пересылки',
        ],
        rightAnswer: 3
    },
    {
        question: 'Выделите элементы управления, не относящиеся к диалоговым окнам:',
        options: [
            'кнопки',
            'переключатели',
            'полосы прокрутки',
            'Меню',
            'панель инструментов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Таблица размещения файлов, где находится полная информация о кластерах:',
        options: [
            'FAT',
            'Excel',
            'NFS',
            'Access',
            'FST',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какая команда отобразит размер каталога /usr/lib?',
        options: [
            'user@localhost:~/ $ ls -RAl /usr/lib',
            'user@localhost:~/ $ du -s /usr/lib',
            'user@localhost:~/ $ df -h /usr/',
            'user@localhost:~/ $ df -RAl /usr/lib',
            'user@localhost:~/ $ df -h /usr/lib',
        ],
        rightAnswer: 1
    },
    {
        question: 'FAT16 не может использоваться для носителей информации объёмом более:',
        options: [
            '512 байтов . 212 = 2 Мбайт',
            '64 Кбайт . 216 = 4 Гбайт',
            '4 Кбайт . 232 = 16384 Гбайт',
            '64 Кбайт . 212= 4 Гбайт',
            'позволяет устанавливать различные объёмы кластера (от 512 байтов до 64 Кбайт, по умолчанию 4 Кбайт)',
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
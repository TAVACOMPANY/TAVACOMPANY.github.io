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
        question: 'Вытесняющая многозадачность – …',
        options: [
            'режим, при котором переключение процессов возможно только, когда работающий процесс вызовет системную функцию',
            'режим однозадачности, при котором переключение процессов невозможно',
            'режим многозадачности, при котором каждый новый процесс монопольно занимает процессорное время, а состояние остальных процессов записывается в файл подкачки',
            'режим многозадачности, при котором переключение процессов происходит через определенные кванты времени соответственно приоритетам',
            'режим многозадачности, при котором переключение процессов возможно в любой момент времени',
        ],
        rightAnswer: 3
    },
    {
        question: 'Если требуется ограничить доступ к оснастке, как сконфигурировать содержащую ее консоль ММС?',
        options: [
            'добавить разрешения из списка ограничения доступа',
            'удалить разрешения из списка ограничения доступа',
            'сохранить в одном из пользовательских режимов, в зависимости от требуемых условий ограничения доступа',
            'необходимо ограничить доступ',
            'нажать кнопку Ограничить доступ и выбрать из списка',
        ],
        rightAnswer: 2
    },
    {
        question: 'Как настроить DHCP-сервер на обновление записей ресурсов А и PTR от имени клиентов под управлением Windows NT 4?',
        options: [
            'на вкладке DNS окна свойств DHCP-сервера отметить флажок',
            'создать динамический узел с помощью DHCP-сервера',
            'ничего не нужно предпринимать',
            'зарегистрировать клиента как динамический узел с помощью DHCP-сервера',
            'зарегистрировать клиента на вкладке DNS',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что делает автоматическое обновление?',
        options: [
            'показывает текущее состояние защиты компьютера и рекомендует меры по усилению безопасности',
            'обеспечивает защиту, запрашивая разрешение перед совершением потенциально опасных для компьютера действий',
            'позволяет предотвращать несанкционированные изменения в компьютере',
            'защищает компьютер, предотвращает доступ к нему хакеров и вредоносных программ',
            'может регулярно проверять наличие обновлений и автоматически их устанавливать',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какие варианты назначения ip-адреса существуют при установке сервера Windows 2003?',
        options: [
            'автоматический APIPA',
            'статический IP-адрес назначаемый DHCP сервером сети',
            'статический IP-адрес',
            'динамический IP-адрес',
            'автоматическая частная IP-адресация (APIPA) для статических адресов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Вам нужно включить динамическую DNS в определенной зоне и сконфигурировать сервер так, чтобы он разрешал только безопасные обновления. Что для этого необходимо?',
        options: [
            'зона должна быть интегрированной в DNS',
            'в зоне должна быть запись CIDR',
            'зона должна быть корневой',
            'зона должна быть интегрированной в AD',
            'в зоне должна быть запись SRV',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какой уровень определяет методы доступа к среде передачи данных?',
        options: [
            'Сеансовый',
            'Пользовательский',
            'Верхний',
            'Прикладной',
            'Канальный',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что будет означать подключённая файловая система, которую можно в любой момент отключить?',
        options: [
            'Размонтировать',
            'Смонтировать',
            'Переименовать',
            'Переустановить',
            'Демонтировать',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие протоколы нужно установить на компьютрах сети, чтобы все они получили доступ к сетям NetWare и Интернету',
        options: [
            'NWLink и TCP/IP',
            'NWLink и TCP/IP',
            'TCP/IP',
            'NWLink',
            'Link',
        ],
        rightAnswer: 1
    },
    {
        question: 'На основе какого протокола работает Удаленный рабочий стол?',
        options: [
            'X.250',
            'RDP',
            'X.255',
            'Ethetnet',
            'RPD',
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
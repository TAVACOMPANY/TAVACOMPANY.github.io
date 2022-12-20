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
        question: 'Какие из перечисленных опций поддерживаются утилитой rm?',
        options: [
            '-c',
            '-f',
            '-v',
            '-r',
            '-q',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что такое ресурс процесса?',
        options: [
            'оперативная память и свободное место на диске',
            'любой аппаратный или программный объект, который может понадобиться для работы процесса и работа с которым не вызывает конфликта с другими процессами',
            'любой аппаратный или программный объект, который может понадобиться для работы процесса и, доступ к которому может при этом вызвать конкуренцию процессов',
            'файл, из которого или в который происходит ввод-вывод',
            'файл, который выполняет контроль над процессами',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что используется для определения идентификатора сети назначения пакета?',
        options: [
            'маска подсети',
            'класс адреса',
            'заголовок подсети',
            'IP-заголовок',
            'маска сети',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой неверно настроенный параметр, скорее всего, является причиной того, что компьютер с TCP/IP не способен взаимодействовать с ПК сети?',
        options: [
            'отсутствует DNS-сервер',
            'отсутствует Клиент для сетей Microsoft',
            'TCP-адрес',
            'предпочитаемый DNS-сервер',
            'ip-адрес',
        ],
        rightAnswer: 4
    },
    {
        question: 'Завершите определение вставив пропущенное слово из списка ответов: … – ежедневно обновляемый репозиторий пакетов, позволяет пользователям легко обновлять свои системы и быть в курсе всех новостей мирасвободных программ.',
        options: [
            'ALT Linux',
            'ALT Linux Junior',
            'Sisyphus',
            'OpenOffice',
            'ALT Junior',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сколько корневых папок содержится в операционной системе Linux?',
        options: [
            'две корневых папки',
            '9',
            'корневых папок столько же сколько разделов на жестком диске',
            'корневая папка всегда только одна',
            'десять корневых папок',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что присуще центру обеспечения безопасности Windows ?',
        options: [
            'защищает компьютер',
            'может регулярно проверять наличие обновлений и автоматически их устанавливать',
            'позволяет предотвращать несанкционированные изменения в компьютере, обеспечивает защиту, запрашивая разрешение перед совершением потенциально опасных для компьютера действий',
            'предотвращает доступ к нему хакеров и вредоносных программ',
            'показывает текущее состояние защиты компьютера и рекомендует меры по усилению безопасности',
        ],
        rightAnswer: 4
    },
    {
        question: 'Можно ли перетащить файл из окна локального ПК в окно ПК подключенному по средствам сессии служб терминалов',
        options: [
            'нет',
            'да',
            'может только администратор сети',
            'это приведет к ошибке',
            'да после соответствующих настроек',
        ],
        rightAnswer: 0
    },
    {
        question: 'Для установки, удаления и обновления программ и поддержания целостности системыLinux используются',
        options: [
            'Установочный файл',
            'менеджеры пакетов',
            'Дистрибутив',
            'Sisyphus',
            'Sisphus',
        ],
        rightAnswer: 1
    },
    {
        question: 'О чем содержится информация в реестре Windows?',
        options: [
            'установленных программах',
            'оборудовании системы',
            'параметрах настройки, к которым ОС постоянно обращается во время работы',
            'жестком диске',
            'пользователях компьютера',
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
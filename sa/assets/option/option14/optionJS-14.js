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
        question: 'Компонент сетевой инфраструктуры: кабельная система, может быть построена',
        options: [
            'на основе широкополосного кабеля',
            'бригадой линейщиков',
            'на основе оптоволокна',
            'на основе витой пары',
            'все перечисленное верно',
        ],
        rightAnswer: 3
    },
    {
        question: 'Classless Internet Domain Routing (CIDR)',
        options: [
            'cпособ IP-адресации, при котором нет традиционного деления IP-адрессов на классы',
            'cпособ IP-адресации, при котором используется маска подсети',
            'cпособ IP-адресации, при котором не используются маска подсети по умолчанию и традиционное деление IP-адрессов на классы',
            'cпособ IP-адресации, при котором не используются маска подсети по умолчанию, но остается традиционное деление IP-адрессов на классы',
            'cпособ IP-адресации, при котором используются маска подсети по умолчанию и традиционное деление IP-адрессов на классы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Вы находитесь в процессе пересборки ядра. Какая команда устанавливает модули?',
        options: [
            'make modules_install ',
            'install modules',
            'make modules',
            'make modulesinstall',
            'make modulesinstall',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что из следующего нужно сделать, чтобы сгенерировать журнал событий доступа к файлу или папке?',
        options: [
            'вести аудит доступа к ресурсу',
            'настроить разрешения NTFS, позволяющие учетной записи System вести аудит доступа к ресурсу',
            'отключить политику Аудит доступа к объектам (Audit Object Access)',
            'включить политику Аудит использования привилегий (Audit Privilege Use)',
            'прекратить общий доступ к принтеру',
        ],
        rightAnswer: 4
    },
    {
        question: 'Транспортный уровень эталонной модели OSI находится',
        options: [
            'между канальным и физическим уровнями',
            'между прикладным и уровнем представления',
            'между сетевым и сеансовым',
            'между прикладным и канальным',
            'между сетевым и прикладным',
        ],
        rightAnswer: 2
    },
    {
        question: 'Невытесняющая многозадачность',
        options: [
            'режим однозадачности, при котором переключение процессов невозможно',
            'режим многозадачности, при котором переключение процессов возможно в любой момент времени',
            'режим многозадачности, при котором переключение процессов возможно через определенные кванты времени',
            'режим, при котором переключение процессов возможно только, когда работающий процесс вызовет системную функцию',
            'режим многозадачности, при котором переключение процессов выполняется поочередно в порядке их приоритетов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Файл, в котором хранится список пользователей системы:',
        options: [
            '/system/passwd',
            '/root/passwd',
            '/etc/users',
            '/root/etc',
            '/etc/passwd',
        ],
        rightAnswer: 4
    },
    {
        question: 'FAT32 не может использоваться для носителей информации объёмом более:',
        options: [
            '4 Кбайт . 232 = 16384 Гбайт',
            '64 Кбайт . 216 = 4 Гбайт',
            '512 байтов . 212 = 2 Мбайт',
            '2 Кбайт . 232 = 14284 Гбайт',
            'позволяет устанавливать различные объёмы кластера (от 512 байтов до 64 Кбайт, по умолчанию 4 Кбайт)',
        ],
        rightAnswer: 0
    },
    {
        question: 'Во время выполнения команды cd ../../.. произойдет ошибка',
        options: [
            '/home',
            '/',
            '/home/urlik/soft',
            '/home/urlik',
            '/urlik/home',
        ],
        rightAnswer: 1
    },
    {
        question: 'Модель TCP/IP также называют',
        options: [
            'моделью TCP',
            'моделью DARPA',
            'моделью взаимодействия открытых систем',
            'моделью DRPA',
            'моделью взаимодействия закрытых систем',
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
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
        question: 'Какие из представленных систем являются свободно распространяемыми ?',
        options: [
            'WindowsHome',
            'WindowsXP',
            'Windows 10',
            'Linux',
            'Windows2000',
        ],
        rightAnswer: 3
    },
    {
        question: 'Для отслеживания в Сетевом мониторе протокола TCP, необходимо:',
        options: [
            'в фильтре отображения установить Protocol == TCP/IP',
            'в фильтре отображения установить Protocol == UDP',
            'в фильтре отображения установить Protocol == TCP',
            'в фильтре отображения установить Protocol == RDP',
            'в фильтре отображения установить Protocol == IP',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая запись ресурса используется для разрешения доменных имен, указываемых в адресах электронной почты, в IP-адрес связанного с доменом почтового сервера?',
        options: [
            'MX',
            'CNAME',
            'PRT',
            'PTR',
            'PNAME',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие компоненты Windows надо установить для обеспечения функциональности DHCP, DNS и WINS?',
        options: [
            'средства наблюдения',
            'службы доступа к принтерам сети',
            'другие службы доступа к файлам',
            'средства управления',
            'сетевые службы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Укажите размер журнала безопасности по умолчанию',
        options: [
            '32 Мб',
            '50 Мб',
            '128 Мб',
            '16 Мб',
            '126 Мб',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основные функции операционных систем:',
        options: [
            'управление процессами, управление памятью, управление периферийными устройствами',
            'управление включением/выключением компьютера, управление памятью, управление файлами и каталогами, управление пользователями;',
            'управление памятью, выполнение команд пользователя, управление файлами и каталогами',
            'управление устройствами, управление данными, управление памятью, управление процессами',
            'управление выключением компьютера, управление файлами, управление данными',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какая из следующих команд может быть использована для отображения большого списка файлов, с удобочитаемым размером файла (к примеру 6.8 мб вместо 6819467)?',
        options: [
            'Ls',
            'ls –l',
            'ls –ah',
            'ls +ah',
            'ls –lh',
        ],
        rightAnswer: 4
    },
    {
        question: 'FAT12 не может использоваться для носителей информации объёмом более:',
        options: [
            '512 байтов . 212 = 2 Мбайт',
            '64 Кбайт . 216 = 4 Гбайт',
            '512 байтов . 224 = 2 Мбайт',
            '4 Кбайт . 232 = 16384 Гбайт',
            'позволяет устанавливать различные объёмы кластера (от 512 байтов до 64 Кбайт, по умолчанию 4 Кбайт)',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какую функцию выполняет команда ls?',
        options: [
            'делает заданный каталог текущим и выводит список файлов',
            'выводит на экран список файлов каталога, заданного в командной строке либо текущего',
            'выводит на экран список файлов текущего каталога',
            'выполняет переход в заданный каталог',
            'преобразует команды пользователя в действия операционной системы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой из адресов стека TCP/IP является адресом сетевого уровня?',
        options: [
            'Символьный',
            'IP-адрес',
            'Локальный',
            'Доменный',
            'TCP-адрес',
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
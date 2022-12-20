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
        question: 'Отметьте количество сетей, в классе сети А',
        options: [
            '2097152',
            '216',
            '2097151',
            '126',
            '16384',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что чаще используют в операционной системе Linux?',
        options: [
            'файловая система FAT12',
            'файловая система FAT32',
            'журналируемая файловая система ext3, в которой кластер может иметь размер от 1 до 8 Кбайт',
            'файловая система FAT16',
            'журналируемая файловая система NTFS, которая позволяет устанавливать различные объёмы кластера (от 512 байтов до 64 Кбайт, по умолчанию 4 Кбайт)',
        ],
        rightAnswer: 2
    },
    {
        question: 'Содержимое файла /etc/crontab означает следующее:',
        options: [
            'а - день недели; b - месяц; c - день месяца; d - час; e – минута',
            'а - минута; b - час; c - день месяца; d - неделя; e - день недели',
            'e - секунда; d - минута; c - час; b - день месяца; а - неделя месяца',
            'а - месяц; b - день недели;c - день месяца; d - час; e – минута',
            'а - секунда; b - минута; c - час; d - день месяца; e - неделя месяца',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой ключ утилиты IPConfig позволяет проводить обновление аренды DHCP и перерегистрация доменного имени в базе данных службы DNS?',
        options: [
            'Renew',
            'Flushdns',
            'Release',
            'Register',
            'Registerdns',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что будет ядром операционной системы?',
        options: [
            'программы, входящие в дистрибутив операционной системы',
            'графическая оболочка, позволяющая выполнить операции с файлами и каталогами',
            'резидентная часть операционной системы',
            'резидентная часть графической оболочки',
            'основная программа, принимающая и обрабатывающая команды пользователя',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что присуще жесткой ссылке на файл в ОС Linux:',
        options: [
            'указатель на конец файла',
            'структура, содержащая сведения о расположении и размере файла',
            'это указатель на начало файла',
            'представляет собой другое имя файла',
            'является дополнительным ярлыком для файла',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что входит в атрибуты прав доступа к файлу?',
        options: [
            'доступ с правами администратора или пользователя',
            'разграничение прав доступа для владельца и остальных пользователей',
            'доступ «только для чтения» для всех, кроме владельца файла',
            'доступ для владельца файла в режиме «только для чтения»',
            'разграничение доступа для владельца, членов его группы и остальных пользователей',
        ],
        rightAnswer: 4
    },
    {
        question: 'Приложение генерирует 400 малых случайных операций ввода-вывода с соотношением чтения/записи 3:1. Чему равно количество IOPS (операций ввода/вывода) на диск при использовании RAID для RAID 5.',
        options: [
            '700',
            '500',
            '800',
            '900',
            '400',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какая из следующих команд позволит выполнить поиск текста в файле без предварительного открытия файла другой командой?',
        options: [
            'Loader',
            'Egrep',
            'More',
            'Pwd',
            'Lilo',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что называют конвейером?',
        options: [
            'последовательное выполнение нескольких команд, причем каждая следующая команда начинает выполняться после завершения предыдущей',
            'параллельное выполнение нескольких команд, при этом вывод одной команды перенаправляется на стандартный ввод следующей',
            'параллельное выполнение нескольких команд, причем переключение между ними производится в строгой очередности',
            'последовательное выполнение нескольких команд',
            'параллельное выполнение нескольких команд',
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
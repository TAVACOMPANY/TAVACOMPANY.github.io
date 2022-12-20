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
        question: 'Как очистить заблокированный файл?',
        options: [
            'Открыть файл любым редактором и удалить все',
            "echo '' >> file",
            'cat / null/dev > file',
            'cat /dev/null > file',
            'rm –rf file',
        ],
        rightAnswer: 3
    },
    {
        question: 'С помощью, какой утилиты можно определить достижимость узла?',
        options: [
            'Hostname',
            'Route',
            'Ping',
            'Netstat',
            'Host',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая программа-оболочка используется в Linux по умолчанию?',
        options: [
            'Bash',
            'Csh',
            'Dash',
            'Sh',
            'power shell',
        ],
        rightAnswer: 0
    },
    {
        question: 'IP-адрес состоит из:',
        options: [
            'трех логических частей',
            'пяти логических частей',
            'одной логической части',
            'двух логических частей',
            'четырех логических частей',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какая команда изменяет права доступа к файлам и директориям?',
        options: [
            'ChUsermod',
            'Chpermission',
            'Chmod',
            'Usermod',
            'Changemod',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что будет выведено на терминал после выполнения следующих операций:' + br + '<img src="qst98.png" class="formula">',
        options: [
            'Сообщение об ошибке',
            'TEST',
            'На терминал выведется 0',
            'Test',
            'На терминал ничего не выведется',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какую команду применяют с целью завершения работы системы в ОС Linux?',
        options: [
            'Quit',
            'Logout',
            'Exit',
            'Down',
            'Shutdown',
        ],
        rightAnswer: 4
    },
    {
        question: 'Вы находитесь в директории с исходниками ядра Linux. В каком файле хранится конфигурация для компиляции (подразумевается, что файл существует от предыдущей компиляции или он был создан одной из конфигурационных утилит)',
        options: [
            'Config',
            'conf.conf',
            'system.conf',
            'kernel',
            'kernel.conf',
        ],
        rightAnswer: 0
    },
    {
        question: 'IP-адрес представляет собой:',
        options: [
            '16-разрядное двоичное число',
            '32-разрядное двоичное число',
            '8-разрядное двоичное число',
            '32-разрядное шестнадцатеричное число',
            '16-разрядное шестнадцатеричное число',
        ],
        rightAnswer: 1
    },
    {
        question: 'Если значение umask равно 0022, каким будет значение прав доступа к новым файлам?',
        options: [
            '765',
            '644',
            '666',
            '655',
            '777',
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
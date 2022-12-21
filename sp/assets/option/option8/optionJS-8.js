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
        question: 'Программирование приложений Win32API осуществляется в следующих операционных системах:',
        options: [
            'MSDOS',
            'Windows 2000',
            'Unix',
            'Windows ХХ',
            'Windows СЕ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Системные объекты, созданные менеджером объектов в Win32 API это:',
        options: [
            'приоритет потока',
            'контекст',
            'события',
            'класс',
            'процесс',
        ],
        rightAnswer: 2
    },
    {
        question: 'Существуют операции над потоком связанные с операционной системой:',
        options: [
            'Block',
            'Exit',
            'Read',
            'Open',
            'Write',
        ],
        rightAnswer: 0
    },
    {
        question: 'Третий класс синхронизации составляют объекты, которые переходят в сигнальное состояние по завершении своей работы:',
        options: [
            'завершающая работа (job)',
            'поток (thread)',
            'ожидающий таймер',
            'консольный ввод (console input)',
            'событие (event).',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функции работы с процессами и потоками в Win32 API:',
        options: [
            'IpStrtAddress',
            'IpThreadAttributes',
            'CreateProcess',
            'dwExitCode',
            'dwExitThread',
        ],
        rightAnswer: 2
    },
    {
        question: 'Завершения работы с виртуальной памятью ее необходимо освободить, используя функцию VirtualFree(), которая имеет следующие параметры:',
        options: [
            'тип операции',
            'адрес начала области виртуальной памяти',
            'размер области доступа',
            'адрес конца области виртуальной памяти',
            'тип защиты доступа',
        ],
        rightAnswer: 0
    },
    {
        question: 'Значения параметра dwCreationDisposition при открытии файла:',
        options: [
            'TRUNCATE EXISTING',
            'OPEN EXISTING',
            'FILE_SHARE_READ',
            'GENERIC_WRITE',
            'OPEN_ALWAYS',
        ],
        rightAnswer: 4
    },
    {
        question: 'К объектам в операционных системах существуют режимы доступа:',
        options: [
            'W,A',
            'RA',
            'RW',
            'R,W',
            'W,C',
        ],
        rightAnswer: 3
    },
    {
        question: 'После завершения работы с виртуальной     памятью ее необходимо освободить, используя функцию VirtualFree(), которая имеет следующие параметры:',
        options: [
            'адрес начала области виртуальной памяти',
            'размер области',
            'тип защиты доступа',
            'адрес конца области виртуальной памяти',
            'тип операции завершения',
        ],
        rightAnswer: 1
    },
    {
        question: 'При открытии файла значения параметра dwCreationDisposition:',
        options: [
            'OPEN ALWAYS',
            'GENERIC_WRITE',
            'OPEN_EXISTING',
            'FILE_SHARE_READ',
            'TRUNCATE EXISTING',
        ],
        rightAnswer: 2
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
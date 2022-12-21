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
        question: 'Явная передача наследуемого дескриптора процессу-клиенту анонимного канала может выполняться одним из способов:',
        options: [
            'посредством сообщения WM COPYDATA',
            'через командную строку; через файл',
            'через поле hStdError структуры STARTUPINFO',
            'по именованному каналу',
            'через поле hStdInput структуры STARTUPEKFO',
        ],
        rightAnswer: 1
    },
    {
        question: 'Для управления памятью кучи существует функция:',
        options: [
            'HeapSize()',
            'MapViewOfFile()',
            'НеарReАllос()',
            'HeapCreate()',
            'HeapDestroy()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Обработка запросов потока-клиента создает ряд уровней безопасности потока-сервера:',
        options: [
            'Object Open for Delete',
            'Object In Deleted',
            'ObjectSecurity',
            'Object In Open',
            'ObjectType',
        ],
        rightAnswer: 0
    },
    {
        question: 'Объект синхронизации оповещает о некотором выполненном действии, бывает двух типов и переводится в сигнальное состояние функцией:',
        options: [
            'CreateMutext()',
            'SetEvent()',
            'CreateEvent()',
            'mutex()',
            'CreateSemaphore()',
        ],
        rightAnswer: 1
    },
    {
        question: 'Порт завершения ввода-вывода:',
        options: [
            'обслуживает очередь пакетов',
            'устанавливает соединения',
            'объект синхронизации',
            'содержит очередь пакетов связи',
            'динамическая библиотека',
        ],
        rightAnswer: 2
    },
    {
        question: 'При обработке запросов потока-клиента существует ряд уровней безопасности потока-сервера:',
        options: [
            'Object Open',
            'Object In Deleted',
            'ObjectSecurity',
            'se_file_object',
            'Object Type',
        ],
        rightAnswer: 0
    },
    {
        question: 'Существующие форматы виртуального и реального адресов:',
        options: [
            'c',
            'e',
            'а',
            'b',
            'r',
        ],
        rightAnswer: 4
    },
    {
        question: 'Уровни безопасности потока-сервера для обработки запросов потока-клиента:',
        options: [
            'ObjectType',
            'Object InOpent',
            'ObjectSecurity',
            'Object Deleted',
            'se_file_object',
        ],
        rightAnswer: 3
    },
    {
        question: 'Форматы реального и виртуального адресов:',
        options: [
            'b',
            'v',
            'а',
            'e',
            'c',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функции для управления памятью кучи:',
        options: [
            'HeapDestroy()',
            'HeapCreate()',
            'НеарАllос()',
            'HeapValidate()',
            'HeapSize()',
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
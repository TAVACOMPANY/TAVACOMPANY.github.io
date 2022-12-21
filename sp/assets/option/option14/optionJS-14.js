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
        question: 'Функции порта завершения ввода-вывода',
        options: [
            'объект синхронизации каналов',
            'оповещает параллельные потоки',
            'обслуживает очередь пакетов',
            'устанавливает соединения',
            'содержит динамическую библиотеку',
        ],
        rightAnswer: 1
    },
    {
        question: 'Характеристики порта завершения ввода-вывода:',
        options: [
            'обслуживает очередь пакетов',
            'объект синхронизации пакетов',
            'содержит очередь пакетов',
            'устанавливает соединения',
            'динамическая библиотека',
        ],
        rightAnswer: 2
    },
    {
        question: 'Буферизация ввода-вывода это',
        options: [
            'область оперативной памяти',
            'область виртуальной памяти',
            'временное хранение записей файла',
            'последовательная очередь данных',
            'область дополнительной памяти',
        ],
        rightAnswer: 0
    },
    {
        question: 'Для асинхронной записи в файлы имеется функция WriteFile, параметры которой:',
        options: [
            'nNumberOfbytes',
            'IpBuffer',
            'nNumber_ofbytes_ToWrite',
            'hFile__ToWrite',
            'dwStackSize',
        ],
        rightAnswer: 1
    },
    {
        question: 'Для ожидания наступления некоторого события или выполнения асинхронной процедуры можно использовать функцию WaitForSingleObjectEx(), которая имеет следующие параметры',
        options: [
            'время ожидания загрузки системного файла',
            'дескриптор системного файла',
            'дескриптор объекта',
            'дескриптор системного ресурса',
            'время ожидания',
        ],
        rightAnswer: 2
    },
    {
        question: 'Для ожидания наступления некоторого события или выполнения асинхронной процедуры можно использовать функцию WaitForSingleObjectEx(), которая имеет следующие параметры:',
        options: [
            'временной интервал в миллисекундах',
            'дескриптор системного файла',
            'дескриптор объекта синхронизации',
            'дескриптор системного ресурса',
            'время ожидания',
        ],
        rightAnswer: 0
    },
    {
        question: 'Значение функции GetFileType:',
        options: [
            'OPEN_ALWAYS',
            'FILE_SHARE_READ',
            'GENERICREAD',
            'FILE_SHARE_WRITE',
            'FILE_TYPE_CHAR',
        ],
        rightAnswer: 4
    },
    {
        question: 'Организация буферизации ввода-вывода предполагает',
        options: [
            'последовательная очередь данных',
            'область дополнительной памяти',
            'область виртуальной памяти',
            'кольцевую очередь данных',
            'временное хранение записей файла',
        ],
        rightAnswer: 3
    },
    {
        question: 'Организация буферизации процесса ввода-вывода предусматривает работу с',
        options: [
            'с временным хранением записей файла',
            'постоянной очередью данных',
            'параллельной очередью данных',
            'с областью временного хранения файлов',
            'с областью виртуальной памяти',
        ],
        rightAnswer: 1
    },
    {
        question: 'Параметры функции WriteFile:',
        options: [
            'dwStackSize',
            'nNumberOfbytes',
            'nNumberofbytesToWrite',
            'nFileSize',
            'IpBufferSize',
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
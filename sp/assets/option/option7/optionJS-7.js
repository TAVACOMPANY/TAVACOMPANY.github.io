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
        question: 'Резервирование или распределение области виртуальной процессу выполняется с помощью функции VitualAlloc(), которая имеет следующие параметры',
        options: [
            'адрес конца области виртуальной памяти',
            'размер области',
            'тип распределения',
            'тип заполнения',
            'адрес начала области виртуальной памяти',
        ],
        rightAnswer: 1
    },
    {
        question: 'Файлы с расширениями ехе и dll, разбиты на разделы:',
        options: [
            'один из этих разделов содержит только регистры',
            'раздел с исполняемым кодом хранится в физической памяти в нескольких экземплярах',
            'каждый из которых содержит данные только одинакового типа',
            'каждый из которых содержит данные различного типа',
            'раздел с данными хранится в физической памяти резидентно',
        ],
        rightAnswer: 2
    },
    {
        question: 'Функция FilIMemory() имеет параметры',
        options: [
            'символ-заполнитель',
            'адрес исходной области',
            'адрес конца области виртуальной памяти',
            'тип заполнения',
            'длина буфера',
        ],
        rightAnswer: 0
    },
    {
        question: 'Чтобы загрузить DLL в память необходимо',
        options: [
            'указать точку входа программы',
            'вызвать функцию LoadLibraryEx()',
            'указать способ загрузки библиотеки',
            'вызвать функцию Load DLL()',
            'вызвать функцию Load_DLL()',
        ],
        rightAnswer: 1
    },
    {
        question: 'В Win32 созданные менеджером объектов API системные объекты:',
        options: [
            'приоритет потока',
            'контекст',
            'семафор',
            'поток',
            'процесс',
        ],
        rightAnswer: 2
    },
    {
        question: 'Для программирования приложений Win32API существуют следующие операционные системы:',
        options: [
            'Windows 98',
            'MSDOS',
            'Unix',
            'Windows ХР',
            'Windows СЕ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Для работы с процессами и потоками в Win32 API существуют функции:',
        options: [
            'dwExitThread',
            'dwExitCode',
            'dwStackSize',
            'IpThreadAttributes',
            'CreateThread',
        ],
        rightAnswer: 4
    },
    {
        question: 'К третьему классу синхронизации относятся объекты, которые переходят в сигнальное состояние по завершении своей работы:',
        options: [
            'ожидание',
            'консольный ввод (console input)',
            'ожидающий таймер',
            'работа (job)',
            'событие (event).',
        ],
        rightAnswer: 3
    },
    {
        question: 'Операции над потоком связанные с операционной системой:',
        options: [
            'Exit',
            'Run',
            'Read',
            'Write',
            'Open',
        ],
        rightAnswer: 1
    },
    {
        question: 'Операционные системы для программирования приложений Win32API:',
        options: [
            'Unix',
            'MSDOS',
            'Windows ХР',
            'Windows СЕ',
            'Windows 99',
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
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
        question: 'Расшифровка аббревиатуры API',
        options: [
            'Application Processing Interface',
            'Application Programming Interface',
            'Applied Programming Interface',
            'Additional Programming Interface',
            'Applied Programm Interface',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функция VitualAlloc() имеет следующие параметры',
        options: [
            'тип распределения',
            'адрес конца области виртуальной памяти',
            'область для распределения или резервирования',
            'тип заполнения',
            'адрес начала области виртуальной памяти',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ядро (kernel) - основной компонент ОС, отвечающий за управление',
        options: [
            'процессами',
            'именами файлов',
            'прерываниями',
            'каталогами',
            'системным таймером',
        ],
        rightAnswer: 0
    },
    {
        question: 'Ядро (kernel), являющееся основным компонентом ОС, отвечает за управление',
        options: [
            'именами файлов',
            'виртуальной памятью',
            'прерываниями',
            'каталогами',
            'системным таймером',
        ],
        rightAnswer: 1
    },
    {
        question: 'Для загрузки DLL в память необходимо',
        options: [
            'указать способ загрузки библиотеки',
            'указать точку входа программы',
            'вызвать функцию LoadLibrary()',
            'вызвать функцию Load DLL()',
            'вызвать функцию Load_DLL()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Для работы с оперативной памятью в С имеется функция FilIMemory(), параметры которой:',
        options: [
            'адрес блока памяти',
            'адрес исходной области',
            'адрес конца области виртуальной памяти',
            'тип заполнения',
            'длина буфера',
        ],
        rightAnswer: 0
    },
    {
        question: 'Исполняемые файлы и файлы динамических библиотек, т.е. файлы с расширениями ехе и dll, разбиты на разделы:',
        options: [
            'раздел с данными хранится в физической памяти резидентно',
            'каждый из которых содержит данные различного типа',
            'один из этих разделов содержит только регистры',
            'раздел с исполняемым кодом хранится в физической памяти в нескольких экземплярах',
            'один из этих разделов содержит только исполняемый код приложения или DLL',
        ],
        rightAnswer: 4
    },
    {
        question: 'Использование динамически подключаемых библиотек позволяет:',
        options: [
            'приложениям не загружать код в физическую память',
            'повысить затраты на разработку программного обеспечения',
            'увеличить объем используемой физической памяти',
            'снизить затраты на разработку программного обеспечения',
            'приложениям не разделять один и тот же экземпляр кода и данных',
        ],
        rightAnswer: 3
    },
    {
        question: 'Параметры функции FilIMemory():',
        options: [
            'адрес конца области виртуальной памяти',
            'длина блока',
            'тип распределения',
            'тип заполнения',
            'длина буфера',
        ],
        rightAnswer: 1
    },
    {
        question: 'При использовании динамически подключаемых библиотек :',
        options: [
            'увеличивается объем используемой физической памяти',
            'приложениям позволяется не разделять один и тот же экземпляр кода и данных',
            'уменьшается объем используемой физической памяти',
            'повышаются затраты на разработку программного обеспечения',
            'приложения могут не загружать код в физическую память',
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
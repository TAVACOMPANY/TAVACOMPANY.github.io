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
        question: 'Существующие типы операционных систем',
        options: [
            'однопрограммная или многопользовательская',
            'мультипрограммная или многопользовательская',
            'монопрограммная',
            'монопрограммная',
            'с низким приоритетом',
        ],
        rightAnswer: 1
    },
    {
        question: 'Укажите существующие типы операционных систем',
        options: [
            'монопрограммная',
            'монопользовательская',
            'однопрограммная или однопользовательская',
            'мультипрограммная или однопользовательская',
            'с низким приоритетом',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дескриптор объекта',
        options: [
            'представляет собой запись в системной таблице',
            'содержит описание файла',
            'содержит структуру файла',
            'содержит имя объекта',
            'содержит адрес идентификации типа объекта',
        ],
        rightAnswer: 0
    },
    {
        question: 'Дескриптор объекта содержит',
        options: [
            'описание файла',
            'средства для идентификации типа объекта',
            'запись таблицы',
            'имя объекта',
            'адрес идентификации типа объекта',
        ],
        rightAnswer: 1
    },
    {
        question: 'содержит адрес объекта',
        options: [
            'содержит описание файла',
            'представляет собой запись таблицы',
            'содержит адрес объекта',
            'содержит имя объекта',
            'содержит адрес идентификации типа объекта',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какие имеются категорииWin32 API :',
        options: [
            'Graphics Device Interface, Network Services, User Interface',
            'Windows NT Control, Shell, Base Services',
            'Windows ХР Access Control, Windows Shell, Base Services',
            'System Information,Control Library',
            'Device Interface, Network Interface',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие категории объектов предлагает приложению операционная система Windows',
        options: [
            'данные, программы',
            'системный ресурс',
            'файл, канал',
            'программные приложения',
            'Graphics Device Interface',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какие существуют объекты в Windows?',
        options: [
            'программные приложения',
            'данные, программы',
            'монопольный ресурс',
            'файл, канал',
            'Windows System Information, Common Control Library',
        ],
        rightAnswer: 3
    },
    {
        question: 'Категории объектов, предлагаемые приложению операционной системой Windows',
        options: [
            'программные приложения',
            'User',
            'файл, канал',
            'системный ресурс',
            'данные, программы',
        ],
        rightAnswer: 1
    },
    {
        question: 'КатегорииWin32 API :',
        options: [
            'Windows ХР Access Control, Windows Shell, Base Services',
            'Windows NT Control, Shell, Base Services',
            'Windows System Information, Common Control Library',
            'System Information,Control Library',
            'Device Interface, Network Interface',
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
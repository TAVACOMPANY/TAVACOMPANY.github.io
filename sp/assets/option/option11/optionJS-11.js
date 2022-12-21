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
        question: 'Задачи динамической локальной памяти потока:',
        options: [
            'хранить параметры захваченной памяти',
            'узнать какой поток ее вызывает',
            'описать импортируемые из DLL имена в приложении',
            'ввести имя используемой библиотеки импорта',
            'создать DLL',
        ],
        rightAnswer: 1
    },
    {
        question: 'Значения параметра new для управления исключениями:',
        options: [
            '_EM_BYZERO',
            '_EM_FLOAT',
            '_EM_OVERFLOW',
            '_EM_WORD',
            '_EM_TRANSLATION',
        ],
        rightAnswer: 2
    },
    {
        question: 'К параметрам функции WriteConsoleOutput() относится:',
        options: [
            'дескриптор буфера экрана',
            'дескриптор файла ',
            'координаты для последнего элемента в буфере',
            'дескриптор диска',
            'область ввода в файл',
        ],
        rightAnswer: 0
    },
    {
        question: 'Параметрами функции WriteConsoleOutput() являются:',
        options: [
            'дескриптор файла',
            'область вывода в буфер экрана',
            'координаты для последнего элемента в буфере',
            'дескриптор диска',
            'область ввода в файл',
        ],
        rightAnswer: 1
    },
    {
        question: 'Параметры структуры _SECURITY_ATTRIBUTES',
        options: [
            'учетные записи компьютера',
            'учетные записи пользователей',
            'длина структуры в байтах',
            'права и привилегии',
            'учетные записи домена',
        ],
        rightAnswer: 2
    },
    {
        question: 'Программа структурной обработки исключений включает:',
        options: [
            'Блок программного кода, называемый фреймом',
            'события которые являются ошибками в программе',
            'оператор начала программы',
            'событие после которого, программа выполняется неправильно',
            'событие происходящее во время выполнения программы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Свойства и признаки операционной системы:',
        options: [
            'Сервисная программа',
            'Прикладная программа',
            'Обеспечение',
            'Пользование',
            'Менеджер ресурсов компьютера',
        ],
        rightAnswer: 4
    },
    {
        question: 'Структура _SECURITY_ATTRIBUTES имеет параметры:',
        options: [
            'учетные записи компьютера',
            'учетные записи пользователей',
            'учетные записи домена',
            'признак наследования',
            'права и привилегии',
        ],
        rightAnswer: 3
    },
    {
        question: 'У структуры _SECURITY_ATTRIBUTES имеются следующие параметры:',
        options: [
            'права и привилегии',
            'указатель на дескриптор безопасности',
            'учетные записи домена',
            'учетные записи пользователей',
            'учетные записи компьютера',
        ],
        rightAnswer: 1
    },
    {
        question: 'В Windows различают следующие виды потоков:',
        options: [
            'серверные',
            'кластерные',
            'потоки интерфейса пользователя',
            'интерфейсные',
            'потоки приложений',
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
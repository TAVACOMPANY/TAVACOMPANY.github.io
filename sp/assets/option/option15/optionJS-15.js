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
        question: 'Понятия, связанные с механизмом отображения файлов в память:',
        options: [
            'указывать на функцию завершения',
            'когерентность данных',
            'создать файл загрузки',
            'открыть файл приложения',
            'создать файловое пространство',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функция асинхронной записи WriteFile имеет параметры:',
        options: [
            'nNumber_of_bytes_ToWrite',
            'nNumberOfbytes',
            'hFile',
            'hFile_ToWrite',
            'Ip_Buffer',
        ],
        rightAnswer: 2
    },
    {
        question: 'В порядок работы с локальной памятью потока включаются:',
        options: [
            'распределение указателя',
            'возвращается значение указателя',
            'завершение функции',
            'сохранение указателя',
            'использование указателя',
        ],
        rightAnswer: 0
    },
    {
        question: 'Вспомогательные программные компоненты системы безопасности:',
        options: [
            'Local Security Authority',
            'Netlogon',
            'Security Accounts Manager',
            'Host',
            'Security Reference Monitor',
        ],
        rightAnswer: 1
    },
    {
        question: 'Для отображения файла в память существует функция CreateFileMapping с параметром flProtect, имеющим значение:',
        options: [
            'PAGE_READCOPY',
            'PAGE_COPYONLY',
            'PAGE_READONLY',
            'PAGE_WRITEONLY',
            'PAGE WRITE',
        ],
        rightAnswer: 2
    },
    {
        question: 'К объектам ядра операционных систем относятся:',
        options: [
            'каналы, файлы проецируемые в память',
            'кисти, файлы, каталоги',
            'устройства, среды',
            'программы, файлы, события',
            'программы, семафоры, мьютексы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Объектами ядра операционных систем являются :',
        options: [
            'программы, файлы, события',
            'программы, файлы проецируемые в память',
            'устройства, среды',
            'кисти, файлы, каталоги',
            'потоки, семафоры, мьютексы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Объекты ядра операционных систем это:',
        options: [
            'потоки, кисти, мьютексы',
            'кисти, файлы проецируемые в память',
            'устройства, среды',
            'процессы, файлы, события',
            'кисти, файлы, каталоги',
        ],
        rightAnswer: 3
    },
    {
        question: 'Основные программные компоненты системы безопасности',
        options: [
            'Netlogon',
            'Security Reference Monitor',
            'Winlogon',
            'Host Local Security Authority',
            'Authentication Package',
        ],
        rightAnswer: 1
    },
    {
        question: 'Параметр fdwReason может иметь одно из следующих значений, которое указывает на причину, по которой операционная система вызывает функцию DllMain:',
        options: [
            'load_with_altered_search_path',
            'dll_PrewTlsIndex',
            'dll_process_attach',
            'load_iibrary_as_datafile',
            'dont_resolve_dll_references',
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
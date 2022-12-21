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
        question: 'Параметры функции WriteFile():',
        options: [
            'флаги и атрибуты, файл атрибутов',
            'дескриптор файла, указатель на буфер данных',
            'количество записываемых синхронно байтов, количество записанных байтов',
            'имя файла, атрибуты защиты, создание или открытие файла',
            'способ записи, режимы совместного использования',
        ],
        rightAnswer: 1
    },
    {
        question: 'Параметры функции для загрузки DLL DllMain():',
        options: [
            'дескриптор файла',
            'флаг причины отказа вызова функции DllMain',
            'дескриптор DLL',
            'способ выгрузки',
            'виртуальный адрес',
        ],
        rightAnswer: 2
    },
    {
        question: 'При работе с функцией WriteFile() используются параметры',
        options: [
            'количество записываемых байтов, количество записанных байтов',
            'флаги и атрибуты, файл атрибутов',
            'режим использования при асинхронной записи',
            'имя файла, атрибуты защиты, создание или открытие файла',
            'способ синхронного доступа, режимы совместного использования',
        ],
        rightAnswer: 0
    },
    {
        question: 'Функции файла stdio.h языка программирования С, включенные в стандартную библиотеку ввода-вывода:',
        options: [
            'main—головной файл программы',
            'stdin — стандартный файл ввода',
            'stlib—файлы библиотеки',
            'strcmp —функция сравнения',
            'stdout— файл ввода',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функции файла stdio.h языка программирования С, создающие стандартную библиотеку ввода-вывода:',
        options: [
            'main—головной файл программы',
            'stlib—файлы библиотеки',
            'stderr —файл вывода сообщения об ошибке',
            'strcmp —функция сравнения',
            'stdout— файл ввода',
        ],
        rightAnswer: 2
    },
    {
        question: 'Функции файла stdio.h языка, подключаемого в С, создающие стандартную библиотеку ввода-вывода:',
        options: [
            'stdout— стандартный файл вывода',
            'main—головной файл программы',
            'stlib—файлы библиотеки',
            'strcmp —функция сравнения',
            'tanh —файл для вывода матем. значений',
        ],
        rightAnswer: 0
    },
    {
        question: 'Функция MapViewOfFileEx, отображающая файл в адресное пространства с некоторого заданного виртуального адреса имеет параметры:',
        options: [
            'HANDLE hFile Mapping Object',
            'LPVOID lpBase Address',
            'LPOVERLAPPED IpOverLapped.',
            'DWORD IDThread',
            'DWORD dwDesizedAccess',
        ],
        rightAnswer: 4
    },
    {
        question: 'Функция MapViewOfFileEx, отображающий файл в память имеет параметры:',
        options: [
            'LPVOID IpBaseAddress',
            'DWORD dw Desized Access',
            'LPOVERLAPPED IpOverLapped.',
            'HANDLE hFileMappingObject',
            'DWORD IDThread',
        ],
        rightAnswer: 3
    },
    {
        question: 'Главное отличие привилегий от прав доступа:',
        options: [
            'привилегии назначаются по умолчанию в операционных системах Windows',
            'привилегии касаются субъектов, а не охраняемых объектов системы',
            'права доступа ограничивает доступ субъекта к объектам',
            'привилегии касаются охраняемых объектов системы',
            'права доступа выполнить некоторое действие по отношению объектам системы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Задачи Динамическая локальная память потока должна :',
        options: [
            'описать импортируемые из DLL имена в приложении',
            'узнать объем потока, который ее вызывает',
            'хранить указатели на захваченную память',
            'ввести имя используемой библиотеки импорта',
            'создать DLL',
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
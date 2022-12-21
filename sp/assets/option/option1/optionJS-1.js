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
        question: 'Для работы с файлами операционная система использует',
        options: [
            'дескрипторы каталогов',
            'дескрипторы файлов',
            'программные приложения',
            'индексы',
            'иерархическую структуру каталогов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Каким образом форматируется магнитный диск:',
        options: [
            'физическое форматирование или форматирование высокого уровня',
            'разбиение диска на кластеры',
            'разбиение диска на разделы',
            'логическое форматирование или форматирование низкого уровня',
            'разбиение диска на сектора',
        ],
        rightAnswer: 2
    },
    {
        question: 'Непосредственное взаимодействие с диском - прерогатива компонента ОС, называемого',
        options: [
            'драйвер диска.',
            'система ввода',
            'система вывода',
            'привод диска',
            'система ввода-вывода',
        ],
        rightAnswer: 0
    },
    {
        question: 'Операционные системы:',
        options: [
            'Java, Windows',
            'Linux',
            'Linux, Oracle',
            'Linux,Word',
            'Visio, Windows',
        ],
        rightAnswer: 1
    },
    {
        question: 'Помимо собственно файлов для работы с внешней памятью ОС использует',
        options: [
            'прямое распределение внутренней памяти',
            'понятие "файловая система"',
            'таблицы распределения внешней памяти',
            'различные индексные структуры',
            'прямое распределение внешней памяти',
        ],
        rightAnswer: 2
    },
    {
        question: 'Существующие в настоящее время операционные системы:',
        options: [
            'Windows',
            'Java',
            'Oracle',
            'Word',
            'Visio',
        ],
        rightAnswer: 0
    },
    {
        question: 'Существующие уровни форматирования магнитного диска:',
        options: [
            'разбиение диска на сектора',
            'логическое форматирование или форматирование низкого уровня',
            'физическое форматирование или форматирование высокого уровня',
            'разбиение диска на кластеры',
            'физическое форматирование или форматирование низкого уровня',
        ],
        rightAnswer: 4
    },
    {
        question: 'Укажите атрибуты нормального файла:',
        options: [
            'FILE ATTRIBUTE NORMAL',
            'FILE_ATTRIBUTE_ENCRYPTED',
            'FILE_ATTRIBUTE_SYSTEM',
            'FILE_ATTRIBUTE_ARCHIVE',
            'FILE_ATTRJBUTE_READONLY',
        ],
        rightAnswer: 3
    },
    {
        question: 'Укажите атрибуты системного файла:',
        options: [
            'FILE_ATTRJBUTE_READONLY',
            'FILE_ATTRIBUTE_SYSTEM',
            'FILE ATTRIBUTE SYSTEM',
            'FILE_ATTRIBUTE_ENCRYPTED',
            'FILE ATTRIBUTE NORMAL',
        ],
        rightAnswer: 1
    },
    {
        question: 'Укажите атрибуты зашифрованного файла:',
        options: [
            'FILE_ATTRIBUTE SYSTEM',
            'FILE_ATTRJBUTE_READONLY',
            'FILE_ATTRIBUTE_ENCRYPTED',
            'FILE_ATTRIBUTE_ARCHIVE',
            'FILE ATTRIBUTE ENCRYPTED',
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
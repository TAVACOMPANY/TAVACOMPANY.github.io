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
        question: 'Уровни форматирования магнитного диска:',
        options: [
            'разбиение диска на кластеры',
            'логическое форматирование или форматирование высокого уровня',
            'физическое форматирование или форматирование высокого уровня',
            'логическое форматирование или форматирование низкого уровня',
            'разбиение диска на сектора',
        ],
        rightAnswer: 1
    },
    {
        question: 'Файловая система позволяет связать уникальное имя файла с данными при помощи',
        options: [
            'Блоков вторичной памяти, содержащими данные файла',
            'системы директорий',
            'системы справочников (каталогов, директорий)',
            'системы справочников',
            'системы справочников- каталогов',
        ],
        rightAnswer: 2
    },
    {
        question: 'К объектам ядра операционных систем относятся:',
        options: [
            'потоки, семафоры, мьютексы',
            'устройства,среды',
            'кисти, файлы, каталоги',
            'критические секции, мьютексы',
            'процессы, среды, события',
        ],
        rightAnswer: 0
    },
    {
        question: 'Объекты ядра операционных систем:',
        options: [
            'устройства,среды',
            'процессы, файлы, события',
            'кисти, файлы, каталоги',
            'критические секции, мьютексы',
            'среды , семафоры, мьютексы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Параметры функции read(fd,buf,count):',
        options: [
            'имя файла, адрес области оперативной памяти, куда считывается информация из файла, количество кластеров',
            'имя файла, адрес области оперативной памяти, куда считывается информация из файла, количество записей',
            'дескриптор, адрес области оперативной памяти, куда считывается информация из файла, количество байтов',
            'имя файла, адрес области оперативной памяти, куда считывается информация из файла, количество байтов',
            'имя файла, адрес области внешней памяти, куда считывается информация из файла, количество байтов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Параметры функции WriteFile()',
        options: [
            'дескриптор файла, указатель на буфер данных',
            'флаги и атрибуты, количество читаемых байтов',
            'флаги и атрибуты, файл атрибутов',
            'файл атрибутов, количество прочитанных байтов',
            'имя файла, атрибуты защиты, создание или открытие файла',
        ],
        rightAnswer: 0
    },
    {
        question: 'Параметры функции WriteFile():',
        options: [
            'имя файла, атрибуты защиты, создание или открытие файла',
            'файл атрибутов, количество прочитанных байтов',
            'флаги и атрибуты, файл атрибутов',
            'флаги и атрибуты, количество читаемых байтов',
            'количество записываемых байтов- количество записанных байтов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Под дескриптором понимается',
        options: [
            'описание файла в таблице открытых файлов',
            'индексная часть файла в таблице открытых файлов',
            'первая запись файла в таблице открытых файлов',
            'указатель на описание файла в таблице открытых файлов,',
            'альтернативное имя файла для его копии',
        ],
        rightAnswer: 3
    },
    {
        question: 'При асинхронном чтении данных из файла в параметрах функции ReadFile() указываются:',
        options: [
            'имя файла; указатель на буфер данных',
            'количество читаемых байтов; количество прочитанных байтов',
            'количество читаемых байтов, дескриптор системного ресурса',
            'количество прочитанных байтов, дескриптор системного ресурса',
            'указатель на буфер данных, имя файла',
        ],
        rightAnswer: 1
    },
    {
        question: 'При асинхронном чтении данных из файла, к параметрам функции ReadFile() относятся:',
        options: [
            'количество читаемых байтов; дескриптор системного ресурса',
            'дескриптор системного ресурса',
            'дескриптор файла; указатель на буфер данных',
            'количество прочитанных байтов',
            'указатель на буфер данных',
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
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
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Память, которая используется для хранения данных, выводимых на экран.',
        options: [
            'Микросхема',
            'режим True Color',
            'Видеопамять',
            'Частота строк',
            'Графическая функция',
        ],
        rightAnswer: 2
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD IBM 30.7 IDE 7200 rpm, определите тип интерфейса',
        options: [
            'GB',
            'HDD',
            'Rpm',
            'IDE ',
            'IBM',
        ],
        rightAnswer: 3
    },
    {
        question: 'Для идентификации и распознавания ошибок при последовательной передачи в состав байта данных дополнительно включают',
        options: [
            'бит контроля четности',
            'Последовательный порт',
            'ТХD - передаваемые данные',
            'Сигналы синхронизации',
            'Последовательные данные RXD',
        ],
        rightAnswer: 0
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD Seagate 20.4 GB IDE 7200 rpm.',
        options: [
            '30 Гб',
            '20.4 Гб ',
            '1024 Гб',
            '7200 Гб',
            '72 Гб',
        ],
        rightAnswer: 1
    },
    {
        question: 'Промежуток времени между моментом начала операции записи и моментом, когда становится возможным доступ к запоминающим элементам',
        options: [
            'tдост_с',
            'tзап',
            'tсчит',
            'tрег',
            'tдост_з',
        ],
        rightAnswer: 4
    },
    {
        question: 'Микросхемы, называемые также двухпортовыми RAM-микросхемами, позволяют одновременно записывать и считывать данные. Благодаря этому RАМDАС может непрерывно считывать данные из памяти.',
        options: [
            'DRAM',
            'SGRAM',
            'Multibank DRAM',
            'Video RAM',
            'ЕDО RAM',
        ],
        rightAnswer: 3
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик монитора LG 774FT 0,24 17” 1280x1024 60Hz TCO’95., где величина «зерна»равна:',
        options: [
            '774 мм',
            '17 мм',
            '0,24 мм',
            '60 мм',
            '0,34 мм',
        ],
        rightAnswer: 2
    },
    {
        question: 'Устройство, которое содержит механизмы для вращения магнитного диска и, перемещения головки чтения и записи по его поверхности.',
        options: [
            'Дисковод',
            'Сектор',
            'Дискета',
            'Дорожка',
            'SDD',
        ],
        rightAnswer: 0
    },
    {
        question: 'Эти RАМ-микросхемы представляют еще один более быстрый вариант VRAM. Они имеют специальные дополнительные графические функции, обеспечивающие представление изображения даже в режиме True Color (т.е. для 16 миллионов цветов) при исключительно высоком разрешении. Запись и считывание могут осуществляться одновременно.',
        options: [
            'Multibank DRAM',
            'DRAM',
            'ЕDО RAM',
            'SGRAM',
            'WRAM',
        ],
        rightAnswer: 4
    },
    {
        question: 'Скорость обмена между буфером и контроллером канала (Host). Определяется интерфейсом, поддерживаемым диском (а также чипсетом со стороны системной платы).',
        options: [
            'Среднее время доступа к данным',
            'Внешняя скорость обмена',
            'Скорость вращения',
            'Среднее время перехода на соседнюю дорожку',
            'Внутренняя скорость обмена',
        ],
        rightAnswer: 1
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
    coratten();
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
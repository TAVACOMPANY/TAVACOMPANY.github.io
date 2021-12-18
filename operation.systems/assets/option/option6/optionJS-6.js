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
        question: 'В этом виде интерфейса человек подает «команды» компьютеру, а компьютер их выполняет и выдает результат человеку',
        options: [
            'Графический',
            'Командный',
            'Символьный',
            'Сетевой',
            'Машинный',
        ],
        rightAnswer: 1
    },
    {
        question: 'Интерфейс, который включает в себя и интерфейс командной строки, и графисческий, и речевой, и мимический',
        options: [
            'Сложный графический интерфейс',
            'Биометрический',
            'SILK',
            'Семантический интерфейс',
            'WIMP',
        ],
        rightAnswer: 3
    },
    {
        question: 'Представляет собой набор функций, предоставляемых системой программирования разработчику прикладной программы и ориентированных на организацию взаимодействия результирующей прикладной программы с целевой вычислительной системой',
        options: [
            'APAPII',
            'API',
            'POSIX',
            'WIMP',
            'SILK',
        ],
        rightAnswer: 1
    },
    {
        question: 'Платформенно - независимый системный интерфейс для компьютерного окружения',
        options: [
            'API',
            'SILK',
            'POSIX',
            'WIMP',
            'APAPI',
        ],
        rightAnswer: 2
    },
    {
        question: 'Командный интерфейс подразумевает',
        options: [
            'Однопользовательскую ОС, пакетную технологию',
            'Многопользовательскую ОС, пакетную технологию',
            'Многопрограммную ОС, диалоговую технологию',
            'Однопользовательскую ОС, сетевую технологию',
            'Многопрограммную ОС, сетевую технологию',
        ],
        rightAnswer: 0
    },
    {
        question: 'WIMP интерфейс подразумевает',
        options: [
            'Однопользовательскую ОС, пакетную технологию',
            'Многопрограммную ОС, диалоговую технологию',
            'Многопользовательскую ОС, пакетную технологию',
            'Однопользовательскую ОС, сетевую технологию',
            'Многопрограммную ОС, сетевую технологию',
        ],
        rightAnswer: 1
    },
    {
        question: 'SILK интерфейс подразумевает',
        options: [
            'Многопрограммную ОС, сетевую технологию',
            'Однопользовательскую ОС, сетевую технологию',
            'Многопользовательскую ОС, пакетную технологию',
            'Однопользовательскую ОС, пакетную технологию',
            'Однопользовательскую и многопользовательскую ОС, сетевую, диалоговую и пакетную технологию',
        ],
        rightAnswer: 4
    },
    {
        question: 'При этой технологии в качестве единственного способа ввода информации от человека к компьютеру служит клавиатура, а компьютер выводит информацию человеку с помощью алфавитно-цифрового дисплея (монитора)',
        options: [
            'Пакетная технология',
            'Сетевая технология',
            'Технология командной строки',
            'Развернутая технология',
            'Последовательная технология',
        ],
        rightAnswer: 2
    },
    {
        question: 'Характерной особенностью этого вида интерфейса является то, что диалог с пользователем ведется не с помощью команд, а с помощью графических образов — меню, окон, других элементов.',
        options: [
            'Командный интерфейс',
            'Графический интерфейс',
            'Машинный интерфейс',
            'Смешанный интерфейс',
            'Диалоговый интерфейс',
        ],
        rightAnswer: 1
    },
    {
        question: 'Порядок представления прикладной программе перечисленных средств определяется',
        options: [
            'режимом унификации данных',
            'режимом стандартизации данных',
            'режимом обработки данных',
            'режимом разработки данных',
            'режимом введения данных',
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
    coratten();
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
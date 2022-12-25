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
        question: 'Назовите событие, которое соответствует следующему определению: Указатель мыши находится внутри области элемента интерфейса (над элементом интерфейса):',
        options: [
            'MouseUp',
            'MouseDown',
            'MouseHover',
            'MouseMove',
            'MouseEnter',
        ],
        rightAnswer: 1
    },
    {
        question: 'Преимуществом интерфейсов, основанных на метафорах, является',
        options: [
            'производительность работы новичков',
            'интуитивная понятность',
            'возможность подбора метафоры для любой функциональности',
            'хорошая масштабируемость',
            'производительность работы квалифицированных пользователей',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что такое ListView Control',
        options: [
            'модифицируемый список',
            'комбинированный список',
            'всплывающая подсказка',
            'выпадающий список',
            'модифицируемое дерево',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое Extended Listbox',
        options: [
            'комбинированный список',
            'расширенный список',
            'всплывающая подсказка',
            'выпадающий список',
            'полоса прокрутки',
        ],
        rightAnswer: 1
    },
    {
        question: 'Минимальная величина раздражителя, вызывающая едва заметное ощущение, называется … абсолютным порогом чувствительности',
        options: [
            'Минимальным',
            'Номинальным',
            'Верхним',
            'Нижним',
            'Средним',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой шрифт не рекомендован для экранов с низким расширением:',
        options: [
            'Serif',
            'Roboto',
            'Arial',
            'Alice',
            'Verdana',
        ],
        rightAnswer: 0
    },
    {
        question: 'Упорядочивание',
        options: [
            'Восприятие',
            'Внимание',
            'Мышление',
            'Ощущение',
            'Представление',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что понимается под принципом эффективного интерфейса «Гибкость интерфейса»',
        options: [
            'возможность изменения входных данных.',
            'способность учитывать уровень подготовки и производительность труда пользователя',
            'субъективное удовлетворение пользователей',
            'возможность изменения структуры диалога',
            'способность распознавать запросы пользователя',
        ],
        rightAnswer: 3
    },
    {
        question: 'MS Visio позволяет создавать схемы, чертежи, диаграммы с помощью:',
        options: [
            'Панели инструментов',
            'Встроенных шаблонов',
            'Дополнительного программного обеспечения',
            'Графических редакторо',
            'Панели рисования',
        ],
        rightAnswer: 1
    },
    {
        question: 'Тип адаптации, в которой интерфейс строит модель пользователя:',
        options: [
            'Полная',
            'Фиксированная',
            'Неполная',
            'Косметическая',
            'Конечная',
        ],
        rightAnswer: 0
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
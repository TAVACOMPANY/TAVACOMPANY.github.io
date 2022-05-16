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
        question: 'Отличительной особенностью каких языков программирования является их ориентация не на систему команд той или иной ЭВМ, а на систему операторов, характерных для записи определенного класса алгоритмов?',
        options: [
            'языков программирования первого уровня',
            'языков программирования устойчивого уровня',
            'языков программирования высокого уровня',
            'языков программирования низкого уровня',
            'языков программирования сверхвысокого уровня',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что используют все языки программирования высокого уровня для предоставления программисту простого и легкого доступа к различным объектам?',
        options: [
            'комментарии',
            'константы',
            'спецификаторы',
            'идентификаторы',
            'коммутаторы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что понимают под языком программирования?',
        options: [
            'правила представления данных и записи алгоритмов их обработки, которые автоматически выполняются ЭВМ',
            'язык, предназначенный для решения определенного класса задач (проблем)',
            'язык, предназначенный для создания пакетов прикладных программ, в том числе для современных операционных систем',
            'правила записи алгоритмов',
            'язык, предназначенный для обработки программ',
        ],
        rightAnswer: 0
    },
    {
        question: 'В результате выполнения фрагмента программы' + '</br>' + 'double x = 0, y = 0, z = x/y;',
        options: [
            'возникнет ошибка на этапе компиляции программы',
            'ошибки не будет и значение переменной z будет равно NaN',
            'возникнет ошибка на этапе выполнения программы',
            'ошибки не будет и значение переменной z будет равно Infinity',
            'ошибки не будет и значение переменной z будет равно 0',
        ],
        rightAnswer: 1
    },
    {
        question: 'Как называется именованная спецификация одного или более столбцов (для каждого столбца указывается имя, а также его тип или домен)?',
        options: [
            'вещественный тип данных',
            'целый тип данных',
            'комбинированный тип данных',
            'объектный тип данных',
            'строчный тип данных',
        ],
        rightAnswer: 4
    },
    {
        question: 'Каким способом параметр массив всегда передается в функцию?',
        options: [
            'по оператору перехода',
            'по значению',
            'по пересылке',
            'по адресу',
            'по направлению',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что понимается под классом в объектно-ориентированном программировании?',
        options: [
            'списки передаваемых параметров',
            'функции любого языка программирования',
            'структурный тип данных, который включает описание полей данных, процедур и функций, работающих с этими полями данных',
            'типы функции',
            'процедуры любого языка программирования',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какие синтаксические правила объявления переменных являются корректными:',
        options: [
            '[<атрибуты>] [<модификаторы>] <тип> <список объявителей>;',
            '<список объявителей> : <тип>;',
            '<тип> [<атрибуты>] [<модификаторы>] <список объявителей>;',
            '[<модификаторы>] <тип> : <список объявителей>;',
            '<тип> : <список объявителей>;',
        ],
        rightAnswer: 0
    },
    {
        question: 'Определение класса в C# и других объектных языках содержит:',
        options: [
            'графы',
            'отношения',
            'исключения',
            'ссылки',
            'методы, поля, события',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какие типы в языке C# относятся к ссылочным:',
        options: [
            'арифметический',
            'массивы',
            'структуры',
            'перечисление',
            'логический',
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
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
        question: 'Язык UML предназначен для:',
        options: [
            'Снятия с эксплуатации',
            'Визуализации',
            'Анализа требований',
            'Тестирования',
            'Сопровождения',
        ],
        rightAnswer: 1
    },
    {
        question: 'Гибкий диалог, в отличие от адаптивного диалога, характеризуется тем, что',
        options: [
            'интерфейс частично настраиваемый',
            'интуитивный интерфейс',
            'интерфейс сам настраивается под пользователя',
            'пользователь настраивает интерфейс «под себя»',
            'интерфейс ненастраиваемый',
        ],
        rightAnswer: 2
    },
    {
        question: 'Механизмы расширения UML включают:',
        options: [
            'Стереотипы',
            'Слияния',
            'Управления',
            'Дополнения',
            'Объединения',
        ],
        rightAnswer: 0
    },
    {
        question: 'CASE-средства классифицируются по следующим признакам:',
        options: [
            'По степени сложности моделируемой системы',
            'По применяемым методологиям, моделям систем и БД',
            'По используемому программному обеспечению',
            'По уровням детализации и декомпозиции проектируемой системы',
            'По этапам жизненного цикла программного обеспечения',
        ],
        rightAnswer: 1
    },
    {
        question: 'Результатами проектирования архитектуры является модель:',
        options: [
            'Компонентов',
            'Узлов',
            'Процессов',
            'Потоков',
            'Классов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Принципы разработки программного обеспечения:',
        options: [
            'Индивидуальный процесс разработки',
            'Модель готовности процессов',
            'Модель законченности возможностей',
            'Промежуточный процесс разработки',
            'Параллельный процесс разработки',
        ],
        rightAnswer: 0
    },
    {
        question: 'Словарь UML включает строительные блоки:',
        options: [
            'Слияния',
            'Декомпозиции',
            'Разветвления',
            'Группировки ',
            'Сущности',
        ],
        rightAnswer: 4
    },
    {
        question: 'Большинство принципов построения ПИ ориентированы на платформу:',
        options: [
            'Mac OS',
            'Linux',
            'IOS',
            'Windows',
            'Android',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие разновидности пользовательского интерфейса не существует?',
        options: [
            'WIMP-интерфейс',
            'Логический',
            'SILK-интерфейс',
            'Графический',
            'Командный',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какие технические средства являются средствами управления?',
        options: [
            'Манипуляторы',
            'Клавиатура',
            'Сенсорная панель',
            'Микрофон',
            'Индикаторы',
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
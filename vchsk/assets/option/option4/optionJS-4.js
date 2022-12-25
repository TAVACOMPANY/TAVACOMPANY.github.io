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
        question: 'UML включает синтаксические и семантические правила для:',
        options: [
            'Агрегации',
            'Имен, областей действия',
            'Сопровождения',
            'Вывода из эксплуатации',
            'Сборки',
        ],
        rightAnswer: 1
    },
    {
        question: 'Case-средства классифицируются по следующим признакам:',
        options: [
            'По числу процессов',
            'По применяемым диаграммам',
            'По применяемым методологиям и моделям систем и БД',
            'По числу использованной сущности',
            'По степени итерационности',
        ],
        rightAnswer: 2
    },
    {
        question: 'На чем основана методология реализации пользовательского интерфейса?',
        options: [
            'Интересы пользователя превыше всего',
            'Интересы заказчика превыше всего',
            'Интересы дизайнера превыше всего',
            'Интересы разработчика превыше всего',
            'Интересы тестировщика превыше всего',
        ],
        rightAnswer: 0
    },
    {
        question: 'Принципы разработки эффективного пользовательского интерфейса:',
        options: [
            'Первое использование, итерация',
            'Структура, простота',
            'Невидимость, сложность',
            'Интеграция, повторение',
            'Связь обработка',
        ],
        rightAnswer: 1
    },
    {
        question: 'Графический интерфейс пользователя (обозначение):',
        options: [
            'PUI',
            'DUI',
            'GUI',
            'GPI',
            'IGU',
        ],
        rightAnswer: 2
    },
    {
        question: 'По какому каналу человек воспринимает больше всего информации',
        options: [
            'Зрительный',
            'Слуховой',
            'Обонятельный',
            'Мыслительный',
            'Осязательный',
        ],
        rightAnswer: 0
    },
    {
        question: 'Небольшое окно, содержащее пояснительный текст, и появляющееся на экране, когда пользователь устанавливает указатель на один из элементов интерфейса',
        options: [
            'индикатор состояния прогресса',
            'коллекция',
            'индикатор загрузки',
            'область сообщений',
            'всплывающая подсказка',
        ],
        rightAnswer: 4
    },
    {
        question: 'При оформлении графического изображения технологического процесса на схеме отображаются:',
        options: [
            'Графические операции',
            'Таблица',
            'Символы',
            'Технологические операции',
            'Страница всех графических символов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какая разновидность пользовательского интерфейса появилась позже всех?',
        options: [
            'WIMP',
            'SILK',
            'Графический',
            'Командный',
            'Логический',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что такое ToolBar?',
        options: [
            'панель инструментов',
            'выпадающий список',
            'всплывающая подсказка',
            'комбинированный список',
            'полоса прокрутки',
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
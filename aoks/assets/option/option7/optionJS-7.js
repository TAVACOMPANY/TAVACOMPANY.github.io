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
        question: 'Какая информация преобразуется в переменный электрический ток, поступающий на магнитную головку, а затем передается на магнитный диск, но уже в виде магнитного поля, которое диск может воспринять и "запомнить".',
        options: [
            'Графическая',
            'Акустическая',
            'Цифровая',
            'Аналоговая',
            'Объективная',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что представляет собой множество мельчайших областей самопроизвольной (спонтанной) намагниченности',
        options: [
            'Операционная система',
            'Электроника жесткого диска',
            'Головка считывания/записи',
            'Магнитное покрытие диска',
            'Электронная таблица',
        ],
        rightAnswer: 3
    },
    {
        question: 'Конфликты, возникающие в случае, когда выполнение одной команды зависит от результата выполнения предыдущей команды.',
        options: [
            'конфликты по данным ',
            'параллельными',
            'конфликты по управлению',
            'последовательными',
            'структурные',
        ],
        rightAnswer: 0
    },
    {
        question: 'При реализации конвейерной обработки возникают ситуации, которые препятствуют выполнению очередной команды из потока команд в предназначенном для нее такте. Такие ситуации называются',
        options: [
            'соответвующими',
            'конфликтами. ',
            'последовательными',
            'структурные',
            'параллельными',
        ],
        rightAnswer: 1
    },
    {
        question: 'Простейшей схемой динамического прогнозирования направления условных переходов является',
        options: [
            'буфер распределения условных переходов',
            'буфер направления безусловных переходов',
            'буфер прогнозирования безусловных переходов',
            'буфер прогнозирования безусловных переходов',
            'буфер прогнозирования условных переходов ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Конфликты, которые возникают из-за конфликтов по ресурсам, когда аппаратные средства не могут поддерживать все возможные комбинации команд в режиме одновременного выполнения с совмещением.',
        options: [
            'параллельными',
            'конфликты по управлению',
            'конфликты по данным',
            'структурные ',
            'последовательными',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что состоит из определенного числа линий (проводов), которые в соответствии с выполняемыми ими функциями называются линиями данных, управления или адресными линиями.',
        options: [
            'Операционная система',
            'Электронный луч',
            'Шина',
            'Электроника жесткого диска',
            'Центральный процессор',
        ],
        rightAnswer: 2
    },
    {
        question: 'Степень точности воспроизведения изображения, часто указывается количеством пикселов, которыми можно управлять независимо.',
        options: [
            'Разрешающая способность ',
            'Диагональю экрана',
            'Расстояние между точками',
            'Спецификация',
            'Потребляемая мощность',
        ],
        rightAnswer: 0
    },
    {
        question: 'Предположение, которое рассматривается как корректное, и выборка команд начинается по прогнозируемому направлению.',
        options: [
            'алгоритм',
            'счетчик',
            'условный переход',
            'команда',
            'прогноз ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Основу какой обработки составляет раздельное выполнение некоторой операции в несколько этапов (за несколько ступеней) с передачей данных одного этапа следующему',
        options: [
            'Структурность',
            'Конвейеризация',
            'Параллелизм',
            'Дублированность',
            'Конфликтность',
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
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
        question: 'Use Case - это:',
        options: [
            'Вопросительное описание, описание взаимодействия между классами',
            'Обеспечение функциональности, сугубо внешняя точка зрения',
            'Описание взаимодействий между компонентами',
            'Описание взаимодействий между объектами',
            'Обеспечение структурности, сугубо внутренняя точка зрения',
        ],
        rightAnswer: 1
    },
    {
        question: 'Скорость работы пользователя определяется:',
        options: [
            'скоростью обучения',
            'скоростью интеллектуальной работы',
            'скоростью реакции системы',
            'скоростью физических действий',
            'скоростью восприятия информации',
        ],
        rightAnswer: 2
    },
    {
        question: 'Инициатива диалога является смешанной в системах:',
        options: [
            'Консультирующих',
            'Критикующих',
            'Управления',
            'Протокольных',
            'Мониторинга',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой элемент управления WindowsForm создает панель инструментов?',
        options: [
            'ToolMenu',
            'MainMenu',
            'ToolBar',
            'ToolTip',
            'ToolStrip',
        ],
        rightAnswer: 1
    },
    {
        question: 'Элемент графического пользовательского интерфейса, обеспечивающий вывод информации о текущем состоянии объектов',
        options: [
            'панель управления',
            'панель инструментов',
            'всплывающая подсказка',
            'индикатор загрузки',
            'панель статуса',
        ],
        rightAnswer: 2
    },
    {
        question: 'Перечислите основные правила создания эффективного пользовательского интерфейса.',
        options: [
            'Учитываютcя возможности и особенности аппаратно-программных средств',
            'Не учитываются особенности и традиции той предметной области, к которой относится создаваемое приложение',
            'Не интерфейс должен управлять человеком, а человек интерфейсом',
            'Разработка интерфейса должна носить итерационный характер',
            'Проектируется и разрабатывается как отдельный компонент приложения',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какие кнопки являются кнопками немедленного действия:',
        options: [
            'радио-кнопки',
            'Кнопка меню',
            'Флажки',
            'Переключатель',
            'Управления',
        ],
        rightAnswer: 4
    },
    {
        question: 'Метод GOMS предназначен для:',
        options: [
            'оценки субъективной удовлетворенности пользовател',
            'анализа ошибок разработчика',
            'анализа ошибок пользователя',
            'оценки скорости работы',
            'оценки скорости обучения',
        ],
        rightAnswer: 3
    },
    {
        question: 'Поколение пользовательских интерфейсов, характеризующееся вводом с клавиатуры команд с параметрами (консольный режим работы)',
        options: [
            'III',
            'I ',
            'II',
            'IV',
            'V',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функциональные характеристики Case-средств',
        options: [
            'Среда функционирования',
            'Управление конфигурацией',
            'Технологическая среда',
            'Проектная среда',
            'текущим системным шрифтом',
        ],
        rightAnswer: 0
    },
    {
        question: 'Диаграмма для экспозиции (FEO) показывает:',
        options: [
            'Иллюстрацию альтернативной точки зрения',
            'Общее описание системы',
            'Разбиение системы на подсистемы',
            'Взаимодействия с внешней средой',
            'Иерархическую зависимость работ',
        ],
        rightAnswer: 0
    },
    {
        question: 'В соответствии с психофизиологическими особенностями человека информация на экране монитора (по убыванию важности) располагается',
        options: [
            'от верхнего левого угла',
            'от верхней середины экрана',
            'от центра экрана',
            'от центра экрана',
            'от левой середины экрана',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как установить флажок CheckBox1 с помощью кода?',
        options: [
            'сheckBox1.SetSelected =true',
            'сheckBox1.Selected = true',
            'сheckBox1.SetSelected()',
            'сheckBox1.Select()',
            'сheckBox1.Checked = true',
        ],
        rightAnswer: 0
    },
    {
        question: 'Стрелка управления (Control) в модели в нотации IDEF0 служит:',
        options: [
            'Для описания ресурсов, которые выполняют работу',
            'Для описания правил',
            'Для описания взаимодействия системы с окружающим миром',
            'Для указания на другую модель работы',
            'Для описания материала, которые производятся работой',
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
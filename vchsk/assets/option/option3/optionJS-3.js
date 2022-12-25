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
        question: 'К какому цвету чувствительность фоторецепторов выше всего?',
        options: [
            'Белый',
            'Красный',
            'Оранжевый',
            'Жёлтый',
            'Фиолетовый',
        ],
        rightAnswer: 1
    },
    {
        question: 'Тип адаптации, который обеспечивает гибкость диалога без учета поведения пользователя и без однозначного выбора конкретного стиля диалога:',
        options: [
            'Фиксированная',
            'Неполная',
            'Косметическая',
            'Конечная',
            'Полная',
        ],
        rightAnswer: 2
    },
    {
        question: 'В процесс разработки программного обеспечения включены работы:',
        options: [
            'Анализ требований, проектирование',
            'Структура из процессов, работ, задач',
            'Обеспечение качества, верификация',
            'Документирование, управление конфигурацией',
            'Управление, создание инфраструктуры',
        ],
        rightAnswer: 0
    },
    {
        question: 'Дискрета окна в горизонтальном направлении равна',
        options: [
            '1/3',
            '1/4',
            '1/2',
            '1/8',
            '1/10',
        ],
        rightAnswer: 1
    },
    {
        question: 'Управление требования разрабатываемого ПО:',
        options: [
            'Разработка требований к ПО и создание ПО на основе этих требований',
            'Разработка ПО и выработка требований к изменению работы системы заказчика',
            'Процесс систематического выявления, организации и документирования требований к сложной системе',
            'Выявление требований заказчика и управление ими',
            'Процесс создания ПО и адаптация его под требования заказчика',
        ],
        rightAnswer: 2
    },
    {
        question: 'Контекстная диаграмма показывает:',
        options: [
            'Общее описание системы',
            'Разбиение системы на подсистемы',
            'Динамическую модель',
            'Потоки данных',
            'Иерархическую зависимость работ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Элемент графического пользовательского интерфейса для описания свойств элементов, представленный объединением списка и поля ввода',
        options: [
            'Закладки',
            'составной список',
            'Дерево',
            'пролистываемый список',
            'раскрывающийся список',
        ],
        rightAnswer: 4
    },
    {
        question: 'С помощью чего пользователь должен передавать компьютеру данные?',
        options: [
            'Монитор',
            'Принтер',
            'Мышь',
            'Клавиатура',
            'Запущенная программа',
        ],
        rightAnswer: 3
    },
    {
        question: 'Процесс внедрения Case-средств состоит из следующих этапов:',
        options: [
            'Выполнение и проверка Case-средств',
            'Определение потребностей в Case-средствах',
            'Определение функции и процедур Case-средств',
            'Тестирование Case-средств',
            'Оценка проекта Case-средств',
        ],
        rightAnswer: 1
    },
    {
        question: 'Компонентный подход:',
        options: [
            'Предполагает взаимодействие между компонентами через стандартизированные двоичные интерфейсы и позволяет использовать исполняемые файлы в любом языке программирования',
            'Способ внедрения в опытной эксплуатации ПО',
            'Позволяет рассматривать объект исследования, как структуру, состоящую из отдельных компонент',
            'Способ написания исходного кода программного обеспечения',
            'Способ отладки и тестирования ПО',
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
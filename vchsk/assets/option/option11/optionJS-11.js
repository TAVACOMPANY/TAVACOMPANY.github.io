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
        question: 'Диаграмма состояний отображает:',
        options: [
            'Актеров и отношения между ними',
            'Автомат состояний',
            'Классы',
            'Структурную организацию объектов',
            'Управление деятельностью',
        ],
        rightAnswer: 1
    },
    {
        question: 'Типы меню:',
        options: [
            'иерархическое, структурное, контекстные, каскадные',
            'главное, выпадающие, структурное, древовидное',
            'главное, выпадающие, контекстные, каскадные',
            'иерархическое, структурное, древовидное',
            'главное, выпадающие, контекстные',
        ],
        rightAnswer: 2
    },
    {
        question: 'Контейнерами в WinForms являются:',
        options: [
            'GroupBox',
            'RichtTextBox',
            'Grid',
            'TabControl',
            'Label',
        ],
        rightAnswer: 0
    },
    {
        question: 'Слабые стороны пользователей, которые необходимо учитывать при разработке пользовательского интерфейса:',
        options: [
            'скорость обработки информации',
            'быстрая потеря данных из кратковременной памяти',
            'кратковременная память малой емкости',
            'распознавание образов',
            'способность к обучению',
        ],
        rightAnswer: 1
    },
    {
        question: 'Теоретической основой для создания и использования ЧМС является …?',
        options: [
            'Когнитивная психология',
            'Информационная модель',
            'Инженерная психология',
            'Концептуальная модель',
            'Теория систем',
        ],
        rightAnswer: 2
    },
    {
        question: 'Укажите особенность, присущую избирательности:',
        options: [
            'Преимущественное выделение одних объектов по сравнению с другими',
            'Относительное постоянство некоторых воспринимаемых свойств предметов при изменении условий восприятия',
            'Относительное постоянство некоторых воспринимаемых свойств предметов при неизменности условий восприятия',
            'Отнесение объекта к определённой категории',
            'Результат анализа и синтеза раздражителей в процессе деятельности оператора',
        ],
        rightAnswer: 0
    },
    {
        question: 'Световое перо имеет:',
        options: [
            'Сенсорную панель',
            'Манипулятор',
            'Панель управления',
            'Все ответы верны',
            'светочувствительный элемент',
        ],
        rightAnswer: 4
    },
    {
        question: 'Инициатива диалога принадлежит пользователю в системах:',
        options: [
            'Критикующих',
            'Управления',
            'Консультирующих',
            'Мониторинга',
            'Протокольных',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что такое TrackBar?',
        options: [
            'полоса прокрутки',
            'ползунковый регулятор',
            'комбинированный список',
            'выпадающий список',
            'всплывающая подсказка',
        ],
        rightAnswer: 1
    },
    {
        question: 'Для навигации в начало списка используется клавиша:',
        options: [
            'Home',
            'Up',
            'Inset',
            'Down',
            'Shift',
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
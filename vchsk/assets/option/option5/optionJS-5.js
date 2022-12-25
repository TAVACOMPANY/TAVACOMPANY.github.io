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
        question: 'Как называется совокупность средств и правил взаимодействия человека и компьютера?',
        options: [
            'Объектный интерфейс',
            'Пользовательский интерфейс',
            'Приложение',
            'Программное обеспечение',
            'Машинные коды',
        ],
        rightAnswer: 1
    },
    {
        question: 'Преимущества WIMP-интерфейсов:',
        options: [
            'скорость физических действий',
            'скорость работы (мало затрачивается времени на манипулирование объектами)',
            'простота изучения и применения',
            'при значительном увеличении функциональности приложения незначительное увеличение сложности и объема интерфейса (количество слоев)',
            'легкость переноса знаний из системы в систему',
        ],
        rightAnswer: 2
    },
    {
        question: 'Контейнерами в WinForms являются:',
        options: [
            'всплывающая подсказка',
            'комбинированный список',
            'полоса прокрутки',
            'Ползунок',
            'выпадающий список',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое ToolTip:',
        options: [
            'комбинированный список',
            'всплывающая подсказка',
            'выпадающий список',
            'полоса прокрутки',
            'Ползунок',
        ],
        rightAnswer: 1
    },
    {
        question: 'Опыт взаимодействия в реальном мире, задачи, процессы, инструменты, результаты - основные характеристики модели',
        options: [
            'Программиста ',
            'Пользователя',
            'Тестировщика',
            'Заказчика',
            'Проектировщика',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основные символы диаграммы потоков данных:',
        options: [
            'Процесс (состоит в продуцировании выходных потоков из входных в соответствии с действием)',
            'Точка выхода',
            'Точка входа',
            'Вариант использования',
            'Слияние',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое человеко-машинное взаимодействие?',
        options: [
            'Взаимодействие между человеком и сервером',
            'Взаимодействие между пользователем и программистом',
            'Взаимодействие между дизайнером и заказчиком',
            'Взаимодействие между пользователем и программой',
            'Взаимодействие между пользователем и компьютером',
        ],
        rightAnswer: 4
    },
    {
        question: 'Характерные особенности Case-средств',
        options: [
            'Отсутствие графических средств для описания и документирования ИС',
            'Возможность использования Case-средств пользователями непрограммистами',
            'Использование хранилища проектных метаданных, организованного случайным образом',
            'Мощные графические средства для описания и документирования ИС, обеспечивающие удобный интерфейс с разработчиком и развивающие его творческие способности',
            'Отсутствие специальных требований, предъявляемых к разработчику системы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Язык UML - это:',
        options: [
            'Язык создания запросов в базах данных',
            'Унифицированный язык моделирования',
            'Язык программирования низкого уровня',
            'Язык для разработки систем искусственного интеллекта',
            'Язык управления базами данных',
        ],
        rightAnswer: 1
    },
    {
        question: 'Тип адаптации, в котором пользователь выбирает уровень диалоговой поддержки:',
        options: [
            'Фиксированная',
            'Косметическая',
            'Неполная',
            'Конечная',
            'Полная',
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
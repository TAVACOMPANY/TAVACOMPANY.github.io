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
        question: 'Элемент графического пользовательского интерфейса, обеспечивающий вывод информации о текущем состоянии объектов',
        options: [
            'индикатор загрузки',
            'всплывающая подсказка',
            'панель статуса',
            'панель инструментов',
            'панель управления',
        ],
        rightAnswer: 1
    },
    {
        question: 'В соответствии с GOMS-правилами средняя продолжительность выбора действия пользователем составляет:',
        options: [
            '0,28 с',
            '0,2 с',
            '1,2 с',
            '0,4 с',
            '1,1 с',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дизайнеры интерфейса рекомендуют открывать диалоговые окна:',
        options: [
            'в правом углу экрана',
            'в левом нижнем углу экрана',
            'в центре текущего действия пользователя',
            'в левом углу экрана',
            'в центре экрана',
        ],
        rightAnswer: 0
    },
    {
        question: 'При проектировании пользовательского интерфейса необходимо не определять:',
        options: [
            'когнитивные особенности пользователя',
            'грамотность диалога',
            'Требования заказчика',
            'Эргономику',
            'Нет верного ответа',
        ],
        rightAnswer: 1
    },
    {
        question: 'Стрелка управления (Control) в модели в нотации IDEF0 служит:',
        options: [
            'снизу по центру',
            'в нижнем левом углу',
            'в верхнем левом углу',
            'в верхнем правом углу',
            'в нижнем правом углу',
        ],
        rightAnswer: 2
    },
    {
        question: 'Технология проектирования определяется как совокупность составляющих:',
        options: [
            'Пошаговая процедура',
            'Тестирование',
            'Классы',
            'Прецеденты',
            'Модели и правила',
        ],
        rightAnswer: 0
    },
    {
        question: 'Моделирование в UML позволяет решить задачи:',
        options: [
            'Анализа и синтеза систем управления',
            'Рассчитать экономическую эффективность от внедрения программного обеспечения',
            'Провести тестирование разработанного программного обеспечения',
            'Смоделировать разрабатываемую информационную систему',
            'Визуализировать систему в ее текущем или желательном для нас состоянии',
        ],
        rightAnswer: 4
    },
    {
        question: 'Если действия пользователя происходит в пределах текущего окна то оно называется:',
        options: [
            'Выбранным',
            'Рабочей областью',
            'Главным',
            'Активным',
            'Действующим',
        ],
        rightAnswer: 3
    },
    {
        question: 'Перечислите основные части в человеко-машинной системе, относящиеся к человеку',
        options: [
            'Объект управления',
            'Рецепторы',
            'Центральная нервная система',
            'Технические средства индикации',
            'Средства ввода',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что позволяет выбирать checkbox?',
        options: [
            'любую комбинацию',
            'Несколько записей',
            'Уникальную запись',
            'Пару записей',
            'Только одну запись',
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
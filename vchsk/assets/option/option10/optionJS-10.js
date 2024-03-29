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
        question: 'Инициатива диалога принадлежит интерфейсу в системах:',
        options: [
            'Управления',
            'Мониторинга',
            'Консультирующих',
            'Критикующих',
            'Протокольных',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что является одной из важнейших характеристик диалога?',
        options: [
            'Субъективность',
            'Оперативность',
            'Темп',
            'Понятность',
            'Ориентированность на пользователя',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основным элементом интерфейса является что?',
        options: [
            'Форма',
            'Меню',
            'Пиктограмма',
            'Окно',
            'панель инструментов',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой из перечисленных пользовательских интерфейсов используется в ОС Windows?',
        options: [
            'Логический',
            'WIMP',
            'Голосовой',
            'SILK',
            'Командный',
        ],
        rightAnswer: 1
    },
    {
        question: 'Дискрета окна в вертикальном направлении равна:',
        options: [
            '1/2',
            '1/10',
            '1/8',
            '1/4',
            '1/3',
        ],
        rightAnswer: 2
    },
    {
        question: 'Каким рекомендациям необходимо следовать при выборе текстовых имен пунктов?',
        options: [
            'Название пункта должно состоять из одного слова',
            'Название пункта должно состоять из букв латинского алфавита',
            'Название пункта должно содержать специальных символов',
            'Название пункта должно быть понятным',
            'Название пункта должно быть',
        ],
        rightAnswer: 0
    },
    {
        question: 'Оператор принимает решение на основе сравнения концептуальной модели с …',
        options: [
            'Информационной моделью',
            'Представлением',
            'Объектом исследования',
            'Психической моделью',
            'Эталоном',
        ],
        rightAnswer: 4
    },
    {
        question: 'Элемент графического пользовательского интерфейса, описывающий элемент управления, используемый для создания логически законченных страниц или секций в пределах одного окна',
        options: [
            'дерево',
            'составной список',
            'раскрывающийся список',
            'пролистываемый список.',
            'Закладки',
        ],
        rightAnswer: 3
    },
    {
        question: ' При создании эффекта освещенности/затенения по умолчанию принимается, что гипотетический источник цвета находится:',
        options: [
            'в нижнем левом углу',
            'в верхнем левом углу',
            'снизу по центру',
            'в верхнем правом углу',
            'в нижнем правом углу',
        ],
        rightAnswer: 1
    },
    {
        question: 'Контейнерами в WinForms являются:',
        options: [
            'GroupBox',
            'Grid',
            'Label',
            'TabControl',
            'RichtTextBox',
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
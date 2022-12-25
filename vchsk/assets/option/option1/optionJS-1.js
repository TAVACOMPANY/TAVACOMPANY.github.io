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
        question: 'Элемент интерфейса, используемый для отображения хода выполнения какой-либо операции:',
        options: [
            'ползунковый регулятор',
            'индикатор состояния прогресса',
            'полоса прокрутки',
            'строка меню',
            'индикатор загрузки',
        ],
        rightAnswer: 1
    },
    {
        question: 'Разработка и сопровождение ИС в конкретной организации и конкретном проекте должна поддерживаться стандартам:',
        options: [
            'Оформления разработки',
            'Организации',
            'Проектирования',
            'Аудита',
            'Оценки',
        ],
        rightAnswer: 2
    },
    {
        question: 'Модель в нотации IDEF3 содержит следующие диаграммы:',
        options: [
            'Диаграмму описания последовательности этапов процесса',
            'Диаграмму дерева узлов',
            'Диаграмму для экспозиции',
            'Диаграмму классов',
            'Диаграмму вариантов использования',
        ],
        rightAnswer: 0
    },
    {
        question: 'Расстояние между группами элементов и краем окна в дискретах не менее',
        options: [
            '5',
            '7',
            '4',
            '6',
            '8',
        ],
        rightAnswer: 1
    },
    {
        question: 'UML, как язык документирования, помимо исполняемого кода производит и другие продукты, включающие:',
        options: [
            'Требования к уровню квалификации разработчиков',
            'Набор заданий для тестирования программного обеспечения',
            'Требования, архитектуру, проектные решения',
            'Спецификацию технических средств',
            'Требования к уровню квалификации персонала сопровождения',
        ],
        rightAnswer: 2
    },
    {
        question: 'В современном программировании для разработки программ используются технологии:',
        options: [
            'Событийные',
            'Модульные',
            'Структурные',
            'Текстуальные',
            'Графические',
        ],
        rightAnswer: 0
    },
    {
        question: 'В состав графического представления класса в языке UML входят части:',
        options: [
            'Описание',
            'Связи',
            'Сущности',
            'Механизмы',
            'Имя',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что относится к визуальным атрибутам отображаемой информации?',
        options: [
            'Цветовая гамма',
            'Взаимное расположение и размеры окон',
            'Выпадающий список',
            'Цветовая палитра',
            'Панель инструментов',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каком году корпорация IBM объявила о создании единой среды разработки приложений?',
        options: [
            '1997',
            '1987',
            '1978',
            '1988',
            '1986',
        ],
        rightAnswer: 1
    },
    {
        question: 'Стереотипы сообщений диаграммы последовательности в нотации UML:',
        options: [
            '«Call» (вызвать), «Return» (возвратить)',
            '«View» (представить)',
            '«Copy» (копировать)',
            '«Paste» (вставить)',
            '«Paste» (вставить)',
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
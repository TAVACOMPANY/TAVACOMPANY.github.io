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
        question: 'Какой метод заполняет объект Graphics выбранным пользователем цветом, удаляя его предыдущее содержимое?',
        options: [
            'FillObject()',
            'FromHwnd()',
            'Clear()',
            'FromHdc()',
            'FromImage()',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое свойство класса Реn устанавливает смещение начала пунктира относительно исходной точки пунктирной линии?',
        options: [
            'DashJoin',
            'DashCap',
            'LineJoin',
            'DashOffset',
            'DashStyle',
        ],
        rightAnswer: 3
    },
    {
        question: 'PictureBox — это класс, производный от…',
        options: [
            'Control',
            'Bitmap',
            'Normal',
            'Image',
            'Region',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как называется механизм hit testing?',
        options: [
            'проверкой смещения точки',
            'проверкой попадания  в область ',
            'проверкой создания объекта',
            'проверкой захвата объекта ',
            'проверкой заполнения область',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое свойство компонента определяет подпись под диаграммой?',
        options: [
            'Legend',
            'Series',
            'Title',
            'Frame',
            'Foot',
        ],
        rightAnswer: 4
    },
    {
        question: 'Список серий данных, отображаемых в компоненте…',
        options: [
            'ViewList',
            'MarginList',
            'FrameList',
            'SeriesList ',
            'ChartList',
        ],
        rightAnswer: 3
    },
    {
        question: 'Для использования задержки применяется …',
        options: [
            'using System. Generic;',
            'using System. Linq;',
            'using System.Threading;',
            'using System. Drawing;',
            'using System. ComponentModel;',
        ],
        rightAnswer: 2
    },
    {
        question: 'ListBox содержит свойство Items, которое поддерживает коллекцию объектных ссылок. Для выбора элемента из списка нужно щелкнуть на нем. Выбор вызовет событие…',
        options: [
            'SelectedIndexChanged',
            'SelectedChangedIndex',
            'SelectedIndex',
            'SelectedChanged',
            'SelecteInChange',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кнопки панели инструментов обеспечивают пользователям более легкий доступ к возможностям, которые определены в меню. Для этого используется класс…',
        options: [
            'ToolSt',
            'ToolBox',
            'Dialog',
            'ListBox',
            'ToolStrip',
        ],
        rightAnswer: 4
    },
    {
        question: 'Для очистки списка вызывается метод…',
        options: [
            'Item.Clear()',
            'Items.Clear()',
            'It.Clear()',
            'Clear.Items()',
            'Clear()',
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
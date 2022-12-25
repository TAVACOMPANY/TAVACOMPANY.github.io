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
        question: 'Какие форматы графических файлов поддерживают стандартные средства web разработки',
        options: [
            'GIF,PNG,TIFF',
            'GIF,PNG,JPG',
            'TIFF,PNG,JPG',
            'BMP,PNG,TIF',
            'GIF,BMP,TIFF',
        ],
        rightAnswer: 1
    },
    {
        question: 'С помощью какой утилиты в Windows можно создать файл справки:',
        options: [
            'Winhelp23',
            'Winhelp',
            'Winhelp32',
            'Help23',
            'Help32',
        ],
        rightAnswer: 2
    },
    {
        question: 'Как называется манипулятор для графического интерфейса, представленный вместе с его первым прототипом?',
        options: [
            'Компьютерная мышь',
            'Сенсорная панель',
            'Клавиатура',
            'Трекбол',
            'Джойстик',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кнопка, предоставляющая право выбора единственного варианта из некоторого множества',
        options: [
            'кнопка-флажок',
            'радио-кнопка',
            'Кнопка меню',
            'кнопка управления',
            'Переключатель',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какие форматы графических файлов поддерживают стандартные средства web разработки',
        options: [
            'TIFF,PNG,JPG',
            'GIF,BMP,TIFF',
            'GIF,PNG,JPG',
            'GIF,PNG,TIFF',
            'BMP,PNG,TIF',
        ],
        rightAnswer: 2
    },
    {
        question: 'В виде чего задаются команды через командный интерфейс?',
        options: [
            'Комбинации символов',
            'Машинные коды',
            'Движения пользователя',
            'Направление взгляда пользователя',
            'Голосовые сообщения',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какое меню дает пользователю возможность дополнительного выбора, не занимая дополнительного пространства в родительском меню:',
        options: [
            'Древовидное',
            'Структурное',
            'Иерархическое',
            'Главное',
            'Каскадное',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какие из ниже перечисленных функций не являются функциями оператора',
        options: [
            'Хранение информации',
            'Принятие решений',
            'Приём информации',
            'Осуществление управляющих воздействий',
            'Расчёт данных',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое меню дает пользователю к операциям над объектами:',
        options: [
            'Управляющее',
            'Контекстное',
            'Основное',
            'Нижнее',
            'Верхнее',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какой элемент пользовательского интерфейса служат для инициирования какого либо действия:',
        options: [
            'кнопка',
            'Флажок',
            'Радио-кнопка',
            'Выпадающий список',
            'Нет верного ответа',
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
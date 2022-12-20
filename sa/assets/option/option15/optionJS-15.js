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
        question: 'Что не включает в себя графический интерфейс ОС Linux?',
        options: [
            'Панель задач с кнопкой Пуск, индикатором раскладки клавиатуры, индикатором сетевых подключений и часами',
            'Диалоговые окна',
            'Рабочий стол',
            'Панель инструментов',
            'Палитра цветов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Как называется часть кабельной системы, которая обеспечивает соединение между узлами административной подсистемы?',
        options: [
            'диагональная подсистема',
            'подсистема рабочего места',
            'горизонтальная подсистема',
            'вертикальная подсистема',
            'административная подсистема',
        ],
        rightAnswer: 2
    },
    {
        question: 'Текущая директория пользователя /root/Desktop/abc. Если он выполнит $ cd ../../../ какой будет текущая директория?',
        options: [
            '/',
            '/root/Desktop',
            '/root/',
            '/root/Desktop/abc',
            'root/Desktop/abc',
        ],
        rightAnswer: 0
    },
    {
        question: 'Выберите все правильные утверждения. Чем отличается kill -KILL PID [kill -9 PID] от kill -TERM PID [или kill -15 PID] ?',
        options: [
            'Ключи команды идентичны, у них нет отличий.',
            'kill -KILL PID невозможно заблокировать, процесс уничтожается на уровне ядра.',
            'kill -TERM PID невозможно заблокировать, процесс уничтожается на уровне ядра.',
            'kill -KILL PID - посылает сигнал о пользовательском завершении программы.',
            'll -TERM PID - посылает сигнал о пользовательском завершении программы.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что не входит в графический интерфейс операционной системы Windows?',
        options: [
            'Значки обозначающие программы, файлы, папки и др.объекты',
            'Окна',
            'Палитра цветов',
            'Панель задач с кнопкой Пуск',
            'Ярлыки',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что не включает в себя состав ALT Linux Junior?',
        options: [
            'приложения для просмотра Web-страниц и общения в сети Интернет',
            'редакторы векторной и растровой графики',
            'приложения для обработки цифровых фотографий и нелинейного монтажа цифрового видео',
            'звуковые редакторы для прослушивания и редактирования аудиофайлов',
            'современные системы алгоритмического и объектно-ориентированного программирования',
        ],
        rightAnswer: 3
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
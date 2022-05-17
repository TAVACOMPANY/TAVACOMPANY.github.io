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
        question: 'При какой обработке достигается высокая производительность за счет одновременной работы всех элементов структур, осуществляющих решение различных частей задачи.',
        options: [
            'Структурность',
            'Конфликтность',
            'Параллелизм',
            'Конвейеризация',
            'Дублированность',
        ],
        rightAnswer: 2
    },
    {
        question: 'Любое текстовое или графическое изображение на экране монитора компьютера (так же, как и телевизора) состоит из множества дискретных точек люминофора, представляющих собой минимальный элемент изображения (растра)№Они называются',
        options: [
            'Частота развертки',
            'Разрешение',
            'Спецификация',
            'Пиксель',
            'Диагональ',
        ],
        rightAnswer: 3
    },
    {
        question: 'Для формирования растра в мониторе используются специальные',
        options: [
            'Сигналы',
            'Узоры',
            'Матрицы',
            'Формулы',
            'Вычисления',
        ],
        rightAnswer: 0
    },
    {
        question: 'Под воздействием чего собственные магнитные поля доменов ориентируются в соответствии с его направлением ?',
        options: [
            'Электронной таблицы',
            'Внешнего магнитного поля',
            'Электроники жесткого диска',
            'Операционной системы',
            'Магнитного покрытия диска',
        ],
        rightAnswer: 1
    },
    {
        question: 'Расстояние между левым нижним и правым верхним углом экрана.',
        options: [
            'Спецификация',
            'Пиксель',
            'Частота развертки',
            'Разрешение',
            'Диагональ',
        ],
        rightAnswer: 4
    },
    {
        question: 'При обращении к памяти эффективный адрес вычисляется с использованием следующих компонентов.',
        options: [
            'Копирование',
            'Умножение',
            'Деление',
            'Смещение ',
            'Удаление',
        ],
        rightAnswer: 3
    },
    {
        question: 'Мониторы на базе электронно-лучевой трубки',
        options: [
            'MBR',
            'LCD',
            'CRT',
            'Live',
            'Sync',
        ],
        rightAnswer: 2
    },
    {
        question: 'Конвейеризация эффективна только тогда, когда загрузка конвейера близка к полной, а скорость подачи новых команд и операндов соответствует ______________________ производительности конвейера.',
        options: [
            'Максимальной',
            '80%',
            'Средней',
            '53%',
            'Минимальной',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что периодически сканирует весь экран, образуя на нем близко расположенные строки развертки',
        options: [
            'Цилиндр',
            'Операционная система',
            'Магнитное покрытие диска',
            'Антибликовое покрытие',
            'Электронный луч',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что управляет приводом шпинделя, стабилизируя скорость вращения пакета дисков, генерирует сигналы для головок при записи, усиливает эти сигналы при чтении и управляет работой других электронных узлов накопителя.',
        options: [
            'операционной системой',
            'электроника жесткого диска',
            'головкой считывания/записи ',
            'сектором',
            'электронной таблицей',
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
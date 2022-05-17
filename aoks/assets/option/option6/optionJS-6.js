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
        question: 'Расшифруйте следующее обозначение характеристик монитора: Hitachi CM772ET 0,25 19” 1600x1200 85Hz TCO’99. Определить соответствие стандарту.',
        options: [
            'TCO’19',
            'TCO’85',
            'TCO’99',
            'TCO’95',
            'TCO’772',
        ],
        rightAnswer: 2
    },
    {
        question: 'Определите частоту строк монитора при разрешении 1024х768 точек, если частота регенерации изображения равна 60 Гц, а потери на синхронизацию составляют 10%.',
        options: [
            '≈ 68,9 кГц',
            '≈ 15,8 кГц',
            '≈ 93,3 кГц ',
            '≈ 50,7 кГц',
            '≈ 75,5 кГц',
        ],
        rightAnswer: 3
    },
    {
        question: 'Процессор 8086 использует только',
        options: [
            '48-разрядные указатели на ячейки памяти',
            '16-разрядные указатели на ячейки памяти ',
            '64-разрядные указатели на ячейки памяти',
            '32-разрядные указатели на ячейки памяти',
            '72-разрядные указатели на ячейки памяти',
        ],
        rightAnswer: 0
    },
    {
        question: 'Время, затрачиваемое на регенерацию информации',
        options: [
            'tзап',
            'tрег',
            'tдост_с',
            'tсчит',
            'tдост_з',
        ],
        rightAnswer: 1
    },
    {
        question: 'Чем большее количество цветов выбирается для представления изображения, тем большее число ячеек памяти требуется для каждого пиксела в таком изображении. Данное определение характеризует',
        options: [
            'Микросхемы',
            'Объем видеопамяти',
            'Скорость работы графической платы',
            'Наивысшую пропускную способность',
            'Глубину цвета',
        ],
        rightAnswer: 4
    },
    {
        question: 'На что указывает регистр DS',
        options: [
            'адрес программ',
            'код программы',
            'дополнительный сегмент данных ',
            'данные',
            'стек',
        ],
        rightAnswer: 3
    },
    {
        question: 'На что указывает регистр ЕS',
        options: [
            'данные',
            'код программы',
            'дополнительный сегмент данных ',
            'стек',
            'адрес программ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Важнейшими характеристиками шины являются',
        options: [
            'разрядность и частота',
            'расстояние между точками',
            'степень точности воспроизведения и диагональ экрана',
            'электроника жесткого диска',
            'сигналы кадровой и строчной развертки',
        ],
        rightAnswer: 0
    },
    {
        question: 'Mножитель (1, 2, 4 или 8), указанный в коде инструкции. Этот элемент используется для указания размера элемента массива, доступ только при 32-битной адресации.',
        options: [
            'Смещение (Displacement)',
            'Адресация (Address)',
            'База (Base)',
            'Индекс (Index)',
            'Масштаб (Scale) ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Электроника жесткого диска спрятана в нижней части',
        options: [
            'Дисковода',
            'Винчестера',
            'ОЗУ',
            'Материнской платы',
            'Монитора',
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
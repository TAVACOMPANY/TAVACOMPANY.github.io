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
        question: 'Впервые интерфейс ST-506/412 использован в накопителе размером 5,25" емкостью',
        options: [
            '21 Мбайт',
            '32 Мбайт',
            '12 Мбайт',
            '17 Мбайт',
            '19 Мбайт',
        ],
        rightAnswer: 2
    },
    {
        question: 'Устройство для наблюдения за результатами действий вычислительной системы при помощи дисплейного блока, на который поступает видеосигнал с видеоадаптера компьютера.',
        options: [
            'Клавиатура',
            'Системный блок',
            'Принтер',
            'Монитор',
            'Сканер',
        ],
        rightAnswer: 3
    },
    {
        question: 'Cреднее время, за которое головка перемещается к нужной дорожке диска, устанавливается на нее и начинает считывать данные.',
        options: [
            'Среднее время доступа к данным',
            'Внешняя скорость обмена',
            'Скорость вращения',
            'Среднее время перехода на соседнюю дорожку ',
            'Внутренняя скорость обмена',
        ],
        rightAnswer: 0
    },
    {
        question: 'Этот порт используется для подключения большинства периферийных устройств, таких как плоттер, принтер, мышь, внешний модем программатор ПЗУ',
        options: [
            'Время доступа к памяти',
            'Последовательный порт',
            'Параллельный порт',
            'Порт ввода-вывода',
            'Последовательные данные',
        ],
        rightAnswer: 1
    },
    {
        question: 'Основная интерфейсная система компьютера, обеспечивающая сопряжение и связь всех его устройств между собой.',
        options: [
            'Шина данных',
            'Шина управления',
            'Адресная шина',
            'Шина распределения',
            'Системная шина ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик монитора Sony CPD-E100 0,25 15” 1280x1024 65Hz TCO’99., где диагональ экрана равна:',
        options: [
            '65 дюймов',
            '0,25 дюймов',
            '99 дюймов',
            '15 дюймов',
            '0,34 дюймов',
        ],
        rightAnswer: 3
    },
    {
        question: 'В механике под ударом понимается кратковременное воздействие значительной внешней силы. Стойкость к ударам, после которых устройство остается работоспособным, определяется ускорением (g - 9,8 м/с2) и',
        options: [
            'средним временем перехода на соседнюю дорожку',
            'внутренней скоростью обмена',
            'временем воздействия.',
            'внешней скоростью обмена',
            'скоростью вращения',
        ],
        rightAnswer: 2
    },
    {
        question: 'На что указывает регистр SS',
        options: [
            'стек',
            'данные',
            'адрес программ',
            'код программы',
            'дополнительный сегмент данных',
        ],
        rightAnswer: 0
    },
    {
        question: 'Расшифруйте следующее обозначение характеристик НЖМД: HDD Seagate 20.4 GB IDE 7200 rpm, определите тип интерфейса',
        options: [
            'IBM',
            'Rpm',
            'GB',
            'HDD',
            'IDE',
        ],
        rightAnswer: 4
    },
    {
        question: 'Деление дисковых дорожек представляющее собой основную единицу размера, используемую накопителем',
        options: [
            'Дисковод',
            'Сектор',
            'Дискета',
            'SDD',
            'Дорожка',
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
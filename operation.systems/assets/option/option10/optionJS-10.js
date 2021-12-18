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
        question: 'Любая потребляемая (расходуемая) сущность',
        options: [
            'Работа',
            'Ресурс ',
            'Задача',
            'Процесс',
            'Программа',
        ],
        rightAnswer: 1
    },
    {
        question: 'Определяет порядок использования многими процессами того или иного ресурса, который в каждый момент времени может обслуживать только один процесс',
        options: [
            'Программа',
            'Работа',
            'Процесс',
            'Дисциплина распределения ресурса',
            'Задача',
        ],
        rightAnswer: 3
    },
    {
        question: 'План действий это',
        options: [
            'Задача',
            'Программа',
            'Процесс',
            'Работа',
            'Данные',
        ],
        rightAnswer: 1
    },
    {
        question: 'К состояниям процесса не относится',
        options: [
            'Новый',
            'Выполняемый',
            'Промежуточный',
            'Завершенный',
            'Готовый',
        ],
        rightAnswer: 2
    },
    {
        question: 'Являются средством взаимодействия родственных процессов, представляют собой область памяти, имеющую файловую организацию, для которой обеспечивается запись и считывание данных в транспортере.',
        options: [
            'Транспортеры (каналы)',
            'Сигналы',
            'Очереди',
            'Семафоры',
            'Нити',
        ],
        rightAnswer: 0
    },
    {
        question: 'Эти механизмы могут обеспечивать передачу или использование общих данных без перемещения данных, а с передачей элемента очереди, содержащего указатель данных и объем массива данных',
        options: [
            'Транспортеры (каналы)',
            'Очереди',
            'Сигналы',
            'Семафоры',
            'Нити',
        ],
        rightAnswer: 1
    },
    {
        question: 'Является механизмом передачи требования от одного процесса к другому на немедленное выполнение действия',
        options: [
            'Нити',
            'Семафоры',
            'Транспортеры (каналы)',
            'Очереди',
            'Сигнал',
        ],
        rightAnswer: 4
    },
    {
        question: 'Являются механизмами передачи сообщений от одного потока к другому о наступлении некоторого события',
        options: [
            'Сигнал',
            'Очереди',
            'Семафоры',
            'Транспортеры (каналы)',
            'Нити',
        ],
        rightAnswer: 2
    },
    {
        question: 'Выбирает процессы из очереди готовых процессов и передает их на выполнение в CPU',
        options: [
            'Семафоры оперативной памяти',
            'Краткосрочный планировщик',
            'Буфер обмена',
            'Транспортеры (каналы)',
            'Очереди',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что не относится к функциям ОС по управлению памятью',
        options: [
            'Возвращение процессов в оперативную память, когда в ней освобождается место',
            'Вытеснение процессов из оперативной памяти на диск, когда размеры основной памяти не достаточны для размещения в ней всех процессов',
            'Хранение заархивированной информации',
            'Отслеживание свободной и занятой памяти',
            'Выделение памяти процессам и освобождение памяти при завершении процессов',
        ],
        rightAnswer: 2
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
    coratten();
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
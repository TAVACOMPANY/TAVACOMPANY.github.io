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
        question: 'Данный принцип отражает технологические и эксплуатационные свойства системы',
        options: [
            'Частотный принцип',
            'Принцип модульности',
            'Принцип функциональной избирательности',
            'Принцип генерируемости ОС',
            'Принцип функциональной избыточности',
        ],
        rightAnswer: 1
    },
    {
        question: 'Этот принцип подразумевает выделение некоторых модулей, которые должны постоянно находиться в оперативной памяти для повышения производительности вычислений',
        options: [
            'Принцип генерируемости ОС',
            'Принцип модульности',
            'Частотный принцип',
            'Принцип функциональной избирательности',
            'Принцип функциональной избыточности',
        ],
        rightAnswer: 3
    },
    {
        question: 'Этот принцип определяет такой способ организации архитектуры ядра ОС, который позволял бы настраивать его, исходя из конкретной конфигурации вычислительного комплекса и круга решаемых задач',
        options: [
            'Принцип функциональной избирательности',
            'Принцип генерируемости ОС',
            'Принцип модульности',
            'Частотный принцип',
            'Принцип функциональной избыточности',
        ],
        rightAnswer: 1
    },
    {
        question: 'Данный принцип учитывает возможность проведения одной и той же операции различными средствами',
        options: [
            'Принцип модульности',
            'Принцип функциональной избирательности',
            'Принцип функциональной избыточности',
            'Частотный принцип',
            'Принцип генерируемости ОС',
        ],
        rightAnswer: 2
    },
    {
        question: 'Данный принцип основан на хранении в системе некоторых базовых описаний, структур процесса, модулей, конфигураций оборудования и данных, определяющих прогнозируемые объемы требуемой памяти, времени счета программы, потребности во внешних устройствах, которые характеризуют пользовательские программы и условия их выполнения',
        options: [
            'Принцип умолчания',
            'Принцип перемещаемости',
            'Принцип виртуализации',
            'Принцип независимости ПО от внешних устройств',
            'Принцип совместимости',
        ],
        rightAnswer: 0
    },
    {
        question: 'Данный принцип предусматривает построение модулей, исполнение которых не зависит от места расположения в оперативной памяти',
        options: [
            'Принцип умолчания',
            'Принцип перемещаемости',
            'Принцип виртуализации',
            'Принцип независимости ПО от внешних устройств',
            'Принцип совместимости',
        ],
        rightAnswer: 1
    },
    {
        question: 'Данный принцип позволяет представить структуру системы в виде определенного набора планировщиков процессов и распределителей ресурсов (мониторов), используя единую централизованную схему',
        options: [
            'Принцип совместимости',
            'Принцип независимости ПО от внешних устройств',
            'Принцип умолчания',
            'Принцип перемещаемости',
            'Принцип виртуализации',
        ],
        rightAnswer: 4
    },
    {
        question: 'Данный принцип заключается в том, что связь программы с конкретными устройствами производится не на уровне трансляции программы, а в период планирования ее использования',
        options: [
            'Принцип перемещаемости',
            'Принцип виртуализации',
            'Принцип независимости ПО от внешних устройств',
            'Принцип умолчания',
            'Принцип совместимости',
        ],
        rightAnswer: 2
    },
    {
        question: 'Этот принцип определяет возможность выполнения ПО, написанного для другой ОС или для более ранних версий данной ОС',
        options: [
            'Принцип независимости ПО от внешних устройств',
            'Принцип совместимости',
            'Принцип виртуализации',
            'Принцип перемещаемости',
            'Принцип умолчания',
        ],
        rightAnswer: 1
    },
    {
        question: 'Средство вычислительной системы, которое может быть выделено процессу обработки данных на определенный интервал времени',
        options: [
            'Системные ресурсы',
            'Ресурсы операционной системы',
            'Ресурс вычислительной системы',
            'Дополнительные резервы',
            'Виртуальные ресурсы',
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

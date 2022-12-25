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
        question: 'При разработке пользовательского интерфейса необходимо стремиться количество сообщений об ошибках',
        options: [
            'оставить без изменения',
            'Уменьшить',
            'Увеличить',
            'уменьшить в 2 раза',
            'увеличить в 2 раза',
        ],
        rightAnswer: 1
    },
    {
        question: 'Оперативное мышление включает:',
        options: [
            'Хранение в кратковременной памяти исходной ситуации',
            'Наблюдение за состоянием объекта',
            'Выработка алгоритма действия',
            'Хранение в долговременной памяти исходной ситуации',
            'Анализ состояния объекта',
        ],
        rightAnswer: 2
    },
    {
        question: 'Укажите особенность, присущую осмысленности:',
        options: [
            'Отнесение объекта к определённой категории',
            'Результат анализа и синтеза раздражителей в процессе деятельности оператора',
            'Относительное постоянство некоторых воспринимаемых свойств предметов при неизменности условий восприятия',
            'Относительное постоянство некоторых воспринимаемых свойств предметов при изменении условий восприятия',
            'Преимущественное выделение одних объектов по сравнению с другими',
        ],
        rightAnswer: 0
    },
    {
        question: 'Типы интерфейсных требований:',
        options: [
            'Требования к надежности',
            'Пользовательские требования',
            'Требования к производительности',
            'Административные требования',
            'Требования к устойчивости',
        ],
        rightAnswer: 1
    },
    {
        question: 'Чему равно значение свойства Dock элемента управления, если он занимает центральную часть формы',
        options: [
            'Full',
            'Fill',
            'Center',
            'Oval',
            'Bottom',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что такое Combobox:',
        options: [
            'комбинированный список',
            'всплывающая подсказка',
            'выпадающий список',
            'полоса прокрутки',
            'Ползунок',
        ],
        rightAnswer: 0
    },
    {
        question: 'Наибольшая чувствительность глаза лежит в области:',
        options: [
            '(500÷700)нм',
            '(400÷600)нм',
            '(200÷300)нм',
            '(300÷400)нм',
            '(400÷500)нм',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сколько сведений о предметах в среднем человек может одновременно запоминать?',
        options: [
            '3-5',
            '4-6',
            '9-12',
            '5-9',
            '5-7',
        ],
        rightAnswer: 3
    },
    {
        question: 'Расстояние между элементами группы в дискретах не менее',
        options: [
            '6',
            '4',
            '2',
            '3',
            '5',
        ],
        rightAnswer: 1
    },
    {
        question: 'Среда функционирования Case-средств:',
        options: [
            'Проектная среда',
            'Документирование',
            'Проектная среда',
            'Управление конфигурацией',
            'Функции, ориентированные на фазы жизненного цикла',
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
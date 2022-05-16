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
        question: 'Классы и структуры в С# это:',
        options: [
            'определенные в С# типы, которые позволяют создавать новые типы, специально приспособленные для решения конкретных задач.',
            'программы, определяющие типы, которые позволяют определять (создавать) новые типы, специально приспособленные для решения конкретных задач.',
            'программно определяемые типы, которые позволяют определять (создавать) новые типы, специально приспособленные для решения конкретных задач.',
            'зарезервированные типы, которые позволяют создавать новые типы, специально приспособленные для решения конкретных задач',
            'стандартные типы в С#, которые позволяют определять (создавать) новые типы, специально приспособленные для решения конкретных задач.',
        ],
        rightAnswer: 2
    },
    {
        question: 'В С# к ссылочным типам относятся:',
        options: [
            'классы; интерфейсы; массивы; переменные;',
            'классы; интерфейсы; массивы; переменные; делегаты.',
            'классы; интерфейсы; идентификаторы; делегаты.',
            'классы; интерфейсы; массивы; делегаты.',
            'идентификаторы; интерфейсы; массивы; делегаты.',
        ],
        rightAnswer: 3
    },
    {
        question: 'В С# к  типам-значениям относятся:',
        options: [
            'простые типы; структуры; перечисления.',
            'идентификаторы; простые типы; структуры; перечисления.',
            'классы; простые типы; структуры; перечисления.',
            'простые типы; структуры; перечисления; делегаты.',
            'простые типы; структуры; перечисления; массивы; переменные;',
        ],
        rightAnswer: 0
    },
    {
        question: 'В С# Различаются литералы: ',
        options: [
            'Escape- последовательности, строковые',
            'арифметические (разных типов), логические, символьные (включая Escape- последовательности), строковые.',
            'арифметические целого типа, вещественные, с плавающей точкой.',
            'арифметические (целого типа, вещественные, с плавающей точкой), логические (истина, ложь), ',
            'арифметические (целого типа, вещественные, с плавающей точкой), логические (истина, ложь), строковые.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Инкапсуляция (encapsulation) - это ',
        options: [
            'механизм, который же защищает код от внешнего вмешательства или неправильного использования.',
            'механизм, который же защищает данные от внешнего вмешательства или неправильного использования.',
            'механизм, который объединяет данные и код',
            'объединение данных и  манипулятора',
            'механизм, который объединяет данные и код, манипулирующий зтими данными, а также защищает и то, и другое от внешнего вмешательства или неправильного использования.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Полиморфизм (polymorphism) (от греческого polymorphos) - это: ',
        options: [
            'свойство, которое позволяет решить две или более схожих, но технически разных задач в одной.',
            'объединение классов и методов в одном имени задачи.',
            'свойство, которое позволяет объединить классы и методы',
            'свойство, которое позволяет одно и то же имя использовать для решения двух или более схожих, но технически разных задач',
            'объединение классов и методов.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Наследование (inheritance) – это :',
        options: [
            'процесс, посредством которого объект может приобретать основные свойства другого объекта и добавлять к ним методы третьего объекта',
            'может наследовать основные методы другого объекта и добавлять к ним методы третьего объекта',
            'процесс, посредством которого объект может приобретать основные свойства другого объекта и добавлять к ним черты, характерные только для него.:',
            ': процесс, посредством которого один объект может приобретать другой объект.',
            'может наследовать основные методы другого объекта и добавлять к ним методы, характерные только для него.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Концепцией полиморфизма является идея: ',
        options: [
            'один интерфейс, множество методов.',
            'множество интерфейсов, один метод.',
            'организационные принципы построения интерфейсов.',
            'методы построения интерфейсов.',
            'организационные принципы построения методов',
        ],
        rightAnswer: 0
    },
    {
        question: 'В С#  обозначение для членов класса, доступных в рамках объявляемого класса: ',
        options: [
            'protected internal',
            'internal',
            'protected',
            'public',
            'private',
        ],
        rightAnswer: 4
    },
    {
        question: 'Укажите правильный порядок следования приоритетов бинарных операций',
        options: [
            'отношения, логические, арифметические',
            'арифметические, отношения, логические',
            'арифметические, логические, отношения',
            'логические, арифметические',
            'логические, отношения',
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
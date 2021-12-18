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
        question: 'Эти имена присваивает пользователь при написании программы на алгоритмическом языке или ассемблере',
        options: [
            'Физические',
            'Символьные',
            'Виртуальные',
            'Цифровые',
            'Облачные',
        ],
        rightAnswer: 1
    },
    {
        question: 'Адреса, которые вырабатывает транслятор, переводящий программу на машинный язык',
        options: [
            'Облачные',
            'Цифровые',
            'Символьные',
            'Виртуальные',
            'Физические',
        ],
        rightAnswer: 3
    },
    {
        question: 'Данная память представляет собой упорядоченное множество ячеек реально существующей оперативной памяти',
        options: [
            'Виртуальная',
            'Физическая',
            'Облачная',
            'Цифровая',
            'Машинная',
        ],
        rightAnswer: 1
    },
    {
        question: 'Самая простая схема, согласно которой вся память условно может быть разделена на три области',
        options: [
            'Сложное распределение',
            'Простое прерывистое распределение',
            'Простое непрерывное распределение.',
            'Сложное непрерывное распределение',
            'Простое распределение',
        ],
        rightAnswer: 2
    },
    {
        question: 'Виртуальное адресное пространство программы зависит от',
        options: [
            'Архитектуры процессора и системы программирования',
            'Объема реальной физической памяти компьютера',
            'Архитектуры процессора и объема реальной физической памяти компьютера',
            'Системы программирования и объема реальной физической памяти компьютера',
            'Только от архитектуры процессора',
        ],
        rightAnswer: 0
    },
    {
        question: 'Чтобы для задач отвести как можно больший объем памяти, операционная система строится таким образом, чтобы постоянно в оперативной памяти располагалась только самая нужная ее часть',
        options: [
            'Компилятор',
            'Ядро',
            'Прерывание',
            'Мультипроцесс',
            'Сегмент экзоядра',
        ],
        rightAnswer: 1
    },
    {
        question: 'Этот метод распределения предполагает, что вся программа может быть разбита на части — сегменты',
        options: [
            'дефрагментация',
            'форматирование',
            'сегментирование',
            'распределение без перекрытия',
            'распределение с перекрытием',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сравнивает размер программы, поступившей на выполнение, выбирает подходящий раздел, осуществляет загрузку программы и настройку адресов',
        options: [
            'Загрузка памяти',
            'Распределение с перекрытием',
            'Подсистема управления памятью',
            'Выгрузка',
            'Подсистема чтения',
        ],
        rightAnswer: 2
    },
    {
        question: 'Метод предполагает разделение памяти на разделы, но границы разделов не фиксируются',
        options: [
            'Подсистема управления памятью',
            'мультипрограммирование с переменными разделами',
            'Распределение с перекрытием',
            'мультипрограммирование с постоянными разделами',
            'мультипрограммирование с переменными разделами и уплотнением памяти',
        ],
        rightAnswer: 1
    },
    {
        question: 'Виртуальная память была впервые реализована в',
        options: [
            '1965 г.',
            '1952 г.',
            '1959 г.',
            '1948 г.',
            '1972 г.',
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
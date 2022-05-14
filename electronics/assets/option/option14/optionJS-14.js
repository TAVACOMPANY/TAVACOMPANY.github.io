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
        question: 'Мультиплексор-это',
        options: [
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, предназначенное для подсчета числа входных импульсов.',
            'Устройство, подключающее на выход тот информационный вход, номер которого задан двоичным кодом адреса.',
            'Устройство, имеющее два устойчивых состояния и способное скачком переходить из одного состояния в другое под действием входных сигналов.',
            'Устройство, предназначенное для сравнения двух напряжений.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Демультиплексор-это',
        options: [
            'Устройство, подключающее на выход тот информационный вход, номер которого задан двоичным кодом адреса.',
            'Устройство, предназначенное для сравнения двух напряжений.',
            'Устройство, имеющее два устойчивых состояния и способное скачком переходить из одного состояния в другое под действием входных сигналов.',
            'Устройство, подключающее информационный вход на тот выход, номер которого задан двоичным кодом адреса',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова',
        ],
        rightAnswer: 3
    },
    {
        question: 'Цифровой сумматор-это',
        options: [
            'Комбинационное устройство, предназначенное для сложения двоичных чисел.',
            'Устройство, подключающее информационный вход на тот выход, номер которого задан двоичным кодом адреса.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, имеющее два устойчивых состояния и способное скачком переходить из одного состояния в другое под действием входных сигналов.',
            'Устройство, предназначенное для сравнения двух напряжений.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Цифровой компаратор-это',
        options: [
            'Комбинационное устройство, предназначенное для сложения двоичных чисел.',
            'Комбинационное устройство, предназначенное для сравнения двух двоичных чисел',
            'Устройство, подключающее информационный вход на тот выход, номер которого задан двоичным кодом адреса.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, имеющее два устойчивых состояния и способное скачком переходить из одного состояния в другое под действием входных сигналов.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Инвертирующий сумматор-это',
        options: [
            'Устройство, предназначенное для сравнения двух напряжений.',
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, подключающее информационный вход на тот выход, номер которого задан  двоичным кодом адреса.',
            'Комбинационное устройство, предназначенное для сложения двоичных чисел.',
            'Устройство, которое суммирует текущие значения напряжений  входных сигналов, взятые с противоположным знаком и умноженные на постоянные коэффициенты.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Операционный усилитель-это',
        options: [
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, подключающее информационный вход на тот выход, номер которого задан двоичным кодом адреса',
            'Комбинационное устройство, предназначенное для сложения двоичных чисел.',
            'Устройство, которое усиливает разность двух любых входных сигналов.',
            'Устройство, которое суммирует текущие значения напряжений  входных сигналов, взятые с противоположным знаком и умноженные на постоянные коэффициенты.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Шифратор-это',
        options: [
            'Устройство, предназначенное для приёма, хранения и передачи двоичного слова.',
            'Устройство, подключающее информационный вход на тот выход, номер которого задан двоичным кодом адреса.',
            'Комбинационная схема,  выходной двоичный код которой равен номеру входа с единственным сигналом «1»,',
            'Устройство, которое суммирует текущие значения напряжений  входных сигналов, взятые с противоположным знаком и умноженные на постоянные коэффициенты.',
            'Комбинационное устройство, предназначенное для сложения двоичных чисел.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дешифратор-это',
        options: [
            'Комбинационная схема, входной двоичный код которой равен номеру выхода с единственным сигналом «1»,',
            'Комбинационная схема, выходной двоичный код которой равен номеру входа с единственным сигналом «1»,',
            'Устройство, которое суммирует текущие значения напряжений  входных сигналов, взятые с противоположным знаком и умноженные на постоянные коэффициенты.',
            'Комбинационное устройство, предназначенное для сложения двоичных чисел.',
            'Устройство, подключающее информационный вход на тот выход, номер которого задан двоичным кодом адреса.',
        ],
        rightAnswer: 0
    },
    {
        question: 'С приходом каждого входного импульса состояние Т-триггера',
        options: [
            'Исчезает.',
            'Сохраняется.',
            'Устанавливается в 1.',
            'Устанавливается в 0.',
            'Изменяется на противоположное.',
        ],
        rightAnswer: 4
    },
    {
        question: 'При наличии 1 на синхровходе триггер со статической синхронизацией',
        options: [
            'Не реагирует на информационные входы.',
            'Реагирует на информационные входы.',
            'Устанавливается в 0.',
            'Устанавливается в 1.',
            'Переходит в неопределенное состояние.',
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
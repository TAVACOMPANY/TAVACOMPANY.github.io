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
      msgOfResult = document.getElementById('msgOfResult');

const questions = [
    {
        question: 'Альтернативное название расширенного стандарта шифрования AES',
        options: [
            'Cesar',
            'Rijndael',
            'Hill',
            'S-DES',
            'RSA',
        ],
        rightAnswer: 1
    },
    {
        question: 'Шифр AES требует разбиения текста на блоки размером',
        options: [
            '256 байт',
            '64 бита',
            '128 бит',
            '128 байт',
            '64 байта',
        ],
        rightAnswer: 2
    },
    {
        question: 'Шифр AES рекомендует использовать ключи размером',
        options: [
            '10, 12 или 14 байт',
            '128, 192 или 256 байта',
            '10, 12 или 14 бит',
            '128, 192 или 256 бит',
            '128, 256 или 10240 бита',
        ],
        rightAnswer: 3
    },
    {
        question: 'Шифр AES рекомендует выполнять циклы (раунды) в зависимости от длины ключа. Число раундов может быть равно',
        options: [
            '128, 192 или 256',
            '128, 192 или 1024',
            '128, 256 или 1024',
            '10, 12 или 140',
            '10, 12 или 14',
        ],
        rightAnswer: 4
    },
    {
        question: 'Основу шифра AES составляют',
        options: [
            'линейно-подстановочные преобразования',
            'Дифференциальные уравнения',
            'Интегральные уравнения',
            'Сети Фейстеля',
            'Методы криптоанализа',
        ],
        rightAnswer: 0
    },
    {
        question: 'Блок данных, обрабатываемый с помощью алгоритма AES, представляет собой …',
        options: [
            'Вектор битов',
            'Сети Фейстеля',
            'Массивы битов',
            'Слои',
            'Массивы байтов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Каждый раунд стандарта шифрования AES состоит из трех обратимых преобразований. Первое преобразование - …',
        options: [
            'Слой сложения по модулю 2',
            'Линейный перемешивающий слой',
            'Слой вычитания по модулю 2',
            'Нелинейный слой',
            'Сеть Фейстеля',
        ],
        rightAnswer: 3
    },
    {
        question: 'Каждый раунд алгоритма шифрования AES состоит из трех обратимых преобразований. Второе преобразование - …',
        options: [
            'Слой сложения по модулю 2',
            'Сеть Фейстеля',
            'Линейный перемешивающий слой',
            'Нелинейный слой ',
            'Слой вычитания по модулю 2',
        ],
        rightAnswer: 2
    },
    {
        question: 'Каждый раунд расширенного стандарта шифрования AES состоит из трех обратимых преобразований. Третье преобразование - …',
        options: [
            'Нелинейный слой',
            'Слой сложения по модулю 2',
            'Сеть Фейстеля',
            'Линейный перемешивающий слой',
            'Слой вычитания по модулю 2',
        ],
        rightAnswer: 1
    },
    {
        question: 'Вычисления, проводимые с данными с помощью расширенного стандарта шифрования AES, основаны на табличных вычислениях, которые …',
        options: [
            'Не зависят ни от ключа, ни от данных',
            'Не зависят от ключа, но зависят от длины блока текста',
            'Зависят от длины ключа',
            'Зависят от выбранного числа раундов',
            'Включают нечетные биты ключа',
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
        msgofScore();
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

function msgofScore() {
    if(score == 0 || score == 1)  {
        msgOfResult.innerHTML = 'Cъебись с универа.';
    } 
     else if(score == 2 || score == 3) {
        msgOfResult.innerHTML = 'Паскальщик';
     }
     else if(score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Дэлфин';
     }
     else if(score == 6 || score == 7) {
        msgOfResult.innerHTML = 'Крестовик';
     }
     else if(score == 8 || score == 9) {
        msgOfResult.innerHTML = 'Душитель питона';
     } else {
        msgOfResult.innerHTML = 'Хрестианин';
     }
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
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
        question: 'Алгоритм S-DES относится к упрощенному варианту DES алгоритма. Это преобразование шифрует данные размером … ',
        options: [
            '12 бит',
            '8 бит',
            '48 бит',
            '10 бит',
            '16 бит',
        ],
        rightAnswer: 1
    },
    {
        question: 'Упрощенный алгоритм шифрования S-DES использует ключ размером …',
        options: [
            '16 бит',
            '8 бит',
            '10 бит',
            '10 байт',
            '48 бит',
        ],
        rightAnswer: 2
    },
    {
        question: 'Упрощенный алгоритм шифрования S-DES использует циклы, количество которых равно …',
        options: [
            '10',
            '16',
            '4',
            '2',
            '8',
        ],
        rightAnswer: 3
    },
    {
        question: 'Начальная перестановка алгоритма шифрования S-DES …',
        options: [
            'Сжимает 8-битный блок до 4-битного результата ',
            'Расширяет 2-битный блок до 6-битного результата',
            'Расширяет 6-битный блок до 8-битного результата',
            'Расширяет 8-битный блок до 16-битного результата',
            'Расширяет 4-битный блок до 8-битного результата',
        ],
        rightAnswer: 4
    },
    {
        question: 'При выполнении S-преобразования шифрования S-DES номер строки S-таблицы задают…',
        options: [
            'Старший и младший биты входного значения',
            'Нечетные биты входного значения',
            'Первый и второй биты входного значения',
            'Второй и третий биты входного значения',
            'Четные биты входного значения',
        ],
        rightAnswer: 0
    },
    {
        question: 'При выполнении S-преобразования шифрования S-DES требуется выполнить сжатие 4-битного фрагмента. Если входной блок имеет вид B=0111, то номер строки таблицы сжатия равен…',
        options: [
            '3',
            '1',
            '2',
            '4',
            '7',
        ],
        rightAnswer: 4
    },
    {
        question: 'При выполнении S-преобразования шифрования S-DES требуется выполнить сжатие 4-битного фрагмента. Если входной блок имеет вид B=0111, то номер столбца таблицы сжатия равен… ',
        options: [
            '4',
            '7',
            '2',
            '3',
            '1',
        ],
        rightAnswer: 3
    },
    {
        question: 'На первом этапе выполнения алгоритма шифрования S-DES требуется выполнить начальную перестановку, заданную вектором (2,6,3,1,4,8,5,7). Пусть исходный блок текста представлен в двоичном виде T=(10110011). Тогда результатом первого этапа шифрования будет 8-битный блок…',
        options: [
            '00110011',
            '00111011',
            '00111101',
            '10101010',
            '11100111',
        ],
        rightAnswer: 2
    },
    {
        question: 'На последнем этапе выполнения алгоритма шифрования S-DES требуется выполнить конечную перестановку, заданную вектором (4,1,3,5,7,2,8,6). Пусть преобразованный блок текста после двух раундов представлен в двоичном виде T=(10110011). Тогда результатом первого этапа шифрования будет 8-битный блок…',
        options: [
            '10101010',
            '11101010',
            '00110011',
            '11100111',
            '00111011',
        ],
        rightAnswer: 1
    },
    {
        question: 'В алгоритме шифрования S-DES раунд начинается с выполнения расширяющей перестановки Р=(4,1,2,3,2,3,4,1). Пусть результат начальной перестановки имеет вид (00011000). Тогда результатом расширяющей перестановки в начале первого раунда будет 8-битный результат',
        options: [
            '01000001',
            '00110011',
            '11100111',
            '01000101',
            '01110110',
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
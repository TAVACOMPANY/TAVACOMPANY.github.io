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
        question: 'Криптографическая система RSA использует … ',
        options: [
            'Симметричное шифрование',
            'Асимметричное шифрование',
            'Алгоритмы перестановок',
            'Методы криптоанализа',
            'Принцип гаммирования',
        ],
        rightAnswer: 1
    },
    {
        question: 'В основе подбора ключей алгоритма шифрования RSA лежит …',
        options: [
            'Задача нахождения открытого ключа на основании секретного ключа',
            'Задача решения дифференциальных уравнений криптоанализа',
            'Задача разложения на множители больших чисел',
            'Принцип гаммирования',
            'Задача нахождения всех взаимно простых делителей чисел',
        ],
        rightAnswer: 2
    },
    {
        question: 'Лаборатория RSA рекомендует использовать в качестве ключей числа размером …',
        options: [
            '256 байт',
            '2048 байт',
            '1024 байта ',
            '1024 или 2048 бит',
            '128 или 256 байт',
        ],
        rightAnswer: 3
    },
    {
        question: 'На первом этапе генерации ключей алгоритма шифрования RSA в качестве двух простых чисел p и q можно выбрать…',
        options: [
            '20 и 3',
            '25 и 13',
            '10 и 12',
            '12 и 25',
            '11 и 17',
        ],
        rightAnswer: 4
    },
    {
        question: 'На первом этапе генерации ключей алгоритма шифрования RSA в качестве двух простых чисел p и q выбраны числа 3 и 7 соответственно. Тогда число, входящее одновременно в открытый и секретный ключи, равно…',
        options: [
            '21',
            '6',
            '12',
            '4',
            '2',
        ],
        rightAnswer: 0
    },
    {
        question: 'На первом этапе генерации ключей алгоритма шифрования RSA в качестве двух простых чисел p и q выбраны числа 3 и 7 соответственно. Тогда число d, входящее в секретный ключ, может быть равно…',
        options: [
            '4',
            '6',
            '12',
            '10',
            '11',
        ],
        rightAnswer: 4
    },
    {
        question: 'На первом этапе генерации ключей алгоритма шифрования RSA в качестве двух простых чисел p и q выбраны числа 3 и 7 соответственно. Тогда число d, входящее в секретный ключ, должно быть взаимно простым с числом, равным…',
        options: [
            '21',
            '4',
            '2',
            '12',
            '6',
        ],
        rightAnswer: 3
    },
    {
        question: 'На первом этапе генерации ключей алгоритма шифрования RSA требуется выбрать два простых числа p и q. Тогда число d, входящее в секретный ключ, должно быть взаимно простым с числом, равным…',
        options: [
            'p*q',
            '(p-1)*q',
            '(p-1)*(q-1)',
            '(p+1)*(q+1)',
            'p*(q-1)',
        ],
        rightAnswer: 2
    },
    {
        question: 'В процессе генерации ключей алгоритма шифрования RSA были выбраны два простых числа p и q, а также число d, входящее в секретный ключ. Заключительным этапом процесса генерации ключей является выбор числа e, входящего в открытый ключ шифрования. При этом обязательным условием является выполнение равенства …',
        options: [
            '(e*d) mod ((p+1)*(q+1)) = 1',
            '(e*d) mod ((p-1)*(q-1)) = 1',
            '(e*d) mod ((p-1)*(q-1)) = p*q',
            '(e) mod ((p-1)*(q-1)) = d',
            '((p-1)*(q-1)) mod (e*d) = 1',
        ],
        rightAnswer: 1
    },
    {
        question: 'В процессе генерации ключей алгоритма шифрования RSA были выбраны два простых числа p и q. На заключительном этапе процесса генерации ключей требуется подобрать число e, входящее в открытый ключ шифрования. При этом обязательным условием является выполнение неравенства …',
        options: [
            '1 < e < (p-1)*(q-1)',
            '1 < e < p*q',
            '1 < e < (p+1)*(q+1)',
            '1 < e < (p-1)*q',
            '1 < e < p*(q-1)',
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
        msgOfResult.innerHTML = 'фуууууу!';
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

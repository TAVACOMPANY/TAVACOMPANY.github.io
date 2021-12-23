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
        question: 'Открытый текст имеет вид «BODY». Зашифровать текст, используя шифр Плейфера. Ключевое слово - BOX. Размерность матрицы 5*5 ',
        options: [
            'CBGU',
            'OXGU',
            'EDGU',
            'OXUG',
            'CBUG',
        ],
        rightAnswer: 1
    },
    {
        question: 'Зашифрованный текст имеет вид «LRGA». Расшифровать текст, используя шифр Плейфера. Ключевое слово - BOX. Размерность матрицы 5*5',
        options: [
            'FLAG',
            'FRAY',
            'FLAY',
            'FROG',
            'MISS',
        ],
        rightAnswer: 2
    },
    {
        question: 'Открытый текст имеет вид «DOLLY». Зашифрованный текст, полученный с использованием шифра Плейфера, имеет вид «EBRFMY». Ключевое слово - BOX. Размерность матрицы 5*5. Определить символ-разделитель',
        options: [
            'Z',
            'J',
            'I',
            'X',
            'U',
        ],
        rightAnswer: 3
    },
    {
        question: 'Открытый текст имеет вид «PUPPY». Зашифровать текст, используя шифр Плейфера. Ключевое слово - BOX. Размерность матрицы 5*5. Знаком-разделителем принять символ - Z',
        options: [
            'IPTUSU',
            'UBTUUS',
            'BUTUSU',
            'IPUTUS',
            'UBTUSU',
        ],
        rightAnswer: 4
    },
    {
        question: 'Зашифрованный текст имеет вид «LKRCQHLC». Расшифровать текст, используя шифр Плейфера. Ключевое слово - BOX. Размерность матрицы 5*5. Знаком-разделителем принять символ - X',
        options: [
            'KITTEN',
            'PUPUP',
            'KITES',
            'KITCH',
            'PUPPY',
        ],
        rightAnswer: 0
    },
    {
        question: 'Открытый текст имеет вид «SHEET». Зашифровать текст, используя шифр Плейфера. Ключевое слово - BOX. Размерность матрицы 5*5. Знаком-разделителем принять символ - X',
        options: [
            'GTFOQH',
            'TGOFQH',
            'TGFOQH',
            'GTOFQH',
            'TGFOHQ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Открытый текст имеет вид «SOUL». Зашифровать текст, используя шифр Плейфера. Ключевое слово - BOSS. Размерность матрицы 5*5',
        options: [
            'OBRN',
            'OBNR',
            'ABRN',
            'ASRN',
            'ASNR',
        ],
        rightAnswer: 3
    },
    {
        question: 'Зашифрованный текст имеет вид «UPUL». Расшифровать текст, используя шифр Плейфера. Ключевое слово - BOSS. Размерность матрицы 5*5',
        options: [
            'PQNR',
            'TUNR',
            'TURN',
            'QTRN',
            'PQRN',
        ],
        rightAnswer: 2
    },
    {
        question: 'Открытый текст имеет вид «EXAM». Зашифровать текст, используя шифр Виженера. Ключевое слово - RAT. Знаки алфавита нумеруются, начиная с 0. Символы «I» и «J» считать различными',
        options: [
            'XVTD',
            'VXTD',
            'ERAM',
            'VXAD',
            'VXAD',
        ],
        rightAnswer: 1
    },
    {
        question: 'Зашифрованный текст имеет вид «UAW». Расшифровать текст, используя шифр Виженера. Ключевое слово - CAT. Знаки алфавита нумеруются, начиная с 0. Символы «I» и «J» считать различными',
        options: [
            'SAD',
            'DAD',
            'DAY',
            'SAM',
            'SAY',
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

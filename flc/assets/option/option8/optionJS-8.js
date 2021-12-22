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
        question: 'Шифр вертикальной перестановки имеет частично известный ключ – 5*142. Тогда недостающий знак равен ',
        options: [
            '1',
            '3',
            '4',
            '*',
            '%',
        ],
        rightAnswer: 1
    },
    {
        question: 'Шифр вертикальной перестановки имеет частично известный ключ – 5*1**. Тогда число возможных вариантов допустимых ключей равно ',
        options: [
            '4',
            '8',
            '6',
            '2',
            '3',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дан шифртекст – «OIKRGEFENY». Шифр вертикальной перестановки имеет ключ – 312. Тогда количество «длинных» столбцов в таблице должно быть равно',
        options: [
            '312',
            '3',
            '2',
            '1',
            '0',
        ],
        rightAnswer: 3
    },
    {
        question: 'Шифртекст – «OIKRGEFENY» - подлежит расшифровке с помощью шифра вертикальной перестановки. Ключ равен – 312. Тогда число «коротких» столбцов в таблице должно быть равно',
        options: [
            '3',
            '0',
            '312',
            '1',
            '2',
        ],
        rightAnswer: 4
    },
    {
        question: 'Дан шифртекст – «OIKRGEFENY». Расшифровать с помощью шифра вертикальной перестановки. Ключ равен – 312',
        options: [
            'FOREIGNKEY',
            'KEYFOREIGN',
            'KEYFORHEGN',
            'FOREINKGEY',
            'FORKEYGEN',
        ],
        rightAnswer: 0
    },
    {
        question: 'Дан открытый текст – «CRYPTOSYSTEM». Зашифровать текст с помощью шифра вертикальной перестановки, если числовой ключ равен 132',
        options: [
            'RTYECPSTYOSM',
            'CPSTRTYEYOSM',
            'RYTOYSEMCPST',
            'RTYEYOSMCPST',
            'CPSTYOSMRTYE',
        ],
        rightAnswer: 4
    },
    {
        question: 'Дан шифртекст – «EYOCTNPNRI». Расшифровать текст с помощью шифра вертикальной перестановки, если числовой ключ равен 1324',
        options: [
            'ENCRITPYON',
            'RYPCRINION',
            'ENPTION',
            'ENCRYPTION',
            'EYONPNCTRI',
        ],
        rightAnswer: 3
    },
    {
        question: 'Дан шифртекст – «EYOCTNPNRI». Известно, что для получения этого текста был применен шифр вертикальной перестановки. Тогда заполнение таблицы знаками шифртекста нужно выполнять',
        options: [
            'Начиная с правой верхней ячейки таблицы по горизонтали',
            'По строкам в порядке, указанном в числовом ключе',
            'По столбцам в порядке, указанном в числовом ключе',
            'Начиная с правой нижней ячейки таблицы по горизонтали',
            'По диагонали',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дан открытый текст – «CRYPTOSYSTEM». Для шифрования этого текста нужно применить шифр вертикальной перестановки. Тогда заполнение таблицы знаками открытого текста нужно выполнять',
        options: [
            'По диагонали',
            'По строкам, начиная с левой верхней ячейки таблицы',
            'По столбцам в порядке, указанном в числовом ключе',
            'Начиная с правой нижней ячейки таблицы по горизонтали',
            'Начиная с правой верхней ячейки таблицы по горизонтали',
        ],
        rightAnswer: 1
    },
    {
        question: 'Дан открытый текст – «TRANSLATION». Зашифровать текст с помощью шифра вертикальной перестановки, если числовой ключ равен 3142',
        options: [
            'RLONTTSIAAN',
            'TSIRLOAANNT',
            'AANRLONTTSI',
            'TSIAANNTRLO',
            'RLONTAANTSI',
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
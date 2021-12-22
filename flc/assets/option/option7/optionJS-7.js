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
        question: 'Шифр, алгоритм которого требует систематической перестановки знаков друг с другом - … ',
        options: [
            'Шифр замены',
            'Шифр перестановки',
            'Асимметричный шифр',
            'Поточный шифр',
            'Шифр простой замены',
        ],
        rightAnswer: 1
    },
    {
        question: 'Перестановки, основанные на некоторой геометрической фигуре - …',
        options: [
            'Геометрические перестановки',
            'Асимметричные перестановки',
            'Маршрутные перестановки',
            'Поточные перестановки',
            'Систематические перестановки',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основой шифра вертикальной перестановки является таблица, число столбцов которой определяется параметром',
        options: [
            'Длина текстовой строки',
            'Число знаков открытого текста',
            'Количество символов открытого текста',
            'Длина ключа',
            'Количество элементов зашифрованного текста',
        ],
        rightAnswer: 3
    },
    {
        question: 'Основой шифра вертикальной перестановки является таблица, число строк которой вычисляется через параметр - …',
        options: [
            'Длина ключа',
            'Количество элементов зашифрованного текста',
            'Число знаков открытого текста',
            'Количество символов открытого текста',
            'Длина текстовой строки',
        ],
        rightAnswer: 4
    },
    {
        question: 'Основой шифра вертикальной перестановки является таблица. Если числовой ключ равен 3124, то число столбцов равно',
        options: [
            '4',
            '1',
            '3',
            '2',
            'Число столбцов невозможно определить без длины текста',
        ],
        rightAnswer: 0
    },
    {
        question: ' Шифр вертикальной перестановки имеет числовой ключ, равный 31254. Требуется зашифровать текст «MY LITTLE GOLDEN PONY». Тогда число строк в таблице равно',
        options: [
            '18',
            '5',
            '12',
            '3',
            '4',
        ],
        rightAnswer: 4
    },
    {
        question: 'Шифр вертикальной перестановки имеет числовой ключ, равный 41253. Требуется зашифровать текст «MY LITTLE PONY». Тогда число столбцов в таблице равно',
        options: [
            '4',
            '12',
            '3',
            '5',
            '10',
        ],
        rightAnswer: 3
    },
    {
        question: 'Дан открытый текст – «MY LITTLE PONY». Получить шифртекст, используя шифр вертикальной перестановки, если числовой ключ равен 4123',
        options: [
            'YTYTPLLOMIEN',
            'MIENYTYTPLLO',
            'YTOLLNIEYMTP',
            'YTOLLNIEYMTP',
            'MTPYTOLLNIEY',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дан шифртекст «UIEBCYPLK». Расшифровать текст, используя шифр вертикальной перестановки, если числовой ключ равен 312',
        options: [
            'KEYPUBLIC',
            'PUBLICKEY ',
            'PUBLICENS',
            'KELLYPUB',
            'PUBLICKID',
        ],
        rightAnswer: 1
    },
    {
        question: 'Числовой ключ шифра вертикальной перестановки задан частично и имеет вид – 1*3*. Тогда число возможных вариантов допустимых ключей равно',
        options: [
            '4',
            '3',
            '2',
            '1',
            '6',
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
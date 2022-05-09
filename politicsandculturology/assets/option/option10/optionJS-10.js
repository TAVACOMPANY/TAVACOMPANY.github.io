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
        question: 'Исторически первая форма культуры:',
        options: [
            'религия',
            'тотемизм',
            'миф',
            'искусство',
            'философия',
        ],
        rightAnswer: 2
    },
    {
        question: 'Первый университет Европы появился в:',
        options: [
            'Испании',
            'Германии',
            'Франции',
            'Италии',
            'Португалии',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кто считал, что культура возникает в игровой деятельности:',
        options: [
            'Хейзинга',
            'Ясперс',
            'Ортега-и-Гассет',
            'Сократ',
            'Спиноза',
        ],
        rightAnswer: 0
    },
    {
        question: 'Особенностью постмодернизма не являются:',
        options: [
            'ирония, фрагментарность',
            'единая интерпретация, определенность',
            'плюрализм, поверхностность',
            'глобализм, быстрая смена стилей ',
            'Перепроизводство объектов культуры и дилетантизм авторов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Культурный антрополог занимается изучением через:',
        options: [
            'архивные документы',
            'исторические документы',
            'социологические опросы',
            'культурные тексты',
            'данные археологов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Основная характеристика культуры глобального общества:',
        options: [
            'разъединение культурных различий',
            'ослабление культурных связей',
            'укрепление традиций и обычаев',
            'стирание культурных различий',
            'усиление культурных различий',
        ],
        rightAnswer: 3
    },
    {
        question: 'Семиотический подход обращает внимание на:',
        options: [
            'правовые нормы',
            'нормы морали',
            'символы и знаки',
            'религиозные нормы',
            'звуки',
        ],
        rightAnswer: 2
    },
    {
        question: 'Реальный путь выхода из кризиса цивилизации, по мнению Тойнби, - это:',
        options: [
            'преображение',
            'футуризм',
            'глобализация',
            'реализация',
            'бифуркация',
        ],
        rightAnswer: 0
    },
    {
        question: 'В культуре Китая понятие "янь" понимается как … ',
        options: [
            'природный цикл',
            'космическая гармония',
            'путь, высший закон, разум, слово',
            'темное, женское, вещественное начало',
            'светлое, духовное, мужское начало',
        ],
        rightAnswer: 4
    },
    {
        question: 'Ведущее искусство средневековой культуры Европы.',
        options: [
            'Скульптура',
            'Архитектура',
            'Театр',
            'Живопись',
            'Музыка',
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
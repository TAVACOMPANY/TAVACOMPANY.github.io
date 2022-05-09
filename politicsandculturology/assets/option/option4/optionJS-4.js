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
        question: '"Всеобщая любовь" может разделить любые конфликты, утверждал … ',
        options: [
            'Лао Цзы',
            'Ибн Халдун',
            'Мо Цзы',
            'Аль Газали',
            'Авиценна',
        ],
        rightAnswer: 2
    },
    {
        question: '"Человек по природе своей есть существо политическое" утверждал …',
        options: [
            'Сократ',
            'Августин',
            'Цицерон',
            'Аристотель',
            'Платон',
        ],
        rightAnswer: 3
    },
    {
        question: 'Десять принципов государственного управления выделяет в своем произведении «Тарих-и-Рашиди»:',
        options: [
            'М. Х. Дулати',
            'А. Кайгы',
            'Х.А. Яссауи',
            'Ю. Баласагуни',
            'М. Кашгари',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кто ввел термин "политическая культура" общества?',
        options: [
            'С. Липсет',
            'И. Гердер',
            'Ж. Линц',
            'Д. Истон',
            'М. Вебер',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кто ввел в политическую теорию термин "гражданское общество"?',
        options: [
            'С.Липсет',
            'Д.Локк',
            'Т.Дюверже',
            'М.Вебер',
            'Т.Гоббс',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кому принадлежат следующие слова: «Самым важным и близким для народа считаются реформы экономические и социальные, прямо касающиеся нужд народа, а реформы политические допускаются как средства для проведения нужных экономических реформ,…»:',
        options: [
            'А. Букейханову',
            'А. Кунанбаеву',
            'А. Байтурсынову',
            'Ш. Уалиханову',
            'М. Тынышбаеву',
        ],
        rightAnswer: 3
    },
    {
        question: 'Аль-Фараби считал, что правитель государства должен быть … .',
        options: [
            'учителем',
            'энциклопедистом',
            'философом',
            'политиком',
            'астрономом',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто из греческих мыслителей рассматривает государство, основываясь на четырех добродетелях: мудрость, мужество, благоразумие и справедливость?',
        options: [
            'Аристотель',
            'Платон',
            'Цицерон',
            'Сократ',
            'Авиценна',
        ],
        rightAnswer: 0
    },
    {
        question: 'Организация, выражающая и защищающая интересы той или иной группы общества, нации и т.д.',
        options: [
            'ЮНЕСКО',
            'ООН',
            'Политическое движение',
            'Государство',
            'Партия',
        ],
        rightAnswer: 4
    },
    {
        question: 'Когда и где образовалась первая массовая политическая партия?',
        options: [
            'Франция 1890 г.',
            'Англия 1861 г',
            'Италия 1870 г.',
            'Испания 1888 г.',
            'Америка 1891 г.',
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
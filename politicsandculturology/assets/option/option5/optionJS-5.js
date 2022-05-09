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
        question: 'Один из основателей крупной политической партии Казахстана начала ХХ века?',
        options: [
            'С.Сейфуллин',
            'Б. Майлин',
            'А.Байтурсынов',
            'С.Торайгыров',
            'Ш.Кудайбердиев',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая политическая система, режим характеризуется всеобщим контролем над личностью и обществом?',
        options: [
            'Либеральная',
            'Демократическая',
            'Консервативная',
            'Тоталитарная',
            'Авторитарная',
        ],
        rightAnswer: 3
    },
    {
        question: 'Политические отношения в обществе являются … .',
        options: [
            'объектом исследования политологии',
            'предметом исследования политологии',
            'категорией политологии',
            'методом исследования политологии',
            'информационной базой для исследований политологии',
        ],
        rightAnswer: 0
    },
    {
        question: 'Внешняя политика-это … ',
        options: [
            'банки и кредиты',
            'деятельность государства на мировой арене',
            'взаимодействие нескольких субъектов государства',
            'бартер',
            'обмен информацией между государствами',
        ],
        rightAnswer: 1
    },
    {
        question: 'Революции, военные действия, теракты, парламентские дискуссии, политические забастовки это…',
        options: [
            'рамки политических конфликтов',
            'причины политических конфликтов',
            'явления политических конфликтов',
            'формы политических конфликтов',
            'виды политических конфликтов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Гражданское общество - это … ',
        options: [
            'тимократия',
            'охлократия',
            'закон',
            'общество с развитыми отношениями между его членами',
            'правопорядок',
        ],
        rightAnswer: 3
    },
    {
        question: 'Отношение либерализма к политике - это … .',
        options: [
            'неконтролируемая политика',
            'контроль над политикой',
            'права личности',
            'исследовательская деятельность',
            'контроль над деятельностью народа',
        ],
        rightAnswer: 2
    },
    {
        question: 'Либерализм утверждает, главная цель государства - это … .',
        options: [
            'защита естественных прав личности',
            'насилие над личностью',
            'ядерная безопасность',
            'формирование элит',
            'выявление управленцев-профессионалов',
        ],
        rightAnswer: 0
    },
    {
        question: 'Казахстан утверждает себя как.',
        options: [
            'патриархальное государство',
            'конфедеративное государство',
            'федеративное светское демократическое государство',
            'унитарное мусульманское государство',
            'унитарное, светское демократическое государство',
        ],
        rightAnswer: 4
    },
    {
        question: 'Направление в политологии, которое исследует взаимосвязь политических процессов с их пространственным положением, территориальными, климатическими и другими природными факторами: ',
        options: [
            'политическая антропология;',
            'политическая география;',
            'политическая экономия;',
            'теория международных отношений;',
            'геополитика.',
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
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
        question: 'Кто выделял в творчестве аполлоновское и дионисийское начало:',
        options: [
            'Сорокин',
            'Шопенгауэр',
            'Ницше',
            'Гегель',
            'Кант',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основные деятели эволюционного направления культурологии:',
        options: [
            'Сорокин, Леви Стросс',
            'Дюркгейм, Сорокин',
            'Тайлор, Тойнби',
            'Спенсер, Тайлор ',
            'Шпенглер, Спенсер',
        ],
        rightAnswer: 3
    },
    {
        question: 'Западники выступали против:',
        options: [
            'признания достоинств православия ',
            'реформ Петра Первого',
            'капиталистических реформ',
            'крепостничества',
            'протестантизма',
        ],
        rightAnswer: 0
    },
    {
        question: 'Направление культурологии изучающее языки культуры называется',
        options: [
            'лингвистическая культурология',
            'семиотика ',
            'основы языковой культурологии',
            'историография',
            'антопология',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кто уравнивал понятия «цивилизация» и «культура»:',
        options: [
            'Гумилев',
            'Сорокин',
            'Шпенглер',
            'Данилевский',
            'Тойнби',
        ],
        rightAnswer: 4
    },
    {
        question: 'Процесс взаимного влияния культур называется:',
        options: [
            'дезинтеграцией',
            'диссимиляцией',
            'энкультурацией',
            'аккультурацией',
            'инкультурацией',
        ],
        rightAnswer: 3
    },
    {
        question: 'Мифы, в которых идет речь о конце света, называются:',
        options: [
            'космогоническими',
            'апокалиптическими',
            'эсхатологическими',
            'генетическими',
            'искусственными',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основными столпами мусульманской веры являются:',
        options: [
            'вера, намаз, пост, милостыня, паломничество в Мекку ',
            'вера, джихад, пост, милостыня, паломничество в Мекку',
            'вера, джихад, намаз, милостыня, паломничество в Мекку',
            'вера, намаз, паломничество в Мекку',
            'вера, шиизм, паломничество в Мекку',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кто называл культуру воспитанием души:',
        options: [
            'Спиноза',
            'Вольтер',
            'Сократ',
            'Платон',
            'Цицерон',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кто является автором учения о пассионарности:',
        options: [
            'Данилевский',
            'Гумилев',
            'Сорокин',
            'Шпенглер',
            'Тойнби',
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
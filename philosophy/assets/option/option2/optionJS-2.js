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
        question: 'Монизм – философский взгляд, согласно которому, мир имеет …',
        options: [
            'множество начал',
            'два начала',
            'бесконечность',
            'единое и многое',
            'одно начало',
        ],
        rightAnswer: 4
    },
    {
        question: 'По имени, какого философа-схоласта, названо современное философское направление – неотомизм?',
        options: [
            'Фома Аквинский',
            'Роджер Бэкон',
            'Уильям Оккам',
            'Августин Блаженный',
            'Иоганн Буридан',
        ],
        rightAnswer: 0
    },
    {
        question: 'Автор следующих работ: «Слово о классификации наук», «О взглядах жителей добродетельного города», «О достижении счастья».',
        options: [
            'Ибн Рушд',
            'Аль Кинди',
            'Омар Хайям',
            'Аль Фараби',
            'Аль Хорезми',
        ],
        rightAnswer: 3
    },
    {
        question: 'Создатель идеи «философия всеединства».',
        options: [
            'Добролюбов',
            'Соловьев',
            'Чернышевский',
            'Богданов',
            'Михайловский',
        ],
        rightAnswer: 1
    },
    {
        question: 'Философ, который впервые ввел различение культуры и цивилизации, противопоставив эти понятия в работе «Закат Европы»',
        options: [
            'Кант',
            'Маркс',
            'Шпенглер',
            'Ницше',
            'Гегель',
        ],
        rightAnswer: 2
    },
    {
        question: 'Материя – это философская категория для обозначения объективной реальности, существующей независимо от сознания. Назовите автора данного определения?',
        options: [
            'Фихте',
            'Ленин',
            'Маркс',
            'Фейербах',
            'Шеллинг',
        ],
        rightAnswer: 1
    },
    {
        question: 'Назовите уровни научного познания:',
        options: [
            'эмпирический и теоретический',
            'объективный и субъективный',
            'мифологический и теоретический',
            'прогрессивный и регрессивный',
            'религиозный и эмпирический',
        ],
        rightAnswer: 0
    },
    {
        question: 'Назовите высшую и абсолютную ценность, как ценность – цель.',
        options: [
            'благо',
            'техника',
            'справедливость',
            'свобода',
            'человек, его жизнь',
        ],
        rightAnswer: 4
    },
    {
        question: 'Требование в неопозитивизме, согласно которому любое высказывание и в науке, и в практике, и в философии должно подлежать опытной проверке на истинность, было названо:',
        options: [
            'принципом конкретного историзма',
            'принципом сомнения',
            'принципом тождества',
            'принципом верификации',
            'принципом доказательства',
        ],
        rightAnswer: 3
    },
    {
        question: 'Назовите особенность ранних этапов формирования казахской философии.',
        options: [
            'эгоцентризм',
            'рационализм',
            'синкретизм',
            'эмпиризм',
            'деизм',
        ],
        rightAnswer: 2
    },
    {
        question: 'Назовите русского писателя оказавшего влияние на немецкого философа Ницше.',
        options: [
            'Ильин',
            'Достоевский',
            'Флоренский',
            'Соловьев',
            'Бердяев',
        ],
        rightAnswer: 1
    },
    {
        question: 'Идея демаркации и принцип фальсифицируемости – это достижения:',
        options: [
            'Поппера',
            'Куна',
            'Полани',
            'Лакатоса',
            'Фейерабенда',
        ],
        rightAnswer: 0
    },
    {
        question: 'Русский мыслитель, писатель, придерживающийся «идеи ненасилия»',
        options: [
            'М.Ломоносов',
            'Н.Бердяев',
            'Л.Толстой',
            'М.Лермонтов',
            'М.Ганди',
        ],
        rightAnswer: 2
    },
    {
        question: 'Формирующиеся в системе диалектические противоречия выступают как …',
        options: [
            'направление движения',
            'механизм движения',
            'характер движения',
            'источник самодвижения и источник саморазвития ',
            'форма движения',
        ],
        rightAnswer: 3
    },
    {
        question: 'Автор работ «Философские тетради», «Материализм и эмпириокритицизм».',
        options: [
            'Маркс',
            'Плеханов',
            'Гегель',
            'Энгельс',
            'Ленин',
        ],
        rightAnswer: 4
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

if(score == 0 || score == 1 || score == 2)  {
    msgOfResult.innerHTML = 'Пидр';
} 
 else if(score == 3 || score == 4 || score == 5) {
    msgOfResult.innerHTML = 'Не плохо, но все еще пидр';
 }
 else if(score == 6 || score == 7 || score == 8) {
    msgOfResult.innerHTML = 'Средний пидр';
 }
 else if(score == 9 || score == 10 || score == 11) {
    msgOfResult.innerHTML = 'Нормальный пидр';
 }
 else if(score == 12 || score == 13 || score == 14) {
    msgOfResult.innerHTML = 'Запомнивший пидр';
 } else {
    msgOfResult.innerHTML = 'Умный пидр';
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
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
        question: 'Выделите метод, используемый Гегелем в своей философии.',
        options: [
            'релятивизм',
            'редукционизм',
            'герменевтика',
            'редукционизм',
            'диалектика',
        ],
        rightAnswer: 4
    },
    {
        question: 'Категории – это …. .',
        options: [
            'предельно общие понятия познания, отражающие наиболее существенные, закономерные связи мира и человека',
            'понятие физики',
            'понятие математики',
            'априорные формы познания',
            'неизменные формы мышления',
        ],
        rightAnswer: 0
    },
    {
        question: 'Проблема, которая является предметом дискуссии между славянофилами и западниками:',
        options: [
            'природа общих понятий',
            'бесконечность мира',
            'сущность мира',
            'исторические судьбы России и русского народа в мире',
            'познаваемость мира',
        ],
        rightAnswer: 3
    },
    {
        question: 'Согласно позитивизму, философам необходимо … .',
        options: [
            'произвести великое метафизическое объединение наук и искусств',
            'заниматься логикой и методологией научного познания',
            'превратить философию в разновидность религиозного сознания',
            'признать пантеистическую природу Бытия',
            'искать конечные причины мироздания',
        ],
        rightAnswer: 1
    },
    {
        question: 'Назовите представителя интуитивизма.',
        options: [
            'Шестов',
            'Фромм',
            'Бергсон',
            'Вебер',
            'Фрейд',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сущность и явление, содержание и форма, целое и часть – это:',
        options: [
            'определения логики',
            'философские категории',
            'понятия науки',
            'атрибуты материи',
            'исторические знания',
        ],
        rightAnswer: 1
    },
    {
        question: 'Общественно-экономическая формация понятие…  ',
        options: [
            'марксизма',
            'структурализма',
            'позитивизма',
            'неофрейдизма',
            'эмпиризм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Поиск индивидуальности – особенная черта эпохи… .',
        options: [
            'Современности',
            'Античности',
            'Средневековья',
            'Нового Времени',
            'Возрождения',
        ],
        rightAnswer: 4
    },
    {
        question: 'Определение понятия «бытие» в постмодернизме:',
        options: [
            'бытие – логос',
            'бытие – слепая воля',
            'бытие – бог',
            'бытие – мир как хаос',
            'бытие – мир идей',
        ],
        rightAnswer: 3
    },
    {
        question: 'С именем немецкого философа Л. Фейербаха связан …',
        options: [
            'вершина немецкой классической философии',
            'начало немецкой классической философии',
            'конец немецкой классической философии',
            'фундаментальность немецкой классической философии',
            'смерть немецкой классической философии',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ламетри, Гельвеций, Гольбах – их объединяет:',
        options: [
            'диалектический материализм',
            'механистический материализм',
            'объективный материализм',
            'исторический материализм',
            'субъективный идеализм',
        ],
        rightAnswer: 1
    },
    {
        question: 'Шакарим Кудайбердиев, следуя суфистскому направлению считал, что в основе добра лежит знание, кроме того, он предлагал ввести в систему образования – науку о совести (уждан). «Человеческую скромность, справедливость, доброту в их единстве я называю мусульманским словом – уждан»,- отмечал он в своей работе.',
        options: [
            '«Три истины»',
            '«Оян казах»',
            '«Слова назидания»',
            '«Камар-сулу»',
            '«Книга исцеления»',
        ],
        rightAnswer: 0
    },
    {
        question: 'Назовите представителей жырау?',
        options: [
            'Ахтамберды',
            'Шалкииз',
            'Все перечисленные',
            'Асан-кайгы',
            'Бухар',
        ],
        rightAnswer: 2
    },
    {
        question: 'Укажите уровни мировоззрения:',
        options: [
            'мышление и воображение',
            'идеология и политика',
            'эмпирический и теоретический',
            'жизненно-практический и теоретический',
            'базис и надстройка',
        ],
        rightAnswer: 3
    },
    {
        question: 'Назовите представителя средневековой философии, придерживающегося концепции опытного знания.',
        options: [
            'Пьер Абеляр',
            'Дунс Скот',
            'Уильям Оккам',
            'Иоанн Росцелин',
            'Роджер Бэкон',
        ],
        rightAnswer: 4
    },
    {
        question: 'В основе философии Аль-Фараби лежит античный ...',
        options: [
            'материализм',
            'мистицизм',
            'идеализм',
            'гилозоизм',
            'перипатетизм (аристотелизм)',
        ],
        rightAnswer: 4
    },
    {
        question: 'Субъект познания - это:',
        options: [
            'человек, как познающее существо',
            'фрагменты бытия',
            'предмет, находящийся вне человека',
            'объект познания',
            'часть мира',
        ],
        rightAnswer: 0
    },
    {
        question: 'Согласно Канту, философия должна ответить на вопросы…',
        options: [
            'что я могу знать?',
            'все перечисленное',
            'что я должен делать?',
            'что такое человек?',
            'на что я могу надеяться?',
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

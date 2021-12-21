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
        question: 'Учение о Боге было в центре средневековой философской мысли, оно называлось:',
        options: [
            'номинализм',
            'онтологизм',
            'космоцентризм',
            'пантеизм',
            'теоцентризм',
        ],
        rightAnswer: 4
    },
    {
        question: 'Суждения, которые взаимоисключают друг друга, Кант называет: ',
        options: [
            'антиномии ',
            'модусы',
            'категории',
            'рассудок',
            'субстанции',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой философ арабоязычного Востока в своём произведении «Диван-и-хикмет» пишет о нравственном очищении и совершенствовании человека? Он родился в конце Х1 века (г. Ясы, территория современного Казахстана). Этот философ представитель суфизма. ',
        options: [
            'Баласагуни',
            'Ибн-Баджа',
            'Кашгари',
            'Яссауи',
            'Аль-Кинди',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кого из философов арабоязычной философии называли «князем медицины»? Автор труда «Канон медицинской науки».',
        options: [
            'Аль-Кинди',
            'Ибн-Сина (Авиценна) ',
            'Аверроэс (Ибн Рушд)',
            'Аль-Хорезми',
            'Аль-Фараби',
        ],
        rightAnswer: 1
    },
    {
        question: 'Специфика философии:',
        options: [
            'философия – это конкретное знание о мире',
            'философия – это особая область знания, в некоторых отношениях, существенно отличающаяся от всех других',
            'в стремлении познать мир в его всеобщности и целостности ',
            'философия – это наука о вещах',
            'философия – наука о материи',
        ],
        rightAnswer: 2
    },
    {
        question: 'Определите представителя схоластики.',
        options: [
            'Сенека',
            'Фома Аквинский',
            'Эмпедокл',
            'Плотин',
            'Аврелий Августин',
        ],
        rightAnswer: 1
    },
    {
        question: 'Индуктивный метод (движение мысли от частного к общему) был разработан в философии:',
        options: [
            'Бэкона',
            'Гольбаха',
            'Локка',
            'Декарта',
            'Гассенди',
        ],
        rightAnswer: 0
    },
    {
        question: 'Автор работы «Город Солнца»?',
        options: [
            'Эразм Роттердамский',
            'Томас Мор',
            'Мишель Монтень',
            'Николай Кузанский',
            'Томазо Кампанелла',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кого называют первым гуманистом Европы, он является автором сочинения «Речь о достоинстве человека»?',
        options: [
            'Данте',
            'Бруно',
            'Боккачо',
            'Пико делла Мирандола ',
            'Петрарка',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое направление в древнегреческой философии представил мыслитель, который при дневном свете искал «человека» с зажженным фонарем?',
        options: [
            'Школа мегариков (Евклид)',
            'Школа софистов (Протагор)',
            'Киническая школа (Диоген) ',
            'Элейская школа (Парменид)',
            'Пифагорейская школа (Пифагор)',
        ],
        rightAnswer: 2
    },
    {
        question: 'Античный мудрец Зенон пытался теоретически осмыслить движение. Как назывались его доказательства?',
        options: [
            'идеи',
            'апории ',
            'теории',
            'атрибуты',
            'модусы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Антропоцентризм означает такой тип мировоззрения в котором человек осознал себя центром Вселенной и характерен для философии… .',
        options: [
            'Эпохи Возрождения',
            'Нового времени',
            'Средневековья',
            'Древней Греции',
            'Эпохи Просвещения',
        ],
        rightAnswer: 0
    },
    {
        question: 'Жизнь – страдание, первая истина:',
        options: [
            'легизма',
            'конфуцианства',
            'буддизма',
            'даосизма',
            'моизма',
        ],
        rightAnswer: 2
    },
    {
        question: 'Мокша, дхарма, карма – понятия …',
        options: [
            'конфуцианству',
            'легизму',
            'моизму',
            'индуизма',
            'локаятиков',
        ],
        rightAnswer: 3
    },
    {
        question: 'Основоположник немецкой классической философии.',
        options: [
            'Фихте',
            'Гегель',
            'Фейербах',
            'Маркс',
            'Кант ',
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

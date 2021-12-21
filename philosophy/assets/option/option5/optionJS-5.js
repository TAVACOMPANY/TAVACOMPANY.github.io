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
        question: 'Автор теории «постиндустриального общества».',
        options: [
            'П. Фейерабенд',
            'Э. Гуссерль',
            'Т. Кун',
            'К. Поппер',
            'Д. Белл',
        ],
        rightAnswer: 4
    },
    {
        question: 'Создателем «методологического анархизма» в постпозитивизме является:',
        options: [
            'Фейерабенд',
            'Витгенштейн',
            'Поппер',
            'Кун',
            'Лакатос',
        ],
        rightAnswer: 0
    },
    {
        question: 'Основная единица научной деятельности:',
        options: [
            'аудитория',
            'лаборатория',
            'обсерватория',
            'научное сообщество',
            'группа',
        ],
        rightAnswer: 3
    },
    {
        question: 'Фрейд развил в своей теории психоанализа понятие …',
        options: [
            'страдания',
            'бессознательного ',
            'отчаяния',
            'интуитивного',
            'сознательного',
        ],
        rightAnswer: 1
    },
    {
        question: 'В чьих трудах сформулирована концепция диалектики на материалистической основе?',
        options: [
            'Гегеля',
            'Шеллинга',
            'Маркса',
            'Фейербаха',
            'Фихте',
        ],
        rightAnswer: 2
    },
    {
        question: 'Субъект познания - это:',
        options: [
            'объект познания',
            'человек, как познающее существо',
            'фрагменты бытия',
            'предмет, находящийся вне человека',
            'часть мира',
        ],
        rightAnswer: 1
    },
    {
        question: ' Идея Мәңгілік Ел, озвученная в послании Президента, предполагает определенное число главных ценностей, объединяющие всех казахстанцев и составляющие фундамент будущего нашей страны:',
        options: [
            '7',
            '10',
            '6',
            '5',
            '12',
        ],
        rightAnswer: 0
    },
    {
        question: 'Восточный философ, автор идеи о двойственной истине (признание самостоятельными истины веры и философские умозаключения):',
        options: [
            'Аль-Фараби',
            'Аль-Газали',
            'Аль-Кинди',
            'Ибн-Сина',
            'Ибн-Рушд',
        ],
        rightAnswer: 4
    },
    {
        question: 'Греческий философ Аристотель разработал основные законы …',
        options: [
            'герменевтики',
            'эвристики',
            'атомистического материализма',
            'формальной логики (силлогистики) ',
            'психологии',
        ],
        rightAnswer: 3
    },
    {
        question: 'Философские школы Древней Индии принято делить на:',
        options: [
            'монистические и дуалистические',
            'классические и неклассические',
            'ортодоксальные и неортодоксальные',
            'материалистические и идеалистические',
            'рационалистические и иррационалистические',
        ],
        rightAnswer: 2
    },
    {
        question: 'В отличие от средневековой, философия Нового времени опиралась на авторитет….',
        options: [
            'общества',
            'науки',
            'государства',
            'церкви',
            'человека',
        ],
        rightAnswer: 1
    },
    {
        question: 'В основе философии Аль-Фараби лежит античный ...',
        options: [
            'перипатетизм (аристотелизм)',
            'идеализм',
            'материализм',
            'мистицизм',
            'гилозоизм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Первая в истории человечества теория идеального государства (полиса) изложена:',
        options: [
            'Аристотелем',
            'Архитом',
            'Платоном',
            'Диогеном',
            'Протагором',
        ],
        rightAnswer: 2
    },
    {
        question: 'Учение об исправлении имен принадлежит …',
        options: [
            'моизму',
            'буддизму',
            'джайнизму',
            'конфуцианству',
            'легизму',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кто поставил проблему человека как центральную проблему в античной философии?',
        options: [
            'Зенон',
            'Плотин',
            'Пифагор',
            'Левкипп',
            'Сократ',
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

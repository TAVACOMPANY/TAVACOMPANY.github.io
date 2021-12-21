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
        question: 'Назовите родоначальника арабоязычной философии.',
        options: [
            'Аль-Фараби',
            'Аль-Хорезми',
            'Аль-Газали',
            'Аль-Араби',
            'Аль-Кинди',
        ],
        rightAnswer: 4
    },
    {
        question: 'Диалектика как теория развития в классической немецкой философии была разработана:',
        options: [
            'Гегель',
            'Фихте',
            'Кант',
            'Фейербах',
            'Шеллинг',
        ],
        rightAnswer: 0
    },
    {
        question: 'Впервые термин «философ» употребил:',
        options: [
            'Халдун',
            'Сартр',
            'Спиноза',
            'Пифагор',
            'Вебер',
        ],
        rightAnswer: 3
    },
    {
        question: 'Идея эпохи Просвещения -',
        options: [
            'вера в Бога',
            'культ науки и прогресс общества',
            'культ религии',
            'культ искусства',
            'вера в судьбу и предназначение',
        ],
        rightAnswer: 1
    },
    {
        question: 'Методологический принцип совпадения противоположностей – максимума и минимума сформулировал',
        options: [
            'Мор',
            'Кампанела',
            'Кузанский',
            'Маккиавелли',
            'Леонардо да Винчи',
        ],
        rightAnswer: 2
    },
    {
        question: 'Локаята – древнеиндийская система',
        options: [
            'плюрализма',
            'материализма',
            'дуализма',
            'идеализма',
            'монизма',
        ],
        rightAnswer: 1
    },
    {
        question: 'Ключевой вопрос схоластики:',
        options: [
            'как соотносится знание и вера',
            'как соотносится свобода и ответственность',
            'как соотносится причина и следствие',
            'как соотносятся чувство и таинственность',
            'как соотносится знание и заблуждение',
        ],
        rightAnswer: 0
    },
    {
        question: 'Назовите известного итальянского гуманиста?',
        options: [
            'Томас Мор',
            'Эразм Роттердамский',
            'Николай Кузанский',
            'Мишель Монтень',
            'Петрарка',
        ],
        rightAnswer: 4
    },
    {
        question: 'Назовите представителя античной философии, который считал, что первоосновой всего сущего является мир идей.',
        options: [
            'Диоген',
            'Эпикур',
            'Кратил',
            'Платон',
            'Аристотель',
        ],
        rightAnswer: 3
    },
    {
        question: 'Метод диалога в поиске истины ввел в употребление:',
        options: [
            'Гераклит',
            'Аристотель',
            'Сократ',
            'Парменид',
            'Фалес',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто является автором трактата «Правитель»?',
        options: [
            'Петрарка',
            'Николо Маккиавелли',
            'Эразм Роттердамский',
            'Томас Мор',
            'Мишель Монтень',
        ],
        rightAnswer: 1
    },
    {
        question: 'Создатель концепции «благородного мужа»:',
        options: [
            'Конфуций',
            'Будда',
            'Лао-цзы',
            'Сократ',
            'Мо-цзы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Автор теории антропологического материализма в немецкой классической философии.',
        options: [
            'Гегель',
            'Маркс',
            'Фейербах',
            'Шеллинг',
            'Кант',
        ],
        rightAnswer: 2
    },
    {
        question: 'Глобальные проблемы современности.',
        options: [
            'проблема войны и мира',
            'угроза ядерной войны',
            'проблемы экологии',
            'все перечисленные',
            'проблемы демографии',
        ],
        rightAnswer: 3
    },
    {
        question: 'Центральная проблема философии Абая … .',
        options: [
            'религия',
            'смерть',
            'общество',
            'бытие',
            'человек',
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

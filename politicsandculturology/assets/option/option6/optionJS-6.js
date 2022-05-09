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
        question: '.В каком году была создана Международная ассоциация политической науки?',
        options: [
            '1946;',
            '1945;',
            '1949;',
            '1950;',
            '1951.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Метод политологии, рассматривающий политическую сферу общества как определенную целостность, состоящую из совокупности элементов, находящихся в отношениях и связях друг с другом и внешней средой:',
        options: [
            'социологический.',
            'исторический;',
            'сравнительный;',
            'системный;',
            'структурно-функциональный анализ;',
        ],
        rightAnswer: 3
    },
    {
        question: 'Метод политической науки, предполагающий выяснение зависимости политики от общества, социальной обусловленности политических явлений:',
        options: [
            'социологический;',
            'метафизический;',
            'диалектический;',
            'нормативный;',
            'институциональный',
        ],
        rightAnswer: 0
    },
    {
        question: 'Метод политологии, ориентирующийся на разработку идеала политического устройства и путей его практического воплощения: ',
        options: [
            'антропологический;',
            'нормативно-ценностный;',
            'позитивистский;',
            'исторический;',
            'культурологический.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функция политологии, призванная разрабатывать желаемые и возможные варианты развития политических процессов:',
        options: [
            'мировоззренческая.',
            'регулятивная;',
            'аксиологическая;',
            'методологическая;',
            'прогностическая;',
        ],
        rightAnswer: 4
    },
    {
        question: 'Функция политологии, дающая оценку политическим институтам, строю, поведению, событиям:',
        options: [
            'теоретико-познавательная.',
            'управленческая;',
            'воспитательная;',
            'аксиологическая;',
            'прогностическая;',
        ],
        rightAnswer: 3
    },
    {
        question: 'Функция политической науки, заключающаяся в выработке способов и приемов анализа политических явлений и процессов:',
        options: [
            'аналитическая;',
            'мировоззренческая;',
            'методологическая;',
            'регулятивная;',
            'идеологическая.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Мыслитель Востока, автор «Тракта о добродетельном городе»:',
        options: [
            'Аль - Фараби;',
            'Навои;',
            'Низами; ',
            'Ибн-Рушд;',
            'Конфуций.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Политика имморализма, выраженная в формуле “цель оправдывает средства”, называется:',
        options: [
            'сепаратизм.',
            'национализм;',
            'волюнтаризм;',
            'бонапартизм;',
            'макиавеллизм;',
        ],
        rightAnswer: 4
    },
    {
        question: 'Автор концепции суверенитета, идеолог абсолютизма:',
        options: [
            'Т. Гоббс;',
            'Ж. Боден;',
            'Д. Локк;',
            'Э. Берк;',
            'М. Вебер.',
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
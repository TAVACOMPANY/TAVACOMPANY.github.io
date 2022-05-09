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
        question: 'Что характерно во взглядах на культуру в античности',
        options: [
            'теоцентризм',
            'антропоцентризм',
            'космоцентризм',
            'европоцентризм',
            'грекоцентризм ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Архетипами казахской культуры являются?',
        options: [
            'Ислам',
            'Зороастризм',
            'Устное народное творчество',
            'Тенгрианство и тюркская цивилизация',
            'Хараппа',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каких веках сложилась культура Зар Замана.',
        options: [
            '18-19',
            '20-21',
            '15-16',
            '11-12',
            '16-17',
        ],
        rightAnswer: 0
    },
    {
        question: 'В какой стране началось (раньше других) эпоха Ренессанса:',
        options: [
            'Англия',
            'Италия',
            'Дания',
            'Голландия',
            'Фландрия',
        ],
        rightAnswer: 1
    },
    {
        question: 'В каком веке возник ислам как новая мировая религия?',
        options: [
            'Все ответы не верны',
            'В 3-м тысячелетии до н.э',
            'В 3 веке',
            'В 12 веке',
            'В 7 веке',
        ],
        rightAnswer: 4
    },
    {
        question: 'В каком из этих стилей искусства больше всего проявляется средневековое настроение?',
        options: [
            'Классический',
            'Романский',
            'Барокко',
            'Готика',
            'Рококо',
        ],
        rightAnswer: 3
    },
    {
        question: 'Виднейшим представителем движения Реформации в Германии был …',
        options: [
            'Альбрехт Дюрер',
            'Джордано Бруно',
            'Мартин Лютер',
            'Томас Кальвин',
            'К. Маркс',
        ],
        rightAnswer: 2
    },
    {
        question: 'Характерная особенность первобытной культуры:',
        options: [
            'Синкретизм',
            'Реализм',
            'Изящество',
            'Романтизм',
            'Классицизм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Великим представителем культуры Возрождения является:',
        options: [
            'Томас Мор',
            'Джон Локк',
            'Людвиг ванн Бетховен',
            'Сократ',
            'Леонардо да Винчи',
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
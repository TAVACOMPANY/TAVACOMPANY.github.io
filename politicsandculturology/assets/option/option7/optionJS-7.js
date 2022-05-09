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
        question: 'Казахский мыслитель 19 века, проведший анализ китайской системы колониального управления:',
        options: [
            'И. Алтынсарин;',
            'А. Кунанбаев;',
            'Ч. Валиханов;',
            'Шортамбай;',
            'Ш. Кудайбердыев',
        ],
        rightAnswer: 2
    },
    {
        question: 'Родоначальник идеологии либерализма;',
        options: [
            'Э. Гидденс.',
            'Г. Спенсер;',
            'Г. Тард;',
            'Д. Локк;',
            'Ж. Боден;',
        ],
        rightAnswer: 3
    },
    {
        question: 'Подход, исследующий власть главным образом под углом зрения субъективного восприятия ее индивидом:',
        options: [
            'психологический;',
            'субъективистский;',
            'позитивистский;',
            'интеракционный;',
            'биологический.',
        ],
        rightAnswer: 0
    },
    {
        question: 'В зависимости от характера политического режима политические системы бывают:',
        options: [
            'открытые и закрытые;',
            'авторитарные, тоталитарные, демократические;',
            'соревновательные и социопримирительные;',
            'прогрессивные и реакционные;',
            'экстраординарные и дистрибутивные.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Политический институт, призванный регулировать, контролировать деятельность и поведение граждан:',
        options: [
            'церковь.',
            'армия;',
            'общественная организация;',
            'политическая партия;',
            'государство;',
        ],
        rightAnswer: 4
    },
    {
        question: 'К какому типу реализации решений относится прямая апелляция к общественному мнению, использующая опору на массовые настроения?',
        options: [
            'демократизм.',
            'экстремизм;',
            'радикализм;',
            'популизм;',
            'элитизм;',
        ],
        rightAnswer: 3
    },
    {
        question: 'Однопартийные системы характерны для:',
        options: [
            'демократических политических систем;',
            'автократических политических систем;',
            'тоталитарных и авторитарных политических систем;',
            'всех политических систем.',
            'консервативных и реформаторских политических систем;',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кто из исследователей ввел понятие групп давления как особых групп людей, влияющих на властные структуры и процесс принятия политических решений?',
        options: [
            'А. Бентли',
            'Ю. Харбермас',
            'Э. Гидденс',
            'А. Турен',
            'Г. Спенсер',
        ],
        rightAnswer: 0
    },
    {
        question: 'Основное содержание демографической политики:',
        options: [
            'создание необходимых условий для труда и отдыха',
            'поддержка малоимущих слоев населения',
            'воздействие на общие условия жизни населения ',
            'регулирование заработной платы',
            'регулирующее воздействие на народонаселение страны',
        ],
        rightAnswer: 4
    },
    {
        question: 'Исторически сложившаяся на определенной территории устойчивая совокупность групп людей, обладающих определенными характерными признаками, общими стабильными чертами и особенностями культуры, а также осознанием своего единства, своей целостности и отличия от других подобных образований (самосознанием):',
        options: [
            'народность;',
            'этнос;',
            'нация;',
            'расовая бщность;',
            'географическая общность.',
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
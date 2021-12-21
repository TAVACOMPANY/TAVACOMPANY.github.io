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
        question: 'В иррационализме Шопенгауэра мир...',
        options: [
            'разумен, человеком управляет сознание',
            'разумен, человеком управляет абсолютный дух',
            'осмыслен, человеком управляет разум',
            'осмыслен, человеком управляет идея',
            'неразумен, человеком управляет слепая воля ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Понятие «парадигма» введено в употребление американским ученым…',
        options: [
            'Куном',
            'Махом',
            'Койре',
            'Поппером',
            'Вебером',
        ],
        rightAnswer: 0
    },
    {
        question: '«Воля к власти» и идея «сверхчеловека» основные понятия немецкого философа, представителя философии жизни. Этот философ вводит метафору «верблюд, лев, ребенок», как этапы превращения человека.',
        options: [
            'Хайдеггер',
            'Гегель',
            'Маркс',
            'Ницше',
            'Шпенглер',
        ],
        rightAnswer: 3
    },
    {
        question: 'Понятие «осевого времени» ввел…',
        options: [
            'Кант',
            'Ясперс',
            'Маркс',
            'Шеллинг',
            'Гердер',
        ],
        rightAnswer: 1
    },
    {
        question: 'Классификация основных форм движения материи принадлежит…',
        options: [
            'Федорову',
            'Плеханову',
            'Энгельсу',
            'Михайловскому',
            'Каутскому',
        ],
        rightAnswer: 2
    },
    {
        question: 'Коэволюция – это…',
        options: [
            'человек в своей деятельности противостоит природе',
            'новый этап согласованного существования природы и человека',
            'утверждение господства человека над природой',
            'предотвращение негативных воздействий человека на природу',
            'нарушение динамического равновесия природы и человека',
        ],
        rightAnswer: 1
    },
    {
        question: 'Этот русский мыслитель идеализирует русскую сельскую общину, усматривая в ней наибольшее приближение к общественному идеалу. В славянофильской философии он разработал понятие «соборность» (общинность):',
        options: [
            'А. Хомяков',
            'А. Островский',
            'В. Тютчев',
            'К. Аксаков',
            'В. Даль',
        ],
        rightAnswer: 0
    },
    {
        question: 'Номинализм – это:',
        options: [
            'учение о реальном сотворении мира богом',
            'учение о реальном существовании человека',
            'учение о реальном существовании природы',
            'учение, считающее, что реальностью обладают только общие универсалии',
            'учение, где реальностью признаются единичные вещи',
        ],
        rightAnswer: 4
    },
    {
        question: 'Назовите философов 19 века, выступивших с критикой разума, принципа рационализма',
        options: [
            'Шеллинг, Гегель',
            'Кант, Фихте',
            'Гердер, Фейербах',
            'Шопенгауэр, Ницше',
            'Маркс, Энгельс',
        ],
        rightAnswer: 3
    },
    {
        question: 'Движение – в марксистской философии …',
        options: [
            'Рождение галактик',
            'Перемещение',
            'Способ существования материи',
            'Энергетическое взаимодействие',
            'Рождение планеты',
        ],
        rightAnswer: 2
    },
    {
        question: 'Термин «патристика» означает:',
        options: [
            'символическую философию',
            'учение отцов церкви',
            'символ жизни',
            'символ веры',
            'бессмертие души',
        ],
        rightAnswer: 1
    },
    {
        question: 'Метод диалога в поиске истины ввел в употребление:',
        options: [
            'Сократ',
            'Фалес',
            'Аристотель',
            'Парменид',
            'Гераклит',
        ],
        rightAnswer: 0
    },
    {
        question: 'Дедуктивный метод (от общего к единичному) был разработан мыслителем, философом-дуалистом:',
        options: [
            'Лейбницем',
            'Мальбраншем',
            'Декартом',
            'Бэконом',
            'Локком',
        ],
        rightAnswer: 2
    },
    {
        question: 'Отличительная особенность мифологии:',
        options: [
            'вера в Бога',
            'поклонение природе',
            'единство мира',
            'нерасчлененность, слитность, целостность миропонимания',
            'целостность субстанциального миропонимания',
        ],
        rightAnswer: 3
    },
    {
        question: 'Назовите идеалы, характерные для суфизма?',
        options: [
            'материального',
            'полезности',
            'абсолютного',
            'относительного',
            'божественного',
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
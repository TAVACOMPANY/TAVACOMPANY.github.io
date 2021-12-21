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
        question: 'Автор этического учения о категорическом императиве (т.е о моральном законе).',
        options: [
            'Шеллинг',
            'Фихте',
            'Гегель',
            'Фейербах',
            'Кант',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кто является автором трактата «Правитель»?',
        options: [
            'Николо Маккиавелли',
            'Петрарка',
            'Эразм Роттердамский',
            'Мишель Монтень',
            'Томас Мор',
        ],
        rightAnswer: 0
    },
    {
        question: 'В древней Греции искусство вести беседу с целью выявления понятий - одна из форм… .',
        options: [
            'знания',
            'дуализма',
            'воображения',
            'диалектики',
            'метафизики',
        ],
        rightAnswer: 3
    },
    {
        question: 'Автор труда «Этика» и учения о единой субстанции.',
        options: [
            'Локк',
            'Спиноза',
            'Юм',
            'Бэкон',
            'Гоббс',
        ],
        rightAnswer: 1
    },
    {
        question: 'С чего, по Аристотелю, начинается подлинное философствование?',
        options: [
            'дискуссии',
            'страха',
            'удивления',
            'страдания',
            'диалога',
        ],
        rightAnswer: 2
    },
    {
        question: 'Реализм – это направление в средневековой философии, утверждающее, что:',
        options: [
            'универсалии существуют не до, а после единичных вещей',
            'универсалии существуют до единичных вещей',
            'универсалии и единичные вещи тождественны',
            'универсалии и единичные вещи суть иллюзии, существующие в человеческом сознании',
            'универсалий и единичных вещей в природе вообще не существует',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кто из философов Нового времени стал основоположником экспериментальной науки?',
        options: [
            'Ф.Бэкон',
            'Б.Спиноза',
            'Д.Беркли',
            'П.Гассенди',
            'Т.Гоббс',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кого из философов Греции называют родоначальником стихийной диалектики?',
        options: [
            'Зенона',
            'Диогена',
            'Анаксимена',
            'Эмпедокла',
            'Гераклита',
        ],
        rightAnswer: 4
    },
    {
        question: 'Как называлась, созданная Николаем Коперником, новая космологическая система?',
        options: [
            'геоцентризм',
            'космоцентризм',
            'астрофизизм',
            'гелиоцентризм',
            'теоцентризм',
        ],
        rightAnswer: 3
    },
    {
        question: 'Идеи западничества, направление в русской общесчтвенной мысли, развивал',
        options: [
            'Хомяков',
            'Аксаков',
            'Чаадаев',
            'Фонвизин',
            'Киреевский',
        ],
        rightAnswer: 2
    },
    {
        question: 'Представитель русского космизма',
        options: [
            'Карсавин',
            'Циолковский',
            'Лосский',
            'Ильин',
            'Булгаков',
        ],
        rightAnswer: 1
    },
    {
        question: 'В чём сущность субъективной диалектики?',
        options: [
            'в движении и развитии мыслей, понятий, которое отражает в сознании объективную диалектику',
            'в объяснении направленности социального прогресса',
            'в противоречивом отношении законов познания к законам природы',
            'в развитии «чистых» форм человеческого мышления',
            'в её тождественности с объективной диалектикой',
        ],
        rightAnswer: 0
    },
    {
        question: 'Представитель марксизма?',
        options: [
            'Монтескье',
            'Конт',
            'Плеханов',
            'Мах',
            'Руссо',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кому принадлежат слова: «Сущность человека в любви и справедливости». Нравственными началами человека должны быть любовь и справедливость, считает он.',
        options: [
            'Куну',
            'Алтынсарину',
            'Анахарсису',
            'Абаю',
            'Маккиавелли',
        ],
        rightAnswer: 3
    },
    {
        question: 'Своеобразное направление в философии, которое выразило концепцию русского исторического процесса, связав его с самобытностью прошлого России и крестьянской общиной, объединение людей на основе высших духовных, религиозных ценностей – любви и свободы. Назовите направление и представителей.',
        options: [
            'Западничество (Белинский, Герцен, Добролюбов, Чернышевский, Чаадаев, Огарев)',
            'Всеединство (Соловьев)',
            'Космизм (Федоров, Циолковский, Вернадский, Чижевский)',
            'Евразийство (Гумилев)',
            'Славянофильство (Аксаков, Хомяков, Киреевский)',
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
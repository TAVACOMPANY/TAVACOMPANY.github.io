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
        question: 'Формы чувственного познания:',
        options: [
            'суждение, чувство',
            'понятие, гипотеза',
            'гипотеза, теория, ощущение',
            'понятие, представление',
            'ощущение, восприятие, представление',
        ],
        rightAnswer: 4
    },
    {
        question: 'Философское направление XX века, где проблема личности является центральной.',
        options: [
            'экзистенциализм',
            'позитивизм',
            'неотомизм',
            'сциентизм',
            'прагматизм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какая философская система полагает, что истинно то, что полезно?',
        options: [
            'экзистенциализм',
            'персонализм',
            'неотомизм',
            'прагматизм',
            'позитивизм',
        ],
        rightAnswer: 3
    },
    {
        question: 'У казахов мифы о первотворении связаны с именем мудреца, призывающего к борьбе со смертью.',
        options: [
            'Тенгри',
            'Коркыт',
            'Аруах',
            'Умай',
            'Кус-жол',
        ],
        rightAnswer: 1
    },
    {
        question: ' Назовите понятие, в котором отражается процесс взаимодействия природы и общества, абсолютизируется роль разума человека?',
        options: [
            'биосфера',
            'атмосфера',
            'ноосфера',
            'техносфера',
            'социосфера',
        ],
        rightAnswer: 2
    },
    {
        question: 'Укажите представителей «первого позитивизма».',
        options: [
            'Шлик, Франк',
            'Конт, Спенсер',
            'Поппер, Бергман',
            'Мах, Авенариус',
            'Карнап, Нейрат',
        ],
        rightAnswer: 1
    },
    {
        question: 'Назовите представителя античной философии, который считал, что первоосновой всего сущего является мир идей.',
        options: [
            'Платон',
            'Эпикур',
            'Аристотель',
            'Кратил',
            'Диоген',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укажите автора учения об идолах (призраках), мешающих человеку в процессе познания.',
        options: [
            'Лейбниц',
            'Спиноза',
            'Гоббс',
            'Декарт',
            'Бэкон',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кто из философов Нового времени отождествлял природу и Бога, сделав природу первопричиной самой себя ( «кауза суи»)?',
        options: [
            'Лейбниц',
            'Бэкон',
            'Декарт',
            'Спиноза',
            'Локк',
        ],
        rightAnswer: 3
    },
    {
        question: 'Метод диалога в поиске истины ввел в употребление:',
        options: [
            'Парменид',
            'Гераклит',
            'Сократ',
            'Аристотель',
            'Фалес',
        ],
        rightAnswer: 2
    },
    {
        question: '«Вторым учителем» в истории арабоязычной философии называли:',
        options: [
            'Ибн Баджу',
            'Аль Фараби ',
            'Ибн Сину',
            'Аль Кинди',
            'Яссауи',
        ],
        rightAnswer: 1
    },
    {
        question: 'Философия с древнегреческого означает:',
        options: [
            'любовь к мудрости',
            'любовь к науке',
            'любовь к миру',
            'любовь к языку',
            'любовь к жизни',
        ],
        rightAnswer: 0
    },
    {
        question: 'Ведущие принципы в конфуцианстве: этикет, человеколюбие …',
        options: [
            'медитация',
            'познание',
            'долг',
            'нирвана',
            'истина',
        ],
        rightAnswer: 2
    },
    {
        question: 'Философия возникла:',
        options: [
            'Древней Греции',
            'Западной Европе',
            'Древний Китай',
            'одновременно в Древней Индии, Древнем Китае и Древней Греции',
            'Древняя Индия',
        ],
        rightAnswer: 3
    },
    {
        question: 'Санскрит – это',
        options: [
            'эмпирическое знание',
            'языческое учение',
            'моральные принципы',
            'язык священного знания Вавилонии',
            'язык священного знания Древней Индии',
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
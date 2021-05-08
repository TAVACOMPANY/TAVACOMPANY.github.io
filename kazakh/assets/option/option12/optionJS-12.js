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
        question: 'Қазақтың кәсіби операсының негізін қалаған композиторды анықтаңыз.',
        options: [
            'Ахмет Жұбанов',
            'Л.Хамиди',
            'А.В. Затаевич',
            'Н.Тілендиев',
            'Е.Г.Брусиловский.',
        ],
        rightAnswer: 4
    },
    {
        question: '«Қазақ хрестоматиясы» деген кітаптың авторы.',
        options: [
            'М.Жұмабаев',
            'Қ.Мырзаиев',
            'М.Әуезов',
            'Ы.Алтынсарин',
            'А.Байтұрсынов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Қоршаған ортаны қорғаудың дүниежүзілік күнінің мақсаты:',
        options: [
            'Мәдениетке шақыру',
            'Қонаққа шақыру',
            'Табиғатты қорғау мәселесіне халықты шақыру',
            'Денсаулық сақтауға шақыру',
            'Білім алуға халықты шақыру',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақ бейнелеу өнерінің негізін қалаушы адамды белгілеңіз.',
        options: [
            'Шоқан Уәлиханов',
            'Әбілхан Қастеев',
            'Қаныш Сәтпаев',
            'Гүлфайруз Ысмайылова',
            'Дина Нүрпейісова',
        ],
        rightAnswer: 1
    },
    {
        question: 'Ш. Аймановтың өмір сүрген жылдарын көрсетіңіз.',
        options: [
            '1914-1970ж',
            '1899-174ж',
            '1916-1985ж',
            '1904-1975ж',
            '1915-1980ж',
        ],
        rightAnswer: 0
    },
    {
        question: 'Бәйтеректің биіктігі.',
        options: [
            '69 м',
            '56 м',
            '90 м',
            '60 м',
            '97 м',
        ],
        rightAnswer: 4
    },
    {
        question: 'Әбілхан Қастеев кім екенін анықтаңыз.',
        options: [
            'Зеттеуші',
            'Жазушы',
            'Сазгер',
            'Суретші',
            'Тарихшы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Әз Жәнібек ханның кеңесшісін көрсетіңіз.',
        options: [
            'Әйтеке би',
            'Төле би',
            'Жиренше шешен',
            'Бұқар жырау',
            'Қазыбек би',
        ],
        rightAnswer: 2
    },
    {
        question: 'Мемлекеттік елтаңбаның авторларын анықтаңыз.',
        options: [
            'Шота Уәлиханов, Жадыра Дәрібаева',
            'Шота Уәлиханов, Жандарбек Мәлібеков',
            'Жандарбек Мәлібеков, Шәмші қалдаяқов',
            'Нұрсұлтан Назарбаев, Шәмші Қалдаяқов',
            'Шәкен Ниязбеков, Жандарбек Мәлібеков',
        ],
        rightAnswer: 1
    },
    {
        question: '«Диуани лұғат –ат түрік» кітабының авторын көрсетіңіз.',
        options: [
            'Махмұд Қашқари',
            'Әбу Насыр әл-Фараби',
            'Жүсіп Баласағұни',
            'С. Кеңесбаев',
            'Ахмет Яссауи',
        ],
        rightAnswer: 0
    },
    {
        question: 'Ш. Айманов еңбек еткен саланы көрсетіңіз.',
        options: [
            'Мүсін өнері',
            'Саз өнері',
            'Кәсіпкер',
            'Жазушы',
            'Кино өнері',
        ],
        rightAnswer: 4
    },
    {
        question: 'Талғат Мұсабаев кім екенін табыңыз.',
        options: [
            'Әнші',
            'Тарихшы',
            'Әртіс',
            'Ғарышкер',
            'Ақын',
        ],
        rightAnswer: 3
    },
    {
        question: '«Екінші Аристотель» деп атанған ғалымды анықтаңыз.',
        options: [
            'Қ.И.Иасауи',
            'Әли ибн Сина',
            'Әл-Фараби',
            'Анақарыс',
            'Платон',
        ],
        rightAnswer: 2
    },
    {
        question: 'Бауыржан Момышұлы кім екенін анықтаңыз.',
        options: [
            'Батыр',
            'Жазушы және Үш мәрте Кеңес Одағының батыры',
            'Сазгер, әнші',
            'Ұшқыш',
            'Мұғалім, оқытушы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақтың алғашқы академигін көрсетіңіз.',
        options: [
            'Қ.Сәтпаев',
            'Н.Сауранбаев',
            'Ж.Жабаев',
            'С.Королев',
            'Ғ.Айдаров',
        ],
        rightAnswer: 0
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
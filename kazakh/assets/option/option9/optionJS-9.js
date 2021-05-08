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
        question: 'Қоршаған ортаны қорғаудың дүниежүзілік күнінің мақсаты:',
        options: [
            'Мәдениетке шақыру',
            'Табиғатты қорғау мәселесіне халықты шақыру',
            'Қонаққа шақыру',
            'Білім алуға халықты шақыру',
            'Денсаулық сақтауға шақыру',
        ],
        rightAnswer: 1
    },
    {
        question: 'Республика астанасы Астана қаласына қашан көшірілгенін белгілеңіз.',
        options: [
            '1995ж.',
            '1996ж.',
            '1997ж.',
            '1991ж.',
            '1993ж.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Көне түркі ескерткіштеріне жататын жазбаларды көрсетіңіз.',
        options: [
            'Қожа Ахмет Йасауи кесенесі',
            'Алтын адам',
            'Алаша хан кесенесі',
            'Орхон-Енесей жазбалары',
            'Айша бибі кесенесі',
        ],
        rightAnswer: 3
    },
    {
        question: 'Т.Әубәкіров ғарышқа ұшқан жерді табыңыз.',
        options: [
            'Ақтау',
            'Ереймен',
            'Ақтөбе',
            'Көкшетау',
            'Байқоңыр',
        ],
        rightAnswer: 4
    },
    {
        question: 'Ш. Аймановтың өмір сүрген жылдарын көрсетіңіз.',
        options: [
            '1899-1974ж.',
            '1914-1970ж.',
            '1904-1975ж.',
            '1915-1980ж.',
            '1916-1985ж.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақ музыкасын әлемге тұңғыш танытқан әншіні көрсетіңіз.',
        options: [
            'К.Қуанышбаев',
            'К.Бәйсейітова',
            'Ә.Қашаубаев',
            'Б.Төлегенова',
            'Қ.Жандарбекова',
        ],
        rightAnswer: 2
    },
    {
        question: 'Білім заңының қабылдануы қай қатарға тән, белгілеңіз',
        options: [
            '1998 жыл, 7 қазан',
            '1993 жыл, 5 сәуір',
            '1999 жыл, 5 қаңтар',
            '1999 жыл, 7 маусым',
            '1997 жыл, 21 ақпан',
        ],
        rightAnswer: 3
    },
    {
        question: 'Шешенге ең қажетті қасиетті табыңыз',
        options: [
            'Келісімпаз болу',
            'Өзін көрсету',
            'Көп тіл білу',
            'Көп сөйлеу',
            'Сөзге тапқырлық',
        ],
        rightAnswer: 4
    },
    {
        question: 'Әбу насыр Әл-Фарабидің туған қаласын көрсетіңіз',
        options: [
            'Дамск',
            'Отырар',
            'Самархант',
            'Сайрам',
            'Тараз',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сидней олимпиядасының чемпионын белгілеңіз',
        options: [
            'Ермахан Ыбырайымов',
            'Жақсылық Үшкемпіров',
            'Бекзат Саттарханов',
            'Дәулет Тұрлыханов',
            'Серік Қонақбаев',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ш.Аймановтың туған жерін белгілеңіз',
        options: [
            'Қарағанды облысы',
            'Алматы облысы',
            'Оңтүстік Қазақстан облысы',
            'Павлодар облысы',
            'Талдықорған облысы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Мемлекеттік елтаңбаның авторларын анықтаңыз.',
        options: [
            'Шәкен Ниязбеков, Жандарбек Мәлібеков.',
            'Шота Уәлиханов, Жадыра Дәрібаева',
            'Нұрсұлтан Назарбаев, Шәмші Қалдаяқов',
            'Жандарбек Мәлібеков, Шәмші қалдаяқов',
            'Шота Уәлиханов, Жандарбек Мәлібеков.',
        ],
        rightAnswer: 4
    },
    {
        question: '«Тілден артық қазына жоқ,' + '<br/>' + 'Тілден артық қасиет жоқ» сөздерінің авторын табыңыз.',
        options: [
            'Н.Назарбаев',
            'С.Торайғыров',
            'Б.Момышұлы',
            'А.Жұбанов',
            'Ә.Тәжібаев',
        ],
        rightAnswer: 0
    },
    {
        question: 'Абайдың әжесін табыңыз.',
        options: [
            'Зере',
            'Айғаным',
            'Айгүл',
            'Ұлжан',
            'Шолпан',
        ],
        rightAnswer: 0
    },
    {
        question: '«Қазақ» газетінің бас редакторын анықтаңыз',
        options: [
            'Ахмет Байтұрсынов',
            'Рахымжан Дүйсебаев',
            'Ешмұхамед Абылайханов',
            'Мұхамеджан Сералин',
            'Міржақып Дулатов',
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
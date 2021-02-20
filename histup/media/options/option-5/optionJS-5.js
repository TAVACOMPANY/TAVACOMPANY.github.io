/* все ответы */
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');

/* все наши вопросы */
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
        question: 'Определите правильную хронологическую последовательность: 1. «Военный коммунизм»; 2. Инициатива И.Н. Худенко по испольхованию экономических методов управления сельским хозяйством; 3. Установление рыночных отношений; 4. Новая экономическая политика; 5. Целина.: ',
        options: [
            '1, 4, 5, 2, 3',
            '5, 3, 2, 1, 4',
            '4, 2, 3, 1, 5',
            '3, 2, 5, 4, 1',
            '4, 3, 1, 2, 5',
        ],
        rightAnswer: 0
    },
    {
        question: 'Выступили одновременно и против царского правительства, и против ханской власти повстанцы: ',
        options: [
            'Сырыма Датова и Исатай Тайманова',
            'Кенесары Касымова и Исатая Тайманова',
            'Кенесары Касымова и Сырыма Датова',
            'Амангелды Иманова и Сырыма Датова',
            'Жоламана Тленшиева и Кенесары Касымова',
        ],
        rightAnswer: 0
    },
    {
        question: 'Древних жителей Казахстана древнегреческии историк Геродот называл: ',
        options: [
            'Саки',
            '«Туры на резвых конях»',
            '«Великие мужи»',
            'Массагеты',
            '«Великие скифы»',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кюй «Аксак кулан» был создан еще в эпоху: ',
        options: [
            'Тюркского каганата',
            'Золотой Орды',
            'Кимакского каганата',
            'Казахского ханства',
            'Караханидов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Определите правильную хронологическую последовательность событий: 1. Взят курс на перестройку; 2. Утверждена должность Президента Казахской ССР; 3. Декабрьские события в Алма-Ате; 4. Забастовка шахтеров Караганды; 5. Августовский путч.: ',
        options: [
            '3, 2, 5, 4, 1',
            '4, 2, 3, 1, 5',
            '1, 3, 2, 5, 4',
            '4, 3, 1, 2, 5',
            '1, 3, 4, 2, 5',
        ],
        rightAnswer: 4
    },
    {
        question: 'Шокан Уалиханов в  1947 г. поступил в Сибирский кадетский корпус в городе: ',
        options: [
            'Оренбург',
            'Омск',
            'Уральск',
            'Семипалатинск',
            'Акмолинск',
        ],
        rightAnswer: 1
    },
    {
        question: 'В поединке с джунгарским батыром в 1652 году погиб хан: ',
        options: [
            'Керей',
            'Абулхаир',
            'Жангир',
            'Тауке',
            'Абылай',
        ],
        rightAnswer: 2
    },
    {
        question: 'Западнотюркский каганат образовался в: ',
        options: [
            'XI в.',
            'VIII в.',
            'IX в.',
            'X в.',
            'VII в.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Первым президентом Академии наук Казахской ССР избран: ',
        options: [
            'С. Садвакасов',
            'Б. Ашекеев',
            'К. Сатпаев',
            'М. Ауезов',
            'Ф. Голощекин',
        ],
        rightAnswer: 2
    },
    {
        question: 'Наиболее крупный памятник древнекаменного века в Центральном Казахстане - стоянка: ',
        options: [
            'Батпак',
            'Шебир',
            'Усть-Нарым',
            'Шульбинка',
            'Пеньки',
        ],
        rightAnswer: 0
    },
    {
        question: 'Чингисхан одержал победу над найманами в: ',
        options: [
            '1204 г.',
            '1206 г.',
            '1080 г.',
            '1237 г.',
            '1175 г.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Согласно легенде, за Уйсуном закрепили: ',
        options: [
            'Младший Жуз',
            'Средний Жуз',
            'Устюрт',
            'Старшый Жуз',
            'Туркестан',
        ],
        rightAnswer: 3
    },
    {
        question: 'Период существования Тюргешского каганата: ',
        options: [
            '704 – 756 гг.',
            '552 – 603 гг.',
            '942 – 1212 гг.',
            '1128 – 1213 гг',
            '603 – 704 гг.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Термин «нуклеус» означает: ',
        options: [
            'Короткое метательное копье',
            'Орудие труда, обработанное с двух сторон',
            'рудие труда, используемое для обработки шкур',
            'Орудие труда, используемое в качестве ударного и режущего инструмента',
            'Часть каменного желвака, от которого отбивались пластины для изготовления каменных орудии труда',
        ],
        rightAnswer: 4
    },
    {
        question: 'Древнегреческий историк, описавший подвиг Ширака: ',
        options: [
            'Страбон',
            'Помпей Трог',
            'Полиен',
            'Арриан',
            'Геродот',
        ],
        rightAnswer: 2
    },
    {
        question: 'Наиболее древний памятник сакских племен: ',
        options: [
            'Батпак',
            'Пеньки',
            'Дандыбай',
            'Музбель',
            'Тагискен',
        ],
        rightAnswer: 4
    },
    {
        question: 'Казахский просветитель, действительный член Семипалатинского статистического комитета: ',
        options: [
            'Ы. Алтынсарин',
            'А. Кунанбаев',
            'Ш. Уалиханов',
            'М. Купеев',
            'М. Дулатов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Был осужден в 1952 г. на 25 лет лишения свободы ученый – историк: ',
        options: [
            'С. Муканов',
            'Е. Бекмаханов',
            'С. Сейфуллин',
            'М. Дулатов',
            'Н. Шухов',
        ],
        rightAnswer: 1
    },
    {
        question: 'В 1920–1930-х гг. в «национал-уклонизме» были обвинены: ',
        options: [
            'А. Байтурсынов и А. Букейханов',
            'Л. Мирзоян и Ф. Голощёкин',
            'С. Садвакасов и С. Ходжанов',
            'М. Ауезов и С. Муканов',
            'М. Дулатов и Ж. Аймаутов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Автор книги «Диуани лугат-ат тюрк»: ',
        options: [
            'Кашгари',
            'К.Жалаири',
            'М.Хайдар',
            'А.Яссауи',
            'Баласагуни',
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
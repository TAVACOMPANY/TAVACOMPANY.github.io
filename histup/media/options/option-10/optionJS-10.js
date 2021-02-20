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
        question: 'Расположите в порядке, соответствующем времени возникновения государств (от раннего к позднему): 1. Кимакский каганат  2. Карлукский каганат  3. Западнотюркский каганат 4. Государство Караханов: ',
        options: [
            '1.4.2.3',
            '2.4.1.3',
            '3.2.1.4',
            '4.1.3.2',
            '2.1.3.4',
        ],
        rightAnswer: 2
    },
    {
        question: 'Иван Грозный для борьбы с ханом Кучумом стремился заключить военный союз с: ',
        options: [
            'Тауке',
            'Есимом',
            'Хакназаром',
            'Таукелем',
            'Кереем',
        ],
        rightAnswer: 2
    },
    {
        question: 'Событию 1978 года относится: ',
        options: [
            'Демонстрация в Целинограде',
            'Издание книги «Аз и Я»',
            'Волнения в Жанаозене',
            'Разоблачение культа личности Сталина',
            'Принятие Конституции Казахской ССР',
        ],
        rightAnswer: 4
    },
    {
        question: 'Восстание под предводительством Сырыма Датова произошло в: ',
        options: [
            '1791-1838 гг.',
            '1773-1775 гг.',
            '1803-1846 гг.',
            '1837-1847 гг.',
            '1783-1797 гг.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Наряду с тюркским письмом в VI-IX вв. широкое распростанение на территории Казахстана получило письмо: ',
        options: [
            'Греков',
            'Согдийцев',
            'Китайцев',
            'Персов',
            'Арабов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Одежду желтого или синего цвета у сакских племен носили: ',
        options: [
            'Торговцы',
            'Воины',
            'Цари и вельможи',
            'Скотоводы и земледельцы',
            'Служители культа',
        ],
        rightAnswer: 3
    },
    {
        question: 'Гунны сокрушили Лю-Бана и подчинили китайцев: ',
        options: [
            '209 г. до н.э.',
            '203 г. до н.э.',
            '188 г. до н.э.',
            '201 г. до н.э.',
            '174 г. до н.э.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Курс на ускорение социально-экономического развития страны был взят на Апрельском пленуме КПСС в: ',
        options: [
            '1989 г.',
            '1986 г.',
            '1978 г.',
            '1985 г.',
            '1979 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Один из организаторов борьбы народа против джунгар, дальновидный политик, пользующийся авторитетом среди чингизидов и батыров: ',
        options: [
            'Каип',
            'Керей',
            'Айшуак',
            'Абулхаир',
            'Сарым',
        ],
        rightAnswer: 3
    },
    {
        question: 'В 1391 г. произошло сражение войск Эмира Тимура и Токтамыша в местности: ',
        options: [
            'Батпак',
            'Узгенд',
            'Кундузча',
            'Каталаун',
            'Чинги-Тура',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сардарбек Тургайского центра восстания 1916 года: ',
        options: [
            'Т.Бокин',
            'А.Бокейханов',
            'Т.Рыскулов',
            'А.Иманов',
            'Ж.Мамбетов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Чин, который Ш.Уалиханов, получил После окончание Сибирского кадетского корпуса: ',
        options: [
            'Капитана',
            'Майора',
            'Поручика',
            'Корнета',
            'Хорунжего',
        ],
        rightAnswer: 3
    },
    {
        question: 'Советник Могульского хана: ',
        options: [
            'Инак',
            'Инал',
            'Сюбаши',
            'Тегин',
            'Бек',
        ],
        rightAnswer: 0
    },
    {
        question: 'Против Эмира Тимура создали военный союз ханы: ',
        options: [
            'Ногайской Орды и Могулистана',
            'Кок-Орды и Сибирского ханства',
            'Ак-Орды и Ногайской Орды',
            'Могулистана и Ак-Орды',
            'Ногайской Орды И Крымского ханства',
        ],
        rightAnswer: 3
    },
    {
        question: 'Захоронение с жинщинами-жрицами обнаружено в могильнике: ',
        options: [
            'Байте',
            'Бесоба',
            'Сынтас',
            'Алтынасар',
            'Костобе',
        ],
        rightAnswer: 0
    },
    {
        question: 'Древнетюрской письменностью пользовались, населявшее берега рек Орхон, Керулен, Селенга и Аргун племя: ',
        options: [
            'Кереитов',
            'Киданей',
            'Жикилов',
            'Дурутов',
            'Меркитов',
        ],
        rightAnswer: 0
    },
    {
        question: 'В 1428 году избранный хан Абулхаир явился потомком: ',
        options: [
            'Тимурида',
            'Севлевкида',
            'Шайбанида',
            'Газневида',
            'Саманида',
        ],
        rightAnswer: 2
    },
    {
        question: 'В 1755 году царские власти провоцировали конфликт казахов с ',
        options: [
            'Узбеками',
            'Китайцами',
            'Джунгарами',
            'Башкирами',
            'Киргизами',
        ],
        rightAnswer: 3
    },
    {
        question: 'Лидер восстания во внутренней Орде: ',
        options: [
            'Жоламан Тленшиев',
            'Сырым Датов',
            'Кенесары Касымов',
            'Жанкожа Нурмухамедов',
            'Исатай Тайманов',
        ],
        rightAnswer: 4
    },
    {
        question: 'IV Чрезвычайный Всетуркестанский съезд в ноябре 1917 года провозгласил создание: ',
        options: [
            'Туркестанской Советской Автономии',
            'Туркестанской (Кокандской) автономии',
            'Казахской (Киргизской) АССР',
            'Казахской (Киргизской) ССР',
            'Автономии Алаш',
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
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
        question: 'Во второй половине XV века города Сыганак, Сауран, Сузак по договору между Казахским хансвтом и ханом Шайбани вошли в состав: ',
        options: [
            'Кок-Орды',
            'Казахского ханства',
            'Государства Шайбанидов',
            'Могулистана',
            'Государства Тимуридов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Государство, применявшее в отношении гуннов политику «разделяй и властвуй»: ',
        options: [
            'Греция',
            'Македония',
            'Римская империя',
            'Китай',
            'Россия',
        ],
        rightAnswer: 3
    },
    {
        question: 'Территория Бокеевской Орды в результате реформ 1867-1868 гг. вошла в состав: ',
        options: [
            'Оренбургского генерал-губернаторства',
            'Астраханской губернии',
            'Закаспийской губернии',
            'Туркестанского генерал-губернаторства',
            'Западно-Сибирского генерал-губернаторства',
        ],
        rightAnswer: 1
    },
    {
        question: 'Автор исторического источника «Тарих-и-Рашиди»: ',
        options: [
            'К. Джалаири',
            'Ю. Баласагуни',
            'М.Х.Дулати',
            'У. Халджи',
            'У. Кухистани',
        ],
        rightAnswer: 2
    },
    {
        question: 'Определите правильную хронологическую последовательность событий: 1. Избрание Абылая ханом  2. Основание Акмолинской крепости  3. Восстание Е. Пугачева  4. Указ Павла І о разрешении переходить на правый берег Яика  5. Избрание Айшуака во главе Ханского Совета ',
        options: [
            '1, 2, 3, 4, 5',
            '1, 3, 5, 4, 2',
            '5, 1, 2, 4, 3',
            '2, 4, 5, 3, 1',
            '3, 1, 5, 4, 2',
        ],
        rightAnswer: 1
    },
    {
        question: 'Исследователи эпохи бронзы на территории Казахстана: ',
        options: [
            'Ш. Уалиханов, В. Бартольд',
            'А. Маргулан, В. Алексеев',
            'И. Фальк, И. Георги',
            'А. Левшин, А. Добросмыслов',
            'П. Рычков, И. Андреев',
        ],
        rightAnswer: 1
    },
    {
        question: 'Вариант кыргызского эпоса «Манаса» сохранился до наших дней благодаря: ',
        options: [
            'А. Кунанбаеву',
            'Ш. Кудайбердиеву',
            'Ш. Уалиханову',
            'Ы. Алтынсарину',
            'М. Копееву',
        ],
        rightAnswer: 2
    },
    {
        question: 'Столицей Караханидов был город: ',
        options: [
            'Алмалык',
            'Каракорум',
            'Туркестан',
            'Сарайчик',
            'Баласагун',
        ],
        rightAnswer: 4
    },
    {
        question: 'Междоусобицы и вторжения китайских войск стали причинойй распада в 603 году каганата: ',
        options: [
            'Восточно-Тюркского',
            'Карлукского',
            'Западно-Тюркского',
            'Тюргешкского',
            'Тюркского',
        ],
        rightAnswer: 4
    },
    {
        question: 'Территория расселения уйсунов: ',
        options: [
            'Приаралье',
            'Жетысу',
            'Алтай',
            'Мангышлак',
            'Прииртышье',
        ],
        rightAnswer: 1
    },
    {
        question: 'Во времени правления хана Хакназара произошло событие: ',
        options: [
            'Орбулакская битва',
            'Набеги Эмира Тимура',
            'Борьба с узбекским ханом Абдаллахом',
            'Заключение военного союза с тангутами',
            'Присоединение Ногайской Орды',
        ],
        rightAnswer: 4
    },
    {
        question: 'Великий Шелковый путь начинался с территории: ',
        options: [
            'Ирана',
            'Казахстана',
            'Афганистана',
            'Китая',
            'Алтая',
        ],
        rightAnswer: 3
    },
    {
        question: 'В древности Гирканском морем называли: ',
        options: [
            'Аральское',
            'Черное',
            'Средиземное',
            'Балхаш',
            'Каспийское',
        ],
        rightAnswer: 4
    },
    {
        question: 'В ХІ веке огузский правитель Шахмалик захватил: ',
        options: [
            'Тараз',
            'Самарканд',
            'Туркестан',
            'Отрар',
            'Хорезм',
        ],
        rightAnswer: 4
    },
    {
        question: 'Одна из предпосылок образования  Казахского ханства были кризисные события во внутреннем и внешнем положении государтсв: ',
        options: [
            'Ногайской Орды и Монгулистана',
            'Ак–Орды и Ногайской Орды',
            'Монгулистана и ханства Абулхаира',
            'Кок–Орды и Государства кочевых узбеков',
            'Ногайской Орды и Сибирского ханства',
        ],
        rightAnswer: 2
    },
    {
        question: 'Русский поэт ХІХ в., интересовавшийся этнографией казахского народа, участием казахов в восстании Е. Пугачева: ',
        options: [
            'А. Пушкин',
            'М. Лермонтов',
            'И. Бунин',
            'А. Фет',
            'И. Крылов',
        ],
        rightAnswer: 0
    },
    {
        question: 'Карлукский каганат образовался в: ',
        options: [
            'XI в.',
            'X в.',
            'VII в.',
            'VI в.',
            'IX в.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основатель государства Караханидов: ',
        options: [
            'Бильге каган',
            'Каир хан',
            'Бумын каган',
            'Сатук Богра-хан',
            'Сулу каган',
        ],
        rightAnswer: 3
    },
    {
        question: 'В 1986 году Д. Кунаева на посту Первого секретаря ЦК КП Казахской ССР сменил: ',
        options: [
            'А. Коркин',
            'П. Пономаренко',
            'Н. Назарбаев',
            'Г. Колбин',
            'Л. Брежнев',
        ],
        rightAnswer: 3
    },
    {
        question: 'Согласно «Уставу об оренбургских киргизах (казахах)» 1824 г. территория Младшего жуза разделен на части(ей): ',
        options: [
            '6',
            '5',
            '2',
            '3',
            '4',
        ],
        rightAnswer: 3
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
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
        question: 'Связка из трех шаров, использовавшаяся в позднем палеолите как метательный снаряд при ловле зверей: ',
        options: [
            'Бифас',
            'Гарпун',
            'Рубило',
            'Дротик',
            'Болас',
        ],
        rightAnswer: 4
    },
    {
        question: 'Захоронение, обнаруженное в Берельском кургане №11, относится к: ',
        options: [
            '192 г. до н.э.',
            '388 г. до н.э.',
            '294 г. до н.э.',
            '390 г. до н.э.',
            '476 г. до н.э.',
        ],
        rightAnswer: 2
    },
    {
        question: 'В мае 1582 года казахские войска во главе с Тауекелем разбили: ',
        options: [
            'Абд ар-Рашида',
            'Абдаллаха II',
            'Мухаммеда Шайбани',
            'Баба-султана',
            'Абд аль-Латифа',
        ],
        rightAnswer: 3
    },
    {
        question: 'После Великой Отечественной войны определяющим фактором в формировании политического мировоззрения масс стал(-о): ',
        options: [
            'Становление гражданского общества',
            'Демократизация общества',
            'Политика гласности',
            'Пропаганда личности вождя',
            'Расширение прав и свобод советских людей',
        ],
        rightAnswer: 3
    },
    {
        question: 'Государственной премии СССР в 1974 г. было удостоено произведение А.Нурпеисова: ',
        options: [
            '«Кровь и пот»',
            '«Сырдарья»',
            '«Караганда»',
            '«Тернистый путь»',
            '«Биржан и Сара»',
        ],
        rightAnswer: 0
    },
    {
        question: 'В 1999 г. ЮНЕСКО объявила Астану: ',
        options: [
            '«Сердцем Евразии»',
            '«Городом ХХI века»',
            '«Городом солнца»',
            '«Городом мира»',
            '«Городом мечты»',
        ],
        rightAnswer: 3
    },
    {
        question: 'В назиданиях казахских акынов и жырау XVIII в. была выражена идея: ',
        options: [
            'Поддержки политики переселения крестьян',
            'Раскола Казахского ханства на три жуза',
            'Присоединения всей территории Казахстана к России',
            'Поддержки восстания уйгур и дунган в Китае',
            'Сохранения и упрочения независимости Казахского ханства',
        ],
        rightAnswer: 4
    },
    {
        question: 'Одно из последствий монгольского нашествия на территории Казахстана: ',
        options: [
            'Распространение буддизма',
            'Развитие городской культуры',
            'уничтожение Казахского ханства',
            'Разрушение присырдарьинских городов',
            'увелечение численности населения',
        ],
        rightAnswer: 3
    },
    {
        question: 'Историчиский труд, описывающий казахско-могульские отношения XVI - XVII вв.: ',
        options: [
            '«Сборник летописей»',
            '«Хроника»',
            '«Шынгыснаме»',
            '«Тарих-и-Рашиди»',
            '«Тюркская родословная»',
        ],
        rightAnswer: 1
    },
    {
        question: 'Восточно-Коунрадский молибденовый, Джездинский марганцевый рудники объединяет: ',
        options: [
            'Введены в строй в годы Великой Отечественной войны',
            'Открыты экспедицией Казахской Академии наук под руководством К.Сатпаева',
            'До национализации принадлежали иностранным акционерным обществам',
            'Вывели Казахстан на первое место по производству марганца и молибдена',
            'Одними из первых восстановлены после Великой Отечественной войны',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укрепление-городище раннежелезного века в Северном Казахстане: ',
        options: [
            'Бабиш-Молда',
            'Сынтас',
            'Чирик-Рабат',
            'Актау',
            'Аралтобе',
        ],
        rightAnswer: 3
    },
    {
        question: 'Государство найманов достигло своего расцвета в период правления хана: ',
        options: [
            'Наркеше Даяна',
            'Жамуки',
            'Кучлука',
            'Буйрыка',
            'Торы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Территория национально освободительного восстания 1870 года: ',
        options: [
            'Жетысу',
            'Ордабасы',
            'Мангыстау',
            'Тургай',
            'Костобе',
        ],
        rightAnswer: 2
    },
    {
        question: 'В 1797 году на ханский престол в младшем жузе был возведен султан: ',
        options: [
            'Семеке',
            'Нуралы',
            'Бокей',
            'Айшуак',
            'Касым',
        ],
        rightAnswer: 3
    },
    {
        question: 'Оборудование Запорожского ферросплавного завода в годы Великой Отечественной войны передано ферросплавному заводу города: ',
        options: [
            'Чимкент',
            'Алма-Ата',
            'Павлодар',
            'Усть-Каменогорск',
            'Актюбинск',
        ],
        rightAnswer: 4
    },
    {
        question: 'Создали государство ляо в 924 году, племена: ',
        options: [
            'Киданей',
            'Найманов',
            'Жалаиров',
            'Кыргызов',
            'Меркитов',
        ],
        rightAnswer: 0
    },
    {
        question: 'Самое древнее царское погребение, найденное в восточном казахстане относится к племенам: ',
        options: [
            'Дахов',
            'Даев',
            'Каспиев',
            'Аримаспов',
            'Исседонов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Руководитель восстания 1916 года в Семиречье: ',
        options: [
            'Сакен Сейфуллин',
            'Токаш Бокин',
            'Абдулгафар Жанбосынов',
            'Амангельды Иманов',
            'Алиби Джангильдин',
        ],
        rightAnswer: 1
    },
    {
        question: 'Автор стихотворения "Ленинградцы, дети мои!", написанного в 1941г.: ',
        options: [
            'С.Мауленов',
            'С.Муканов',
            'Ж.Саин',
            'Г.Мусрепов',
            'Ж.Жабаев',
        ],
        rightAnswer: 4
    },
    {
        question: 'Ставка Кангюев называлась: ',
        options: [
            'Суяб',
            'Чегучен',
            'Битянь',
            'Янгикент',
            'Чирик-рабат',
        ],
        rightAnswer: 2
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
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
        question: 'Талғаулы салалас құрмалас сөйлемді көрсетіңіз.',
        options: [
            'Бұл жерде я сен тұрасың, я мен тұрамын',
            'Ұялғанымнан да бетімнің оты шықты',
            'Бірде ұйқы еңсереді, бірде ерік еңсереді',
            'Сабырлы Олжабектің сасқаны соңша-орнынан атып тұрды',
            'Қолың қатты дейді, қорқып тұрмын',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кезектес салалас құрмалас сөйлемді табыңыз.',
        options: [
            'Түнгі кезекте болғандықтан, шаршап та отырмын',
            'Клубта кейде кино болады, кейде қызықты баяндамалар оқылады',
            'Онымен әр кеңескен сайын түрлі жаңалық естимін',
            'Экологияны сақтайық , соған ат салысайық',
            'Санжар өлеңді жақсы айтқанмен, өзін көрсете алмай жүр',
        ],
        rightAnswer: 1
    },
    {
        question: 'Мақалды толықтырыңыз. Өнер алды- ... тіл.',
        options: [
            'Қара',
            'Көк',
            'Қызыл',
            'Ақ',
            'Жасыл',
        ],
        rightAnswer: 2
    },
    {
        question: 'Наурыз мейрамын көрсетіңіз.',
        options: [
            '1 қаңтар',
            '25 қазан',
            '8 наурыз',
            '22 наурыз',
            '9 мамыр',
        ],
        rightAnswer: 3
    },
    {
        question: 'Барсакелмес қорығы қайда орналасқанын көрсетіңіз.',
        options: [
            'Арал теңізінің қасында',
            'Торғай облысында',
            'Семей облысында',
            'Алматы облысында',
            'Оңтүстік Қазақстан облысында',
        ],
        rightAnswer: 0
    },
    {
        question: 'Қазақстанның ең ірі өзендері.',
        options: [
            'Жайық, Сырдария, Іле, Есіл',
            'Ертіс, Сырдария, Іле, Жайық',
            'Есіл, Нұра, Жайық, Сырдария',
            'Есіл, Балқаш, Іле, Ертіс',
            'Арал, Балқаш, Іле, Ертіс',
        ],
        rightAnswer: 1
    },
    {
        question: 'Мақалды толықтырыңыз.' + '<br/>' + '... тас жарады, тас жармаса бас жарады.... тас жарады, тас жармаса бас жарады.',
        options: [
            'Тіс',
            'Қол',
            'Тіл',
            'Көз',
            'Бас',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ыңғайлас салалас құрмалас сөйлемді көрсетіңіз.',
        options: [
            'Ауылда бірде шам болады, бірде болмайды',
            'Риза болғаны сондай-мені құшақтай берді',
            'Қалаға не мен барамын, не сен барасың',
            'Таң атты, мен ояндым',
            'Қалаға мен барсам, сен болмай шықтың',
        ],
        rightAnswer: 3
    },
    {
        question: '«Әлде» жалғаулық шылауына тән құрмаластың түрін анықтаңыз.',
        options: [
            'Талғаулы салалас',
            'Себеп-салдар салалас',
            'Ыңғайлас салалас',
            'Кезектес салалас',
            'Қарсылықты салалас',
        ],
        rightAnswer: 0
    },
    {
        question: 'Қазақстанмен шектесетін мемлекеттерді көрсетіңіз.',
        options: [
            'Әзірбайжан, Ресей, Литва, Иран, Ауғанстан',
            'Ресей, Түркіменстан, Өзбекстан, Қырғызстан, Қытай',
            'Түркіменстан, Әзірбайжан, Иран, Ауғанстан',
            'Қытай, Ресей, Ирак, Ауғанстан',
            'Өзбекстан, Қырғызстан, Иран, Ауғанстан',
        ],
        rightAnswer: 1
    },
    {
        question: '«Человека прославляет труд» мақалының қазақша баламасын табыңыз.',
        options: [
            'Көз қорқақ , қол батыр',
            'Еңбек етсең емерсің',
            'Ердің атын еңбек шығарады',
            'Не ексең, соны орарсың',
            'Еңбек етсең ерінбей, тояды қарының тіленбей',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақстанның ежелгі қалаларын белгілеңіз.',
        options: [
            'Тараз, Жезқазған, Семей',
            'Ақтөбе, Түркістан, Атырау',
            'Павлодар, Қарағанды, Ақтау',
            'Түркістан, Тараз, Отырар',
            'Шымкент, Алматы, Отырар',
        ],
        rightAnswer: 3
    },
    {
        question: 'Қазақстанның жер көлемін анықтаңыз.',
        options: [
            '1700 мың шаршы шақырым',
            '1600 мың шаршы шақырым',
            '3700 мың шаршы шақырым',
            '1500 мың шаршы шақырым',
            '2700 мың шаршы шақырым',
        ],
        rightAnswer: 4
    },
    {
        question: 'Отан тақырыбындағы мақалды табыңыз.',
        options: [
            'Кітап – тілсіз мұғалім.',
            'Тәрбие басы - тіл',
            'Еңбек түбі – зейнет.',
            'Ғылым - теңіз.',
            'Отансыз адам - ормансыз бұлбұл.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қарсылықты салалас құрмалас сөйлемнің жалғаулығын көрсетіңіз.',
        options: [
            'Сондықтан',
            'Сонымен',
            'Да',
            'Немесе',
            'Бірақ',
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
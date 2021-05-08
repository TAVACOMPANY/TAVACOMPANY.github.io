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
        question: 'Қазақстанның ең ірі өзендері.',
        options: [
            'Есіл, Балқаш, Іле, Ертіс',
            'Есіл, Нұра, Жайық, Сырдария',
            'Арал, Балқаш, Іле, Ертіс',
            'Жайық, Сырдария, Іле, Есіл',
            'Ертіс, Сырдария, Іле, Жайық',
        ],
        rightAnswer: 4
    },
    {
        question: 'Әкеңнің әкесі сізге кім болатынын көрсетіңіз.',
        options: [
            'Көке',
            'Нағашы',
            'Баба',
            'Ата',
            'Бауыр',
        ],
        rightAnswer: 3
    },
    {
        question: 'Наурыз мерекесінің ең басты тағамы не?',
        options: [
            'Қазақша ет',
            'Палау',
            'Наурыз көже',
            'Салма',
            'Тұшпара',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақстан Республикасының тәуелсіздігінің белгісін көрсетіңіз.',
        options: [
            'Табиғаты',
            'Рәміздері',
            'Отаншылдығы',
            'Жері',
            'Ауа райы',
        ],
        rightAnswer: 1
    },
    {
        question: 'Достық туралы мақалды табыңыз',
        options: [
            '«Жаман жолдастан таяғым артық»',
            '«Білім кілті-тіл»',
            '«Көп қорқытады»',
            '«Өнер алды-қызыл тіл»',
            '«Сөздің көркі-мақал»',
        ],
        rightAnswer: 0
    },
    {
        question: '«Әлде» жалғаулық шылауына тән құрмаластың түрін анықтаңыз.',
        options: [
            'Ыңғайлас салалас',
            'Кезектес салалас',
            'Себеп-салдар салалас',
            'Қарсылықты салалас',
            'Талғаулы салалас',
        ],
        rightAnswer: 4
    },
    {
        question: 'Түсіндірмелі салаласты көрсетіңіз',
        options: [
            'Қыздар тоғайға шие теруге кетті.',
            'Анықтама ұқыпты жазылғанмен, қария оқи алмады',
            'Бес-алты айда келді',
            'Бір қарағанда-ақ біліп қойдым: бұл–Алматының және қала маңының картасы екен',
            'Олкөпті көрген дана қарт',
        ],
        rightAnswer: 3
    },
    {
        question: 'Отан тақырыбындағы мақалды табыңыз.',
        options: [
            'Тәрбие басы - тіл',
            'Кітап – тілсіз мұғалім',
            'Отансыз адам - ормансыз бұлбұл',
            'Ғылым - теңіз',
            'Еңбек түбі – зейнет',
        ],
        rightAnswer: 2
    },
    {
        question: 'Әжелерді, аналарды, апа-қарындасты құтықтайтын халықаралық мерекені табыңыз',
        options: [
            'Білім күні',
            'Халықаралық әйелдер күні',
            'Мұғалімдер күні',
            'Наурыз мерекесі',
            'Тәуелсіздік күні',
        ],
        rightAnswer: 1
    },
    {
        question: 'Наурыз мейрамын көрсетіңіз.',
        options: [
            '22 наурыз',
            '25 қазан',
            '9 мамыр',
            '1 қаңтар',
            '8 наурыз',
        ],
        rightAnswer: 0
    },
    {
        question: 'Талғаулы салалас құрмалас сөйлемді көрсетіңіз',
        options: [
            'Сабырлы Олжабектің сасқаны соңша-орнынан атып тұрды',
            'Қолың қатты дейді, қорқып тұрмын',
            'Ұялғанымнан да бетімнің оты шықты',
            'Бірде ұйқы еңсереді, бірде ерік еңсереді',
            'Бұл жерде я сен тұрасың, я мен тұрамын',
        ],
        rightAnswer: 4
    },
    {
        question: 'Мақалды толықтырыңыз: «Аз ... алтын, көп ... күміс»',
        options: [
            'Ой',
            'Негіз',
            'Ақыл',
            'Сөз',
            'Өмір',
        ],
        rightAnswer: 3
    },
    {
        question: 'Қарсылықты салалас сөйлемді табыңыз.',
        options: [
            'Ол дауыстарының шуылдамай, үйлесімді шығуын талап етті',
            'Не істесем де алдыма қойған мақсатқа жетуім керек',
            'Ардақ Саятты күтті, бірақ ол келмеді',
            'Арай хат жазып кетті',
            'Бүгін менің жалғыз інім келеді',
        ],
        rightAnswer: 2
    },
    {
        question: 'Салаластың түрін ажыратыңыз.' + '<br/>' + 'Ән басылып қалды, бірақ гитара сазы тоқталған жоқ.',
        options: [
            'Ыңғайлас',
            'Қарсылықты',
            'Түсіндірмелі',
            'Талғаулы',
            'Кезектес',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақстанның ежелгі қалаларын белгілеңіз.',
        options: [
            'Түркістан, Тараз, Отырар',
            'Шымкент, Алматы, Отырар',
            'Павлодар, Қарағанды, Ақтау',
            'Ақтөбе, Түркістан, Атырау',
            'Тараз, Жезқазған, Семей',
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
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
        question: 'Мектеп бітіргенде оқушы қандай білім алатынын анықтаңыз.',
        options: [
            'Бастауыш білім.',
            'Орта білім.',
            'Жоғары білім.',
            'Кәсіби білім',
            'Арнайы орта.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Мақалды аяқтаңыз. Еңбек етсең ерінбей, тояды қарның ... .',
        options: [
            'Сұранбай.',
            'Жыланбай.',
            'Ойланбай.',
            'Тіленбей.',
            'Білінбей.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кезектес салаласты табыңыз.',
        options: [
            'Қалада жаңа үйлер салынды.',
            'Машина жүрісін бірде шапшандатады, бірде баяулатып жүреді.',
            'Күн сайынғы бір жаңалық ананы бұрынғыдай онша мазасыздандырмайды.',
            'Жайлаудың көлдеріне сене беруге болмайды, құрғақшылық жылы тартылып қалады.',
            'Біз асыға кірдік.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Мына мақалды аяқтаңыз.' + '<br/>' + 'Мектеп – кеме,' + '<br/>' + 'Білім - ... .',
        options: [
            'Мұхит',
            'Көлшік',
            'Теңіз  ',
            'Көл',
            'Өзен',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дүниедегі ең қымбат адамды табыңыз.',
        options: [
            'Ана',
            'Апа',
            'Әже',
            'Әке',
            'Аға',
        ],
        rightAnswer: 0
    },
    {
        question: 'Мақалды толықтырыңыз.' + '<br/>' + '... ұстадан нұсқа',
        options: [
            'Азамат',
            'Ұста',
            'Дәрігер',
            'Ұшқыш',
            'Шебер',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кезектес салалас құрмалас сөйлемді табыңыз.',
        options: [
            'Экологияны сақтайық , соған ат салысайық',
            'Санжар өлеңді жақсы айтқанмен, өзін көрсете алмай жүр.',
            'Онымен әр кеңескен сайын түрлі жаңалық естимін.',
            'Түнгі кезекте болғандықтан, шаршап та отырмын.',
            'Клубта кейде кино болады, кейде қызықты баяндамалар оқылады.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Себеп-салдар салалас құрмалас сөйлемді белгілеңіз.',
        options: [
            'Мұхит келіп еді, Арман шыға жөнелді',
            'Мен үндемедім, бірақ өз пікірімде қалдым',
            'Биыл шөп қалың шықты, себебі жаңбыр көп жауды',
            'Олар біресе тоқтап демалады, біресе күн ұзақ жүреді',
            'Әке көрген оқ жонар, шеше көрген тон пішер',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақстанның солтүстігінде орналасқан қалаларды көрсетіңіз',
        options: [
            'Алматы, Қызылорда',
            'Көкшетау, Қостанай',
            'Маңғыстау, Ақтөбе',
            'Шымкент, Жамбыл',
            'Атырау, Орал',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сабақтас құрмалас сөйлемнің құрамы қалай анықталатынын көрсетіңіз.',
        options: [
            'Екі жай сөйлем',
            'Атаулы сөйлем, түсіндірмелі сөйлем',
            'Бағыныңқы, басыңқы',
            'Толымды, толымсыз сөйлем',
            'Жалғаулықты сөйлем, жалғаулықсыз сөйлем',
        ],
        rightAnswer: 2
    },
    {
        question: 'Мезгіл бағыныңқы сабақтас құрмалас сөйлемді табыңыз.',
        options: [
            'Көктем болғанмен, күн әлі жылынып кете қойған жоқ еді',
            'Кенжебек жауап іздеп көріп еді, орынды сөз ойына орала қоймады',
            'Абай араларынан кетісімен, сабыр бұйрық елге жайылды',
            'Ойын аяқталды, бірақ көрермендер асықпады',
            'Көктем енді келсе де, күн ысып кетті',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақстанның жер көлемін анықтаңыз.',
        options: [
            '1500 мың шаршы шақырым',
            '2700 мың шаршы шақырым',
            '3700 мың шаршы шақырым',
            '1700 мың шаршы шақырым',
            '1600 мың шаршы шақырым',
        ],
        rightAnswer: 1
    },
    {
        question: '«Екінші Мекке» деп атанған қаланы анықтаңыз.',
        options: [
            'Қызылорда',
            'Шымкент',
            'Тараз',
            'Семей',
            'Түркістан',
        ],
        rightAnswer: 4
    },
    {
        question: 'Ыңғайлас салалас құрмалас сөйлемді көрсетіңіз.',
        options: [
            'Ауылда бірде шам болады, бірде болмайды',
            'Таң атты, мен ояндым',
            'Қалаға не мен барамын, не сен барасың',
            'Риза болғаны сондай-мені құшақтай берді',
            'Қалаға мен барсам, сен болмай шықтың',
        ],
        rightAnswer: 1
    },
    {
        question: 'Білім кілті-тіл.' + '<br/>' + 'Мәтелдің дұрыс аудармасын көрсетіңіз.',
        options: [
            'Язык-ключ к знаниям.',
            'Язык и знание-сила.',
            'Знание-ключ к языку.',
            'Знание-сила.',
            'Люби и береги свой язык',
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
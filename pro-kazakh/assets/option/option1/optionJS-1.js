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
        question: 'Оқшау сөздер кездескенде, сөйлемде қандай тыныс белгісі қойылады?',
        options: [
            'тырнақша',
            'үтір',
            'нүктелі үтір',
            'қос нүкте',
            'нүкте',
        ],
        rightAnswer: 1
    },
    {
        question: 'Жіңішке дауысты сөзді табыңыз.',
        options: [
            'Қора',
            'Қауырсын',
            'Сауысқан',
            'Кілем',
            'Базар',
        ],
        rightAnswer: 3
    },
    {
        question: 'Бірыңғай мүшелерді байланыстыратын ыңғайластық жалғаулық шылаулар кайсы?',
        options: [
            'менен, бірақ, алайда',
            'бен, я, яки',
            'ма, ме, ше',
            'та, не, немесе',
            'және, мен, әрі',
        ],
        rightAnswer: 1
    },
    {
        question: 'Тек ашық буыннан құралған сөзді табыңыз.',
        options: [
            'Алтай',
            'Өзге',
            'Шағала',
            'Қарағай',
            'Ойбай',
        ],
        rightAnswer: 2
    },
    {
        question: '«Бірде, біресе» шылауларымен жасалатын сөйлемнің түрін анықтаңыз.',
        options: [
            'Кезектес салалас құрмалас',
            'Себеп-салдар салалас құрмалас',
            'Ыңғайлас салалас құрмалас',
            'Түсіндірмелі салалас құрмалас',
            'Қарсылықты салалас құрмалас',
        ],
        rightAnswer: 0
    },
    {
        question: 'Қай дауысты дыбыс әрі жуан, әрі жіңішке дауыстыға жататынын анықтаңыз.',
        options: [
            'о',
            'и',
            'а',
            'е',
            'ү',
        ],
        rightAnswer: 1
    },
    {
        question: 'Төл сөзге байланысты тыныс белгілері дұрыс қойылған сөйлемді аңықтаңыз:',
        options: [
            'Мұғалім «Балалар, бақылау жұмысын жақсы орындадыңдар», -деді.',
            'Мұғалім - Балалар, бақылау жұмысын жақсы орындадыңдар, -деді.',
            'Мұғалім: Балалар, бақылау жұмысын жақсы орындадыңдар,-деді.',
            'Мұғалім - «Балалар, бақылау жұмысын жақсы орындадыңдар», -деді',
            'Мұғалім: «Балалар, бақылау жұмысын жақсы орындадыңдар», -деді.',
        ],
        rightAnswer: 4
    },
    {
        question: '«Программное обеспечение» сөзі орыс тілінен қазақ тіліне қалай аударылады?',
        options: [
            'бағдарлама',
            'архитектура',
            'бағдарламалық қамсыздандыру',
            'ақпарат',
            'аппараттық қамсыздандыру',
        ],
        rightAnswer: 2
    },
    {
        question: '«Қой аузынан шөп алмас» фразиологизмі қандай мінезді білдіретінін табыңыз.',
        options: [
            'Жалқау',
            'Момын',
            'Тентек',
            'Қатал',
            'Сараң',
        ],
        rightAnswer: 1
    },
    {
        question: 'Бірыңғай мүшелердің анықтамасын табыңыз.',
        options: [
            'әр түрлі сұраққа жауап беретін сөйлем мүшелері',
            'дыбысталуы бірдей сөйлем мүшелері',
            'синтаксистік қызметі бірдей, өзара тұлғалас сөйлем мүшелері',
            'тұлғасы әр түрлі сөйлем мүшелері',
            'әр сөз табына жататын сөйлем мүшелері',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қарсылықты салалас құрмалас сөйлемнің жалғаулықтарын табыңыздар',
        options: [
            'Және, әрі, да, де',
            'Өйткені, сондықтан, себебі',
            'Бірақ, дегенмен, алайда',
            'Бірде, біресе',
            'Не, немесе, яғни',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қаратпа сөз белгілі бір сөйлем мүшесінің қызметін атқарады ма?',
        options: [
            'толықтауыш қызметін атқарады',
            'сөйлем мүшесінің қызметін атқармайды',
            'баяндауыш қызметін атқармайды',
            'пысықтауыш қызметін атқарады',
            'бастауыш қызметін атқарады',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сөздің басында жазылмайтын әріпті көрсетіңіз.',
        options: [
            'ә',
            'қ',
            'ғ',
            'ы',
            'ң',
        ],
        rightAnswer: 4
    },
    {
        question: '«Бағдарламалау» сөзі қазақ тілінен орыс тіліне қалай аударылады?',
        options: [
            'проектирование',
            'программирование',
            'программа',
            'алгоритмизация',
            'накопитель',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сөйлемнің түрін анықтаңыз.' + '</br>' + 'Ол сабаққа дайындалмаған себебі: кеше кітапханадан кітап таба алмады.',
        options: [
            'Түсіндірмелі салалас құрмалас',
            'Ыңғайлас салалас құрмалас',
            'Кезектес салалас құрмалас',
            'Талғаулы салалас құрмалас',
            'Қарсылықты салалас құрмалас',
        ],
        rightAnswer: 0
    },
    {
        question: 'Үндестік заңына бағынбайтын сөзді табыңыз.',
        options: [
            'Жарыс',
            'Арман',
            'Жүйрік',
            'Атақты',
            'Жеңімпаз',
        ],
        rightAnswer: 4
    },
    {
        question: 'Буын үндестігіне бағынбай тұрған біріккен сөздерді табыңыз.',
        options: [
            'Халықаралық, өнеркәсіп',
            'Ақсуат, Сарысу',
            'Көкшетау, Екібастұз',
            'Бірсігүні, ендігәрі',
            'Сарыарқа, Талдықорған',
        ],
        rightAnswer: 2
    },
    {
        question: 'Өткен шақтағы етістікті табыңыз.',
        options: [
            'Ақша',
            'Бітірді',
            'Келе жатыр',
            'Ақшыл',
            'Көрмеу',
        ],
        rightAnswer: 1
    },
    {
        question: 'Үстеу қандай сөз табы.',
        options: [
            'Заттардың қимыл- әрекетін білдіретін сөз табы',
            'Заттың сындық белгісін білдіретін сөз табы',
            'Есім сөздердің орнына жұмсалатын сөз табы',
            'Қимылдың жайы – күйін, әр түрлі белгілерін сипаттайтын сөз табы ',
            'Заттың сандық белгісін білдіретін сөз табы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Қыстырма сөзді табыңыз.',
        options: [
            'Сірә',
            'Қызыл',
            'Жеті',
            'Балам',
            'Ей',
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
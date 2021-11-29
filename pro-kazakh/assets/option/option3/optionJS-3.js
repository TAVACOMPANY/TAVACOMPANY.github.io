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
        question: 'Тұйық етістікті анықтаңыз.',
        options: [
            'Айтыс',
            'Ұнау',
            'Қу',
            'Көрсет',
            'Жу',
        ],
        rightAnswer: 1
    },
    {
        question: '«Деректер қоры» сөзі қазақ тілінен орыс тіліне қалай аударылады?',
        options: [
            'алгоритм',
            'накопитель',
            'проек',
            'база данных',
            'программа',
        ],
        rightAnswer: 3
    },
    {
        question: 'Күрделі сын есімді табыңыз',
        options: [
            'Таза',
            'Орта бойлы',
            'Шыдамды',
            'Ұзақ',
            'Тұнық',
        ],
        rightAnswer: 1
    },
    {
        question: 'Түсіндірмелі салалас құрмалас сөйлемнің жасалу жолын көрсетіңіз.',
        options: [
            'Жалғаулықсыз',
            'Сөйткенмен',
            'Сондықтан',
            'Бірде',
            'Немесе',
        ],
        rightAnswer: 2
    },
    {
        question: '«Желсіз түнде жарық ай» қай ақынның өлеңі?',
        options: [
            'Абай Құнанбайұлы',
            'Қасым Аманжолов',
            'Иса Байзақов',
            'Мұқағали Мақатаев',
            'Шәкәрім Құдайбердиев',
        ],
        rightAnswer: 0
    },
    {
        question: 'Синонимдік қатар құрайтын зат есімді табыңыз.',
        options: [
            'Ем,дәрі',
            'Әдемі, сұлу',
            'Жоғары, төмен',
            'Суретші, сурет',
            'Дәстүр, салт',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сөйлемнің ортасында келген қыстырма сөзді табыңыз.',
        options: [
            'Бүгін күн ашық екен, әй',
            'Біріншіден, Асқардың жасы кіші',
            'Қысқасы, сен үйде отырасың',
            'Әлбетте, сенікі дұрыс',
            'Мен, сірә, киноға бармайтын шығармын',
        ],
        rightAnswer: 4
    },
    {
        question: 'Құрмалас сөйлем түрлерін анықтаңыз.',
        options: [
            'Хабарлы, сұраулы.',
            'Жақты , жақсыз.',
            'Салалас, сабақтас, аралас.',
            'Жалаң, жайылма.',
            'Толымды, толымсыз.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Топтау сан есімді көрсетіңіз.',
        options: [
            'Әркім',
            'Үш- үштен',
            'Туып- өскен',
            'Бәйтерек',
            'Әйгілі',
        ],
        rightAnswer: 1
    },
    {
        question: 'Болымды етістікті табыңыз.',
        options: [
            'Ұшпады',
            'Жумады',
            'Сүртті',
            'Әкелмеді',
            'Көрсетпеді',
        ],
        rightAnswer: 2
    },
    {
        question: 'Негізгі етістікті табыңыз.',
        options: [
            'Салынды',
            'Әперді',
            'Көр',
            'Ашуланды',
            'Берер',
        ],
        rightAnswer: 2
    },
    {
        question: 'Өздік есімдігін табыңыз.',
        options: [
            'Өркендету',
            'Өздеріңіз',
            'Мүлдем',
            'Көңілсіз',
            'Көрсеткіз',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қыстырма сөзді табыңыз.',
        options: [
            'Ата, немереңіз келді.',
            'Өзің бір қызық жан екенсің.',
            'Алдымнан жақсы кездестің – ау, шырағым.',
            'Жолдас командир, жолдас комиссар.',
            'Қорыта келгенде, баяндама толық жасалған.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Себеп-салдар салаластың шылауын табыңыз.',
        options: [
            'бірақ, дегенмен',
            'өйткені, себебі',
            'және, әрі',
            'не, немесе',
            'бірде, біресе',
        ],
        rightAnswer: 1
    },
    {
        question: 'Бірыңғай мүшелерді байланыстыру үшін қандай жалғаулық шылау қолдану керек?' + '</br>' + 'Ол...биік,…аласа,…қатал,…жұмсақ,..мінезді,…шешен,…сараң сөзді еді.',
        options: [
            'бірде ',
            'немесе',
            'да',
            'бірақ',
            'және',
        ],
        rightAnswer: 0
    },
    {
        question: 'Оқшау сөзді көрсетіңіз.',
        options: [
            'шылау',
            'үстеу',
            'жалғаулық',
            'шырай',
            'қыстырма',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қатаң дауыссыз дыбыстарды көрсетіңіз.',
        options: [
            'н, р, у',
            'д, ж, з, һ',
            'қ, к, п, с',
            'й, л, м',
            'б, в, г, ғ',
        ],
        rightAnswer: 2
    },
    {
        question: '«Бірақ, дегенмен» шылауларымен жасалатын сөйлемнің түрін анықтаңыз.',
        options: [
            'Түсіндірмелі салалас құрмалас',
            'Қарсылықты салалас құрмалас',
            'Кезектес салалас құрмалас',
            'Себеп-салдар салалас құрмалас',
            'Ыңғайлас салалас құрмалас',
        ],
        rightAnswer: 1
    },
    {
        question: 'Түсіндірмелі салалас құрмалас сөйлем жалғаулықтарын анықтаңыз.',
        options: [
            'Сөйтсе де, әйтсе де',
            'Әйтпесе, немесе',
            'Жалғаулығы жоқ',
            'Өйткені, себебі',
            'Сол үшін, себебі',
        ],
        rightAnswer: 3
    },
    {
        question: 'Дауысты дыбыстардың еріннің қатысына қарай жіктелетін түрлерін көрсетіңіз.',
        options: [
            'еріндік, езулік',
            'қатаң, ұяң',
            'үнді, ұяң',
            'жуан, жіңішке',
            'қысаң, ашық',
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
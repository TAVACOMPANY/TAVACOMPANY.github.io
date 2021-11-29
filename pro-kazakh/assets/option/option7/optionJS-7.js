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
        question: 'Дауысты дыбыстар тілдің қатысына қарай қандай түрлерге бөлінетінін белгілеңіз.',
        options: [
            'Қатаң, ұяң',
            'Жуан, жіңішке',
            'Ашық, қысаң',
            'Үнді, қатаң',
            'Езулік, еріндік',
        ],
        rightAnswer: 1
    },
    {
        question: '«Қауіп төндіреді» сөзі қазақ тілінен орыс тіліне қалай аударылады?',
        options: [
            'понижается аппетит',
            'инфекционные болезни',
            'нервная система',
            'вызывает опасность',
            'понижается',
        ],
        rightAnswer: 3
    },
    {
        question: '«Информационная сеть» сөзі орыс тілінен қазақ тіліне қалай аударылады?',
        options: [
            'ауқымды желі',
            'ақпараттық желі',
            'ақпараттық орта',
            'жергілікті желі',
            'желі',
        ],
        rightAnswer: 1
    },
    {
        question: 'Түсіндірмелі салалас құрмалас сөйлем жалғаулықтарын анықтаңыз.',
        options: [
            'Әйтпесе, немесе',
            'Жалғаулығы жоқ',
            'Өйткені, себебі',
            'Сол үшін, себебі',
            'Сөйтсе де, әйтсе де',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қарсылықты салалас құрмалас сөйлем шылауын көрсетіңіз.',
        options: [
            'Бірақ',
            'Әйтпесе',
            'Себебі',
            'Әлде',
            'Және',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сөйлемнің түрін анықтаңыз.' + '</br>' + 'Ол сабаққа дайындалмаған себебі: кеше кітапханадан кітап таба алмады.',
        options: [
            'Ыңғайлас салалас құрмалас',
            'Түсіндірмелі салалас құрмалас',
            'Кезектес салалас құрмалас',
            'Қарсылықты салалас құрмалас',
            'Талғаулы салалас құрмалас',
        ],
        rightAnswer: 1
    },
    {
        question: '«Информационная система» сөзі орыс тілінен қазақ тіліне қалай аударылады?',
        options: [
            'ақпараттық орта',
            'ақпаратты өңдеу',
            'ақпараттық сала',
            'ақпараттық прогресс',
            'ақпараттық жүйе',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сын есім нені білдіретінін көрсетіңіз.',
        options: [
            'Заттың атын',
            'Заттың іс- қимылының мекенін',
            'Заттың түр-түсін',
            'Заттың қимылын',
            'Заттың іс- қимылының мезгілін',
        ],
        rightAnswer: 2
    },
    {
        question: 'Себеп-салдар салаластың шылауын табыңыз.',
        options: [
            'және, әрі',
            'өйткені, себебі',
            'бірақ, дегенмен',
            'бірде, біресе',
            'не, немесе',
        ],
        rightAnswer: 1
    },
    {
        question: 'Үстеу қандай сөз табы.',
        options: [
            'Заттардың қимыл- әрекетін білдіретін сөз табы',
            'Заттың сындық белгісін білдіретін сөз табы',
            'Қимылдың жайы – күйін, әр түрлі белгілерін сипаттайтын сөз табы',
            'Есім сөздердің орнына жұмсалатын сөз табы',
            'Заттың сандық белгісін білдіретін сөз табы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қыстырма сөзді табыңыз',
        options: [
            'Алдымнан жақсы кездестің – ау, шырағым.',
            'Ата, немереңіз келді.',
            'Қорыта келгенде, баяндама толық жасалған',
            'Жолдас командир, жолдас комиссар.',
            'Өзің бір қызық жан екенсің.',
        ],
        rightAnswer: 2
    },
    {
        question: '«Ақпарат» сөзі қазақ тілінен орыс тіліне қалай аударылады?',
        options: [
            'алгоритмизация',
            'информация',
            'проектирование',
            'программа',
            'программирование',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қаратпа сөз белгілі бір сөйлем мүшесінің қызметін атқарады ма?',
        options: [
            'пысықтауыш қызметін атқарады',
            'бастауыш қызметін атқарады',
            'толықтауыш қызметін атқарады',
            'баяндауыш қызметін атқармайды',
            'сөйлем мүшесінің қызметін атқармайды',
        ],
        rightAnswer: 4
    },
    {
        question: 'Тұйық етістікті анықтаңыз.',
        options: [
            'Қу',
            'Ұнау',
            'Жу',
            'Айтыс',
            'Көрсет',
        ],
        rightAnswer: 1
    },
    {
        question: 'Бірыңғай мүшелерді байланыстыру үшін қандай жалғаулық шылау қолдану керек?' + '<br>' + 'Ол...биік,…аласа,…қатал,…жұмсақ,..мінезді,…шешен,…сараң сөзді еді.',
        options: [
            'бірде',
            'да',
            'бірақ',
            'немесе',
            'және',
        ],
        rightAnswer: 0
    },
    {
        question: 'Төл сөздің дұыс анықтамасын көрсетіңіз.',
        options: [
            'Біреудің сөзін бұлжытпай, өзгеріссіз беру',
            'Біреудің айтқан сөзінің өзгерген нұсқасы',
            'Өсиет сөз',
            'Бағыштап айтылған сөз',
            'Автордың өзінің айтқан сөзі',
        ],
        rightAnswer: 4
    },
    {
        question: 'Буын үндестігіне бағынбай тұрған біріккен сөздерді табыңыз.',
        options: [
            'Бірсігүні, ендігәрі',
            'Сарыарқа, Талдықорған',
            'Көкшетау, Екібастұз',
            'Халықаралық, өнеркәсіп',
            'Ақсуат, Сарысу',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ауыспалы осы шақта тұрған етістікті белгілеңіз.',
        options: [
            'Биле',
            'Билейді',
            'Билеген',
            'Биледі',
            'Билеу',
        ],
        rightAnswer: 1
    },
    {
        question: 'Өткен шақтағы етістікті табыңыз.',
        options: [
            'Көрмеу',
            'Ақша',
            'Ақшыл',
            'Бітірді',
            'Келе жатыр',
        ],
        rightAnswer: 3
    },
    {
        question: 'Қыстырма сөзді табыңыз.',
        options: [
            'Сірә',
            'Қызыл',
            'Ей',
            'Балам',
            'Жеті',
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
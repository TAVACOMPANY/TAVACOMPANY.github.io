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
        question: 'Баяндауыш қай сөз табынан жасалғанын көрсетіңіз: Нағыз теңіз романтикасы деген осы.',
        options: [
            'Етістік',
            'Үстеу',
            'Есімдік',
            'Одағай',
            'Зат есім',
        ],
        rightAnswer: 2
    },
    {
        question: 'Буын түрін анықтаңыз.',
        options: [
            'Тасымал',
            'Тұйық',
            'Буын',
            'Жалаң',
            'Жалғау',
        ],
        rightAnswer: 1
    },
    {
        question: '«Сән» дегеніміз не?.',
        options: [
            'киімді ұсыну',
            'киім өлшеу',
            'киімді көрсету',
            'киім кию мәдениеті',
            'киім тігу',
        ],
        rightAnswer: 3
    },
    {
        question: 'Төл сөзге байланысты тыныс белгілері дұрыс қойылған сөйлемді аңықтаңыз.',
        options: [
            '«Сен радио тыңдайсың ба, деп сұрады досым.»',
            '«Сен радио тыңдайсың ба»- деп сұрады досым.',
            '«Сен радио тыңдайсың ба?- деп сұрады досым.',
            'Сен радио тыңдайсың ба, деп сұрады досым.',
            '«Сен радио тыңдайсың ба?»- деп сұрады досым.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Буынға бөлінбейтін сөзді белгілеңіз.',
        options: [
            'Серт.',
            'Ереже.',
            'Уәде.',
            'Болжам.',
            'Қағида.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Қандай пернелер комбинациясы Windows-ң бас менюін автоматты түрде шақырады?',
        options: [
            'F2',
            'Ctrl+Esc',
            'Alt+F4',
            'Exit',
            'Бас меню',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сөйлемдегі есімдіктердің түрін анықтаңыз: Мен ешқашан елімді сатпаймын!',
        options: [
            'Жалпылау, белгісіздік.',
            'Сілтеу, жалпылау.',
            'Жіктеу, өздік.',
            'Жіктеу, болымсыздық.',
            'Жіктеу, сілтеу.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Ауыспалы осы шақта тұрған етістікті белгілеңіз.',
        options: [
            'Биледі',
            'Билеген',
            'Билейді',
            'Биле',
            'Билеу',
        ],
        rightAnswer: 2
    },
    {
        question: 'Операциялық жүйе қандай функцияларды атқарады?',
        options: [
            'Дұрыс жауап жоқ',
            'Компьютермен және түрлі шалғай құрылғылар арасында деректер алмасуды ұйымдастыру',
            'Еңгізу-шығару құрылғыларын іске қосу',
            'Файлдарды сақтау және ұйымдастыру',
            'Пайдаланушымен диалогты ұйымдастыру, аппаратураны және компьютер қорын басқару',
        ],
        rightAnswer: 4
    },
    {
        question: 'Word дегеніміз не?',
        options: [
            'Компьютер моделі',
            'Графикалық редактор',
            'Мәтіндік редактор',
            'Кестелік процессор',
            'Монитор моделі',
        ],
        rightAnswer: 2
    },
    {
        question: 'Күрделі етістікті табыңыз.',
        options: [
            'Барды',
            'Ойланып қалды',
            'Бастады',
            'Береді',
            'Айтуды',
        ],
        rightAnswer: 1
    },
    {
        question: '«Ашу- дұшпан, ақыл- дос. Ақылыңа ақыл.....» мақалды аяқтаңыз.',
        options: [
            'сал',
            'бер',
            'сөз',
            'қос',
            'айт',
        ],
        rightAnswer: 3
    },
    {
        question: 'Құрмалас сөйлем түрін анықтаңыз: Оқуға түспеймін, өйткені жұмыс істеуім керек.',
        options: [
            'Талғаулы',
            'Ыңғайластық',
            'Себеп-салдар',
            'Кезектес',
            'Түсіндірмелі',
        ],
        rightAnswer: 4
    },
    {
        question: 'Тек жіңішке дауысты дыбыстар қатарын анықтаңыз.',
        options: [
            'Ә, ө, і',
            'А, ә, е',
            'О, ө, у',
            'Э, о',
            'Ы, і, и',
        ],
        rightAnswer: 0
    },
    {
        question: 'Windows-та объекттің көшірілуі қалай жасалынады?',
        options: [
            'F5 функционалды пернесінің көмегімен',
            'Ctrl пернесін басып тұрып тышқанның оң жақ батырмасымен объектті сүйрету',
            'Ctrl пернесін басып тұрып тышқанның сол жақ батырмасымен объектті сүйрету',
            'Тышқанның сол жақ батырмасымен сүйретіп',
            'Shift пернесін басып тұрып объектті сүйрету',
        ],
        rightAnswer: 2
    },
    {
        question: '1 Мбайт нешеге тең?',
        options: [
            '1024 байт',
            '1024 Гбайт',
            '1204 байт',
            '1 байт',
            'Дұрыс жауап жоқ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Жекіру одағайын көрсетіңіз.',
        options: [
            'Кә -кә',
            'Жә',
            'Уһ',
            'Пай-пай',
            'Шөк',
        ],
        rightAnswer: 1
    },
    {
        question: 'Берілген жауаптардың қайсысы аппараттық жасауға жатпайды?',
        options: [
            'Жүйелік тақша',
            'Иілгіш дискінің контроллеры',
            'Қатты дискінің контроллеры',
            'Операциялық жүйе',
            'Орталық процессор',
        ],
        rightAnswer: 3
    },
    {
        question: 'Түсіндірмелі салалас құрмалас сөйлемнің жасалу жолын көрсетіңіз.',
        options: [
            'Жалғаулықсыз',
            'Немесе',
            'Бірде',
            'Сөйткенмен',
            'Сондықтан',
        ],
        rightAnswer: 4
    },
    {
        question: 'Файл аты, файл өлшемі, соңғы өзгертуінің уақыты мен мерзім және т.б. файл туралы мәліметтер жазылатын дискідегі арнайы орын қалай аталады?',
        options: [
            'Бума',
            'Кесте',
            'Файл',
            '"Мои документы"',
            'Жүйелік блок',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кезектес салалас құрмалас сөйлем шылауларын көрсетіңіз.',
        options: [
            'Бірде',
            'Өйткені',
            'Немесе',
            'Әйтсе де',
            'Сондықтан',
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
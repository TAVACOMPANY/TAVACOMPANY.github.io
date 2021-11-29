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
        question: 'Word программасы не үшін керек?',
        options: [
            'Жүйелік баптауларды атқару үшін',
            'Кестелік деректермен жұмыс істеу үшін, құрама деректер кестелерін жасау үшін',
            'Мәтін құжаттарын электронды түрде жасау және өңдеу үшін',
            'Компьютердің файлдық жүйесі бойынша іздеу',
            'Деректер базасымен жұмыс істеу үшін',
        ],
        rightAnswer: 2
    },
    {
        question: '- дар, - дер, - тар, - тер, - лар, - лер жалғаудың қай түріне жататынын көрсетіңіз.',
        options: [
            'Тәуелдік',
            'Көптік',
            'Жіктік',
            'Септік',
            'Етістік',
        ],
        rightAnswer: 1
    },
    {
        question: 'Бас менюдің "Поиск" пунктісі не үшін қолданылады?',
        options: [
            'жүйе құрауышыларын баптау',
            'компьютерді тұрақтату',
            'соңғы 15 құжаттар тізімін шығару',
            'файлдар мен бумаларды іздеу',
            'программаларды тез іске қосу',
        ],
        rightAnswer: 3
    },
    {
        question: 'Екілік кодпен барлық математикалық операцияларды қандай құрылғы жасайды?',
        options: [
            'CD-ROM',
            'Тышқан',
            'Монитор',
            'Қатты диск',
            'Орталық процессор',
        ],
        rightAnswer: 4
    },
    {
        question: 'Тышқанның оң жақ батырмасымен түрлі Windows объектісін басқан кезде не шығады? ',
        options: [
            'Контекстті меню',
            'Объекттің диалогты терезесі шығады',
            'Қолданбалы программа ашылады ',
            '"Главное меню" терезесі',
            'Бума ашылады',
        ],
        rightAnswer: 0
    },
    {
        question: 'Енгізу-шығару порты не үшін қолданылады?',
        options: [
            'Деректреді ЭЕМ-ң оперативтік жадында сақтау үшін',
            'Компьютерді сыртқы құрылғылармен байланыстыру үшін',
            'Деректерді Интернетке шығару үшін',
            'Жаңа программалық дестесімен жұмыс істеу үшін',
            'Деректерді модификациялау үшін',
        ],
        rightAnswer: 1
    },
    {
        question: 'Реттік сан есім нені білдіретінін көрсетіңіз.',
        options: [
            'Заттың санын топтап көрсетеді.',
            'Заттың санын жинақтап көрсетеді',
            'Заттың дәл нақты санын білдіреді.',
            'Заттың реттік санын білдіреді.',
            'Заттың санын бөлшектеп көрсетеді.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Жүйелік сағат пен пернетақтаның индикаторы қайда орналасады?',
        options: [
            'Қолданбалар батырмаларында',
            'Басты менюде',
            'Есептер тақтасында',
            'Таңбашаларда',
            'Жұмыс орнында',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сыртқы жад құрылғысына жатады ... .',
        options: [
            'процессор',
            'дұрыс жауап жоқ',
            'монитор',
            'драйвер',
            'қатты диск',
        ],
        rightAnswer: 4
    },
    {
        question: 'Монитор дегеніміз... . ',
        options: [
            'деректерді өзгертетін құрылғы',
            'деректерді енгізетін құрылғы',
            'компьютердің шығару құрылғысы',
            'деректерді дайындайтын құрылғы',
            'деректерді жинайтын құрылғы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Курсордың жолдың басына тез ауысуын қандай перне орындайды?',
        options: [
            'Insert',
            'Home',
            'Esc',
            'Shift',
            'Ctrl',
        ],
        rightAnswer: 1
    },
    {
        question: 'Пайдаланушы интерфейсі деген не?',
        options: [
            'Windows терезелерінің сыртқы түрі',
            'Адамның программалық құрылғылармен өзара әрекеттесу әдістері мен құралдары',
            'Есептеуіш техниканың құралдарын аппараттық қамтамасуы',
            'Адамның аппараттық және программалық құрылғылармен өзара әрекеттесу әдістері мен құралдары',
            'Адамның аппараттық құрылғылармен өзара әрекеттесу әдістері мен құралдары',
        ],
        rightAnswer: 3
    },
    {
        question: 'Белгілі бір нәрсе туралы таңбалар мен сигналдар түрінде берілетін мағлұматтарды қалай атайды?',
        options: [
            'Файл',
            'Каталог',
            'Бума',
            'Құжат',
            'Информация',
        ],
        rightAnswer: 4
    },
    {
        question: 'RGB жүйесі қандай информацияны кодтауға арналған?',
        options: [
            'Графикалық информацияны',
            'Мәтіндік информацияны',
            'Дыбысты информацияны',
            'Дұрыс жауап жоқ',
            'Сандық информацияны',
        ],
        rightAnswer: 0
    },
    {
        question: 'Белгілі бір атпен аталған дискідегі біртекті мәліметтер жиыны қалай аталады?',
        options: [
            'Каталог',
            'Деректер',
            'файл',
            'Бума',
            'Информация',
        ],
        rightAnswer: 2
    },
    {
        question: 'Windows деген не?',
        options: [
            'Операциялық жүйе',
            'Қолданбалы программа',
            'Құрамдас енгізу-шығару жүйе',
            'Қолданба',
            'Программалау тілі ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Excel формуласында пайдаланатын, формуланы басқа орынға көшірген кезде өзгермейтін, ұяшыққа сілтеме қалай деп аталады?',
        options: [
            'ұяшыққа аралас сілтеме',
            'ұяшыққа абсолют сілтеме',
            'автоқосындылау',
            'автоауыстыру',
            'ұяшыққа салыстырмалы сілтеме',
        ],
        rightAnswer: 1
    },
    {
        question: 'Күзден кейін келетін жыл мезгілін көрсетіңіз.',
        options: [
            'Жаз',
            'Апта',
            'Көктем',
            'Қыс',
            'Күз',
        ],
        rightAnswer: 3
    },
    {
        question: 'Mіcrosoft Offіce-тің құрамындағы, презентациялық материалдар дайындауға арналған программа',
        options: [
            'Дұрыс жауап жоқ',
            'WordPad',
            'Power Paint',
            'Microsoft Access',
            'Power Point',
        ],
        rightAnswer: 4
    },
    {
        question: 'Бірнеше терезе бір мезгілде активті болуы мүмкін бе?',
        options: [
            'Жоқ',
            'Иә, егер олардың барлығы ерекшеленген',
            'Иә, егер олардың тақырыбы жарық түспен ерекшеленген',
            'Жоқ, өйткені Windows-та бірнеше терезені бір мезгілде ашуға болмайды',
            'Иә',
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
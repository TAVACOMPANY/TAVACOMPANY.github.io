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
        question: 'Себеп-салдар салаластың шылауын табыңыз.',
        options: [
            'және, әрі',
            'өйткені, себебі',
            'бірақ, дегенмен',
            'не, немесе',
            'бірде, біресе',
        ],
        rightAnswer: 1
    },
    {
        question: 'Жинақтық сан есімді белгілеңіз.',
        options: [
            'Белгілеу',
            'Бес',
            'Істеу',
            'Жетеу',
            'Белбеу',
        ],
        rightAnswer: 3
    },
    {
        question: '«Операционная система» сөзі орыс тілінен қазақ тіліне қалай аударылады?',
        options: [
            'бағдарлама',
            'операциялық жүйе',
            'жүйе',
            'анықтама',
            'бағдарламалық жүйе',
        ],
        rightAnswer: 1
    },
    {
        question: 'Салалас құрмалас сөйлем түрін анықтаңыз: «Отан» деген сөзді күнде естиміз, себебі Отан дегеніміз адамның туып-өскен жері.',
        options: [
            'Кезектес',
            'Ыңғайлас',
            'Себеп-салдар',
            'Талғаулы',
            'Қарсылықты',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сан есімнің қай септікте тұрғанын анықтаңыз: Таңертең сағат жетіде тұрамын.',
        options: [
            'Жатыс септік',
            'Атау септік',
            'Ілік септік',
            'Көмектес септік',
            'Барыс септік',
        ],
        rightAnswer: 0
    },
    {
        question: '«Қауіп төндіреді» сөзі қазақ тілінен орыс тіліне қалай аударылады?',
        options: [
            'понижается',
            'вызывает опасность',
            'инфекционные болезни',
            'понижается аппетит',
            'нервная система',
        ],
        rightAnswer: 1
    },
    {
        question: 'Дауысты дыбыстар тілдің қатысына қарай қандай түрлерге бөлінетінін белгілеңіз.',
        options: [
            'Қатаң, ұяң',
            'Үнді, қатаң',
            'Езулік, еріндік',
            'Ашық, қысаң',
            'Жуан, жіңішке',
        ],
        rightAnswer: 4
    },
    {
        question: '«Информация» сөзі орыс тілінен қазақ тіліне қалай аударылады?',
        options: [
            'файл',
            'деректер',
            'ақпарат',
            'жүйе',
            'плагиат',
        ],
        rightAnswer: 2
    },
    {
        question: 'Құрмалас сөйлем жасалу жолына қарай қандай түрлерге бөлінеді?',
        options: [
            'салалас, сабақтас, құрамдас',
            'салалас, сабақтас, аралас',
            'айқындауыш, қосарлы',
            'дара, күрделі',
            'ілгерінді ықпал, кейінді ықпал',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қарсылықты салалас құрмалас сөйлем шылауын көрсетіңіз.',
        options: [
            'Әйтпесе',
            'Әлде',
            'Бірақ',
            'Себебі',
            'Және',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қай сөйлемде біріңғай анықтауыштар кездеседі?',
        options: [
            'Асылбек, Жиренше, Ерболдар да Базаралыға қадала қарап хабар күтті.',
            'Биылғы қыстың басы адамға да, малға да әзір аса жайлы болып тұр.',
            'Дауысы ащы да қатал, зілді де кекті шығады',
            'Мынау екі ақын Абайға көп кезде бірге туысқан аға, інідей көрініп қалды.',
            'Қазақ әндерінде сол дала тауларының, өзендерінің, кең алқаптарының өрнектері бар.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Құрмалас сөйлемді табыңыз.',
        options: [
            'Бұл мәселе сынып сағатында шешілді.',
            'Іңір де түсті, балалар да үйлеріне кірді.',
            'Сыныпқа оқушылардың бәрі жиналды.',
            'Олар мұғаліммен ұзақ әңгімелесті.',
            'Нақты қорытынды жасалды.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Көптік жалғаулы зат есімді табыңыз.',
        options: [
            'Шын',
            'Есік',
            'Өлең',
            'Өтірік',
            'Гүлдер',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қазақ тіліне тән дауысты дыбыстары бар сөзді көрсетіңіз.',
        options: [
            'отан',
            'көзілдірік',
            'достар',
            'саудагер',
            'мемлекет',
        ],
        rightAnswer: 1
    },
    {
        question: 'Тек ашық буыннан құралған сөзді табыңыз.',
        options: [
            'Шағала',
            'Өзге',
            'Алтай',
            'Қарағай',
            'Ойбай',
        ],
        rightAnswer: 0
    },
    {
        question: 'Құрмалас сөйлем түрлерін анықтаңыз.',
        options: [
            'Жалаң, жайылма.',
            'Жалаң, жайылма.',
            'Толымды, толымсыз.',
            'Хабарлы, сұраулы.',
            'Салалас, сабақтас, аралас.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Мақалдың ішінен есімдікті белгілеңіз. Қонағым,өз үйіңді де ойлап отыр.',
        options: [
            'Қонағым',
            'Ойлап отыр',
            'Өз',
            'Үйіңді',
            'Де',
        ],
        rightAnswer: 2
    },
    {
        question: 'Топтау сан есімді көрсетіңіз.',
        options: [
            'Туып- өскен',
            'Үш- үштен',
            'Әркім',
            'Бәйтерек',
            'Әйгілі',
        ],
        rightAnswer: 1
    },
    {
        question: '«Программное обеспечение» сөзі орыс тілінен қазақ тіліне қалай аударылады?',
        options: [
            'аппараттық қамсыздандыру',
            'архитектура',
            'ақпарат',
            'бағдарламалық қамсыздандыру',
            'бағдарлама',
        ],
        rightAnswer: 3
    },
    {
        question: 'Шақыру одағайын табыңыз.',
        options: [
            'көс – көс',
            'уһіледі',
            'е, тәйірі',
            'ойпырмай',
            'бәрекелді',
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
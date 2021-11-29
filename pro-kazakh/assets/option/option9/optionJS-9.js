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
        question: 'Сын есімнің салыстырмалы шырайын анықтаңыз.',
        options: [
            'Ауыспалы',
            'Тәжірибесіз',
            'Әдемілеу',
            'Ауылдық',
            'Күзгі',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қай сөйлемде біріңғай анықтауыштар кездеседі?',
        options: [
            'Қазақ әндерінде сол дала тауларының, өзендерінің, кең алқаптарының өрнектері бар.',
            'Дауысы ащы да қатал, зілді де кекті шығады',
            'Биылғы қыстың басы адамға да, малға да әзір аса жайлы болып тұр.',
            'Асылбек, Жиренше, Ерболдар да Базаралыға қадала қарап хабар күтті.',
            'Мынау екі ақын Абайға көп кезде бірге туысқан аға, інідей көрініп қалды.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қатаң дауыссыз дыбыстарды көрсетіңіз.',
        options: [
            'й, л, м',
            'н, р, у',
            'б, в, г, ғ',
            'қ, к, п, с',
            'д, ж, з, һ',
        ],
        rightAnswer: 3
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
        question: 'Оқшау сөзді көрсетіңіз.',
        options: [
            'қыстырма',
            'жалғаулық',
            'шырай',
            'үстеу',
            'шылау',
        ],
        rightAnswer: 0
    },
    {
        question: 'Болымды етістікті табыңыз.',
        options: [
            'Жумады',
            'Сүртті',
            'Әкелмеді',
            'Ұшпады',
            'Көрсетпеді',
        ],
        rightAnswer: 1
    },
    {
        question: 'Күрделі сын есімді табыңыз.',
        options: [
            'Таза',
            'Шыдамды',
            'Ұзақ',
            'Орта бойлы',
            'Тұнық',
        ],
        rightAnswer: 3
    },
    {
        question: 'Көптік жалғаулы зат есімді табыңыз.',
        options: [
            'Шын',
            'Есік',
            'Гүлдер',
            'Өтірік',
            'Өлең',
        ],
        rightAnswer: 2
    },
    {
        question: '«Және, мен, пен» шылауларымен жасалатын сөйлемнің түрін анықтаңыз.',
        options: [
            'Шартты бағыныңқылы сабақтас',
            'Қарсылықты салалас құрмалас',
            'Қарсылықты салалас құрмалас',
            'Кезектес салалас құрмалас',
            'Ыңғайлас сабақтас құрмалас',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қарсылықты салалас құрмалас сөйлемнің жалғаулықтарын табыңыздар.',
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
        question: 'Күрделі етістікті табыңыз.',
        options: [
            'Айтуды',
            'Береді',
            'Бастады',
            'Ойланып қалды',
            'Барды',
        ],
        rightAnswer: 3
    },
    {
        question: '«Мемлекет» сөзінде қанша буын барын табыңыз.',
        options: [
            '6',
            '4',
            '5',
            '2',
            '3',
        ],
        rightAnswer: 4
    },
    {
        question: 'Себеп-салдар салаластың шылауын табыңыз.',
        options: [
            'өйткені, себебі',
            'не, немесе',
            'бірақ, дегенмен',
            'және, әрі',
            'бірде, біресе',
        ],
        rightAnswer: 0
    },
    {
        question: '«Желсіз түнде жарық ай» қай ақынның өлеңі?',
        options: [
            'Шәкәрім Құдайбердиев',
            'Қасым Аманжолов',
            'Абай Құнанбайұлы',
            'Мұқағали Мақатаев',
            'Иса Байзақов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Оқшау сөздер кездескенде, сөйлемде қандай тыныс белгісі қойылады?',
        options: [
            'үтір',
            'нүктелі үтір',
            'қос нүкте',
            'нүкте',
            'тырнақша',
        ],
        rightAnswer: 0
    },
    {
        question: 'Бірыңғай мүшелердің анықтамасын табыңыз.',
        options: [
            'дыбысталуы бірдей сөйлем мүшелері',
            'синтаксистік қызметі бірдей, өзара тұлғалас сөйлем мүшелері',
            'әр сөз табына жататын сөйлем мүшелері.',
            'әр түрлі сұраққа жауап беретін сөйлем мүшелері',
            'тұлғасы әр түрлі сөйлем мүшелері',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақ тіліне тән дауысты дыбыстары бар сөзді көрсетіңіз.',
        options: [
            'саудагер',
            'достар',
            'мемлекет',
            'көзілдірік',
            'отан',
        ],
        rightAnswer: 3
    },
    {
        question: '«Деректер қоры» сөзі қазақ тілінен орыс тіліне қалай аударылады?',
        options: [
            'накопитель',
            'проек',
            'алгоритм',
            'программа',
            'база данных',
        ],
        rightAnswer: 4
    },
    {
        question: 'Дауысты дыбыстардың еріннің қатысына қарай жіктелетін түрлерін көрсетіңіз.',
        options: [
            'еріндік, езулік',
            'қысаң, ашық',
            'қатаң, ұяң',
            'жуан, жіңішке',
            'үнді, ұяң',
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
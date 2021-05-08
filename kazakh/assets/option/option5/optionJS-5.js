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
        question: 'Мақалды аяқтаңыз. Тау мен тасты ... бұзады, адамзатты сөз бұзады.',
        options: [
            'Мұз',
            'Су',
            'Шөп',
            'Көңіл',
            'Ой',
        ],
        rightAnswer: 1
    },
    {
        question: 'Бір жыл неше күннен тұратынын анықтаңыз.',
        options: [
            '632',
            '364',
            '263',
            '365',
            '363',
        ],
        rightAnswer: 3
    },
    {
        question: 'Туған жер туралы мақалды белгілеңіз.',
        options: [
            'Тіл қылыштан өткір',
            'Әке-балаға сыншы',
            'Ит тойған жеріне, ер туған жеріне',
            'Атаңа не қылсаң, алдыңа сол келеді.',
            'Ұят-адамның өз бойындағы адамшылығы.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Мақал-мәтелдерді жинастыратын сөздікті табыңыз.',
        options: [
            'Омонимдік',
            'Орфографиялық',
            'Түсіндірмелі',
            'Синонимдік',
            'Фразеологиялық',
        ],
        rightAnswer: 4
    },
    {
        question: 'Мақалды толықтырыңыз.' + '<br/>' + 'Ғалыммен жақын болсаң, қолың жетер, залыммен жақын болсаң ... кетер.',
        options: [
            'Жүрегің',
            'Басың',
            'Гүлің',
            'Жолың',
            'Кітап',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сабақтас құрмалас сөйлемнің түрін анықтаңыз.',
        options: [
            'Қарсылықты салалас сөйлем',
            'Кезектес салалас сөйлем',
            'Жай сөйлем',
            'Шартты бағыныңқы сөйлем',
            'Ыңғайлас салалас сөйлем',
        ],
        rightAnswer: 3
    },
    {
        question: 'Қазақтың ұлттық ойын түрлерін көрсетіңіз.',
        options: [
            'Бәйге, тұсаукесер',
            'Арқан тарту, дойбы, шахмат',
            'Алтыбақан, асық ойнау, тоғызқұмалақ',
            'Аңшылық , көкпар',
            'Қыз қуу, шахмат, жүгіру',
        ],
        rightAnswer: 2
    },
    {
        question: 'Білім кілті-тіл.',
        options: [
            'Язык и знание-сила',
            'Люби и береги свой язык',
            'Знание-ключ к языку',
            'Знание-сила',
            'Язык-ключ к знаниям',
        ],
        rightAnswer: 4
    },
    {
        question: 'Зергерлік бұйымдарды белгілеңіз.',
        options: [
            'Қару-жарақ, ер-тұрман, қоржын',
            'Шолпы, білезік, сырға, қапсырма.',
            'Алаша, көрпе, төсеніш',
            'Кесе, қасық, пышақ',
            'Кітап, дәптер, қалам',
        ],
        rightAnswer: 1
    },
    {
        question: 'Достық туралы мақалды табыңыз.',
        options: [
            'Өнерлінің өзегі талмас',
            'Ұрлық түбі – қорлық',
            'Ер дәулеті – еңбек',
            'Досы көппен сыйлас, досы азбен сырлас',
            'Отан оттан да ыстық',
        ],
        rightAnswer: 3
    },
    {
        question: 'Туған жер - Отан туралы мақалды табыңыз.',
        options: [
            'Жаман айтпай, жақсы жоқ.',
            'Сөз сүйектен өтеді.',
            'Аққу көлін аңсайды, адам туған жерін аңсайды.',
            'Ештен кеш жақсы.',
            'Өнер алды-қызыл тіл.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақстан Республикасының Мемлекеттік Елтаңбасында не бейнеленгенін табыңыз.',
        options: [
            'Қырандар.',
            'Ою-өрнектер.',
            'Қыран құс.',
            'Күн сәулесі.',
            'Пырақтар',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кезектес салаласты табыңыз.',
        options: [
            'Машина жүрісін бірде шапшандатады, бірде баяулатып жүреді.',
            'Күн сайынғы бір жаңалық ананы бұрынғыдай онша мазасыздандырмайды.',
            'Қалада жаңа үйлер салынды.',
            'Жайлаудың көлдеріне сене беруге болмайды, құрғақшылық жылы тартылып қалады.',
            'Біз асыға кірдік.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Дүниедегі ең қымбат адамды табыңыз.',
        options: [
            'Ана',
            'Әже',
            'Әке',
            'Аға',
            'Апа',
        ],
        rightAnswer: 0
    },
    {
        question: 'Әкеңнің әкесі сізге кім болатынын көрсетіңіз.',
        options: [
            'Ата',
            'Бауыр',
            'Нағашы',
            'Көке',
            'Баба',
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
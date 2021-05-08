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
        question: 'Шартты бағыныңқы сөйлемді табыңыз',
        options: [
            'Жақсы ұстаздық етсең, болашақтан еңбегіңнің жемісін көресің',
            'Басқа пәле тілден деген, байқап сөйлескен дұрыс қой',
            'Мысық ұйықтап жатқанда, тынышын алма',
            '«Бұның дұрыс болмайды»,-деп әкесі ренжіді.',
            '',
        ],
        rightAnswer: 0
    },
    {
        question: 'Қарсылықты салалас құрмалас сөйлемнің жалғаулығын көрсетіңіз',
        options: [
            'Бірақ',
            'Да',
            'Немесе',
            'Сонымен',
            'Сондықтан',
        ],
        rightAnswer: 0
    },
    {
        question: 'Мақалды толықтырыңыз. Өнер алды- ... тіл.',
        options: [
            'Ақ',
            'Қызыл',
            'Жасыл',
            'Қара',
            'Көк',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сабақтас құрмалас сөйлемнің түрін анықтаңыз',
        options: [
            'Қарсылықты салалас сөйлем',
            'Шартты бағыныңқы сөйлем',
            'Жай сөйлем',
            'Кезектес салалас сөйлем',
            'Ыңғайлас салалас сөйлем',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақстан Республикасының Мемлекеттік Елтаңбасында не бейнеленгенін табыңыз',
        options: [
            'Қыран құс',
            'Қырандар',
            'Пырақтар',
            'Ою-өрнектер',
            'Күн сәулесі',
        ],
        rightAnswer: 2
    },
    {
        question: 'Барсакелмес қорығы қайда орналасқанын көрсетіңіз',
        options: [
            'Семей облысында',
            'Оңтүстік Қазақстан облысында',
            'Арал теңізінің қасында',
            'Алматы облысында',
            'Торғай облысында',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қарсылықты салалас сөйлемді көрсетіңіз',
        options: [
            'Күн де шығып тұр, жел де соғып тұр',
            'Мен кеше сабаққа келген жоқпын',
            'Біресе ол барады, біресе Айгүл барады',
            'Бұл шөп әдемі, бірақ зияны да бар',
            'Айжан дүкенге кетті',
        ],
        rightAnswer: 3
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
        question: 'Қазақстанның оңтүстігінде орналасқан қалаларды белгілеңіз',
        options: [
            'Қостанай, Ақтөбе',
            'Орал, Петропавл',
            'Астана, Көкшетау',
            'Ақтау, Атырау',
            'Жамбыл, Шымкент',
        ],
        rightAnswer: 4
    },
    {
        question: 'Алматыдағы қазақ мемлекеттік академиялық драма театры ... атында.',
        options: [
            'М.Лермонтов',
            'Қ.Қуанышбаев',
            'А.Құнанбаев',
            'Ғ.Мүсірепов',
            'М.Әуезов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Мақалды толықтырыңыз. «... өмір – сөнген көмір.»',
        options: [
            'Еңбексіз',
            'Жұмыссыз',
            'Бақытсыз',
            'Ақшасыз',
            'Сенсіз',
        ],
        rightAnswer: 0
    },
    {
        question: 'Құрмалас сөйлемдерден қарсылықты салалас түрін табыңыз.',
        options: [
            'Өлең жазуға ыңғайландым, бірақ шабытым келмеді',
            'Таңат біресе сұрланды, біресе бозарды',
            'Еңбек етсең ерінбей, тояды қарнын тіленбей',
            'Үлкендер төрде отыр, жастар босағада',
            'Жазира осы жұмысқа орналасты, себебі мамандығына сәйкес еді',
        ],
        rightAnswer: 0
    },
    {
        question: 'Мақалды толықтырыңыз.' + '<br/>' + '... тас жарады, тас жармаса бас жарады.',
        options: [
            'Тіс',
            'Тіл',
            'Көз',
            'Бас',
            'Қол',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақстанмен шектесетін мемлекеттерді көрсетіңіз.',
        options: [
            'Өзбекстан, Қырғызстан, Иран, Ауғанстан.',
            'Ресей, Түркіменстан, Өзбекстан, Қырғызстан, Қытай.',
            'Қытай, Ресей, Ирак, Ауғанстан.',
            'Әзірбайжан, Ресей, Литва, Иран, Ауғанстан.',
            'Түркіменстан, Әзірбайжан, Иран, Ауғанстан.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Туған жер - Отан туралы мақалды табыңыз.',
        options: [
            'Ештен кеш жақсы.',
            'Өнер алды-қызыл тіл',
            'Аққу көлін аңсайды, адам туған жерін аңсайды.',
            'Жаман айтпай, жақсы жоқ.',
            'Өнер алды-қызыл тіл',
        ],
        rightAnswer: 2
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
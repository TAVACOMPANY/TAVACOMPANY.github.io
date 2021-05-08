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
        question: 'Елтаңбаның түсі қандай екенін анықтаңыз',
        options: [
            'Көгілдір, қызыл',
            'Алтын, көгілдір',
            'Қызыл, жасыл',
            'Көк, қызыл',
            'Алтын, жасыл',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қыс мезгілінің айын көрсетіңіз',
        options: [
            'Сәуір',
            'Қыркүйек',
            'Шілде',
            'Ақпан',
            'Наурыз',
        ],
        rightAnswer: 3
    },
    {
        question: 'Тілдер мерекесі қай айда өтетінін анықтаңыз.',
        options: [
            'Маусым',
            'Қазан',
            'Қыркүйек',
            'Мамыр',
            'Қараша',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақстан егемендігін қашан жариялады.',
        options: [
            '1988 ж',
            '1990 ж.',
            '1999 ж',
            '1995 ж',
            '1997 ж',
        ],
        rightAnswer: 1
    },
    {
        question: '«Человека прославляет труд» мақалының қазақша баламасын табыңыз.',
        options: [
            'Ердің атын еңбек шығарады',
            'Еңбек етсең емерсің',
            'Көз қорқақ , қол батыр',
            'Еңбек етсең ерінбей, тояды қарының тіленбей',
            'Не ексең, соны орарсың',
        ],
        rightAnswer: 0
    },
    {
        question: 'Мәтелдің жалғасын табыңыз. Сегіз қырлы, бір ...',
        options: [
            'өнерлі',
            'ақылды',
            'сырлы',
            'үлкен',
            'жырлы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Себеп бағыныңқы сабақтас сөйлемді табыңыз',
        options: [
            'Мен оқыған кітап қызық-ақ',
            'Онның сөздік қоры мол болғандықтан, өз ойын еркін жеткізеді',
            'Түн',
            'Әдейі танытпайын деп, ол бет-аузын танып алыпты',
            'Әңгіме елдің жайына көшкен кезде Абай шешіле түсті',
        ],
        rightAnswer: 1
    },
    {
        question: 'Шешендік сөзді аяқтаңыз.' + '<br/>' + 'Жаңбыр жаумаса, жер жетім,' + '<br/>' + 'Басшы болмаса, ...',
        options: [
            'Күн жетім',
            'Ел жетім',
            'Сөз жетім',
            'Жол жетім',
            'Тау жетім',
        ],
        rightAnswer: 1
    },
    {
        question: 'Зергерлік бұйымдарды белгілеңіз.',
        options: [
            'Кітап, дәптер, қалам',
            'Қару-жарақ, ер-тұрман, қоржын',
            'Кесе, қасық, пышақ',
            'Алаша, көрпе, төсеніш',
            'Шолпы, білезік, сырға, қапсырма',
        ],
        rightAnswer: 4
    },
    {
        question: 'Мақалды табыңыз.',
        options: [
            'Ғылым-теңіз, білім-қайық',
            'Ғалым ғылыммен айналысты',
            'Ғылым адамды биіктетеді',
            'Ғылым шыңдайды',
            'Ол-әйгілі, білімді ғалым',
        ],
        rightAnswer: 0
    },
    {
        question: 'Шартты бағыныңқылы сабақтасты көрсетіңіз.',
        options: [
            'Үйдің іші үн-түнсіз, көңілсіздік басқан',
            'Тоқтамай сөйлей берсеңші, уақытың жетпес.',
            'Бір рет айтудан бұрын екі рет ойлап алсаң, екі есе жақсы айтасың',
            'Тілмен тас жаруына қарама, тындыруына қара',
            'Айтар ойы олмаған соң, бос сөзге үйір',
        ],
        rightAnswer: 2
    },
    {
        question: 'Алғашқы қазақ суретшісін табыңыз',
        options: [
            'А.Ғалымбаева',
            'С. Ғұмаров',
            'С. Өтемісов',
            'Ә. Қастеев',
            'Г. Исмаилова',
        ],
        rightAnswer: 3
    },
    {
        question: 'Себеп бағыныңқы сабақтас сөйлемді көрсетіңіз',
        options: [
            'Ағам келетін уақыт болды',
            'Кеш тым ыстық болғандықтан, жұрт әтеті бойынша далаға шығып отырған секілді',
            'Түн. Ай жап-жарық',
            'Әдейі танытпайын деп, ол бет-аузын жуып алыпты',
            'Әңгіме жалпақ елдің жайына көшкен кезде, Абай шешіле түсті',
        ],
        rightAnswer: 1
    },
    {
        question: 'Ыңғайлас салалас құрмалас сөйлемді табыңыз',
        options: [
            'Оқуға түспеймін, өйткені жұмыс істеймін',
            'Биыл мектеп бітіремін, бірақ оқуға түспеймін',
            'Шығарып салуға мен барайын немесе сен бар',
            'Ол сабаққа кейде дайындалады, кейде дайындалмай келеді',
            'Биыл мектеп бітіремін және оқуға түсемін',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қазақтың ұлттық ойын түрлерін көрсетіңіз',
        options: [
            'Қыз қуу, шахмат, жүгіру',
            'Алтыбақан, асық ойнау, тоғызқұмалақ',
            'Бәйге, тұсаукесер',
            'Арқан тарту, дойбы, шахмат',
            'Аңшылық , көкпар',
        ],
        rightAnswer: 1
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
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
        question: 'XIX ғасырдың басында «Ақмешіт бекінісі» атанған қаланы анықтаңыз.',
        options: [
            'Ақтау',
            'Жамбыл',
            'Алматы',
            'Астана',
            'Қызылорда',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қазақстан Республикасының тұңғыш ғарышкерін табыңыз.',
        options: [
            'В.Волков',
            'Т.Мұсабаев',
            'Т.Әубәкіров',
            'Н.Әбдіров',
            'С.Абдрахманов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Атақты «Менің Қазақстаным» әнін жазған композиторды көрсетіңіз.',
        options: [
            'Ш.Қалдаяқов',
            'М.Төлебаев',
            'Н.Тілендиев',
            'Е.Брусиловский',
            'А.Жұбанов',
        ],
        rightAnswer: 0
    },
    {
        question: '«Түріктер мекені, елі» деген мағынаны білдіретін қаланы табыңыз.',
        options: [
            'Алматы',
            'Түркістан',
            'Жамбыл',
            'Отырар',
            'Астана',
        ],
        rightAnswer: 1
    },
    {
        question: '«Невада-Семей» қозғалысының президентін табыңыз.',
        options: [
            'С.Әбдильдин',
            'М.Шаханов',
            'Р.Сейсембаев',
            'О.Сүлейменов',
            'Амантай қажы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Балаларға білім беретін адамды табыңыз',
        options: [
            'Инженер',
            'Аспазшы',
            'Сәулетші',
            'Дәрігер',
            'Мұғалім',
        ],
        rightAnswer: 4
    },
    {
        question: '«Қарлығаш әулие» , қарлығаш би аталған кім, белгілеңіз.',
        options: [
            'Бөлтірік шешен',
            'Қазыбек би',
            'Төле би',
            'Бәйдібек би',
            'Әйтеке би',
        ],
        rightAnswer: 2
    },
    {
        question: '1925 жылы Парижде ән шырқаған әншіні көрсетіңіз.',
        options: [
            'Әміре Қашаубаев',
            'Құрманғазы Сағырбаев',
            'Нағима Есқалиева',
            'Роза Рымбаева',
            'Дина Нүрпейісова',
        ],
        rightAnswer: 0
    },
    {
        question: 'Толықтырыңыз: Тудағы қанатты қыран ... белгісі.',
        options: [
            'бақыттың',
            'уақыттың',
            'заманның',
            'еркіндіктің',
            'қуаныштың',
        ],
        rightAnswer: 3
    },
    {
        question: 'Мектепте қосымша кітап оқитын орынды анықтаңыз.',
        options: [
            'Дәріхана',
            'Кітапхана',
            'Асхана',
            'Емхана',
            'Шеберхана',
        ],
        rightAnswer: 1
    },
    {
        question: '«Шоқан Уәлиханов» портіретінің авторын табыңыз.',
        options: [
            'Сабыр Мәнбаев',
            'Қанапия Телжанов',
            'Н.Хлудов',
            'Молдахмет Кенбаев',
            'Ә. Қастеев',
        ],
        rightAnswer: 4
    },
    {
        question: 'Әйтеке кім болғанын анықтаңыз.',
        options: [
            'Суретші',
            'Тілмаш',
            'Би',
            'Хан',
            'Әнші',
        ],
        rightAnswer: 2
    },
    {
        question: 'Жаз айларын көрсетіңіз.',
        options: [
            'Маусым, шілде, тамыз',
            'Қазан, қараша, желтоқсан',
            'Қаңтар, ақпан, желтоқсан',
            'Наурыз, сәуір, мамыр',
            'Наурыз, шілде, мамыр',
        ],
        rightAnswer: 0
    },
    {
        question: 'Қазақстан Республикасының Біріккен Ұлттар Ұйымына мүшелікке қабылданған жылын көрсетіңіз.',
        options: [
            '1994 жылы',
            '1991 жылы',
            '1995 жылы',
            '1992 жылы',
            '1993 жылы',
        ],
        rightAnswer: 3
    },
    {
        question: '«Қазақфильм» киностудиясынан шыққан тұңғыш фильмді анықтаңыз.',
        options: [
            '«Дала қызы»',
            '«Аманкелді»',
            '«Туған жер»',
            '«Алдар көсе»',
            '«Алтын мүйіз»',
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
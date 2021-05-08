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
        question: 'Қазақтың тұңғыш кинорежиссерін белгілеңіз.',
        options: [
            'Д.Жолжақсынов',
            'Қ.Байсейітов',
            'Қ.Тастанбеков',
            'А.Әшімов',
            'Ш.Айманов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қазақстан Республикасы мемлекеттік Әнұранының әнін жазған кім?',
        options: [
            'Ш. Сариев',
            'Ш. Айманов',
            'Н.Назарбаев',
            'Ш. Қалдаяқов',
            'Ж. Нәжімеденов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Қазақстан Республикасының «Тіл туралы» заңындағы тарау санын анықтаңыз.',
        options: [
            'Он',
            'Бес',
            'Алты',
            'Үш',
            'Төрт',
        ],
        rightAnswer: 2
    },
    {
        question: 'Швеция мен Алакөлді мекендейтін құсты көрсетіңіз.',
        options: [
            'Бұлбұл',
            'Реликті шағала',
            'Сұңқар',
            'Бүркіт',
            'Бірқазан',
        ],
        rightAnswer: 1
    },
    {
        question: 'Талғат Мұсабаев кім екенін табыңыз.',
        options: [
            'Ғарышкер',
            'Тарихшы',
            'Әртіс',
            'Ақын',
            'Әнші',
        ],
        rightAnswer: 0
    },
    {
        question: 'Бауыржан Момышұлы кім екенін анықтаңыз.',
        options: [
            'Ұшқыш',
            'Сазгер, әнші',
            'Мұғалім, оқытушы',
            'Батыр',
            'Жазушы және Үш мәрте Кеңес Одағының батыры',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сөйлемді аяқтаңыз: 22 қыркүек – Қазақстан халықтарының ... .',
        options: [
            'Жаңа жыл',
            'Білім күні.',
            'Тәуелсіз күні',
            'Тілдері күні',
            'Жеңіс күні',
        ],
        rightAnswer: 3
    },
    {
        question: 'Әл Фараби кім болғанын белгілеңіз.',
        options: [
            'Биші',
            'Суретші',
            'Ғалым',
            'Жазушы',
            'Қоғам қайраткері',
        ],
        rightAnswer: 2
    },
    {
        question: '«Музыканың ұлы кітабын» жазған ғалымды табыңыз.',
        options: [
            'Ұлықбек',
            'Әбу Насыр Әл Фараби',
            'Әлишер Науаи',
            'Әл Беруни',
            'Әбу Әли ибн Сина',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақ халқын жоңғарлардан қорғаған батырды табыңыз.',
        options: [
            'Райымбек',
            'Талғат',
            'Мәншүк',
            'Бауыржан',
            'Тоқтар',
        ],
        rightAnswer: 0
    },
    {
        question: 'Әбілхан Қастеев кім екенін анықтаңыз.',
        options: [
            'Жазушы',
            'Тарихшы',
            'Сазгер',
            'Зеттеуші',
            'Суретші',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қазақтың кәсіби операсының негізін қалаған композиторды анықтаңыз.',
        options: [
            'Н.Тілендиев',
            'Ахмет Жұбанов',
            'Л.Хамиди',
            'Е.Г.Брусиловский.',
            'А.В. Затаевич',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кіші планетаға аты берілген қазақтың ғалымын белгілеңіз.',
        options: [
            'Ахмет Байтұрсынов',
            'Мұхтар Әуезов',
            'Қаныш Сәтпаев',
            'Тұрар Рұсқұлов',
            'Шоқан Уәлиханов',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ә.Қастеевтің «Қарындасым» портреті қай өнер түріне жататынын анықтаңыз.',
        options: [
            'Театр өнері',
            'Графика',
            'Саз өнері',
            'Кино өнері',
            'Мүсін өнері',
        ],
        rightAnswer: 1
    },
    {
        question: 'Алматыдағы мемлекеттік академиялық опера және балет театры ... атында.',
        options: [
            'Абай Құнанбаев',
            'Күләш Бәйсейітова',
            'Шәкен Айманов',
            'Қалибек Қуанышбаев',
            'Әміре Қашаубаев',
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
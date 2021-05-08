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
        question: 'Қазақстанның орналасқан жерін анықтаңыз.',
        options: [
            'Батыс Еуропада',
            'Орта Азияда',
            'Таяу Шығыста',
            'Азияда',
            'Еуразия құрлығында',
        ],
        rightAnswer: 4
    },
    {
        question: '«Жеті жарғы» заңдар жинағын жазуға қатысқандарды белгілеңіз.',
        options: [
            'Наурызбай, Қожабай',
            'Райымбек, Абылай',
            'Қабанбай, Бөгенбай',
            'Төле би, Қазыбек би',
            'Ақан сері, Сүйінбай',
        ],
        rightAnswer: 3
    },
    {
        question: 'Құрманғазының шәкіртін атаңыз.',
        options: [
            'Қазанғап',
            'Дәулеткерей',
            'Дина',
            'Ескендір',
            'Мұқан',
        ],
        rightAnswer: 2
    },
    {
        question: 'Ш. Айманов еңбек еткен саланы көрсетіңіз.',
        options: [
            'Саз өнері',
            'Кино өнері.',
            'Жазушы',
            'Кәсіпкер',
            'Мүсін өнері',
        ],
        rightAnswer: 1
    },
    {
        question: 'Абылай қазақ елінде хан болған жылдарын көрсетіңіз',
        options: [
            '1771-1781ж',
            '1734-1761ж',
            '1825-1853ж',
            '1725-1770ж',
            '1756-1786ж',
        ],
        rightAnswer: 0
    },
    {
        question: 'Бәйтеректің биіктігі.',
        options: [
            '56 м',
            '60 м',
            '90 м',
            '69 м',
            '97 м',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қыпшақ , керей, найман руларын жан-жақты зерттеген ғалымды көрсетіңіз.',
        options: [
            'Т.Рұсқұлов',
            'А.Құнанбаев',
            'Ә.Қастеев',
            'Ш.Уәлиханов',
            'Ж.Жабаев',
        ],
        rightAnswer: 3
    },
    {
        question: '«Екінші Аристотель» деп атанған ғалымды анықтаңыз.',
        options: [
            'Платон',
            'Анақарыс',
            'Әл-Фараби',
            'Қ.И.Иасауи',
            'Әли ибн Сина',
        ],
        rightAnswer: 2
    },
    {
        question: '«Тіл құрал» оқулығының авторын белгілеңіз.',
        options: [
            'Ж.Аймаутов',
            'А.Байтұрсынов',
            'Ш.Уәлиханов',
            'С.Сейфуллин',
            'Л.Хамиди',
        ],
        rightAnswer: 1
    },
    {
        question: '«Қазақ хрестоматиясы» деген кітаптың авторы.',
        options: [
            'Ы.Алтынсарин',
            'М.Әуезов',
            'Қ.Мырзаиев',
            'А.Байтұрсынов',
            'М.Жұмабаев',
        ],
        rightAnswer: 0
    },
    {
        question: 'Құрманғазының шығармаларын көрсетіңіз.',
        options: [
            '«Біржан-Сара», «Мақпал»',
            '«Салқылдақ», «Қосбасар»',
            '«Қозы Көрпеш-Баян сұлу»',
            '«Қыз Жібек», «Ақ тентек»',
            '«Адай», «Сарыарқа»',
        ],
        rightAnswer: 4
    },
    {
        question: '«Қазақфильм» киностудиясы кімнің атында екенін белгілеңіз.',
        options: [
            'Е.Өмірзақов',
            'А.Жұбанов',
            'Б.Римова',
            'Ш.Айманов',
            'Қ.Жандарбеков',
        ],
        rightAnswer: 3
    },
    {
        question: 'Әлия Молдағұлова кім болғанын көрсетіңіз.',
        options: [
            'Күйші',
            'Әнші',
            'Мерген',
            'Ақын',
            'Биші',
        ],
        rightAnswer: 2
    },
    {
        question: 'Жасынан ұшқыш болуды армандаған екі мәрте Кеңес Одағының батырын белгілеңіз.',
        options: [
            'Н.Әбдіров',
            'Т.Бегелдинов',
            'И.Панфилов',
            'М.Мәметова',
            'Ә.Молдағұлова',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақ тілінің мемлекеттік мәртебе алған уақытын көрсетіңіз.',
        options: [
            '1989ж',
            '1992ж',
            '1990ж',
            '1991ж',
            '1988ж',
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
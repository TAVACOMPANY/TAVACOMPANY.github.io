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
        question: 'Қазақтың алғашқы академигін көрсетіңіз.',
        options: [
            'Қ.Сәтпаев',
            'Ғ.Айдаров',
            'С.Королев',
            'Н.Сауранбаев',
            'Ж.Жабаев',
        ],
        rightAnswer: 0
    },
    {
        question: 'Күзден кейін келетін жыл мезгілін көрсетіңіз',
        options: [
            'Күз',
            'Қыс',
            'Жаз',
            'Апта',
            'Көктем',
        ],
        rightAnswer: 1
    },
    {
        question: 'Шабғар деп Қазақстанда қай қаланы атаған.',
        options: [
            'Тараз',
            'Отырар',
            'Түркістан',
            'Алматы',
            'Шымкент',
        ],
        rightAnswer: 2
    },
    {
        question: '«Диуани лұғат –ат түрік» кітабының авторын көрсетіңіз.',
        options: [
            'Әбу Насыр әл-Фараби',
            'Ахмет Яссауи',
            'С.Кеңесбаев',
            'Махмұд Қашқари',
            'Жүсіп Баласағұни',
        ],
        rightAnswer: 3
    },
    {
        question: '«Араб музыкасының тарихы» кітабының авторы.',
        options: [
            'Н.Тілендиев',
            'Қ.Сағырбаев',
            'Ә.Қашаубаев',
            'А.Құнанбаев',
            'Әл-Фараби',
        ],
        rightAnswer: 4
    },
    {
        question: 'Астананың орналасқан жерін табыңыз.',
        options: [
            'Сарарқа даласы',
            'Оңтүстік аймағы',
            'Бетпақ даласы',
            'Көкшетау бауыры',
            'Науырзым қорығы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Атақты «Отырар сазы» оркестірінің бас дирижерін белгілеңіз',
        options: [
            'Дина Нүрпейісова',
            'Нұрғиса Тілендиев',
            'Аблахат Есбаев',
            'Құрманғазы Сағырбаев',
            'Мұқан Төлебаев',
        ],
        rightAnswer: 1
    },
    {
        question: 'Алтын күн, қыран, ою-өрнек бейнеленген рәміз.',
        options: [
            'Штандарт',
            'Ұлттық валюта',
            'Ту',
            'Елтаңба',
            'Әнұран',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақ бейнелеу өнерінің негізін қалаушы адамды белгілеңіз.',
        options: [
            'Қаныш Сәтпаев',
            'Дина Нүрпейісова',
            'Шоқан Уәлиханов',
            'Әбілхан Қастеев',
            'Гүлфайруз Ысмайылова',
        ],
        rightAnswer: 3
    },
    {
        question: 'Әз Жәнібек ханның кеңесшісін көрсетіңіз.',
        options: [
            'Қазыбек би',
            'Әйтеке би',
            'Төле би',
            'Бұқар жырау',
            'Жиренше шешен',
        ],
        rightAnswer: 4
    },
    {
        question: 'Тұсаукесер тойы қашан тойланатынын көрсетіңіз.',
        options: [
            'Бала 1 жасқа толғанда',
            'Бала 2 жасқа толғанда',
            'Бала 3 жасқа толғанда',
            'Бала 4 жасқа толғанда',
            'Бала 5 жасқа толғанда',
        ],
        rightAnswer: 0
    },
    {
        question: 'Ғылым академиясының тұңғыш президентін белгілеңіз',
        options: [
            'Марат Омаров',
            'Қаныш Сәтпаев',
            'Нұрғиса Тілендиев',
            'Тұрар Рысқұлыв',
            'Ахмет Байтұрсынов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Қазақстан елінің ақшасы',
        options: [
            'Динар',
            'Йен',
            'Теңге',
            'Сом',
            'Манат',
        ],
        rightAnswer: 2
    },
    {
        question: 'Мемлекеттік тудың авторын анықтаңыз.',
        options: [
            'Шоқан Уәлиханов',
            'Шота Уәлиханов',
            'Нұрғиса Тілендиев',
            'Шәкен Ниязбеков',
            'Қаныш Сәтбаев',
        ],
        rightAnswer: 3
    },
    {
        question: 'Қазақстан Республикасы қай елмен шектесетінін көрсетіңіз.',
        options: [
            'Түркия',
            'Иран',
            'Армения',
            'Татарстан',
            'Ресей',
        ],
        rightAnswer: 4
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
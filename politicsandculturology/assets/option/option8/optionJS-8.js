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
        question: 'Основоположник теории этнополитической общности казахстанцев:',
        options: [
            'А. Калмырзаев',
            'М. Сужиков',
            'Р. Абсаттаров',
            'Т. Сарсенбаев',
            'Г. Малинин',
        ],
        rightAnswer: 2
    },
    {
        question: 'В каком году Генеральная Ассамблея ООН приняла Всеобщую декларацию прав человека?',
        options: [
            '1947',
            '1945',
            '1949',
            '1948',
            '1951',
        ],
        rightAnswer: 3
    },
    {
        question: 'Ученый, видящий специфику политических процессов динамике борьбы и соперничестве групп за статусы и ресурсы власти:',
        options: [
            'Р. Дарендорф',
            'Ж. Бурдо',
            'М. Дюверже',
            'Ч. Мэрриам',
            'Р. Арон',
        ],
        rightAnswer: 0
    },
    {
        question: 'Теория лидерства, рассматривающая историю как результат творчества героических личностей: ',
        options: [
            'марксистская',
            'волюнтаристская',
            'концепция психоанализа',
            'теория социального обмена',
            'интегративная',
        ],
        rightAnswer: 1
    },
    {
        question: 'Выдающимся представителем французского Просвещения является:',
        options: [
            'Томас Гоббс',
            'Бенедикт Спиноза',
            'Людвиг ван Бетховен',
            'Виктор Гюго',
            'Франсуа Вольтер',
        ],
        rightAnswer: 4
    },
    {
        question: 'Элитарная культура это:',
        options: [
            'культура, средних слоев общества',
            'культура, низших слоев общества',
            'культура, популярная среди асоциальных слоев общества',
            'культура привилегированных социальных групп',
            'культура, созданная гениальными людьми',
        ],
        rightAnswer: 3
    },
    {
        question: 'Первоначальное значение слова культура:',
        options: [
            'оседлость',
            'отсталость',
            'возделывание, земледелие ',
            'искусство, правила поведения',
            'цивилизованность',
        ],
        rightAnswer: 2
    },
    {
        question: 'Особенностью западного типа культуры является:',
        options: [
            'рационализм',
            'попытка изолироваться от внешней среды',
            'подавление индивидуальности',
            'коллективизм',
            'популизм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Данилевский выделяет следующие периоды в развитии культурно-исторического типа:',
        options: [
            'замедление, вымирание, расцвет.',
            'доиндустриальный, традиционный, классический',
            'магический, религиозный, индустриальный',
            'зарождение, кульминация, распад',
            'этнографический, политический, цивилизационный ',
        ],
        rightAnswer: 4
    },
    {
        question: 'Культурная антропология занимается изучением того, как:',
        options: [
            'не развиваются представления человека о культуре',
            'человек приспосабливается к окружающей культурной среде',
            'не изменяются со временем культурные потребности человека',
            'промышленной индустриализацией',
            'цивилизационной революцией',
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
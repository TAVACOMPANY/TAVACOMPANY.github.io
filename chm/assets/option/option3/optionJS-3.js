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
      btnTryAgain = document.getElementById('btn-try-again'),
      msgOfResult = document.getElementById('msgOfResult'),
      br = "</br>";

const questions = [
    {
        question: 'f(x) функциясы кестелік мәндермен берілген: x0=1; x1=2; x2=3; y0=2; y1=1; y2=6. Функцияның туындысын табу үшін Лагранж көпмүшесі түрдің эквивалентті түйіндері үшін салынған:',
        options: [
            '-3t^2-4t+2',
            't^2+2',
            '3t^2+4t+2',
            '3t^2-4t+2',
            '4t^2-4t+2',
        ],
        rightAnswer: 3
    },
    {
        question: 'Ньютон көпмүшесі тең шығатын түйіндері бар кестемен берілген f(x) функциясының туындысын табу үшін таңдалады. Егер туындыны есептеу қажет x аргументі түйін нүктелерінің біріне сәйкес келсе, онда t параметрі мәнді алады',
        options: [
            't= -x',
            't=h',
            't=0',
            't=x',
            't=x0',
        ],
        rightAnswer: 2
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=1,5; x2=2; y0=2; y1=1; y2=6. Функцияның интегралын табу үшін Симпсон формуласы қолданылады. Содан кейін интегралдың жуықталған мәні ' + '<img src="qst23.png" class="formula">' + 'тең',
        options: [
            '3,3',
            '9',
            '2',
            '2,5',
            '4',
        ],
        rightAnswer: 2
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=1,5; x2=2; x3=2,5; y0=2; y1=3; y2=6, y3=11. Осы функцияның туындысын табу үшін Ньютон көпмүшесі таңдалады. X=1 түйіндік нүктесінде туынды функцияның жуықталған мәнін есептеу үшін түрдің есептеу формуласын таңдау дұрыс',
        options: [
            '<img src="ans24.1.png" class="func">',
            '<img src="ans24.2.png" class="func">',
            '<img src="ans24.4.png" class="func">',
            '<img src="ans24.3.png" class="func">',
            '<img src="ans24.5.png" class="func">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кестелік мәндермен берілген функцияның мәнін есептеу үшін Ньютонның бірінші интерполяциялық формуласын практикалық қолдану кезінде (х аргументін өзгерту қадамы бірдей болған жағдайда, яғни h=const), формула бойынша есептелген t параметрін ұтымды түрде енгізіңіз',
        options: [
            '<img src="ans25.1.png" class="func">',
            '<img src="ans25.2.png" class="func">',
            '<img src="ans25.3.png" class="func">',
            '<img src="ans25.4.png" class="func">',
            '<img src="ans25.5.png" class="func">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кесте түрінде берілген функцияның интегралын сандық есептеу үшін Симпсон формуласын қолданудың міндетті шарты шарт болып табылады',
        options: [
            'Тең шығатын түйіндерден түзілген N сегменттерінің саны тақ болып табылады',
            'Тең шығатын түйіндерден түзілген N сегменттерінің саны 10-нан кем болмауы тиіс',
            'Тең тұрған түйіндік нүктелер саны 10-нан кем болмауы тиіс',
            'Тең шығатын түйін нүктелерінің саны жұп болуы керек',
            'Тең шығатын түйіндерден түзілген N сегменттерінің саны жұп болып табылады',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=1,5; x2=2; y0=2; y1=3; y2=6. Ньютон көпмүшесін қолдана отырып, осы функцияның туындысын табу үшін алдымен ақырлы айырмашылықтарды есептеу керек, олардың жоғарғы реті',
        options: [
            '0',
            '1',
            '4',
            '3',
            '2',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=2; x2=3; x3=4; y0=4; y1=1; y2=7; y3=8. Функцияның интегралын табу үшін Симпсон формуласы таңдалады. Таңдалған формуланы қолданудың міндетті шарты орындалғанын тексеріңіз. Оң жағдайда Симпсонның квадратуралық формуласын пайдаланып интегралдың мәнін есептеңіз',
        options: [
            '7',
            'Функцияның интегралын есептеу үшін Симпсон формуласын қолдануға болмайды',
            '20',
            '10',
            '14',
        ],
        rightAnswer: 1
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=1,5; x2=2; y0=2; y1=3; y2=6. X=1,1 аргументі үшін осы функцияның туындысын табу үшін түрдің тең шығатын түйіндері үшін Лагранж көпмүшесі салынды: содан кейін функцияның туынды мәні',
        options: [
            '0.4',
            '3.21',
            '1.6',
            '0.2',
            '2.2',
        ],
        rightAnswer: 0
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=1,5; x2=2; y0=2; y1=1; y2=6. Осы функцияның туындысын табу үшін Ньютон көпмүшесі таңдалады. X=1 түйіндік нүктесінде туынды функцияның жуықталған мәнін есептеу үшін түрдің есептеу формуласын таңдау дұрыс',
        options: [
            '<img src="ans30.3.png" class="func">',
            '<img src="ans30.1.png" class="func">',
            '<img src="ans30.2.png" class="func">',
            '<img src="ans30.5.png" class="func">',
            '<img src="ans30.4.png" class="func">',
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
        msgofScore();
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

function msgofScore() {
    if(score == 0 || score == 1)  {
        msgOfResult.innerHTML = 'Cъебись с универа.';
    } 
     else if(score == 2 || score == 3) {
        msgOfResult.innerHTML = 'пиздуй учить матем и казахский';
     }
     else if(score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Ну можно и лучшеее!';
     }
     else if(score == 6 || score == 7) {
        msgOfResult.innerHTML = 'А ты хорош!';
     }
     else if(score == 8 || score == 9) {
        msgOfResult.innerHTML = 'ЕМААА ТЫ МАТЕМАТИК';
     } else {
        msgOfResult.innerHTML = 'ДА ТЫ ПРЯМ КАК НЬЮТОН';
     }
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
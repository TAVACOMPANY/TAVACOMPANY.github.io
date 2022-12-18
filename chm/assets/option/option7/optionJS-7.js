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
      br = '</br>';

const questions = [
    {
        question: 'f(x) функциясы кестелік мәндермен берілген: x0=1; x1=2; x2=3; y0=2; y1=1; y2=6. Функцияның туындысын табу үшін түрдің тең шығатын түйіндері үшін Лагранж көпмүшесі салынды: ' + '<img src="qst61.png" class="longf">' + 'Содан кейін x=1,5 үшін функцияның туынды мәні',
        options: [
            '0,75',
            '0,2',
            '2,75',
            '-1',
            '5',
        ],
        rightAnswer: 3
    },
    {
        question: 'f(x) функциясы кестелік мәндермен берілген: x0=1; x1=2; x2=3; y0=2; y1=1; y2=6. Функцияның туындысын табу үшін түрдің тең шығатын түйіндері үшін Лагранж көпмүшесі салынды: ' + '<img src="qst62.png" class="longf">' + 'Содан кейін функцияның туындысының өрнегі келесідей болады',
        options: [
            't^2+2',
            '6t',
            '6t-4',
            '3t^2-4t+2',
            '2t',
        ],
        rightAnswer: 2
    },
    {
        question: 'f(x) функциясы [-1,1] сегментінде түйін нүктелеріндегі мәндерімен берілген. Интерполяция қадамы 0,2 екені белгілі. Содан кейін интерполяция сегменттерінің саны n',
        options: [
            '5',
            '11',
            '10',
            '12',
            '9',
        ],
        rightAnswer: 2
    },
    {
        question: 'f(x) функциясының интегралын есептеу кезінде, бұл процедураны аналитикалық түрде орындау қиын немесе мүмкін болмаған жағдайда, шамамен есептеу формулалары қолданылады. Бұл формулалар',
        options: [
            'Лейбниц формулалары',
            'Интерполяция формулалары',
            'Ең кіші квадраттардың формулалары',
            'Квадратуралық формулалар',
            'Сандық дифференциалдау формулаларымен',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кесте бойынша берілген f(x) функциясының интегралын шамамен есептеу үшін формула таңдалады ' + '<img src="qst65.png" class="longf">' + 'Содан кейін h параметрі формула бойынша есептеледі',
        options: [
            '<img src="ans65.2.png" class="formula">',
            '<img src="ans65.1.png" class="formula">',
            '<img src="ans65.3.png" class="formula">',
            '<img src="ans65.4.png" class="formula">',
            '<img src="ans65.5.png" class="formula">',
        ],
        rightAnswer: 1
    },
    {
        question: 'f(x) функциясы кестелік мәндермен берілген: x0=1; x1=2; x2=3; y0=2; y1=1; y2=6. Функцияның туындысын табу үшін түрдің тең шығатын түйіндері үшін Лагранж көпмүшесі салынды: ' + '<img src="qst66.png" class="longf">' + 'Бұл өрнекте t параметрі',
        options: [
            't=0,5',
            't=2*(x-2)',
            't=x-2',
            't=x-1',
            't=2*(x-1)',
        ],
        rightAnswer: 4
    },
    {
        question: 'Берілген кесте функциясы үшін F(x) жуықтау функциясын құру f(x) (түйін нүктелеріндегі F(x) және f(x) мәндерінің сәйкес келуінің міндетті шартымен) егер x аргументі тең мәндерге ие болса, жүзеге асырылады. Содан кейін көршілес интерполяция түйіндерінде алынған бірінші ретті ақырлы айырмашылықтардан алынған айырмашылықтар деп аталады',
        options: [
            'Тең шығатын интерполяция түйіндері',
            'Функция аргументін өзгерту қадамы',
            'Интерполяцияның түйіндік нүктелері',
            'Бірінші ретті ақырлы айырмашылықтар',
            'Екінші ретті ақырлы айырмашылықтар',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сызықтық теңдеулер жүйесі Зайдель әдісімен шешу үшін "қалыпты" түрге ауыстырылды. Түрлендіру нәтижесінде коэффициент матрицасы келесідей болады: ' + '<img src="qst68.png" class="formula">' + 'Түрлендірілген теңдеулер жүйесінің оң жағы векторды құрайды (4; 16). Содан кейін сызықтық теңдеулер жүйесін Зейдель әдісімен сандық шешу үшін екінші өрнек келесідей болады',
        options: [
            '<img src="ans68.1.png" class="fory">',
            '<img src="ans68.4.png" class="fory">',
            '<img src="ans68.2.png" class="fory">',
            '<img src="ans68.3.png" class="fory">',
            '<img src="ans68.5.png" class="fory">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сызықтық теңдеулер жүйесін шешу үшін ' + '<img src="qst69.png" class="forp">' + 'мет метрикасында итерациялық реттілік құрылды. Сонда мұндай реттіліктің конвергенциясының жеткілікті шарты',
        options: [
            '<img src="ans69.2.png" class="alpha">',
            '<img src="ans69.1.png" class="alpha">',
            '<img src="ans69.3.png" class="alpha">',
            'Сызықтық теңдеулер жүйесінің оң жағында белгісіз барлық коэффициенттердің квадраттарының қосындысы біреуден аз болуы керек',
            'Сызықтық теңдеулер жүйесінің оң жағында белгісіз барлық коэффициенттердің квадраттарының қосындысы бірлікке тең болуы керек',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сызықтық емес теңдеу берілсін F(x)=0. Бұл жағдайда F(x) функциясы [a,b] интервалында анықталады және үздіксіз болады. Сызықтық емес F(x) функциясын нөлге айналдыратын кез келген t∈[a,b] деп аталады',
        options: [
            'Теңдеудің түбірі',
            'Трансценденттік теңдеу',
            'Теңдеудің абсолютті нөлі',
            'Эквивалентті теңдеу',
            'Тамырларды бөлу арқылы',
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
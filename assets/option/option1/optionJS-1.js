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
        question: 'Берілген f(X) кестелік функциясы үшін F(x) жуықтау функциясының құрылысы міндетті түрде - түйін нүктелеріндегі F(x) және f(x) мәндерінің сәйкес келуі – егер x аргументі тең мәндерге ие болса, жүргізілсін. Көршілес интерполяция түйіндеріндегі функция мәндері арасындағы айырмашылықтар деп аталады',
        options: [
            'Интерполяцияның түйіндік нүктелері',
            'Тең шығатын интерполяция түйіндері',
            'Екінші ретті ақырлы айырмашылықтар',
            'Бірінші ретті ақырлы айырмашылықтар ',
            'Функция аргументін өзгерту қадамы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Сызықтық теңдеулер жүйесін шешу үшін қайталанатын түрге эквивалентті түрлендіру жасалды. Нәтижесінде жүйе келесідей болады: ' + br + '<img src="qst2.png" class="sistems">' + br + 'Конвергенция шарты орындалғанын тексеріңіз. Оң жауаппен α параметрін анықтаңыз',
        options: [
            'α = 1,02',
            'α = 0,8',
            'α = 0,9',
            'конвергенция шарттарының ешқайсысы орындалмайды',
            'α = 0,7',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сызықтық теңдеулер жүйесі белгісіз коэффициенттер матрицасы келесідей болсын: ' + br + '<img src="qst3.png">' + 'Жүйе теңдіктерінің оң жағы B = (3; -1) векторымен ұсынылған. Жүйені Сейдель әдісімен шешу үшін сол жақ «қалыпты» түрге ауыстырылды. Түрлендірілген жүйенің коэффициенттері матрицаны құрады',
        options: [
            '<img src="ans3.2.png">',
            '<img src="ans3.1.png">',
            '<img src="ans3.3.png">',
            '<img src="ans3.4.png">',
            '<img src="ans3.5.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'F(x) = 0 теңдеуінің сандық шешімі үшін eps=0.01 дәлдігімен қарапайым Итерация әдісімен Итерация тізбегі құрылды. Конвергенция шартын тексеру нәтижесінде q=0.2 нақты саны алынды. Содан кейін есептеулерді тоқтату критерийі абсолютті шамадағы екі көршілес жуықтаудың айырмашылығы мәннен аспайтын жағдай деп санауға болады',
        options: [
            '0.25',
            '0.02',
            '0.01',
            '0.04',
            '0.002',
        ],
        rightAnswer: 3
    },
    {
        question: '[a,b] сегментіндегі F(x)=0 теңдеуінің сандық шешімін жартылай бөлу әдісін бағдарламалық түрде жүзеге асыруда c=(a+b)/2 ортасы табылды. Егер F(b)*F(c)<0 шарты дұрыс болса, онда пәрменді орындау керек (C++ синтаксис)',
        options: [
            'a=b',
            'a=c',
            'c=a',
            'b=c',
            'c=b',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сызықтық теңдеулер жүйесі эквивалентті итерациялық түрге айналдырылсын: ' + "<img src='qst6.png' class='sistems'>" + ' Конвергенцияны тексеру оң нәтиже берді. Бастапқы жуықтау келесідей болсын: x1=0, x2=0, x3=0. Содан кейін бірінші жуықтау келесідей болады',
        options: [
            'x1 = 0,8, x2 = -1, x3 = 1',
            'x1 = -0,8, x2 = 1, x3 = -1',
            'x1 = -1, x2 = 1, x3 = -1',
            'x1 = 0, x2 = 0, x3 = 1',
            'x1 = 1, x2 = -1, x3 = 1',
        ],
        rightAnswer: 4
    },
    {
        question: 'F(x)=0 теңдеуінің түбірлерін жартылай бөлу әдісімен нақтылау нәтижесінде түбірі бар [0.35, 0.45] маңы алынды. Содан кейін теңдеудің түбірі ретінде орташа мәнді алып, мәннен аспайтын қателік аламыз',
        options: [
            '0.09',
            '0.445',
            '0.4',
            '0.001',
            '0.05',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кестелік мәндермен берілген: x0=1; x1=2; x2=3; y0=-1; y1=1; y2=5. x0, x1, x2 түйіндік нүктелеріндегі F(x) және f(x) мәндерінің сәйкестігі – міндетті шартты орындай отырып, F(x) жуықтау функциясын құру үшін түрдің көпмүшесін қолдана отырып интерполяциялау процедурасы қолданылды: ' + '<img src="qst8.png" class="longf">' + 'Содан кейін x=1,5 үшін функцияның мәні',
        options: [
            '-2,275',
            '-0,25',
            '1,75',
            '0,25',
            '20',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кестелік мәндермен берілген f(x) функциясына жақын F функциясының аналитикалық өрнегін құру процедурасы үшін: ' + '<img src="qst9.png" class="longf">' + 'Өрнек түрлендірілгеннен кейін және ұқсас келтірілгеннен кейін көпмүшенің жоғары дәрежесі тең болады',
        options: [
            '2',
            '4',
            '3',
            '0',
            '2,5',
        ],
        rightAnswer: 0
    },
    {
        question: 'Зейдель әдісінің артықшылығы –',
        options: [
            'Жылдам конвергенцияны қамтамасыз етеді (әдетте)',
            'Сызықтық теңдеулер жүйесін шешуге жуықтау санын алдын-ала есептеуге мүмкіндік береді',
            'Сызықтық теңдеулер жүйесін алдын-ала түрлендіруді қажет етпейді',
            'Қарапайым итерация әдісінің үш метрикасының кез келгенін таңдауға мүмкіндік береді',
            'Қадамдардың шектеулі саны үшін теңдеулер жүйесінің нақты шешімін анықтайды',
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
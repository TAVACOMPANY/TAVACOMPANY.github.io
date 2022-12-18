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
        question: 'Сызықтық теңдеулер жүйесі белгісіз коэффициенттер матрицасы келесідей: ' + '<img src="qst41.png" src="formula">' + 'Жүйе теңдіктерінің оң жағы B = (3;-1) векторымен ұсынылған. Жүйені Зейдель әдісімен шешу үшін оң жағы «қалыпты» түрге ауыстырылды. Содан кейін түрлендірілген теңдеулер жүйесінің оң жағы векторды құрайды',
        options: [
            '(1; 11)',
            '(1; 11)',
            '(8; 2)',
            '(2; 8)',
            '(2; -8)',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кестелік мәндермен берілген функцияны интерполяциялау үшін түрдің көпмүшесі салынды: ' + '<img src="qst42.png" class="longf">' + 'Содан кейін кестедегі n түйін нүктелерінің саны',
        options: [
            '4',
            '6',
            '3',
            '1',
            '2',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кестелік мәндермен берілген f(x) функциясына жақын F функциясының аналитикалық өрнегін құру процедурасы үшін түрдің көпмүшесі салынды:' + '<img src="qst43.png" class="longf">' + 'Мұндай көпмүше деп аталады',
        options: [
            'Симпсон көпмүшесі',
            'Көпмүшелік рунге-кутта',
            'Лагранж көпмүшесі',
            'Эйлер көпмүшесі',
            'Ньютон көпмүшесі',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сызықтық теңдеулер жүйесінің сандық шешімімен алдыңғы жуықтау келесідей болсын: x1, x2, …, xn, ал келесі жуықтау сәйкесінше y1, y2, …, yn. Yi айнымалысының мәнін есептеу кезінде алынған y1, y2, …, yi-1 мәндері ескерілетін әдіс',
        options: [
            'Симпсон әдісі',
            'Трапеция әдісі',
            'Ортогонализация әдісі',
            'Зейдель әдісі',
            'Қарапайым итерация әдісі',
        ],
        rightAnswer: 3
    },
    {
        question: 'F(x)=0 теңдеуінің сандық шешімі үшін бұл теңдеуді x=f(x) эквивалентімен ауыстыру орындалды. n=0,1,2,… үшін xn=f(xn-1) қатынасын қолдана отырып, біз деп аталатын сандық тізбекті аламыз',
        options: [
            'Жарамсыз жуықтаулар тізімі',
            'Итерациялық реттілік',
            'Рұқсат етілген жуықтаулар жиыны',
            'Теңдеудің көптеген мүмкін шешімдері',
            'Теңдеу шешімдерінің кортежі',
        ],
        rightAnswer: 1
    },
    {
        question: 'Теңдеулердің қайсысын 2x-sin(x)=0 теңдеуіне тең деп санауға болады',
        options: [
            'x=sin(x)-2',
            'x=sin(x)',
            'x=-2sin(x)',
            'sin(2x)=0',
            'x=sin(x)-x',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x)# функциясының аналитикалық өрнегі белгісіз болсын, бірақ оның мәндерінің кестесі түйін нүктелерінде көрсетілген. F(x) функциясын құру үшін Көпмүшелерді құруға негізделген арнайы әдістер қолданылады. Бұл x1, x2 ,….xn түйін нүктелеріндегі f(x) және F(x) мәндерінің дәл сәйкестігін талап етеді. Бұл түйін нүктелері деп аталады',
        options: [
            'Функцияның экстремалды нүктелері',
            'Теңдеудің түбірлері',
            'Көпмүшелік түйіндері',
            'Теңдеулер жүйесінің түбірлері',
            'Интерполяция түйіндері',
        ],
        rightAnswer: 4
    },
    {
        question: 'F(x)=0 теңдеуінің түбірлерін жартылай бөлу әдісімен нақтылау нәтижесінде түбірі бар [0.35, 0.45] өте аз көршілестік алынды. Сонда теңдеудің түбірін шамамен алынған мән деп санауға болады',
        options: [
            '0.355',
            '0.4',
            '0.445',
            '0.05',
            '0.9',
        ],
        rightAnswer: 1
    },
    {
        question: 'x=(x1,x2,…,xn) және y=(y1,y2,…,yn) n – өлшемді кеңістіктің екі нүктесі болсын (сызықтық теңдеулер жүйесіне салынған итерациялық тізбектің екі жуықтауы). Қарапайым Итерация әдісін практикалық қолдану кезінде келесі көрсеткіштердің бірі бар кеңістіктегі сызықтық теңдеулер жүйесін қарастыруға болады',
        options: [
            '<img src="ans49.5.png" class="forp">',
            '<img src="ans49.4.png" class="forp">',
            '<img src="ans49.3.png" class="forp">',
            '<img src="ans49.2.png" class="forp">',
            '<img src="ans49.1.png" class="forp">',
        ],
        rightAnswer: 0
    },
    {
        question: 'Интерполяциялық көпмүшені құру үшін Ньютон көпмүшесі таңдалды. Бұл процедура ақырлы айырмашылықтар кестесін алдын-ала құруды талап етеді. Формулалардың қайсысы ақырлы айырмашылықтарды есептеу процедурасын дұрыс анықтайтынын анықтаңыз.',
        options: [
            '<img src="ans50.5.png" class="fory">',
            '<img src="ans50.4.png" class="fory">',
            '<img src="ans50.3.png" class="fory">',
            '<img src="ans50.2.png" class="fory">',
            '<img src="ans50.1.png" class="fory">',
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
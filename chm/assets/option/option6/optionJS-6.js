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
        question: 'f(x) функциясы [a,b] сегментінде a=x0, x1, …, xn=b тең ұзындықтағы түйіндерде берілсін, олардың сегменті n тең бөліктерге бөлінеді. Бұл жағдайда интерполяция қадамын формула бойынша есептеуге болады',
        options: [
            '<img src="ans51.5.png" class="formula">',
            '<img src="ans51.4.png" class="formula">',
            '<img src="ans51.3.png" class="formula">',
            '<img src="ans51.1.png" class="formula">',
            '<img src="ans51.2.png" class="formula">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Функция кестелік мәндермен берілген (x1,y1), (x2,y2), … (xn,yn). x1,x2,…,xn нүктелерінде y1,y2,…,yn кестелік мәндеріне мүмкіндігінше жақын мәндерді қабылдайтын y=F(x) жуықтау функциясын құру қажет (түйін нүктелеріндегі мәндердің міндетті сәйкестік шартын орындау қажет емес). Содан кейін y=F(x) теңдеуі аталады',
        options: [
            'Рунге-Кутта формуласымен',
            'Эйлер формуласы',
            'Эмпирикалық формула',
            'Трапеция формуласы',
            'Симпсон формуласы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Функция көрініс кестесімен ұсынылған: (x1,y1), (x2,y2), … (xn,yn). x1,x2,…,xn кестесінің түйіндік нүктелерінде y1,y2,…,yn мәндеріне мүмкіндігінше жақын мәндерді қабылдайтын y=F(x) жуықтау функциясын құру қажет (түйін нүктелеріндегі мәндердің міндетті сәйкестік шартын орындау қажет емес). Содан кейін y=F(x) формуласы деп аталады',
        options: [
            'Рунге-кутта формуласымен',
            'Эйлер формуласы',
            'Регрессия теңдеуі',
            'Симпсон формуласы',
            'Трапеция формуласы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дифференциалдық теңдеулерді шешу әдістері кестеде көрсетілген функция түрінде жуықтау шешімін береді, топқа жатады',
        options: [
            'Сандық интеграция әдістері',
            'Графикалық әдістер',
            'Сандық саралау әдістері',
            'Сандық әдістер',
            'Аналитикалық әдістер',
        ],
        rightAnswer: 3
    },
    {
        question: 'Кестеде көрсетілген функцияның туындысын табу үшін Лагранж көпмүшесі түрдің тең шығатын түйіндерімен салынған:' + '<img src="qst55.png" class="longf">' + 'Сонда өрнек жеңілдетілгеннен кейін көпмүшенің жоғарғы дәрежесі тең болады',
        options: [
            '4',
            '2',
            '0',
            '1',
            '3',
        ],
        rightAnswer: 1
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=2; x2=3; y0=4; y1=1; y2=6. Осы функцияның туындысын табу үшін Ньютон көпмүшесі таңдалады. Содан кейін x=1 түйін нүктесіндегі туынды функцияның жуықталған мәні ',
        options: [
            '-14',
            '-8',
            '-3,5',
            '7',
            '-7',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы [-1,4] сегментінде x0 =-1, x1, x2, x3=2,75, x4=4 түйін нүктелеріндегі мәндерімен анықталады. Содан кейін бірінші және екінші түйін нүктелері сәйкесінше тең болады',
        options: [
            '1,5; 2,75',
            '0; 1,5',
            '2,75; 4',
            '-1; 1,5',
            '0,25; 1,5',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кесте түрінде берілсін (x1,y1), (x2,y2), … (xn,yn). x1,x2,…,xn түйіндік нүктелеріндегі мәндері кестеге ең жақын болатын белгілі бір түрдің F(x) жуықтау функциясын таңдау процесі тапсырма деп аталады',
        options: [
            'Эйлер әдісімен дифференциалдық теңдеудің шешімдері',
            'Функцияны ең кіші квадраттар әдісімен жуықтау',
            'Сандық саралау',
            'Сандық интеграция',
            'Функцияның ең үлкен квадраттар әдісімен жуықтауы',
        ],
        rightAnswer: 1
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=1,5; x2=2; y0=2; y1=1; y2=6. Осы функцияның туындысын табу үшін Ньютон көпмүшесі таңдалады. Содан кейін x=1 түйін нүктесіндегі туынды функцияның жуықталған мәні',
        options: [
            '1',
            '-8',
            '-1',
            '-4',
            '8',
        ],
        rightAnswer: 0
    },
    {
        question: 'График түрінде шамамен шешім беретін дифференциалдық теңдеулерді шешу әдістері топқа жатады',
        options: [
            'Графикалық әдістер',
            'Сандық әдістер',
            'Сандық интеграция әдістері',
            'Аналитикалық әдістер',
            'Сандық саралау әдістері',
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
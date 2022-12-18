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
      msgOfResult = document.getElementById('msgOfResult');

const questions = [
    {
        question: 'Кестеде көрсетілген f(x) функциясын сандық интеграциялау процедурасын орындау үшін ' + '<img src="qst111.png" class="longf">' + 'деп аталатын формула таңдалады',
        options: [
            'Лагранж формуласы',
            'Ньютон формуласы',
            'Трапеция формуласы',
            'Симпсон формуласы',
            'Котес формуласы',
        ],
        rightAnswer: 3
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=2; x2=3; y0=4; y1=0,5; y2=6. Функцияның интегралын табу үшін Симпсон формуласы таңдалады. Содан кейін интегралдың жуықталған мәні' + '<img src="qst112.png" class="formula">' + 'тең',
        options: [
            '12',
            '6',
            '4',
            '7',
            '-4',
        ],
        rightAnswer: 2
    },
    {
        question: 'Кестеде берілген f(x) функциясының туындысын табу үшін Ньютон түрінің көпмүшесі таңдалады:' + '<img src="qst113.png" class="longf">' + 'Егер x аргументі тең болса, туынды жуықтап есептеуді орындауға болады',
        options: [
            'x=h',
            'x=x1',
            'x=x0',
            'x=x1-x0',
            'x=y0',
        ],
        rightAnswer: 2
    },
    {
        question: 'f(x) функциясы [-1,1] сегментінде x0 =-1, x1=-0,5, x2, x3, x4=1 түйіндік нүктелеріндегі мәндерімен берілген. Содан кейін екінші және үшінші түйін нүктелері сәйкесінше тең болады',
        options: [
            '0; 0,3',
            '-0,4; -0,3',
            '0,6; 0,8',
            '0; 0,5',
            '0; 0,8',
        ],
        rightAnswer: 3
    },
    {
        question: 'f(x) функциясы [0.5, 1.1] сегментінде x0 =0.5, x1=0.8, x2=1.1 түйін нүктелеріндегі мәндерімен берілген. Содан кейін интерполяция қадамы',
        options: [
            '0,1',
            '0,3',
            '-0,3',
            '0,8',
            '0,5',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кестеде берілген f(x) функциясының туындысын табу үшін Ньютон түрінің көпмүшесі таңдалады: ' + '<img src="qst116.png" class="longf">' + ' Содан кейін f(x) функциясының түйіндік нүктелерінің саны',
        options: [
            '4',
            '6',
            '0',
            '2',
            '5',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кесте түрінде ұсынылған: (x1,y1), (x2,y2), … (xn,yn). F(x) жуықтау функциясы келесідей: ' + '<img src="qst119.png" class="formula">' + 'Есепті сандық түрде шешу үшін бастапқы функция эквивалентті түрлендірулерге ұшырайды, нәтижесінде F=a*u+b теңдігі пайда болады. Содан кейін y=f(x) функциясының кестелік мәндері алдымен түр түрлендірулеріне ұшырауы керек',
        options: [
            'u=ln(x)',
            'F=ln(y)',
            'Ф=1/y',
            'Ф=ln(y)',
            'u=1/x',
        ],
        rightAnswer: 4
    },
    {
        question: 'Ең кіші квадраттар әдісін қолдана отырып, кесте бойынша берілген f(x) функциясының жуықтау мәселесін шешу түрдің есептеу формуласына негізделген' ,
        options: [
            '<img src="ans120.1.png" class="longf">',
            '<img src="ans120.4.png" class="longf">',
            '<img src="ans120.5.png" class="longf">',
            '<img src="ans120.3.png" class="longf">',
            '<img src="ans120.2.png" class="longf">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сызықтық теңдеулер жүйесі итеративті түрге ауыстырылды: ' + '<img src="qst130.png" class="sistems">' + 'Конвергенцияны Тексеру сәтті өтті. Егер бастапқы жуықтау x1=0, x2=0, x3=0 деп қабылданса, онда екінші жуықтау болады',
        options: [
            'x1 = 0,8, x2 = -1, x3 = 1',
            'x1 = -1, x2 = 1, x3 = -1',
            'x1 = 1, x2 = -1, x3 = 1',
            'x1 = -1, x2 = 0,8, x3 = 1',
            'x1 = 1, x2 = -1, x3 = 0,8',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кестеде көрсетілген f(x) функциясын сандық интеграциялау процедурасын орындау үшін' + '<img src="qst146.png" class ="longf">' + 'деп аталатын формула таңдалады',
        options: [
            'Трапеция формуласы ',
            'Ньютон формуласы',
            'Симпсон формуласы ',
            'Котес формуласы ',
            'Лагранж формуласы ',
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
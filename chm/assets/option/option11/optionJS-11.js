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
        question: 'Сызықтық теңдеулер жүйесін шешудің тікелей әдістеріне мыналар жатады',
        options: [
            'Симпсон әдісі',
            'Рунге-кутта әдісі',
            'Қарапайым итерация әдісі',
            'Ортогонализация әдісі',
            'Зейдель әдісі',
        ],
        rightAnswer: 3
    },
    {
        question: 'А матрицасының детерминанты ' + '<img src="qst102.png">',
        options: [
            '50',
            '160',
            '14',
            '-1',
            '0',
        ],
        rightAnswer: 2
    },
    {
        question: 'F(x)=0 теңдеуі алгебралық деп аталады, егер F(x) функциясы болса',
        options: [
            'k-ші еселік түбірі бар сызықтық функция',
            'Трансценденттік функция',
            'Алгебралық функция',
            'k-ші еселік функциясы',
            'Қарапайым түбір функциясы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Итерациялық әдістер сызықтық теңдеулер жүйесін шешеді',
        options: [
            'Егер жүйенің теңдеулері мен айнымалыларының саны берілген мәннен аспаса',
            'Егер барлық үш метриканың конвергенциясы орындалса',
            'Егер кеңейтілген матрицаның детерминанты нөлге тең болса',
            'Бір схема бойынша есептелген дәйекті жуықтау шегі ретінде',
            'Арифметикалық амалдардың соңғы саны үшін',
        ],
        rightAnswer: 3
    },
    {
        question: 'F(x)=0 теңдеуінің түбірлерін жартылай бөлу әдісімен нақтылау нәтижесінде түбірі бар өте аз көршілестік алынды [α,β]. Сонда теңдеудің түбірі ретінде мәнді қабылдауға болады',
        options: [
            'x=(α+β)*2',
            'x=(α+β)/2',
            'x=(α-β)*2',
            'x=(α-β)/2',
            'x=2*α+2*β',
        ],
        rightAnswer: 1
    },
    {
        question: 'Функцияның туындысын табу алгоритмін бағдарламалық түрде іске асыру үшін '+ '<img src="qst106.png" class="func">' + 'x=1,7 үшін Ньютон түрінің көпмүшесіне негізделген сандық дифференциалдау әдісі таңдалды: ' + '<img src="qst106.png" class="func">' + 'Содан кейін алгоритмнің бірінші қадамында функцияны кестелік көрініске аудару керек. Осы қадамға сәйкес келетін ең дәл жауапты таңдаңыз.',
        options: [
            'x0=1,7, x1, x2, x3 және h=1 қадамдары бар функция мәндерінің кестесін құрыңыз',
            'h=x0-x1 қадамымен x0, x1, x2 түйін нүктелерінде функция мәндерінің кестесін құрыңыз',
            'x0, x1, x2, x3 тең шығатын түйіндері бар функция мәндерінің кестесін құрыңыз, мұндағы x=1,7 мәні [x0,x3] сегментіне жатады',
            'Ақырлы айырмашылықтар кестесін құру',
            'x0=1,7, x1, x2, x3, x4 тең шығатын түйіндері бар функция мәндерінің кестесін құрыңыз',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=2; x2=3; y0=4; y1=1; y2=6. Функцияның интегралын табу үшін трапеция формуласы таңдалады. Содан кейін интегралдың жуықталған мәні '+ '<img src="qst107.png" class="formula">' + 'тең',
        options: [
            '12',
            '14',
            '-6',
            '7',
            '6',
        ],
        rightAnswer: 4
    },
    {
        question: 'Аналитикалық өрнек түрінде жауап беретін дифференциалдық теңдеулерді шешу әдістері топқа жатады',
        options: [
            'Сандық әдістер',
            'Аналитикалық әдістер',
            'Графикалық әдістер',
            'Сандық саралау әдістері',
            'Сандық интеграция әдістері',
        ],
        rightAnswer: 1
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=1,5; x2=2; y0=2; y1=1; y2=6. Функцияның интегралын табу үшін трапеция формуласы қолданылады. Содан кейін интегралдың жуықталған мәні ' + '<img src="qst109.png" class="formula">' + 'тең',
        options: [
            '2,5',
            '9',
            '4,5',
            '10',
            '5',
        ],
        rightAnswer: 0
    },
    {
        question: 'Кестелік мәндермен берілген функцияның мәнін есептеу үшін Ньютонның екінші интерполяциялық формуласын практикалық қолдану кезінде (х аргументін өзгерту қадамы бірдей болған жағдайда, яғни h=const), формула бойынша есептелген t параметрін ұтымды түрде енгізіңіз',
        options: [
            '<img src="ans110.5.png" class="formula"> ',
            '<img src="ans110.1.png" class="formula"> ',
            '<img src="ans110.2.png" class="formula"> ',
            '<img src="ans110.4.png" class="formula">',
            '<img src="ans110.3.png" class="formula">',
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
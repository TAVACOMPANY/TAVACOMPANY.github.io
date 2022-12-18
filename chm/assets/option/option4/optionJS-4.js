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
        question: 'Теңдеудің түбірлерін сандық табу мәселесі екі кезеңнен тұрады. Бірінші кезеңде орындау керек',
        options: [
            'Теңдеудің аналитикалық шешімі',
            'Әрбір шағын ауданда берілген дәлдікпен түбірді табу',
            'Белгілі бір ауданда берілген дәлдікпен тамырларды есептеу',
            'Тамырларды бөлу',
            'Тамырларды нақтылау',
        ],
        rightAnswer: 3
    },
    {
        question: 'А квадрат матрицасы симметриялы деп аталады, егер',
        options: [
            'А матрицасы дегенеративті',
            'Матрицаның детерминанты нөлге тең',
            'А матрицасы оған транспозицияланғанға тең',
            'А матрицасы оның кері мәніне тең',
            'А матрицасы симметриялы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Cызықтық теңдеулер жүйесін қарапайым Итерация әдісімен шешу жүйенің келесі итерациялық түрге ауысуына әкеледі:' + '<img src="qst33.png" class="sistems">' + 'Конвергенция шарты орындалғанын тексеріңіз. Оң жауаппен α параметрін есептеңіз',
        options: [
            'конвергенция шарттарының ешқайсысы орындалмайды',
            'α = 1',
            'α ≈ 0,91',
            'α = 0,02',
            'α ≈ 0,11',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сызықтық теңдеулер жүйесі келесідей: ' + '<img src="qst34.png" class="formula">' + 'Сызықтық теңдеулер жүйесін ортогонализация әдісімен шешу үшін жүйеден алынған мәліметтерге негізделген векторлар базасы құрылды. Содан кейін базистің екінші векторы келесідей болады',
        options: [
            '(2; 2; -4)',
            '(0; 0; 1)',
            '(1; -2; -4)',
            '(1; -2; 4)',
            '(2; 2; 4)',
        ],
        rightAnswer: 3
    },
    {
        question: 'f(x) функциясы кестелік мәндермен берілсін: x0=1; x1=2; x2=3; y0=-1; y1=1; y2=5. Ньютонның интерполяциялық көпмүшесін құру үшін алдымен ақырлы айырмашылықтар кестесін құру қажет. Сонда мұндай кестенің аға реті тең болады',
        options: [
            '1',
            '2 ',
            '4',
            '0',
            '3',
        ],
        rightAnswer: 1
    },
    {
        question: 'Метрика болып табылатын ρ(x,y) функциясы үшін төрт шарт орындалуы керек, олардың бірі',
        options: [
            'кез келген x және y кезінде ρ(x,y)>0 мәні',
            'ρ(x,y)= - ρ(y,x) кез келген x және y кезіндегі шегі',
            'ρ(x,y)=0 кез келген x және y',
            'кез келген x және y кезінде ρ(x,y)<0',
            'ρ(x,y)=ρ(y,x) кез келген x және y',
        ],
        rightAnswer: 4
    },
    {
        question: 'ρ(x,y) функциясы метрика ретінде қабылдануы мүмкін, егер төрт шарт орындалса, олардың бірі',
        options: [
            'кез-келген x және y кезінде ρ(x,y)>0 мәні',
            'кез келген x және y кезінде ρ(x,y)<0',
            'кез келген x және y кезінде ρ(x,y)=-ρ(y,x)',
            'кез келген x және y кезінде ρ(x,y)=0 мән',
            'өрнек ρ(x,y)=0, егер x=y болса ғана',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=2; x2=3; y0=1; y1=5; y2=11. Түйін нүктелерінің ешқайсысына сәйкес келмейтін x аргументінің функциясының мәнін табу үшін интерполяциялық көпмүше салынды. Көпмүшелердің қайсысы интерполяция процедурасының нәтижесі екенін анықтаңыз',
        options: [
            'F(x) = x2 +x +1',
            'F(x) = x2 +x -1',
            'F(x) = x2 -x +1',
            'F(x) = -x2 -x +2',
            'F(x) = x2 +1',
        ],
        rightAnswer: 1
    },
    {
        question: 'Итерациялық процестің конвергенциясының жеткілікті шарты келесідей: ' + '<img src="qst39.png" class="alpha">' + 'одан кейін итерациялық процесті тоқтату шарты үшін қолданылатын метрика ретінде таңдау керек',
        options: [
            '<img src="ans39.4.png" class="longf">',
            '<img src="ans39.1.png" class="longf">',
            '<img src="ans39.6.png" class="longf">',
            '<img src="ans39.3.png" class="longf">',
            '<img src="ans39.2.png" class="longf">',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сызықтық теңдеулер жүйесі келесідей: ' + '<img src="qst40.png" class="formula">' + 'Сызықтық теңдеулер жүйесін ортогонализация әдісімен шешу үшін жүйеден алынған мәліметтерге негізделген векторлар базасы құрылды. Содан кейін бірінші вектор келесідей болады',
        options: [
            '(2; 2; -4)',
            '(1; -2; -4)',
            '(1; -2; 4)',
            '(0; 0; 1)',
            '(2; 2; 4)',
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
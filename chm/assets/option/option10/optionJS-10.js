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
        question: 'f(x) функциясы кестелік мәндермен берілген: x0=1; x1=2; x2=3; y0=-1; y1=1; y2=5. Жуықтау функциясын құру үшін Ньютон көпмүшесі таңдалды. Алдын ала ақырлы айырмашылықтар кестесі жасалды. Бұл жағдайда ақырлы айырмашылық ' + '<img src="qst91.png">' + ' тең',
        options: [
            '0',
            '3',
            '4',
            '2',
            '1',
        ],
        rightAnswer: 3
    },
    {
        question: 'f(x) функциясы [0,10] сегментінде x0, x1, түйін нүктелеріндегі мәндерімен берілген. Бұл жағдайда интерполяция қадамы',
        options: [
            '-5',
            '2,5',
            '5',
            '3,3',
            '5,5',
        ],
        rightAnswer: 2
    },
    {
        question: 'f(x) функциясы [1,2] сегментінде бірдей шығатын түйіндері бар кесте түрінде анықталады. h интерполяциясының қадамы 0,25. Содан кейін кестедегі түйін нүктелерінің саны',
        options: [
            '10',
            '2',
            '5',
            '4',
            '1',
        ],
        rightAnswer: 2
    },
    {
        question: 'F(x) функциясы кестелік мәндермен берілсін: x0=1; x1=2; x2=3; y0=-1; y1=1; y2=5. Жуықтау функциясын құру үшін Ньютон көпмүшесі таңдалды. Алдын ала ақырлы айырмашылықтар кестесі жасалды. Бұл жағдайда ақырлы айырмашылықтар сәйкесінше ' +  '<img src="qst92.png">' + ' және ' + '<img src="qst92.1.png">' + 'тең болады',
        options: [
            '2; -4',
            '1; 1',
            '-2; -4',
            '2; 4',
            '2; 2',
        ],
        rightAnswer: 3
    },
    {
        question: 'Дәл бір шешімі бар сызықтық теңдеулер жүйесі деп аталады',
        options: [
            'Сызықтық теңдеулердің сәйкес келмейтін жүйесі',
            'Сызықтық теңдеулердің белгілі бір жүйесі',
            'Сызықтық теңдеулердің квадрат жүйесі',
            'Сызықтық теңдеулердің деградацияланбаған жүйесі',
            'Сызықтық теңдеулердің деградациялық жүйесі',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кем дегенде бір шешімі бар сызықтық теңдеулер жүйесі деп аталады',
        options: [
            'Сызықтық теңдеулердің деградацияланбаған жүйесі',
            'Сызықтық теңдеулердің квадрат жүйесі',
            'Сызықтық теңдеулердің деградациялық жүйесі',
            'Сызықтық теңдеулердің сәйкес келмейтін жүйесі',
            'Сызықтық теңдеулердің бірлескен жүйесі',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кестелік мәндермен берілген: x0=1; x1=2; x2=3; y0=-1; y1=1; y2=5. x0, x1, x2 түйін нүктелеріндегі F(x) және f(x) мәндерінің сәйкестігі – міндетті шартты орындай отырып, F(x) жуықтау функциясын құру үшін түрдің көпмүшесі салынды' + '<img src="qst97.png" class="longf">' + 'Содан кейін көпмүшенің түрі болады',
        options: [
            'F(x) = x2 -1',
            'F(x) = x2 -2x -1',
            'F(x) = x2 +x -1',
            'F(x) = x2 -x +1',
            'F(x) = x2 -x -1',
        ],
        rightAnswer: 4
    },
    {
        question: 'F(x)=0 теңдеуінің түбірлерін жартылай бөлу әдісімен нақтылау нәтижесінде түбірі бар өте аз көршілестік алынды [α,β].Сонда жуықталған шешімнің қателігі мәннен аспайды',
        options: [
            'D=(β+α)/2',
            'D=(β-α)/2',
            'D=(β-α)*2',
            'D=(α+β)/2',
            'D=(β-α)',
        ],
        rightAnswer: 1
    },
    {
        question: 'Арифметикалық амалдардың шектеулі саны үшін сызықтық теңдеулер жүйесінің шешімін беретін әдістер',
        options: [
            'Тікелей әдістермен',
            'Жуықтау әдістерімен',
            'Итерациялық',
            'Симплекс әдістерімен',
            'Аккорд және тангенс әдістерімен',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сызықтық теңдеулер жүйесін шешуге арналған итерациялық реттілік ' + '<img src="qst100.png" class="forp">' + 'метрикасына негізделген. Содан кейін тізбектің конвергенциясының жеткілікті шарты келесідей тұжырымдалады…',
        options: [
            '<img src="ans100.1.png" class="alpha">',
            '<img src="ans100.2.png" class="alpha">',
            'Сызықтық теңдеулер жүйесінің оң жағында белгісіз барлық коэффициенттердің квадраттарының қосындысы бірлікке тең болуы керек',
            '<img src="ans100.3.png" class="alpha">',
            'Сызықтық теңдеулер жүйесінің оң жағында белгісіз барлық коэффициенттердің квадраттарының қосындысы біреуден көп болуы керек',
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
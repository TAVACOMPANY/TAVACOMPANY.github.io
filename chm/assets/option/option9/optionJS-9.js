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
        question: 'Берілген теңдеулердің қайсысы трансценденталды екенін көрсетіңіз',
        options: [
            'y+4=0',
            '5x+1=0',
            'x-3=0',
            'x-sin(x)=2',
            '-6z+1=0',
        ],
        rightAnswer: 3
    },
    {
        question: 'Сызықтық теңдеулер жүйесін Сейдель әдісімен шешкен кезде жүйені матрицалық түрде ұсынды: A·X=B. жүйені итерациялық тізбектің конвергенциясына кепілдік беретін түрге түрлендіру үшін әрекетті орындау қажет',
        options: [
            'AT·A·X=A·B',
            'A·A·X=A·B',
            'AT·A·X=AT·B',
            'A·AT·X=B·AT',
            'A·AT·X=AT·B',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сызықтық теңдеулер жүйесін шешуде ' + '<img src="qst83.png" class="forp">' + 'метрикасын қолдана отырып, итерациялық реттілік құрылады . Бұл жағдайда тізбектің конвергенциясының жеткілікті шарты келесідей тұжырымдалады …',
        options: [
            '<img src="ans83.1.png" class="alpha">',
            '<img src="ans83.2.png" class="alpha">',
            '<img src="ans83.3.png" class="alpha">',
            'Сызықтық теңдеулер жүйесінің оң жағында белгісіз барлық коэффициенттердің квадраттарының қосындысы бірлікке тең болуы керек',
            'Сызықтық теңдеулер жүйесінің оң жағында белгісіз барлық коэффициенттердің квадраттарының қосындысы біреуден аз болуы керек',
        ],
        rightAnswer: 2
    },
    {
        question: 'Сызықтық теңдеулер жүйесінің сандық шешімі мағынасы бар, егер',
        options: [
            'Жүйе коэффициенттері матрицасының детерминанты нөлге тең',
            'Жүйе коэффициенттерінің матрицасы квадрат болып табылады',
            'Жүйе коэффициенттерінің матрицасы сәйкес келмейді',
            'Жүйе коэффициенттері матрицасының детерминанты нөлге тең емес ',
            'Жүйе коэффициенттерінің матрицасы үшбұрышты',
        ],
        rightAnswer: 3
    },
    {
        question: 'Теңдеулер жүйесі келесідей болсын:' + '<img src="qst85.png" class="formula">' + 'Осы сызықтық теңдеулер жүйесін ортогонализация әдісімен шешу үшін жүйеден алынған мәліметтерге негізделген векторлар базасы құрылды. Содан кейін базистің үшінші векторы келесідей болады',
        options: [
            '(1; -2; -4)',
            '(0; 0; 1)',
            '(2; 2; 4)',
            '(2; 2; -4)',
            '(1; -2; 4)',
        ],
        rightAnswer: 1
    },
    {
        question: 'f(x) функциясының аналитикалық өрнегі белгісіз болсын, бірақ оның мәндерінің кестесі түйін нүктелерінде көрсетілген. Түйіндік нүктелердің ешқайсысына сәйкес келмейтін аргумент функциясының мәнін табу үшін арнайы әдіс қолданылады – f(x) функциясының бастапқы деректері бойынша құрылыс. Бұл x1, x2 ,…., xn түйін нүктелеріндегі f(x) және F(x) мәндерінің дәл сәйкестігін талап етеді. Шамамен функцияны табудың бұл әдісі деп аталады',
        options: [
            'Симпсон әдісімен',
            'Саралау арқылы',
            'Интеграциялау арқылы',
            'Рунге-кутта әдісімен',
            'Интерполяция арқылы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Кесте түрінде берілген f(x) функциясының туындысын табу үшін Ньютон түрінің көпмүшесі таңдалады: ' + '<img src="qst87.png" class="func">' + 'Содан кейін f(x) функциясының түйіндік нүктелерінің саны',
        options: [
            '3',
            '5',
            '2',
            '1',
            '4',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы [1,10] сегментінде x0, x1, x2, x3 түйін нүктелеріндегі мәндерімен берілген. Бұл жағдайда интерполяция қадамы',
        options: [
            '5,5',
            '3',
            '2,5',
            '-3',
            '2,25',
        ],
        rightAnswer: 1
    },
    {
        question: 'f(x) функциясы [1,2] сегментінде тең шығатын түйіндері бар кесте түрінде берілген. h интерполяциясының қадамы 0,25. Содан кейін интерполяция сегменттерінің саны n',
        options: [
            '4',
            '0',
            '10',
            '5',
            '0,25',
        ],
        rightAnswer: 0
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=1,5; x2=2; y0=2; y1=3; y2=6. Осы функцияның туындысын табу үшін түрдің тең тұрған түйіндері үшін Лагранж көпмүшесі салынды:',
        options: [
            't=2*(x-1)',
            't=2x',
            't=2*(x-2)',
            't=4*(x-1)',
            't=0,5*(x-1)',
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
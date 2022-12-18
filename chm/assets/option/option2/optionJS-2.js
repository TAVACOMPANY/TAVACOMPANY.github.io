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
        question: 'Теңдеулер жүйесін шешу үшін бұл жүйені итерациялық түрге түрлендіру жүзеге асырылды:' + '<img src="qst11.png" class="sistems">' + 'Конвергенцияны тексеру кез-келген метриканы таңдау қайталанатын тізбектің конвергенциясына кепілдік беретіндігін көрсетті. Егер бастапқы жуықтау ретінде қабылданса x1=0, x2=0, x3=0, онда екінші жуықтау келесідей болады',
        options: [
            'x1 = -1, x2 = -1, x3 = -1',
            'x1 = 1, x2 = 1, x3 = 1,2',
            'x1 = 1, x2 = 1, x3 = 1',
            'x1 = -1, x2 = -1, x3 = -1,2',
            'x1 = -1, x2 = -1, x3 = 1,2',
        ],
        rightAnswer: 3
    },
    {
        question: 'F(x)=0 теңдеуінің сандық шешімі үшін eps=0.01 дәлдігі қарапайым Итерация әдісімен таңдалады. Конвергенция шарттарын тексеру нәтижесінде q=0.2 нақты саны алынды. Содан кейін есептеулерді тоқтату критерийі итерациялық реттілікке сәйкес келеді',
        options: [
            '0.5, 0.2, 0.01',
            '0.1, 0.3, 0.6',
            '0.09, 0.03, 0.01',
            '0.2, 0.1, 0.03',
            '0.01, 0.07, 0.15',
        ],
        rightAnswer: 2
    },
    {
        question: 'F(x)=0 теңдеуін шешудің кең таралған сандық әдістерінің бірі',
        options: [
            'Симпсон Әдісі',
            'Ең кіші квадраттар әдісі',
            'Қарапайым Итерация әдісі',
            'Рунге-Кутта Әдісі',
            'Симплекс әдісі',
        ],
        rightAnswer: 2
    },
    {
        question: 'x=(x1,x2,…,xn) және y=(y1,y2,…,yn) сызықтық теңдеулер жүйесіне негізделген итерациялық тізбектің екі жуықтауы болсын. Қарапайым Итерация әдісін келесі көрсеткіштердің бірімен сызықтық теңдеулер жүйесінде қарастыруға болады',
        options: [
            '<img src="ans14.1.png" class="func">',
            '<img src="ans14.4.png" class="func">',
            '<img src="ans14.3.png" class="func">',
            '<img src="ans14.2.png" class="func">',
            '<img src="ans14.5.png" class="func">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Сызықтық теңдеулер жүйесін шешудің итерациялық әдістеріне мыналар жатады',
        options: [
            'Гаусс әдісімен',
            'Зейдель әдісі',
            'Рунг-кутта әдісімен',
            'Крамер әдісі',
            'Ортогонализация әдісі',
        ],
        rightAnswer: 1
    },
    {
        question: 'Теңдеулер жүйесін қарапайым Итерация әдісімен шешкен кезде түрдің теңдіктері құрылады: ' + '<img="qst16.png" class="sistems">' + 'Конвергенцияны тексеру оң нәтиже берді. Егер бастапқы жуықтау келесідей болса: x1=0, x2=0, x3=0, онда екінші жуықтау болады',
        options: [
            'x1 = 0,1, x2 = 0,9, x3 = 0,3',
            'x1 = 1, x2 = -2, x3 = 2',
            'x1 = 0,78, x2 = -2, x3 = 2',
            'x1 = 1, x2 = -1,99, x3 = 2',
            'x1 = 0,78, x2 = -1,99, x3 = 0,3 ',
        ],
        rightAnswer: 4
    },
    {
        question: 'f(x) функциясы кесте түрінде берілген: x0=1; x1=2; x2=3; y0=-1; y1=1; y2=5. Міндетті шартты – x0, x1, x2 түйін нүктелеріндегі F(x) және f(X) мәндерінің сәйкестігін орындай отырып, F(x) жуықтау функциясын құру үшін түрдің көпмүшесін қолдана отырып интерполяциялау процедурасы қолданылды: ' + '<img src="qst17.png" class="longf">' + 'Содан кейін x=2,5 функциясының мәні',
        options: [
            '4,75',
            '-2,875',
            '59',
            '-0,25',
            '2,75',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сызықтық теңдеулер жүйесі итеративті түрге ауыстырылды: ' + '<img src="qst18.png" class="sistems">' + 'Конвергенцияны тексеру барлық үш метрика итерациялық тізбектің конвергенциясына кепілдік беретіндігін көрсетті. Егер сіз бірінші метриканы таңдасаңыз, итерацияны тоқтату шарты үшін α параметрінің мәнін таңдауыңыз керек',
        options: [
            'α = 1',
            'α = 0,2',
            'α = 0,2005',
            'α = -0,2',
            'α = 0,11',
        ],
        rightAnswer: 1
    },
    {
        question: 'Матрица деградацияға ұшырамайды, егер',
        options: [
            'Матрица жолдарының саны бағандар санына тең және оның детерминанты нөлге тең емес',
            'Матрица жолдарының саны бағандар санынан үлкен және оның детерминанты нөлге тең',
            'Оның детерминанты бірлікке тең',
            'Матрица жолдарының саны бағандар санынан аз және оның детерминанты нөлге тең емес',
            'Матрица бағандарының саны жолдар санына тең, ал оның детерминанты нөлге тең',
        ],
        rightAnswer: 0
    },
    {
        question: 'x=(x1,x2,…,xn) және y=(y1,y2,…,yn) n – өлшемді кеңістіктің екі нүктесі болсын (сызықтық теңдеулер жүйесіне салынған итерациялық тізбектің екі жуықтауы). Қарапайым Итерация әдісін келесі көрсеткіштердің бірімен сызықтық теңдеулер жүйесінде қарастыруға болады',
        options: [
            '<img src="ans20.1.png" class="func">',
            '<img src="ans20.2.png" class="func">',
            '<img src="ans20.3.png" class="func">',
            '<img src="ans20.4.png" class="func">',
            '<img src="ans20.5.png" class="func">',
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
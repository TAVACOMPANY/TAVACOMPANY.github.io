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
        question: 'Интерполяциялық көпмүшені құру процедурасын жүргізу кезінде Ньютон көпмүшесі таңдалды. Бұл жағдайда алдымен ақырлы айырмашылықтар кестесін құру қажет. Формулалардың қайсысы ақырлы айырмашылықтарды есептеу процедурасын дұрыс анықтайтынын анықтаңыз.',
        options: [
            'yi-1 – yi',
            'yi - yi+1',
            'xi+1 – xi',
            'yi+1 – yi',
            'xi+1 – yi',
        ],
        rightAnswer: 3
    },
    {
        question: 'Сызықтық емес теңдеу берілсін F(x)=0. Бұл жағдайда F(x) функциясы [a,b] интервалында анықталады және үздіксіз болады. Егер F(x) сызықтық емес функциясын ғана емес, оның туындыларын (k-1) ретіне дейін нөлге айналдыратын t∈[a,b] саны болса, онда мұндай t саны аталады',
        options: [
            'Теңдеудің трансценденттік түбірі',
            'Теңдеудің қарапайым түбірі',
            'k-ші еселік теңдеуінің түбірі',
            'Теңдеудің алгебралық түбірі',
            'Эквивалентті теңдеу',
        ],
        rightAnswer: 2
    },
    {
        question: 'F(x)=0 теңдеуінің түбірлерін бөлу процедурасын орындау үшін график құруды жеңілдету үшін f(x)=g(x) эквивалентті теңдеуіне көшу жүзеге асырылды. Нәтижесінде теңдеудің барлық түбірлерін қамтитын [A,B] сегменті алынды. Теңдеудің дәл бір түбірін қамтитын a,b]⊂[A,B] табу шартымен түбірді бөлу кезеңін бағдарламалық түрде жүзеге асыруда мыналарды көрсетуге болады',
        options: [
            'F(a)*F(b)>0',
            'F(a)/F(b)<0',
            'F(a)*F(b)<0',
            'F(a)+F(b)=0',
            'F(a)-F(b)=0',
        ],
        rightAnswer: 2
    },
    {
        question: 'F(x) және G(x) екі теңдеуі эквивалент деп аталады, егер ',
        options: [
            'Кем дегенде бір теңдеу алгебралық болып табылады және олардың шешімдерінің жиынтығында кем дегенде бір ортақ элемент болады',
            'Бірінші теңдеудің кем дегенде бір шешімі екінші теңдеудің шешімі болып табылады',
            'Осы теңдеулердің әрқайсысында көптеген шешімдер бар',
            'Осы теңдеулердің шешімдерінің жиынтығы сәйкес келеді',
            'Екі теңдеу де трансценденталды және осы теңдеулердің k-ші еселігінің шешімдерінің жиынтығы қиылыспайды',
        ],
        rightAnswer: 3
    },
    {
        question: 'ρ(x,y) функциясы төрт шарт орындалса, метрика деп аталады, олардың бірі',
        options: [
            'кез келген x және y кезінде ρ(x,y)=0',
            'кез-келген x және y кезінде ρ(x,y)≥0',
            'кез келген x және y кезінде ρ(x,y)<0',
            'кез-келген x және y кезінде ρ(x,y)>0',
            'кез келген x және y кезінде ρ(x,y)=-ρ(y,x)',
        ],
        rightAnswer: 1
    },
    {
        question: 'f(x) функциясы кестелік мәндермен берілген: x0=1; x1=2; x2=3; y0=1; y1=3; y2=7. Түйін нүктелерінің ешқайсысына сәйкес келмейтін x аргументінің функциясының мәнін табу үшін интерполяциялық көпмүше салынды. Көпмүшелердің қайсысы интерполяция процедурасының нәтижесі екенін анықтаңыз',
        options: [
            'F(x) = x2 +x -2',
            'F(x) = x2 +x -1',
            'F(x) = x2 -x -1',
            'F(x) = x2 +1',
            'F(x) = x2 -x +1',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сызықтық теңдеулер жүйесін шешу үшін эквивалентті теңдіктер құрылады:' + '<img src="qst77.png" class="sistems">' + 'Конвергенцияны тексеру оң нәтиже берді. Бастапқы жуықтау келесідей болады: x1=0, x2=0, x3=0. Содан кейін бірінші жуықтау',
        options: [
            'x1 = 1, x2 = 1, x3 = 1',
            'x1 = 1, x2 = 2, x3 = 2',
            'x1 = -1, x2 = 2, x3 = -2',
            'x1 = -1, x2 = -2, x3 = -2',
            'x1 = 1, x2 = -2, x3 = 2',
        ],
        rightAnswer: 4
    },
    {
        question: 'Теңдеудің түбірлерін сандық табу мәселесі екі кезеңнен тұрады. Екінші кезеңде орындау керек',
        options: [
            'Тамырларды бөлу',
            'Белгілі бір ауданда берілген дәлдікпен тамырларды есептеу',
            'Теңдеудің барлық түбірлері орналасқан сандық сызықтағы аймақты табу',
            'Теңдеудің аналитикалық шешімі',
            'Қарастырылып отырған аймақтың бір түбір мәні бар жеткілікті шағын аудандарын табу',
        ],
        rightAnswer: 1
    },
    {
        question: '[a,b] сегментіндегі F(x)=0 теңдеуінің сандық шешімін жартылай бөлу әдісін бағдарламалық түрде жүзеге асыруда c=(a+b)/2 ортасы табылды. Егер F(a)*F(c)<0 шарты дұрыс болса, онда пәрменді орындау керек (C++ синтаксис)',
        options: [
            'b=c',
            'a=c',
            'a=b',
            'c=a',
            'c=b',
        ],
        rightAnswer: 0
    },
    {
        question: 'Сызықтық теңдеулер жүйесі Зайдель әдісімен шешу үшін «қалыпты» түрге ауыстырылды. Түрлендіру нәтижесінде коэффициент матрицасы келесідей болады: ' + '<img src="qst80.png" class="formula">' + 'Түрлендірілген теңдеулер жүйесінің оң жағы (4; 16). Содан кейін сызықтық теңдеулер жүйесін Зейдель әдісімен сандық шешу үшін бірінші өрнек келесідей болады',
        options: [
            '<img src="ans80.2.png" class="fory">',
            '<img src="ans80.1.png" class="fory">',
            '<img src="ans80.3.png" class="fory">',
            '<img src="ans80.4.png" class="fory">',
            '<img src="ans80.5.png" class="fory">',
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
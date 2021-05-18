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
      br = '<br/>';

const questions = [
    {
        question: 'Теорема Гаусса для электростатического поля в вакууме имеет вид ... .',
        options: [
            '<img src="img8/image16- 4.png">',
            '<img src="img8/image16- 5.png">',
            '<img src="img8/image16- 1.png">',
            '<img src="img8/image16- 2.png">',
            '<img src="img8/image16- 3.png" class="ct3">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Как вычисляется работа тока на участке цепи?',
        options: [
            '<img src="img8/image17- 3.png" class="cep">',
            '<img src="img8/image17- 5.png">',
            '<img src="img8/image17- 2.png">',
            '<img src="img8/image17- 4.png">',
            '<img src="img8/image17- 1.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'В однородном диэлектрике (диэлектрическая проницаемость =3) создано электрическое поле напряженности Е=600 В/м. Чему равна объемная плотность энергии поля:',
        options: [
            '<img src="img8/image18- 4.png">',
            '<img src="img8/image18- 3.png">',
            '<img src="img8/image18- 5.png">',
            '<img src="img8/image18- 2.png">',
            '<img src="img8/image18- 1.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Как определяется сила, действующая на заряженную частицу, находящуюся в электрическом поле (в общем случае):',
        options: [
            '<img src="img8/image19- 1.png">',
            '<img src="img8/image19- 2.png">',
            '<img src="img8/image19- 3.png">',
            '<img src="img8/image19- 4.png">',
            '<img src="img8/image19- 5.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какую из приведенных ниже формул можно пользоваться для вычисления энергии электрического поля?',
        options: [
            '<img src="img8/image20- 3.png" class="cep">',
            '<img src="img8/image20- 1.png" class="cep">',
            '<img src="img8/image20- 5.png" class="cep">',
            '<img src="img8/image20- 2.png">',
            '<img src="img8/image20- 4.png">',
        ],
        rightAnswer: 0
    },
    {
        question: 'При каких условиях наблюдается дифракция?',
        options: [
            'размеры препятствия гораздо меньше длины волны',
            'препятствие отсутствует',
            'размеры препятствия меньше длины волны',
            'размеры препятствия гораздо больше длины волны',
            'размеры препятствия соизмеримы с длиной волны',
        ],
        rightAnswer: 4
    },
    {
        question: 'Свободный электрический диполь расположили в однородном электрическом поле, как показано на рисунке. Что будет происходить с диполем:' + br + '<img src="img8/image22- 0.png" class="graphs">',
        options: [
            'Диполь повернется по часовой стрелке',
            'Диполь останется в прежнем положении',
            'Диполь будет перемещаться влево',
            'Диполь повернется против часовой стрелки',
            'Диполь будет перемещаться вправо',
        ],
        rightAnswer: 3
    },
    {
        question: 'Интегральная энергетическая светимость... .',
        options: [
            '<img src="img8/image23- 4.png">',
            '<img src="img8/image23- 3.png">',
            '<img src="img8/image23- 2.png" class="ct3">',
            '<img src="img8/image23- 1.png">',
            '<img src="img8/image23- 5.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какую скорость приобретет электрон, пройдя в электрическом поле ускоряющую разность потенциалов 10 кВ?' + br + '<img src="img8/image24- 0.png" class="srednee">',
        options: [
            '<img src="img8/image24- 5.png">',
            '<img src="img8/image24- 1.png">',
            '<img src="img8/image24- 3.png">',
            '<img src="img8/image24- 2.png">',
            '<img src="img8/image24- 4.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Сколько тонких линз можно получить, рассекая стеклянную сферу параллельными поверхностями?',
        options: [
            '2',
            '5',
            '4',
            '1',
            '3',
        ],
        rightAnswer: 0
    },
    {
        question: 'Пылинка массой ' + '<img src="img8/image26- 00.png">' + 'несущая на себе 5 электронов, прошла ускоряющую разность потенциалов U=3 МВ. Как изменилась кинетическая энергия пылинки? Заряд электрона ' + '<img src="img8/image26- 01.png" class="relyat">',
        options: [
            'Уменьшилась на 1,5 мк Дж',
            'Не изменилась',
            'Возросла на 15 МДж',
            'Уменьшилась на 8 мк Дж',
            'Возросла на 2,4 п Дж',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какая из приведенных формул соответствует закону Ома в дифференциальной форме?',
        options: [
            '<img src="img8/image27- 5.png">',
            '<img src="img8/image27- 4.png">',
            '<img src="img8/image27- 3.png">',
            '<img src="img8/image27- 2.png">',
            '<img src="img8/image27- 1.png" class=""ct3>',
        ],
        rightAnswer: 3
    },
    {
        question: 'Объемная плотность электростатического поля в вакууме равна ... .',
        options: [
            '<img src="img8/image28- 5.png" class="cep">',
            '<img src="img8/image28- 3.png" class="cep">',
            '<img src="img8/image28- 1.png" class="cep">',
            '<img src="img8/image28- 2.png" class="cep">',
            '<img src="img8/image28- 4.png" class="cep">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Резисторы сопротивлением R1 = 150 Ом и R2 =75 Ом включены последовательно в сеть. Какое количество теплоты выделится в резисторе R1, если в резисторе R2 выделилось 20 кДж теплоты?',
        options: [
            '40 Дж',
            '40 кДж',
            '10 Дж',
            '225 кДж',
            '10 кДж',
        ],
        rightAnswer: 1
    },
    {
        question: 'Чему равно сопротивление электрической лампочки мощностью 100Вт при напряжении U = 220В?',
        options: [
            '484 Ом',
            '2,2 Ом',
            '22 кОм',
            '48,4 Ом',
            '0 Ом',
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

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
    document.getElementById('btn-next').value= "ЗАВЕРШИТЬ";
    coratten();
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
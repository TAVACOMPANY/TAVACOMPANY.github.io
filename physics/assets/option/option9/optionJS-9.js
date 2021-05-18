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
        question: 'По какой формуле рассчитывается индуктивное сопротивление?',
        options: [
            '<img src="img9/image1- 4.png">',
            '<img src="img9/image1- 2.png">',
            '<img src="img9/image1- 5.png">',
            '<img src="img9/image1- 1.png">',
            '<img src="img9/image1- 3.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Красная граница фотоэффекта...',
        options: [
            '<img src="img9/image2- 2.png">',
            '<img src="img9/image2- 4.png">',
            '<img src="img9/image2- 1.png">',
            '<img src="img9/image2- 5.png">',
            '<img src="img9/image2- 3.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое из приведенных утверждений является верным в теории Бора?',
        options: [
            'Радиус орбиты электрона с течением времени уменьшается',
            'При движении электронов по орбите происходит непрерывной излучение энергии',
            'Разрешенными орбитами для электронов являются такие, для которых момент импульса электронов кратен целому числу величин h',
            'Радиус орбиты электрона с течением времени увеличивается',
            'Энергия электрона на орбите и ее радиус могут быть произвольными',
        ],
        rightAnswer: 2
    },
    {
        question: 'Емкость одного конденсатора 0,5мкФ, второго -5мкФ. Чтобы они могли накопить одинаковые заряды 15мкКл, на их пластины нужно подать напряжение:',
        options: [
            '30В и 300В',
            '30В и 3В',
            '10В и 100В',
            '0,03В и 0,3В',
            '3В и 30В',
        ],
        rightAnswer: 1
    },
    {
        question: 'Емкость плоского конденсатора рассчитывается по формуле ... .',
        options: [
            '<img src="img9/image5- 3.png">',
            '<img src="img9/image5- 5.png">',
            '<img src="img9/image5- 4.png">',
            '<img src="img9/image5- 2.png">',
            '<img src="img9/image5- 1.png">',
        ],
        rightAnswer: 0
    },
    {
        question: 'На рисунке представлен график зависимости величины ЭДС переменного тока от времени. По графику найдите частоту тока?' + br + '<img src="img9/image6- 0.png" class="graphs">',
        options: [
            '30 Гц',
            '100 Гц',
            '50Гц',
            '20 Гц',
            '25 Гц',
        ],
        rightAnswer: 4
    },
    {
        question: 'Согласно гипотезе де Бройля не только фотон, но и каждый объект обладает … свойствами.',
        options: [
            'световыми',
            'волновыми',
            'электрическими',
            'корпускулярными и волновыми',
            'корпускулярными',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что выражает уравнение : ' + '<img src="img9/image8- 0.png">',
        options: [
            'Обобщенный закон Ома',
            'Понятие плотности тока',
            'Закон Ома в дифференциальной форме',
            'Закон Джоуля-Ленца в дифференциальной форме',
            'Закон Ома для участка цепи',
        ],
        rightAnswer: 2
    },
    {
        question: 'Каким светом нельзя пользоваться для точного определения показателя преломления вещества?',
        options: [
            'Зеленым',
            'Белым',
            'Желтым',
            'Фиолетовым',
            'Красным',
        ],
        rightAnswer: 1
    },
    {
        question: 'Свечение тел, обусловленное нагреванием, которое происходит за счет теплового движения молекул и атомов вещества за счет его внутренней энергии - это … .',
        options: [
            'тепловое излучение',
            'люменисценция',
            'рентгеновское излучение',
            'Гамма-излучение',
            'фотоэффект',
        ],
        rightAnswer: 0
    },
    {
        question: 'На рисунке показан график зависимости тока на однородном участке цепи от приложенного напряжения. Чему равно сопротивление участка:' + br + '<img src="img9/image11- 0.png" class="graphs">',
        options: [
            '0,040 Ом',
            '20 Ом',
            '0,025 Ом',
            '60 Ом',
            '40 Ом',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое из соотношений выражает собой теорему Остроградского-Гаусса для электростатического поля в веществе:',
        options: [
            '<img src="img9/image12- 4.png">',
            '<img src="img9/image12- 3.png">',
            '<img src="img9/image12- 5.png">',
            '<img src="img9/image12- 1.png">',
            '<img src="img9/image12- 2.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'В некоторой точке поля на заряд ' + '<img src="img9/image13- 00.png">' + ' действует сила ' + '<img src="img9/image13- 01.png">' + 'Напряженность поля в этой точке равна:',
        options: [
            '3,2кВ/м',
            '32кВ/м',
            '20кВ/м',
            '0,2кВ/м',
            '0,05кВ/м',
        ],
        rightAnswer: 2
    },
    {
        question: 'Масса фотона…',
        options: [
            '<img src="img9/image14- 2.png" class="cep">',
            '<img src="img9/image14- 1.png" class="cep">',
            '<img src="img9/image14- 3.png" class="cep">',
            '<img src="img9/image14- 4.png" class="cep">',
            '<img src="img9/image14- 5.png" class="cep">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Три одинаковых шарика, имеющих заряды 11 мкКл, -13 мкКл и 35 мкКл, приводят в соприкосновение на короткое время, а затем вновь разводят. Какой заряд окажется на первом шарике?',
        options: [
            '11 мкКл',
            '59 мкКл',
            '46 мкКл',
            '-33 мкКл',
            '33 мкКл',
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
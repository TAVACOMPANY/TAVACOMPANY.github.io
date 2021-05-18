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
        question: 'Уравнение Штейнера имеет вид ... .',
        options: [
            '<img src="img6/image16-  5.png" class="ct3">',
            '<img src="img6/image16-  4.png" class="ct3">',
            '<img src="img6/image16-  2.png" class="ct3">',
            '<img src="img6/image16-  1.png" class="ct3">',
            '<img src="img6/image16-  3.png" class="ct3">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Понятие энтропии можно дать из формулы:',
        options: [
            '<img src="img6/image17-  2.png" class="ct3">',
            '<img src="img6/image17-  3.png" class="ct3">',
            '<img src="img6/image17-  4.png" class="ct3">',
            '<img src="img6/image17-  5.png" class="ct3">',
            '<img src="img6/image17-  1.png" class="ct3">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что называется тангенциальным ускорением?',
        options: [
            'Быстрота изменения вектора скорости',
            'Быстрота изменения радиус – вектора',
            'Составляющая полного ускорения, характеризующая изменение вектора скорости по величине',
            'Составляющая полного ускорения, характеризующая изменение вектора скорости по направлению',
            'Составляющая полного ускорения, перпендикулярная вектору скорости',
        ],
        rightAnswer: 2
    },
    {
        question: 'На графике изображены процессы изменения состояния постоянной массы идеального газа в координатах PV. Найдите изображение этих процессов в координатах V,T.' + '<img src="img6/image19-  0.png" class="graphs">',
        options: [
            '<img src="img6/image19-  2.png" class="graphs">',
            '<img src="img6/image19-  3.png" class="graphs">',
            '<img src="img6/image19-  1.png" class="graphs">',
            '<img src="img6/image19-  5.png" class="graphs">',
            '<img src="img6/image19-  4.png" class="graphs">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Считая, что молекулы воды имеют вид шариков, соприкасающихся друг с другом, найти диаметр d молекул, находящихся в 1 куб. мм.',
        options: [
            '311 пм',
            '212 пм',
            '182 пм',
            '412 пм',
            '230 пм',
        ],
        rightAnswer: 0
    },
    {
        question: 'По какой формуле определяется энергия покоя в релятивистской динамике',
        options: [
            '<img src="img6/image21-  2.png" class="mc2">',
            '<img src="img6/image21-  3.png">',
            '<img src="img6/image21-  1.png">',
            '<img src="img6/image21-  5.png">',
            '<img src="img6/image21-  4.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'По какой формуле можно рассчитать работу при вращательном движении твердого тела?',
        options: [
            '<img src="img6/image22-  5.png">',
            '<img src="img6/image22-  4.png">',
            '<img src="img6/image22-  3.png">',
            '<img src="img6/image22-  1.png">',
            '<img src="img6/image22-  2.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'По какой формуле определяется энергия покоя в релятивистской динамике?',
        options: [
            '<img src="img6/image21-  1.png">',
            '<img src="img6/image21-  5.png">',
            '<img src="img6/image21-  4.png">',
            '<img src="img6/image21-  2.png" class="mc2">',
            '<img src="img6/image21-  3.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Считая, что молекулы воды имеют вид шариков, соприкасающихся друг с другом, найти диаметр d молекул, находящихся в 1 куб. мм.',
        options: [
            '212 пм',
            '311 пм',
            '182 пм',
            '412 пм',
            '230 пм',
        ],
        rightAnswer: 1
    },
    {
        question: 'В широкой части горизонтальной трубы скорость воды составляет 20 см/с. Определить ее скорость в узкой части трубы, диаметр которой в 1,5 раза меньше:',
        options: [
            '0,45м/с',
            '0,30м/с',
            '0,5м/с',
            '0,40м/с',
            '0,60м/с',
        ],
        rightAnswer: 0
    },
    {
        question: 'Связь энтропии с термодинамической вероятностью состояния системы выражается формулой:',
        options: [
            '<img src="img6/image26-  1.png">',
            '<img src="img6/image26-  2.png">',
            '<img src="img6/image26-  3.png">',
            '<img src="img6/image26-  5.png">',
            '<img src="img6/image26-  4.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Указать формулу первого начала термодинамики для изохорического процесса.',
        options: [
            '<img src="img6/image27-  5.png">',
            '<img src="img6/image27-  4.png">',
            '<img src="img6/image27-  3.png">',
            '<img src="img6/image27-  1.png">',
            '<img src="img6/image27-  2.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Металлическому шару радиусом 10см сообщили разряд ' + '<img src="img6/image28-  0.png" class="Q">' + ' Поверхностная плотность заряда на шаре равна:',
        options: [
            '<img src="img6/image28-  2.png">',
            '<img src="img6/image28-  1.png">',
            '<img src="img6/image28-  5.png">',
            '<img src="img6/image28-  4.png">',
            '<img src="img6/image28-  3.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Камень бросили со скоростью 9 м/с. На какой высоте (м) скорость камня уменьшится до 1 м/с? Трением пренебречь.',
        options: [
            '3',
            '4',
            '2',
            '5',
            '7',
        ],
        rightAnswer: 1
    },
    {
        question: 'Температура газа была 300К и возросла на 8%. Какой стала температура газа?',
        options: [
            '324К',
            '308К',
            '330К',
            '318К',
            '328К',
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
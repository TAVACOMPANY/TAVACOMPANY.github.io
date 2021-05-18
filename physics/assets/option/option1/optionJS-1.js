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
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'Момент инерции однородного стержня относительно оси, проходящей перпендикулярно стержню на расстоянии 1/6 от ее центра, равен ' + "<img src='img1/image1.png'>" + ", где k равно:",
        options: [
            '7/36',
            '3/4',
            '11/18',
            '3/2',
            '1/9',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое из утверждений справедливо для кинетической энергии.' + "<br/>" + "Кинетическая энергия это ... .",
        options: [
            'скорость совершения работы',
            'энергия системы тел, определяемая их взаимным расположением и взаимодействием',
            'энергия механического движения и взаимодействия',
            'энергия механического движения тела',
            'энергия системы тел, определяемая их взаимным расположением и взаимодействием',
        ],
        rightAnswer: 3
    },
    {
        question: 'При изохорном процессе азоту передано 70 Дж теплоты. Сколько теплоты пошло на увеличение внутренней энергии азота?',
        options: [
            '50 Дж',
            '20 Дж',
            '70 Дж',
            '35 Дж',
            '7 Дж',
        ],
        rightAnswer: 2
    },
    {
        question: 'В каком случае тело находится в состоянии невесомости?',
        options: [
            'В воде',
            'При свободном падении',
            'В вакууме',
            'При спуске на парашюте',
            'Во взлетающей ракете',
        ],
        rightAnswer: 1
    },
    {
        question: 'Вектор Умова-Пойтинга характеризует:',
        options: [
            'Перенос энергий в единицу времени через единичную поверхность',
            'Изменение энергии поля в данном объеме',
            'Скорость распространения электромагнитной волны',
            'Полную энергию электромагнитного поля в данном объеме',
            'Плотность энергии',
        ],
        rightAnswer: 0
    },
    {
        question: 'В широкой части горизонтальной трубы скорость воды составляет 20 см/с. Определить ее скорость в узкой части трубы, диаметр которой в 1,5 раза меньше:',
        options: [
            '0,30м/с',
            '0,5м/с',
            '0,60м/с',
            '0,40м/с',
            '0,45м/с',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое из соотноений следует использовать для вычисления работы, совершаемой внешними силами при вращении тела, если момент этих сил относительно оси вращения не остается постоянным?',
        options: [
            '<img src="img1/image7-5.png">',
            '<img src="img1/image7-4.png">',
            '<img src="img1/image7-3.png">',
            '<img src="img1/image7-2.png">',
            '<img src="img1/image7-1.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Камень бросили со скоростью 9 м/с. На какой высоте (м) скорость камня уменьшится до 1 м/с? Трением пренебречь.',
        options: [
            '3',
            '5',
            '4',
            '2',
            '7',
        ],
        rightAnswer: 2
    },
    {
        question: 'Укажите формулу, определяющую положение центра масс механической систем.',
        options: [
            '<img src="img1/image9-1.png">',
            '<img src="img1/image9-3.png">',
            '<img src="img1/image9-2.png">',
            '<img src="img1/image9-4.png">',
            '<img src="img1/image9-5.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Считая, что молекулы воды имеют вид шариков, соприкасающихся друг с другом, найти диаметр d молекул, находящихся в 1 куб. мм.',
        options: [
            '311 пм',
            '212 пм',
            '230 пм',
            '182 пм',
            '412 пм',
        ],
        rightAnswer: 0
    },
    {
        question: 'Для цикла, изображенного на рисунке (цикл Карно), определить работу, совершенную рабочим телом.' + "<br/>" + "<img src='img1/image11.png' class='graphs'>",
        options: [
            '40 кДж',
            '24 кДж',
            '30 кДж',
            '118 кДж',
            '12 кДж',
        ],
        rightAnswer: 4
    },
    {
        question: 'Уравнение движения вращающегося тела.',
        options: [
            '<img src="img1/image12-3.png">',
            '<img src="img1/image12-4.png">',
            '<img src="img1/image12-2.png">',
            '<img src="img1/image12-5.png">',
            '<img src="img1/image12-1.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Металлическому шару радиусом 10см сообщили разряд ' + "<img src='img1/image13.png'>" + ". Поверхностная плотность заряда на шаре равна:",
        options: [
            '<img src="img1/image13-3.png">',
            '<img src="img1/image13-1.png">',
            '<img src="img1/image13-2.png">',
            '<img src="img1/image13-4.png">',
            '<img src="img1/image13-5.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Выбрать формулу, не соответствующую изотермическому процессу',
        options: [
            '<img src="img1/image14-2.png">',
            '<img src="img1/image14-1.png">',
            '<img src="img1/image14-4.png">',
            '<img src="img1/image14-3.png">',
            '<img src="img1/image14-5.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Давление смеси азота и углерода равно 20 кПа, причем давление азота 12 кПа. Чему равно парциальное давление углерода?',
        options: [
            '8 кПа',
            '0,32 МПа',
            '0,24 МПа',
            '16 кПа',
            '32 кПа',
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

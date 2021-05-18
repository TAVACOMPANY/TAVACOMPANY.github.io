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
        question: 'Какую кинетическую энергию приобретет электрон при перемещении между точками с разностью потенциалов 10кВ',
        options: [
            '<img src="img11/image1- 1.png" class="relyat">',
            '<img src="img11/image1- 2.png" class="relyat">',
            '<img src="img11/image1- 3.png" class="relyat">',
            '<img src="img11/image1- 4.png" class="relyat">',
            '<img src="img11/image1- 5.png" class="relyat">',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какая ускоряющая разность потенциалов требуется для того, чтобы сообщить скорость v = 30 Мм/с электрону.' + br + '<img src="img11/image2- 0.png" class="srednee">',
        options: [
            '26 В',
            '2,6 кВ',
            '5 кВ',
            '500 В',
            '0,26 кВ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Циркуляция вектора напряженности электростатического поля выражается ... .',
        options: [
            '<img src="img11/image3- 1.png">',
            '<img src="img11/image3- 2.png">',
            '<img src="img11/image3- 3.png">',
            '<img src="img11/image3- 4.png">',
            '<img src="img11/image3- 5.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Два заряда в вакууме взаимодействуют с такой же силой на расстоянии R1 = 27см, как в диэлектрике на расстоянии R2 = 3см. Определить диэлектрическую проницаемость диэлектрика.',
        options: [
            '<img src="img11/image4- 5.png">',
            '<img src="img11/image4- 4.png">',
            '<img src="img11/image4- 3.png">',
            '<img src="img11/image4- 2.png">',
            '<img src="img11/image4- 1.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое явление показывает поперечность световых волн?',
        options: [
            'Явление рассеяния',
            'Явление дифракции',
            'Явление интерференции',
            'Явление дисперсии',
            'Явление поляризации',
        ],
        rightAnswer: 4
    },
    {
        question: 'Длина волны, на которую приходится максимум энергии абсолютно черного тела, равна 0,6 мкм. Определите температуру Т тела.',
        options: [
            '5,82 кК',
            '4,01 кК',
            '3,92 кК',
            '4,82 кК',
            '3,12 кК',
        ],
        rightAnswer: 3
    },
    {
        question: 'Укажите правильную формулировку закона преломления света.',
        options: [
            'В однородной среде световые лучи распространяются прямолинейно',
            'Отраженный луч лежит в одной плоскости с падающим лучом и нормалью, восстановленной в точке падения; угол отражения равен углу падения',
            'Преломленный луч лежит в одной плоскости с падающим лучом и нормалью, восстановленной в точке падения; отношение синуса угла падения к синусу угла преломления есть величина постоянная для данных веществ',
            'Отраженный луч лежит в одной плоскости с падающим лучом и нормалью, восстановленной в точке падения; угол отражения не равен углу падения',
            'Свет распространяется по такому пути, оптическая длина которого минимальна',
        ],
        rightAnswer: 2
    },
    {
        question: 'Суть гипотезы де Бройля можно выразить формулой ' + '<img src="img11/image8- 0.png" class="srednee">',
        options: [
            '2 и 3',
            '2 и 4',
            '3 и 4',
            '4',
            '1 и 2',
        ],
        rightAnswer: 1
    },
    {
        question: 'Тело, способное поглощать полностью при любой температуре падающие на него волны любой частоты - … .',
        options: [
            'абсолютно черное тело',
            'тело белого цвета',
            'тело синего цвета',
            'серое тело',
            'все варианты не верны',
        ],
        rightAnswer: 0
    },
    {
        question: 'Пылинка массой m, несущая на себе 5 электронов, прошла ускоряющую разность потенциалов U=3 МВ. Как изменилась кинетическая энергия пылинки? ' + '<img src="img11/image10- 0.png" class="srednee">',
        options: [
            'Возросла на 15 МДж',
            'Возросла на 2,4 п Дж',
            'Уменьшилась на 1,5 мк Дж',
            'Уменьшилась на 8 мк Дж',
            'Не изменилась',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какую характеристику неизвестного вещества достаточно определить, чтобы узнать скорость света в нем?',
        options: [
            'Температуру',
            'Упругость',
            'Показатель преломления',
            'Объем',
            'Плотность',
        ],
        rightAnswer: 2
    },
    {
        question: 'Условие минимума для дифракции Фраунгофера на одной щели.',
        options: [
            '<img src="img11/image12- 2.png" class="srednee">',
            '<img src="img11/image12- 1.png" class="srednee">',
            '<img src="img11/image12- 3.png">',
            '<img src="img11/image12- 5.png">',
            '<img src="img11/image12- 4.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Длина волны, на которую приходится максимум излучательной способности в спектре абсолютно черного тела, при повышении температуры … .',
        options: [
            'Не измениться',
            'не зависит от температуры',
            'имеет сложную зависимость от температуры',
            'линейно возрастает с Т',
            'изменяется как 1/Т',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какую из приведенных ниже формул можно пользоваться для вычисления энергии электрического поля?',
        options: [
            '<img src="img11/image15- 2.png" class="smallf">',
            '<img src="img11/image15- 1.png">',
            '<img src="img11/image15- 5.png">',
            '<img src="img11/image15- 3.png" class="smallf">',
            '<img src="img11/image15- 4.png" class="smallf">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какая поверхность называется эквипотенциальной?',
        options: [
            'Поверхность любого тела в электрическом поле',
            'Поверхности, количественно характеризующие распределение поля в пространстве',
            'Поверхность, все точки которой имеют один и тот же потенциал',
            'Поверхность, имеющая сферическую форму, которой можно охватить любое заряженное тело',
            'Поверхность, параллельная силовым линиям однородного электростатического поля',
        ],
        rightAnswer: 2
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
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
        question: 'Газ в количестве 1 моль совершает цикл, состоящий из двух изохор и двух изобар. Наименьший объем газов 10л, наибольший 20л. Наименьшее давление 2,5 атмосферы, наибольшее-5 атмосфер. Найдите работу за цикл:',
        options: [
            '2,5кДж',
            '5кДж',
            '30кДж',
            '20кДж',
            '10кДж',
        ],
        rightAnswer: 0
    },
    {
        question: 'В случае изохорического процесса:',
        options: [
            'вся подвидимая к системе энергия идет на увеличение внутренней энергии системы и на совершение работы системой против внешних сил',
            'только часть подвидимой к системе энергия идет на увеличение внутренней энергии системы и на совершение работы системой против внешних сил',
            'нет теплообмена с внешней средой',
            'вся подвидимая к системе энергия идет только на совершение работы системой против внешних сил',
            'вся подвидимая к системе энергия идет только на увеличение внутренней энергии системы',
        ],
        rightAnswer: 4
    },
    {
        question: 'Электрон с начальной скоростью 3600км/с входит по силовой линии в однородное электрическое поле с напряженностью 3 В/см и тормозится в нем. Как далеко проникает электрон в это поле? Удельный заряд электрона' + "<br/>" + "<img src='img2/image18.png' class='electron'>",
        options: [
            '8,1м',
            '2,6м',
            '12мм',
            '12см',
            '7,4мм',
        ],
        rightAnswer: 3
    },
    {
        question: 'Газ считается идеальным, если ... .',
        options: [
            'Учитывается собственный объем молекул. Существуют силы межмолекулярного притяжения и отталкивания. Столкновения между молекулами абсолютно упругие',
            'Собственный объем молекул не учитывается. Между молекулами отсутствуют силы взаимодействия на расстоянии',
            'Собственный объем молекул не учитывается. Между молекулами отсутствуют силы взаимодействия на расстоянии 3. Столкновения между молекулами абсолютно упругие ',
            'Учитывается собственный объем молекул. Собственный объем молекул не учитывается. Столкновения между молекулами абсолютно упругие',
            'Собственный объем молекул не учитывается. Столкновения между молекулами абсолютно упругие. Между молекулами отсутствуют силы взаимодействия на расстоянии',
        ],
        rightAnswer: 2
    },
    {
        question: 'Чему равен КПД идеальной тепловой машины, работающей по циклу Карно?' + "<br/>" + "<img src='img2/image20.png' class='kpd'>",
        options: [
            '<img src="img2/image20-5.png">',
            '<img src="img2/image20-4.png">',
            '<img src="img2/image20-3.png">',
            '<img src="img2/image20-2.png">',
            '<img src="img2/image20-1.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Для цикла, изображенного на рисунке (цикл Карно), определить теплоту Q1, получаемую рабочим телом от нагревателя.' + "<br/>" + "<img src='img2/image21.png' class='graphs'>",
        options: [
            '24 кДж',
            '12 кДж',
            '18 кДж',
            '30 кДж',
            '40 кДж',
        ],
        rightAnswer: 0
    },
    {
        question: 'Однородный диск массой m и диаметром D вращается с угловой скоростью w относительно оси проходящей перпендикулярно диску через его центр. Кинетическая энергия вращательного движения диска равна ' + "<img src='img2/image22.png'>" + ", где k равно:",
        options: [
            '1/8',
            '1/4',
            '1/2',
            '1/24',
            '1/16',
        ],
        rightAnswer: 4
    },
    {
        question: 'Указать формулу первого начала термодинамики для изохорического процесса.',
        options: [
            '<img src="img2/image23-5.png">',
            '<img src="img2/image23-3.png">',
            '<img src="img2/image23-4.png">',
            '<img src="img2/image23-1.png">',
            '<img src="img2/image23-2.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Связь энтропии с термодинамической вероятностью состояния системы выражается формулой:',
        options: [
            '<img src="img2/image24-1.png">',
            '<img src="img2/image24-2.png">',
            '<img src="img2/image24-3.png">',
            '<img src="img2/image24-4.png">',
            '<img src="img2/image24-5.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Газ расширился от объема V1 до V2 один раз изотермически, а другой раз - изобарно. В каком случае работа газа больше?',
        options: [
            'в случае изобарного расширения',
            'в случае изотермического расширения',
            'работа вообще совершаться не будет',
            'работа изотермического расширения равна работе изобарного расширения',
            'работа является функцией состояния и от процесса перехода системы из одного состояния в другое не меняется',
        ],
        rightAnswer: 1
    },
    {
        question: 'Температура газа была 300К и возросла на 8%. Какой стала температура газа?',
        options: [
            '324К',
            '328К',
            '330К',
            '318К',
            '308К',
        ],
        rightAnswer: 0
    },
    {
        question: 'Из сосуда выпустили половину находящегося в нем газа. Как необходимо изменить абсолютную температуру оставшегося в сосуде газа, чтобы давление его увеличилось в 3 раза?',
        options: [
            'Уменьшить в 1,5 раза',
            'Увеличить в 3 раз',
            'Увеличить в 1,5 раза',
            'Уменьшить в 6 раз',
            'Увеличить в 6 раза',
        ],
        rightAnswer: 4
    },
    {
        question: 'Масса тела есть...',
        options: [
            'причина ускорения',
            'мера взаимодействия тел',
            'количество вещества',
            'мера инертности тела',
            'мера давления на опору',
        ],
        rightAnswer: 3
    },
    {
        question: 'Каким выражением определяется средняя кинетическая энергия поступательного движения одной молекулы идеального газа?',
        options: [
            '<img src="img2/image29-3.png">',
            '<img src="img2/image29-1.png">',
            '<img src="img2/image29-5.png">',
            '<img src="img2/image29-4.png">',
            '<img src="img2/image29-2.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое из приведенных ниже выражений характеризует работу электрического поля по перемещению заряда?',
        options: [
            '<img src="img2/image30-2.png">',
            '<img src="img2/image30-1.png">',
            '<img src="img2/image30-3.png">',
            '<img src="img2/image30-4.png">',
            '<img src="img2/image30-5.png">',
        ],
        rightAnswer: 1
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
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
        question: 'Какую скорость приобретет заряженная частица (заряд q, масса m), пройдя в электрическом поле ускоряющую разность потенциалов U.',
        options: [
            '<img src="img7/image1- 5.png">',
            '<img src="img7/image1- 4.png">',
            '<img src="img7/image1- 3.png">',
            '<img src="img7/image1- 2.png">',
            '<img src="img7/image1- 1.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Почему блестят воздушные пузыри в воде?',
        options: [
            'Из-за дисперсии',
            'Нет правильного ответа',
            'За счет дифракции',
            'За счет полного внутреннего отражения на границе вода – воздух',
            'За счет интерференции',
        ],
        rightAnswer: 3
    },
    {
        question: 'Корпускулярно - волновой дуализм материи заключается в том, что … .',
        options: [
            'условиях частицы вещества порождают поле, а поле порождает частицы',
            'при определенных условиях частицы вещества порождают поле, а поле порождает частицы',
            'все материальные объекты в природе обладают волновыми свойствами',
            'вещество и поле – 2 разновидности материи',
            'свет - это и поток фотонов, и электромагнитные волны',
        ],
        rightAnswer: 2
    },
    {
        question: 'Длина волны, на которую приходится максимум излучательной способности в спектре абсолютно черного тела, при повышении температуры … .',
        options: [
            'не зависит от температуры',
            'изменяется как 1/Т',
            'Не измениться',
            'линейно возрастает с Т',
            'имеет сложную зависимость от температуры',
        ],
        rightAnswer: 1
    },
    {
        question: 'Каково фокусное расстояние плоского зеркала?',
        options: [
            '<img src="img7/image5- 1.png">',
            '<img src="img7/image5- 2.png">',
            '<img src="img7/image5- 3.png">',
            '<img src="img7/image5- 4.png">',
            'Указать нельзя',
        ],
        rightAnswer: 0
    },
    {
        question: 'Закон Стефана-Больцмана... .',
        options: [
            '<img src="img7/image6- 5.png">',
            '<img src="img7/image6- 3.png">',
            '<img src="img7/image6- 4.png">',
            '<img src="img7/image6- 2.png">',
            '<img src="img7/image6- 1.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Основные характеристики теплового излучения.',
        options: [
            '<img src="img7/image7- 3.png">',
            '<img src="img7/image7- 1.png">',
            '<img src="img7/image7- 2.png">',
            '<img src="img7/image7- 4.png">',
            '<img src="img7/image7- 5.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Как осуществляется взаимодействие между электрическими зарядами:',
        options: [
            'С конечной скоростью при наличии проводящей или диэлектрической среды',
            'С конечной скоростью посредством электрического поля',
            'Сила взаимодействия одного заряда на другой передается без какого либо посредника',
            'Мгновенно на любые расстояния',
            'Непосредственно при соприкосновении тел',
        ],
        rightAnswer: 2
    },
    {
        question: 'Найти емкость батареи конденсаторов, если емкость каждого конденсатора 2мкФ:' + br + '<img src="img7/image9- 0.png" class="graphs">',
        options: [
            '4,5мкФ',
            '3мкФ',
            '9мкФ',
            '6мкФ',
            '12мкФ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какие из уравнений соответствуют II правилу Кирхгофа?',
        options: [
            '<img src="img7/image10- 2.png" class="ct3">',
            '<img src="img7/image10- 3.png">',
            '<img src="img7/image10- 4.png">',
            '<img src="img7/image10- 5.png">',
            '<img src="img7/image10- 1.png">',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как определяется сила, действующая на заряженную частицу, находящуюся в электрическом поле (в общем случае)?',
        options: [
            '<img src="img7/image11- 4.png">',
            '<img src="img7/image11- 3.png">',
            '<img src="img7/image11- 1.png">',
            '<img src="img7/image11- 5.png">',
            '<img src="img7/image11- 2.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Закон сохранения электрического заряда утверждает, что ... .',
        options: [
            'Пробный заряд практически не изменяетсвойств исследуемого электрического поля',
            'Заряд способен перемещаться в проводнике под действием электрического поля',
            'заряд электрона - наименьший заряд, известный в данное время в природе',
            'во всех взаимодействиях электрический заряд изолированной системы не меняется',
            'заряженное тело, размерами которого в данной задаче можно пренебречь, называется точечным',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какую характеристику неизвестного вещества достаточно определить, чтобы узнать скорость света в нем?',
        options: [
            'Температуру',
            'Объем',
            'Показатель преломления',
            'Упругость',
            'Плотность',
        ],
        rightAnswer: 2
    },
    {
        question: 'Дать определение соотношению неопределенности.',
        options: [
            'Состояние с фиксируемым значением энергии',
            'Является квантовым ограничением к применимости классической механике к микрообъектам',
            'Переход электронов внутри полупроводников или диэлектриков из связанных состояний в свободные',
            'Вырыванием электронов из вещества под действием света',
            'Ультрафиолетовых',
        ],
        rightAnswer: 1
    },
    {
        question: 'Плотность тока в однородном проводнике j. Определите силу тока через сечение проводника площадью S:' + br + '<img src="img7/image15- 0.png" class="relyat">',
        options: [
            '200 А',
            '2 А',
            '20 А',
            '0,02 А',
            '2 мкА',
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
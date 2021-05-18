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
        question: 'В каком случае диск вращается вокруг оси по часовой стрелке замедленно?' + br + '<img src="img5/image1-0.png" class="osivrash">',
        options: [
            '<img src="img5/image1-1.png" class="diskvras">',
            '<img src="img5/image1-5.png" class="diskvras">',
            '<img src="img5/image1-4.png" class="diskvras">',
            '<img src="img5/image1-3.png" class="diskvras">',
            '<img src="img5/image1-2.png" class="diskvras">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Как будет двигаться тело массой 2 кг под действием постоянной силы, равной 4 Н?',
        options: [
            'Равнозамедленно, с ускорением' + '<img src="img5/image2-1.png" class="Q">',
            'Равномерно, со скоростью 0,5 м/с',
            'Равномерно, со скоростью 2 м/с',
            'Равноускоренно, с ускорением' + '<img src="img5/image2-2.png">',
            'Равноускоренно, с ускорением' + '<img src="img5/image2-3.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'На графике изображены процессы изменения состояния постоянной массы идеального газа в координатах PV. Найдите изображение этих процессов в координатах РТ.' + br + '<img src="img5/image3- 0.png" class="graphs">',
        options: [
            '<img src="img5/image3- 4.png" class="graphs">',
            '<img src="img5/image3- 1.png" class="graphs">',
            '<img src="img5/image3- 2.png" class="graphs">',
            '<img src="img5/image3- 3.png" class="graphs">',
            '<img src="img5/image3- 5.png" class="graphs">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Камень бросили вертикально вверх с высокой башни со скоростью 12 м/с. На какой высоте (м) скорость камня равна 2 м/с? Трением пренебречь.' + '<img src="img5/image4- 0.png">',
        options: [
            '3',
            '7',
            '2',
            '5',
            '3',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какое из выражений описывает правильно зависимость ускорения' + '<img src="img5/image5- 01.png" class="Q">' + 'от времени для частицы, движущейся по прямой по закону' + '<img src="img5/image5- 00.png" class="ct3">',
        options: [
            '<img src="img5/image5- 2.png">',
            '<img src="img5/image5- 1.png">',
            '<img src="img5/image5- 4.png">',
            '<img src="img5/image5- 3.png" class="ct3">',
            '<img src="img5/image5- 5.png" class="ct3">',
        ],
        rightAnswer: 0
    },
    {
        question: 'На рисунке представлена траектория движения камня, брошенного под углом к горизонту. Как направлено ускорение камня в точке А траектории, если сопротивлением воздуха пренебречь.' + br + '<img src="img5/image6-0.png" class="graphs">',
        options: [
            '3',
            '5',
            '1',
            '2',
            '4',
        ],
        rightAnswer: 4
    },
    {
        question: 'Точка равномерно движется по окружности диаметром 2м со скоростью 3м/с. Чему равно ее ускорение.',
        options: [
            '<img src="img5/image7- 5.png">',
            '<img src="img5/image7- 4.png">',
            '<img src="img5/image7- 1.png">',
            '<img src="img5/image7- 3.png">',
            '<img src="img5/image7- 2.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Материальная точка движется по прямой согласно уравнению ' + '<img src="img5/image8- 0.png" class="ct3">' + 'Найти скорость, если t=2c.',
        options: [
            '26 м/с',
            '22 м/с',
            '24 м/с',
            '30 м/с',
            '20 м/с',
        ],
        rightAnswer: 2
    },
    {
        question: 'Единицей измерения работы в системе СИ является ... .',
        options: [
            'Вт',
            'Дж',
            'кг м',
            'Дж/м',
            'Дж м',
        ],
        rightAnswer: 1
    },
    {
        question: 'Материальная точка движется по прямой согласно уравнению x = 3 + t^2 . Зависимость скорости точки от времени на графике изображается кривой:' + br + '<img src="img5/image10- 0.png" class="graphs">',
        options: [
            '2',
            '4',
            '1',
            '3',
            '5',
        ],
        rightAnswer: 0
    },
    {
        question: 'Имеются 2 сосуда с объемами V и 2V.В первом находится 1кмоль, а во втором - 4 кмоль газа. Если давление в обоих сосудах одинаковое, то каково соотношение температур этих газов?',
        options: [
            '<img src="img5/image11- 1.png" class="">',
            '<img src="img5/image11- 5.png" class="">',
            '<img src="img5/image11- 2.png" class="">',
            '<img src="img5/image11- 4.png" class="">',
            '<img src="img5/image11- 3.png" class="">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какое уравнение выражает внутреннюю энергию любой массы многоатомного идеального газа?',
        options: [
            '<img src="img5/image12- 3.png" class="">',
            '<img src="img5/image12- 5.png" class="">',
            '<img src="img5/image12- 4.png" class="">',
            '<img src="img5/image12- 1.png" class="">',
            '<img src="img5/image12- 2.png" class="">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Формула емкости плоского конденсатора имеет вид:',
        options: [
            '<img src="img5/image13- 4.png" class="">',
            '<img src="img5/image13- 1.png" class="">',
            '<img src="img5/image13- 5.png" class="">',
            '<img src="img5/image13- 3.png" class="">',
            '<img src="img5/image13- 2.png" class="">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Момент инерции однородного диска относительно оси, проходящей перпендикулярно диску через обод диска равен' + '<img src="img5/image14- 0.png">' + 'где k равно:',
        options: [
            '7/36',
            '3/2',
            '3/4',
            '1/9',
            '11/18',
        ],
        rightAnswer: 1
    },
    {
        question: 'Из сосуда выпустили половину находящегося в нем газа. Как необходимо изменить абсолютную температуру оставшегося в сосуде газа, чтобы давление его увеличилось в 3 раза?',
        options: [
            'Увеличить в 6 раз',
            'Увеличить в 2 раза',
            'Увеличить в 5 раз',
            'Увеличить в 3 раза',
            'Увеличить в 9 раз',
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
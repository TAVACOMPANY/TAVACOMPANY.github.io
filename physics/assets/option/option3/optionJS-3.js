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
        question: 'Указать формулу потенциальной энергии упруго деформированного тела.',
        options: [
            '<img src="img3/image1-1.png">',
            '<img src="img3/image1-2.png">',
            '<img src="img3/image1-3.png">',
            '<img src="img3/image1-4.png">',
            '<img src="img3/image1-5.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Относительно диэлектрическую проницаемость вещества между обкладками конденсатора, емкость которого С, можно вычислить по формуле (С0- емкость этого конденсатора при отсутствии диэлектрика):',
        options: [
            '<img src="img3/image2-3.png">',
            '<img src="img3/image2-1.png">',
            '<img src="img3/image2-4.png">',
            '<img src="img3/image2-2.png">',
            '<img src="img3/image2-5.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'С помощью какой формулы можно вычислить емкость уединенного проводника?',
        options: [
            '<img src="img3/image3-5.png">',
            '<img src="img3/image3-4.png">',
            '<img src="img3/image3-2.png">',
            '<img src="img3/image3-3.png">',
            '<img src="img3/image3-1.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Сколько степеней свободы имеет молекула...',
        options: [
            '3',
            '7',
            '2',
            '6',
            '5',
        ],
        rightAnswer: 4
    },
    {
        question: 'Как изменилось давление идеального газа, если в данном объеме скорость каждой молекулы газа удвоилась, а концентрация молекул осталась без изменений?',
        options: [
            'Увеличилось в 4 раза',
            'Уменьшилось в 4 раза',
            'увеличилось в <img src="img3/image5-3.png"> раз',
            'Уменьшилось в 2 раза',
            'Увеличилось в 2 раза',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какое из выражений отражает уравнение динамики вращательного движения тела ?',
        options: [
            '<img src="img3/image6-1.png">',
            '<img src="img3/image6-5.png">',
            '<img src="img3/image6-3.png">',
            '<img src="img3/image6-2.png">',
            '<img src="img3/image6-4.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'По какой формуле можно рассчитать работу при вращательном движении твердого тела?',
        options: [
            '<img src="img3/image7-3.png">',
            '<img src="img3/image7-4.png">',
            '<img src="img3/image7-5.png">',
            '<img src="img3/image7-2.png">',
            '<img src="img3/image7-1.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Найти силу трения можно с помощью выражения ... .',
        options: [
            '<img src="img3/image8-3.png">',
            '<img src="img3/image8-4.png">',
            '<img src="img3/image8-2.png">',
            '<img src="img3/image8-1.png">',
            '<img src="img3/image8-5.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Камень бросили в горизонтальном направлении с башни высотой 10 м со скоростью 2 м/с. На какой высоте (м) скорость камня достигнет 8 м/с?',
        options: [
            '2',
            '7',
            '4',
            '5',
            '3',
        ],
        rightAnswer: 4
    },
    {
        question: 'Угол поворота вращающегося тела задан уравнением' + "<img src='img3/image10.png'>" + ". Чему равна угловая скорость тела?",
        options: [
            '12 t – 8',
            '6t + 8',
            '6 t – 8',
            '12 t',
            '<img src="img3/image10-5.png">',
        ],
        rightAnswer: 0
    },
    {
        question: 'Второй закон Ньютона в импульсной форме...',
        options: [
            '<img src="img3/image11-2.png">',
            '<img src="img3/image11-1.png">',
            '<img src="img3/image11-3.png">',
            '<img src="img3/image11-4.png">',
            '<img src="img3/image11-5.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'По какой формуле определяется энергия покоя в релятивистской динамике',
        options: [
            '<img src="img3/image12-2.png">',
            '<img src="img3/image12-1.png">',
            '<img src="img3/image12-5.png">',
            '<img src="img3/image12-3.png" class="mc2">',
            '<img src="img3/image12-4.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Определите потенциал в точке, если при переносе заряда 2 мкКл из бесконечности в эту точку совершена работа' + "<br/>" + "<img src='img3/image13.png' class='electron'>",
        options: [
            '100В',
            '120В',
            '250В',
            '200В',
            '300В',
        ],
        rightAnswer: 3
    },
    {
        question: 'По какой формуле определяется энергия покоя в релятивистской динамике?',
        options: [
            '<img src="img3/image14-5.png">',
            '<img src="img3/image14-4.png" class="mc2">',
            '<img src="img3/image14-3.png">',
            '<img src="img3/image14-2.png">',
            '<img src="img3/image14-1.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какие из приведенных ниже формулировок относятся первому началу термодинамики?',
        options: [
            'Периодически действующий двигатель, который совершал бы большую работу',
            'Периодически действующий двигатель, который совершал бы большую работу. Энтропия всех тел в состоянии',
            'Энтропия всех тел в состоянии',
            'Невозможен круговой процесс, единственным результатом которого является превращение теплоты, полученной от нагревателя, в эквивалентную ей работу',
            'В процессах, происходящих в замкнутой системе, энтропия убывать не может. Невозможен круговой процесс, единственным результатом которого является превращение теплоты, полученной от нагревателя, в эквивалентную ей работу',
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
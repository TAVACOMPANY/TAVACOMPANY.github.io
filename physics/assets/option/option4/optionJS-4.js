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
        question: 'В каком случае диск вращается ускоренно?' + "<br/>" + "<img src='img4/image16.png' class='disk'>",
        options: [
            '<img src="img4/image16-5.png" class="diskvras">',
            '<img src="img4/image16-3.png" class="diskvras">',
            '<img src="img4/image16-2.png" class="diskvras">',
            '<img src="img4/image16-1.png" class="diskvras">',
            '<img src="img4/image16-4.png" class="diskvras">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Плоский конденсатор емкостью 0,02мкФ соединили с источником тока, в результате чего он приобрел заряд' + "<img src='img4/image17.png' class='Q'>" + "<br/>" + "Найти значение напряженности поля между пластинами конденсатора, если расстояние между ними 5мм:",
        options: [
            '5В/м',
            '25В/м',
            '200В/м',
            '5мВ/м',
            '100В/м',
        ],
        rightAnswer: 3
    },
    {
        question: 'Момент инерции тела относительно произвольной оси, параллельной оси проходящей через центр инерции.',
        options: [
            '<img src="img4/image18-1.png">',
            '<img src="img4/image18-2.png">',
            '<img src="img4/image18-4.png">',
            '<img src="img4/image18-3.png">',
            '<img src="img4/image18-5.png">',
        ],
        rightAnswer: 2
    },
    {
        question: 'Точка движется по кривой с постоянным тангенциальным ускорением. Полное ускорение а точки на участке кривой с радиусом кривизны R = 3 м, если точка движется на этом участке со скоростью 2 м/с равно ' + "<img src='img4/image19.png' class='Q'>",
        options: [
            '<img src="img4/image19-2.png">',
            '<img src="img4/image19-1.png">',
            '<img src="img4/image19-4.png">',
            '<img src="img4/image19-3.png">',
            '<img src="img4/image19-5.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Над телом совершена работа А внешними силами, и телу передано количество теплоты. Чему равно изменение внутренней энергии ' + "<img src='img4/image20.png' class='Q'>" + "тела",
        options: [
            '<img src="img4/image20-5.png">',
            '<img src="img4/image20-4.png">',
            '<img src="img4/image20-3.png">',
            '<img src="img4/image20-1.png">',
            '<img src="img4/image20-2.png">',
        ],
        rightAnswer: 0
    },
    {
        question: 'В какой из формул масса тела выступает как мера гравитационных свойств тела?',
        options: [
            '<img src="img4/image21-5.png">',
            '<img src="img4/image21-4.png">',
            '<img src="img4/image21-1.png">',
            '<img src="img4/image21-2.png">',
            '<img src="img4/image21-3.png">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какой объем V занимает смесь газов - азота массой ' + "<img src='img4/image22-01.png' class='Q'>" + " и гелия массой "  + "<img src='img4/image22-02.png' class='Q'>" + "-при нормальных условиях?",
        options: [
            '<img src="img4/image22-4.png">',
            '<img src="img4/image22-5.png">',
            '<img src="img4/image22-1.png">',
            '<img src="img4/image22-3.png">',
            '<img src="img4/image22-2.png">',
        ],
        rightAnswer: 3
    },
    {
        question: 'Трансформатор с КПД 80% дает на выходе 10В и 4А. Какова его потребляемая мощность?',
        options: [
            '60В',
            '32В',
            '50В',
            '64В',
            '40В',
        ],
        rightAnswer: 2
    },
    {
        question: 'Найти среднюю кинетическую энергию вращательного движения одной молекулы кислорода при температуре 350 К.',
        options: [
            '<img src="img4/image24-2.png" class="srednee">',
            '<img src="img4/image24-3.png" class="srednee">',
            '<img src="img4/image24-1.png" class="srednee">',
            '<img src="img4/image24-4.png" class="srednee">',
            '<img src="img4/image24-5.png" class="srednee">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Чему равно число степеней свободы молекулы гелия?',
        options: [
            '3',
            '1',
            '5',
            '6',
            '7',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укажите выражение для определения массы движущихся релятивистских частиц.',
        options: [
            '<img src="img4/image26-1.png" class="relyat">',
            '<img src="img4/image26-2.png" class="relyat">',
            '<img src="img4/image26-3.png">',
            '<img src="img4/image26-4.png" class="relyat">',
            '<img src="img4/image26-5.png" class="relyat">',
        ],
        rightAnswer: 4
    },
    {
        question: 'Определить момент инерции I материальной точки массой m=0,3 кг относительно оси, отстоящей от точки на r=20см:',
        options: [
            '<img src="img4/image27-5.png" class="electron">',
            '<img src="img4/image27-2.png" class="electron">>',
            '<img src="img4/image27-1.png" class="electron">>',
            '<img src="img4/image27-3.png" class="electron">>',
            '<img src="img4/image27-4.png" class="electron">>',
        ],
        rightAnswer: 3
    },
    {
        question: 'Однородный диск массой m и радиусом R вращается с угловой скоростью w относительно оси проходящей перпендикулярно диску через его центр. Кинетическая энергия вращательного движения диска равна ' + "<img src='img4/image28.png'>" + ", где k равно:",
        options: [
            '1/8',
            '1/16',
            '1/4',
            '1/24',
            '1/2',
        ],
        rightAnswer: 2
    },
    {
        question: 'Линейная скорость связана с угловой соотношением ... .',
        options: [
            '<img src="img4/image29-1.png">',
            '<img src="img4/image29-2.png">',
            '<img src="img4/image29-3.png">',
            '<img src="img4/image29-4.png">',
            '<img src="img4/image29-5.png">',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что называется нормальным ускорением?',
        options: [
            'Составляющая полного ускорения, характеризующая изменение вектора скорости по направлению',
            'Составляющая вектора скорости, характеризующая изменение скорости по модулю',
            'Быстрота изменения вектора скорости',
            'Составляющая полного ускорения, характеризующая изменение вектора скорости по численному значению',
            'Составляющая вектора скорости, характеризующая изменение скорости по направлению',
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
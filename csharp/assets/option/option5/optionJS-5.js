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
        question: 'Что такое класс в языке C#?',
        options: [
            'Класс - это шаблон, который определяет тип объекта',
            'Класс - это шаблон, который определяет имя объекта',
            'Класс - это шаблон, который определяет форму объекта',
            'Класс - это шаблон, который определяет тип данных',
            'Класс - это шаблон, который определяет ссылку на объект',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что такое объекты?',
        options: [
            'Объекты – это данные, которые содержатся в переменных экземпляров',
            'Объекты - это логическая абстракция класса',
            'Объекты - это статические переменные',
            'Объекты - это экземпляры класса',
            'Объекты - это составляющие подпрограммы',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какое значение получит переменная house2.area?' + '</br>' + 'Building housel = new Building();' + '</br>' + 'Building house2 = housel;' + '</br>' + 'housel.area = 2600;' + '</br>' + 'Console.WriteLine(housel.area);' + '</br>' + 'Console.WriteLine(house2.area);',
        options: [
            '2600',
            '5200',
            '0',
            '1',
            '-2600',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что такое методы в языке программирования C#?',
        options: [
            'Методы - это набор переменных, которые манипулируют данными, определенными в классе, и во многих случаях обеспечивают доступ к этим данным.',
            'Методы - это процедуры (подпрограммы), которые манипулируют данными, определенными в классе, и во многих случаях обеспечивают доступ к этим данным.',
            'Методы - это списки, которые манипулируют данными, определенными в классе, и во многих случаях обеспечивают доступ к этим данным.',
            'Методы - это имена данных, которые манипулируют данными, определенными в классе, и во многих случаях обеспечивают доступ к этим данным.',
            'Методы - это параметры, которые манипулируют данными, определенными в классе, и во многих случаях обеспечивают доступ к этим данным.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Если метод не возвращает никакого значения, необходимо указать тип…',
        options: [
            'char',
            'int',
            'int',
            'double',
            'void',
        ],
        rightAnswer: 4
    },
    {
        question: 'Управление доступом к членам класса достигается за счет использования четырех спецификаторов доступа…',
        options: [
            'void, private, protected, public',
            'public, private, class, internal',
            'class, private, protected, void',
            'public, private, protected, internal',
            'public, void, protected, internal',
        ],
        rightAnswer: 3
    },
    {
        question: 'В языке С# класс, который наследуется, называется…',
        options: [
            'дочерним',
            'производным',
            'базовым',
            'родительским',
            'родственным',
        ],
        rightAnswer: 2
    },
    {
        question: 'Класс, который наследует базовый класс, называется…',
        options: [
            'производным',
            'родительским',
            'дочерним',
            'родственным',
            'базовым',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какой метод из класса stream закрывает поток данных?',
        options: [
            'Void write (byte [ ] buf, int offset, mt numBytes)',
            'void WriteByte (byte b)',
            'int ReadByte ()',
            'void Flush ()',
            'void close ()',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какой метод из класса stream записывает содержимое потока в физическое устройство?',
        options: [
            'Void write (byte [ ] buf, int offset, mt numBytes)',
            'void Flush ()',
            'void WriteByte (byte b)',
            'void close ()',
            'int ReadByte ()',
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
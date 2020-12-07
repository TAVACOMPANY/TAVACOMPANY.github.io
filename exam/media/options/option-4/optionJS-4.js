/* все ответы */
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const option5 = document.querySelector('.option5');

/* все наши вопросы */
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
        question: 'Кто из казахстанских летчиков-истребителей лично сбил в воздушных боях 37 самолетов противника? ',
        options: [
            'Р.Амангельдинов',
            'М.Габдуллин',
            'Б.Момышулы',
            'С.Баймагамбетов',
            'С.Луганский',
        ],
        rightAnswer: 4
    },
    {
        question: 'Казахстанский писатель-партизан… ',
        options: [
            'М.Габдуллин',
            'К.Кайсенов',
            'Ж.Агадилова',
            'С.Баймагамбетов',
            'Ж.Саин',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сколько казашек было удостоено звания Героя Советского Союза в Великой Отечественной войне? ',
        options: [
            '5',
            '3',
            '50',
            '1',
            '2',
        ],
        rightAnswer: 4
    },
    {
        question: 'Когда закончилась Вторая Мировая война? ',
        options: [
            '1 сентября 1946 г.',
            '22 июня 1945 г.',
            '10 мая 1945 г.',
            '9 мая 1945 г.',
            '2 сентября 1945 г.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Что предпринимает правительство Казахстана для преодоления нехватки специалистов после Великой Отечественной войны? ',
        options: [
            'открываются новые вузы',
            'при школах создаются профессиональные курсы',
            'сокращается срок школьного образования',
            'открываются рабфаки',
            'создаются школы и училища трудовых резервов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Главная цель пятилетки восстановления и развития народного хозяйства (1946-1950 гг.)… ',
        options: [
            'развитие тяжелой промышленности',
            'развитие радио и кино',
            'развитие образования',
            'развитие транспорта',
            'развитие сельского хозяйства',
        ],
        rightAnswer: 0
    },
    {
        question: 'На помощь освобожденным от немецких захватчиков районам, казахстанскими колхозниками бесплатно было передано… ',
        options: [
            'сельхозорудия',
            'машины',
            'скот',
            'зерно',
            'удобрения',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое количество тракторов было отправлено из Казахстана только за 1945г. в регионы Украины, пострадавшие от фашистской оккупации? ',
        options: [
            '370 тракторов',
            '250 тракторов',
            '310 тракторов',
            '500 тракторов',
            '750 тракторов',
        ],
        rightAnswer: 3
    },
    {
        question: 'Насильственное выселение народа — это… ',
        options: [
            'депортация',
            'централизация',
            'популяция',
            'демография',
            'иммиграция',
        ],
        rightAnswer: 0
    },
    {
        question: 'В какие годы Динмухамед Ахметович Кунаев возглавлял Казахстан? ',
        options: [
            'январь 1960 - декабрь 1986 года',
            'октябрь 1964 - ноябрь 1984 года',
            'март 1972 - январь 1985 года',
            'март 1965 - ноябрь 1985 года',
            'январь 1960 - сентябрь 1987 года',
        ],
        rightAnswer: 0
    },
    {
        question: 'Что, согласно Конституции РК, является священным долгом и обязанностью каждого ее гражданина? ',
        options: [
            'беречь памятники истории и культуры',
            'защита Республики Казахстан',
            'уважать государственные символы РК',
            'соблюдать Конституцию',
            'сохранять природу',
        ],
        rightAnswer: 1
    },
    {
        question: 'Идею Евразийского Союза государств предложил.... ',
        options: [
            'И.Каримов',
            'Б.Ельцин',
            'A.Акаев',
            'Н.Назарбаев',
            'Г.Алиев',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какую модель развития выбрал современный Казахстан? ',
        options: [
            'собственную модель',
            'японскую',
            'китайскую',
            'шведскую',
            'англосаксонскую',
        ],
        rightAnswer: 0
    },
    {
        question: 'Государственное устройство Республики Казахстан: ',
        options: [
            'Федеративное',
            'Конфедеративное',
            'Союзное',
            'Унитарное',
            'Автономное',
        ],
        rightAnswer: 3
    },
    {
        question: 'Казахский язык относится к группе тюркских языков: ',
        options: [
            'Карлукской',
            'Огузской',
            'Кипчакской',
            'Саянской',
            'Хакасской',
        ],
        rightAnswer: 2
    },
    {
        question: 'Алма-Ата переименована в Алматы: ',
        options: [
            '1995',
            '1993',
            '1997',
            '1992',
            '2000',
        ],
        rightAnswer: 1
    },
    {
        question: 'Алматы – столица Республики Казахстан: ',
        options: [
            '1991-99',
            '1991-95',
            '1991-97',
            '1991-2000',
            '1991-99',
        ],
        rightAnswer: 2
    },
    {
        question: 'Акмола переименована в Астану: ',
        options: [
            '1998 г., 6 мая',
            '1998 г., 6 июля',
            '1998 г., 16 декабря',
            '1998 г., 22 марта',
            '1998 г., 25 октября',
        ],
        rightAnswer: 0
    },
    {
        question: 'Символ и гарант единства народа и государственной власти, незыблемости Конституции РК: ',
        options: [
            'Парламент',
            'Сенат',
            'Конституционный Совет',
            'Верховный Суд',
            'Президент',
        ],
        rightAnswer: 4
    },
    {
        question: 'В декабре 1991 г. Н.A. Назарбаев занял пост Президента республики в результате: ',
        options: [
            'Решения Верховного Совета',
            'Референдума',
            'Плебисцита',
            'Всеобщих выборов',
            'Решения ЦК Компартии Казахстана',
        ],
        rightAnswer: 3
    },
    {
        question: 'Каким статусом наделяется русский язык согласно положению: «В государственных организациях и органах местного самоуправления наравне с казахским официально употребляется русский язык» (Конституция 1995, статья 7; Закон о языках, статья 5): ',
        options: [
            'Государственный',
            'Межнациональный',
            'Официальный',
            'Международный',
            'Рабочий',
        ],
        rightAnswer: 2
    },
    {
        question: 'Проект по созданию Интеллектуальных школ запущен в году: ',
        options: [
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
        ],
        rightAnswer: 0
    },
    {
        question: 'В 1990-е годы партию «Желтоксан» создали: ',
        options: [
            'Участники декабрьских событий 1986 г.',
            'Представители интеллигенции',
            'Бывшие члены компартии',
            'Учителя',
            'Участники экологического движения',
        ],
        rightAnswer: 0
    },
    {
        question: 'Лиссабонский протокол, подписанный в 1993 году президентом Н.A. Назарбаевым, объявил Казахстан: ',
        options: [
            'Территория, свободная от ядерного оружия',
            'Нейтральным государством',
            'Суверенное государство',
            'Свободная экономическая зона',
            'Объектом культурного наследия ЮНЕСКО',
        ],
        rightAnswer: 0
    },
    {
        question: 'Военно-морские силы Республики Казахстан базируются в акватории ',
        options: [
            'Каспийского и Аральского морей',
            'Каспийского моря',
            'Каспийского моря и дельты Волги',
            'Каспийского моря, рек Урал и Иртыш',
            'Каспийского моря, рек Урал и Иртыш, озера Зайсан',
        ],
        rightAnswer: 1
    },
    {
        question: 'Международное представление Акмолы в качестве новой столицы состоялось: ',
        options: [
            '10 декабря 1997 года',
            '6 июля 1994 года',
            '10 июня 1998 года',
            '6 июля 1992 года',
            '6 июля 1997 года',
        ],
        rightAnswer: 2
    },
    {
        question: '6 мая 1998 г. г. Акмола переименована в г. Астану: ',
        options: [
            'Постановлением Правительства РК',
            'Решением Парламента РК',
            'Решением маслихата г. Акмолы',
            'Указом Президента РК',
            'Заключением Государственной ономастической комиссии при Правительстве РК',
        ],
        rightAnswer: 3
    },
    {
        question: 'В структуре обрабатывающей промышленности Астаны 1 место занимает: ',
        options: [
            'производство пищевых продуктов, включая напитки',
            'производство неметаллических продуктов, стройматериалов',
            'машиностроение',
            'производство металлических изделий',
            'текстильная и швейная промышленность, обработка древесины и производство изделий из дерева',
        ],
        rightAnswer: 1
    },
    {
        question: 'Первый космонавт-казах Т.О. Аубакиров работал лётчиком-испытателем самолётов: ',
        options: [
            '«Як»',
            '«Су»',
            '«Ан»',
            '«МиГ»',
            '«Ту»',
        ],
        rightAnswer: 3
    },
    {
        question: 'Главный символ г. Астаны: ',
        options: [
            'Байтерек',
            'Астана-опера',
            'Дворец мира и согласия',
            'Триумфальная арка',
            'Монумент Независимости',
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
        playAudioCorrect();
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
        playAudioWrong();
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});

function playAudioCorrect(){
    var myAudio = new Audio;
    myAudio.src = "../../correct-answer.mp3";
    myAudio.play();
}

function playAudioWrong(){
    var myAudio1 = new Audio;
    myAudio1.src = "../../wrong-answer.mp3";
    myAudio1.play();
}
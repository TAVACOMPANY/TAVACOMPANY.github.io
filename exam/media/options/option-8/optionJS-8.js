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
        question: 'Субъект Российской Федерации, где имя Н.A. Назарбаева носят улица и учебное заведение: ',
        options: [
            'Чеченская республика',
            'Омская область',
            'Астраханская область',
            'Республика Татарстан',
            'Республика Ингушетия',
        ],
        rightAnswer: 0
    },
    {
        question: 'Памятники Н.A. Назарбаеву установлены в странах? ',
        options: [
            'Украина, Россия (Чечня)',
            'Кыргызстан, Туркменистан',
            'Турция, Грузия',
            'Украина, Беларусь',
            'Кыргызстан, Украина',
        ],
        rightAnswer: 4
    },
    {
        question: 'Н.A. Назарбаев объявлен: Елбасы – Лидер Нации? ',
        options: [
            '12 мая 2010 г.',
            '14 июня 2010 г.',
            '13 мая 2010 г.',
            '1 декабря 2013 г.',
            '3 июня 2010 г.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Н.A. Назарбаев имеет учёные степени? ',
        options: [
            'кандидата экономических и доктор технических наук',
            'кандидата экономических и доктора культурологи',
            'кандидата политических и доктора экономических наук',
            'кандидата и доктора экономических наук',
            'кандидата юридических и доктора политических наук',
        ],
        rightAnswer: 3
    },
    {
        question: 'В Казахстане распространён ислам суннитского толка, относящийся к школе? ',
        options: [
            'ханбалистской',
            'маликитской',
            'ханафитской',
            'шафиитской',
            'исмаилитской',
        ],
        rightAnswer: 2
    },
    {
        question: 'Основное население Казахстана принадлежит к мусульманам-суннитам, которые принадлежат к 4 основным направлениям (мазхабам). Мазхаб – это: ',
        options: [
            'правовая школа',
            'духовная школа',
            'этический кодекс',
            'историческая традиция',
            'культурная общность',
        ],
        rightAnswer: 0
    },
    {
        question: '2016 г. – юбилейный, связанный с жизнью и деятельностью выдающегося общественного, государственного деятеля, лидера национально-освободительного движения? ',
        options: [
            'А.Байтурсынов',
            'А. Бокейханов',
            'Н. Нурмақов',
            'М. Дулатов',
            'М. Шоқай ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какую экологическую катастрофу Н.A. Назарбаев рассматривал не только с социальных и экономических позиций, но и в контексте культурно-цивилизационного ущерба истории народов Центральной Азии? ',
        options: [
            'р. Или',
            'Прикаспий',
            'Приаралье',
            'Балхаш',
            'Территория целинных областей Казахстана',
        ],
        rightAnswer: 2
    },
    {
        question: 'Всемирная Ассоциация казахов образована в? ',
        options: [
            '1991г.',
            '1996 г.',
            '1994 г.',
            '1992 г.',
            '1995 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Всемирная Ассоциация казахов избрала своим председателем? ',
        options: [
            'Тохтара Аубакирова',
            'Талгата Мамашева',
            'Халифу Алтая',
            'Мустафу Озтюрка',
            'Н.A. Назарбаева',
        ],
        rightAnswer: 4
    },
    {
        question: '«Декларация о государственном суверенитете Казахской ССР» принята? ',
        options: [
            '1990 г., 25 октября',
            '1991 г., 16 декабря',
            '1991 г., 10 декабря',
            '1991 г., 1 декабря',
            '1989 г., 24 апреля',
        ],
        rightAnswer: 0
    },
    {
        question: 'В период апрель 1990 г. – август 1991 г. в республике соперничали 2 центра власти: ',
        options: [
            'ЦК компартии и правительство',
            'ЦК компартии и Администрация Президента',
            'правительство и Администрация Президента',
            'КГБ – МВД и Администрация Президента',
            'Съезд народных депутатов и Администрация Президента',
        ],
        rightAnswer: 1
    },
    {
        question: '20 августа 1991 года в Москве намечалось подписание документа, определявшего судьбу СССР, а именно? ',
        options: [
            'Протокол о намерениях по реорганизации советской государственности',
            'Договор о распределении полномочий между союзным центром и республиками',
            'Договор о Союзе Суверенных Государств',
            'Договор о Союзе республик Европы и Азии',
            'Евразийское коммюнике',
        ],
        rightAnswer: 2
    },
    {
        question: '19-21 августа 1991 г. в СССР была предпринята попытка госпереворотa. Как назывался его чрезвычайный орган? ',
        options: [
            'Государственный комитет по чрезвычайной обстановке',
            'Государственный комитет по чрезвычайным обстоятельствам',
            'Государственный комитет по чрезвычайной ситуации',
            'Государственный комитет по чрезвычайному положению',
            'Государственный комитет по чрезвычайным проблемам',
        ],
        rightAnswer: 3
    },
    {
        question: 'В каком году Казахстан окончательно избавился от ядерного потенциала, доставшегося от СССР? ',
        options: [
            '1992 г.',
            '1993 г.',
            '1994 г.',
            '1997 г.',
            '1996 г.',
        ],
        rightAnswer: 4
    },
    {
        question: 'Страны, помогавшие Казахстану, стать безъядерным государством: ',
        options: [
            'США, Россия',
            'США, Россия, Китай',
            'США, Россия, Франция',
            'США, Россия, Англия',
            'Стал самостоятельно ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Н.A. Назарбаев стал руководителем республики, будучи избранным на пост? ',
        options: [
            'Президента',
            '1 секретаря ЦК компартии',
            'Председателя Верховного Совета',
            'Председателя Совета Республики',
            'С присвоением титула Елбасы – Лидер Нации',
        ],
        rightAnswer: 1
    },
    {
        question: 'На 1 съезде народных депутатов СССР (май-июнь 1989 г.) группа депутатов выдвинула кандидатуру Н.A. Назарбаева на должность: ',
        options: [
            'Председателя Верховного Совета СССР',
            'Председателя Совета Министров СССР',
            'Вице-президента СССР',
            'министра иностранных дел СССР',
            'Председателя Конституционной комиссии',
        ],
        rightAnswer: 2
    },
    {
        question: 'К моменту роспуска СССР 8 декабря 1991 г. из всех союзных республик не объявили о независимости? ',
        options: [
            'Молдова',
            'Белоруссия, Казахстан',
            'РСФСР, Казахстан',
            'РСФСР, Белоруссия и Казахстан',
            'РСФСР, Белоруссия',
        ],
        rightAnswer: 3
    },
    {
        question: 'Книга Н.A. Назарбаева «Эпицентр мира» посвящена? ',
        options: [
            'Строительству многонационального, многоконфессионального общества',
            'Активной роли на международной арене',
            'Природным богатствам Казахстана ',
            'Истории страны',
            'Истории превращения РК в безъядерную зону',
        ],
        rightAnswer: 4
    },
    {
        question: 'Окончательному решению о полёте Т. Аубакирова в космос способствовало? ',
        options: [
            'Обращение Н. A. Назарбаева к Президенту СССР М.С. Горбачёву',
            'Обращение Правительства республики к Председателю Совета Министров СССР Н.И. Рыжкову',
            'Обращение Н.A. Назарбаева в ЦК КПСС',
            'Обращение Верховного Совета республики к Президенту СССР М.С. Горбачёву',
            'Сбор подписей казахстанцев под обращением к Президенту СССР М.С. Горбачёву',
        ],
        rightAnswer: 0
    },
    {
        question: 'Во время 3 космического полёта Т. Мусабаев командовал экипажем, в состав которого впервые в истории мировой космонавтики входил? ',
        options: [
            'Артист',
            'Космический турист',
            'Врач',
            'Учитель',
            'Женщина',
        ],
        rightAnswer: 1
    },
    {
        question: 'Космонавт Т. Мусабаев был членом  правительства в качестве? ',
        options: [
            'Заместитель премьер-министра по науке, технике и инновационному развитию',
            'Советника Премьер-министра',
            'Председателя Национального космического агентства',
            'Министра новых технологий и космических исследований',
            'Председателя Аэрокосмической комиссии',
        ],
        rightAnswer: 2
    },
    {
        question: 'Казах, Герой Советского Союза, удостоенный и звания Герой РФ: ',
        options: [
            'Момыш-улы Бауржан',
            'Аубакиров Токтар',
            'Мусабаев Талгат',
            'Майданов Каирболат (Николай)',
            'Бейсекбаев Бактыораз',
        ],
        rightAnswer: 3
    },
    {
        question: 'Герой Советского Союза, удостоенный и звания «Халық Қаһарманы»: ',
        options: [
            'Габдуллин Малик',
            'Момышулы Бауржан',
            'Мусабаев Талгат',
            'Бейсекбаев Бактыораз',
            'Аубакиров Токтар',
        ],
        rightAnswer: 4
    },
    {
        question: 'Выдающийся советский, российский ученый-юрист, включённый экспертом в рабочую группу по подготовке Конституции 1995 г.: ',
        options: [
            'Алексеев С.С.',
            'Кудрявцев В.Н.',
            'Сухарев А.Я.',
            'Баглай М.В.',
            'Кутафин О.Е.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Почему экспертами из стран дальнего зарубежья, включёнными в рабочую группу по подготовке Конституции 1995 г., были только представители Франции – Роллан Дюма и Жак Аттали? ',
        options: [
            'Рекомендация экспертного сообщества',
            'За основу новой Конституции выбран Основной Закон Французской Республики',
            'Личная симпатия Н.A. Назарбаева к де Голлю',
            'Инициатива самой Франции',
            'Только эти известные специалисты согласились на сотрудничество',
        ],
        rightAnswer: 1
    },
    {
        question: 'Слова Н.A. Назарбаев: «Нисколько не драматизируя ситуацию, скажу вам сегодня прямо, что мы стояли у края пропасти» относятся к какому периоду независимости? ',
        options: [
            'Сер. 1990-х годов',
            '1996 год',
            'Начало 1990-х годов',
            '1992-95 годы',
            '1991-99 годы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Объектами приватизации стали в 1-ю очередь крупные промышленные предприятия отраслей? ',
        options: [
            'Металлургия, нефтегазовая',
            'Гидроэнергетика, металлургия, нефтегазовая',
            'Электроэнергетика, металлургия',
            'Электроэнергетика, металлургия, нефтегазовая',
            'Электроэнергетика, гидроэнергентика, нефтегазовая',
        ],
        rightAnswer: 3
    },
    {
        question: 'В результате приватизации в общем объеме производства доля частного сектора наиболее выросла в отраслях? ',
        options: [
            'Промышленность',
            'Торговля, промышленность',
            'Сельское хозяйство, промышленность',
            'Торговля, строительство',
            'Сельское хозяйство, торговля',
        ],
        rightAnswer: 4
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
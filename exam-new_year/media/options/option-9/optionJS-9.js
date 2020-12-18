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
        question: 'Наиболее наглядный эффект политики приватизации: ',
        options: [
            'Снижение фактов протестных актов',
            'Насыщение рынка потребительскими товарами, исчезновение очередей',
            'Увеличение продолжительности жизни',
            'Ликвидация безработицы',
            'Прекращение практики «веерных» отключений электричества',
        ],
        rightAnswer: 1
    },
    {
        question: 'С целью получения из «первых рук» практических знаний по реформированию страны в 1993 г. в Казахстан был приглашён всемирно известный реформатор и политик? ',
        options: [
            'Джордж Сорос',
            'Дэн Сяопин',
            'Ли Куан Ю',
            'Жак Аттали',
            'Маргарет Тэтчер',
        ],
        rightAnswer: 2
    },
    {
        question: 'Почему на лицевой стороне купюр тенге помещены портреты великих предков, а на обратной – памятники культуры и природы? ',
        options: [
            'Дань традиции почитания «духа предков – аруах»',
            'В целях патриотического воспитания',
            'Сделают Казахстан узнаваемым',
            'Такие изображения трудно поддаются подделке',
            'Экзотичны',
        ],
        rightAnswer: 3
    },
    {
        question: 'Страна, где разместили заказ на изготовление 1-й партии тенге? ',
        options: [
            'Китай',
            'Франция',
            'США',
            'Турция',
            'Великобритания',
        ],
        rightAnswer: 4
    },
    {
        question: 'Тенге вошли в обращение в соотношении 1 тенге к: ',
        options: [
            '500 рубль',
            '100 рубль',
            '200 рубль',
            '1000 рубль',
            '50 рубль',
        ],
        rightAnswer: 0
    },
    {
        question: 'Пионером в привлечении иностранных инвестиций стал? ',
        options: [
            'нефтегазовый сектор',
            'оборонный комплекс',
            'урановая промышленность',
            'добыча золота',
            'банки',
        ],
        rightAnswer: 0
    },
    {
        question: '1-я иностранная нефтяная компания, пришедшая работать в Казахстан: ',
        options: [
            'Лукойл',
            'Шеврон',
            'Texaco',
            'Эни',
            'Бритиш Петролеум',
        ],
        rightAnswer: 1
    },
    {
        question: 'Космодром «Байконур» перешёл под юрисдикцию РК в: ',
        options: [
            '2 марта 1992 г.',
            '29 августа 1991 г.',
            '31 августа 1991 г.',
            '10 декабря 1991 г.',
            '25 декабря 1991 г.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Срок аренды Россией космодрома «Байконур» завершается? ',
        options: [
            '2029 г.',
            '2049 г.',
            '2030 г.',
            '2050 г.',
            '2024 г.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Ежегодная арендная плата России за космодром «Байконур»? ',
        options: [
            '150 млн. долларов',
            '120 млн. долларов',
            '125 млн. долларов',
            '100 млн. долларов',
            '115 млн. долларов',
        ],
        rightAnswer: 4
    },
    {
        question: 'Основной вопрос повестки дня 1 саммита СВМДА (Совещания по взаимодействию и мерам доверия в Азии) июнь 2002 г., Алматы: ',
        options: [
            'противодействие международному терроризму',
            'укрепление стабильности на континенте',
            'урегулирование пограничных вопросов',
            'урегулирование индийско-пакистанского конфликта',
            'ситуация в Афганистане',
        ],
        rightAnswer: 0
    },
    {
        question: 'Один из примеров, по которому создавалась Стратегия «Казахстан-2030»? ',
        options: [
            'Программа «500 дней» в СССР',
            '«Новый курс» Рузвельта',
            'Опыт реформ в Италии1955-73 гг.',
            'Опыт реформ Л. Эрхарда в ФРГ',
            'План Маршала',
        ],
        rightAnswer: 1
    },
    {
        question: 'Один из примеров, по которому создавалась Стратегия «Казахстан-2030»? ',
        options: [
            'Теория Кейнса',
            'Теория Кейнса',
            '«Перспектива-2020» Малайзии',
            'Опыт реформ М. Тэтчер в Великобритании',
            'Опыт реформ в Австрии 1955-73 гг.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Один из примеров, по которому создавалась Стратегия «Казахстан-2030»:? ',
        options: [
            'Опыт реформ в Индии 1955-73 гг.',
            'Опыт НЭПа - новой экономической политики 1920-х годов в СССР',
            'План Шлиффена',
            'Сратегия развития Китая',
            'Программа «900 дней» в СССР',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие приоритеты в Послании народу Казахстана «Казахстан-2030 Процветание, безопасность и улучшение благосостояния всех казахстанцев» были нацелены на укрепление национального единства? ',
        options: [
            'экономический рост, базирующийся на открытой рыночной экономике с высоким уровнем иностранных инвестиций и внутренних сбережений; национальная безопасность',
            'энергетические ресурсы; профессиональное государство',
            'развитие инфраструктуры, транспорта и связи; профессиональное государство',
            'энергетические ресурсы; развитие инфраструктуры, транспорта и связи',
            'внутриполитическая стабильность и консолидация общества',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какие приоритеты в Послании народу Казахстана «Казахстан-2030. Процветание, безопасность и улучшение благосостояния всех казахстанцев» были нацелены на развитие суверенной государственности РК? ',
        options: [
            'профессиональное государство',
            'развитие инфраструктуры, транспорта и связи; профессиональное государство',
            'энергетические ресурсы; профессиональное государство',
            'внутриполитическая стабильность и консолидация общества',
            'национальная безопасность',
        ],
        rightAnswer: 0
    },
    {
        question: 'Чем объясняет Н.A. Назарбаев хронологические рамки планирования Стратегии «Казахстан-2030» в три 10-летия ? ',
        options: [
            'это период стабильного развития в глобальном масштабе между кризисами в экономике',
            'это период активной жизни одного поколения',
            'к 2030 г. созреют условия для новой интеграции на постсоветском пространстве',
            'мир вступит в новый этап научно-технической революции',
            'у руля государства встанут представители поколения казахстанцев, родившегося и выросшего в условиях независимости',
        ],
        rightAnswer: 1
    },
    {
        question: 'На основе Стратегии «Казахстан-2030» была разработана и принята Стратегия? ',
        options: [
            'развития сельских территорий',
            'агропродовольственная',
            'индустриально-инновационного развития страны',
            'реформирования здравоохранения и образования',
            'жилищного строительства',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой документ не был разработан и принят на основе Стратегии «Казахстан-2030»? ',
        options: [
            'Государственная агропродовольственная программа',
            'Программа развития сельских территорий',
            'Программа здравоохранения и образования',
            'Программа инфраструктурного развития «Нұрлы жол» на 2015-19 годы',
            'Программа реформирования системы социальной защиты населения',
        ],
        rightAnswer: 3
    },
    {
        question: 'Технико-финансовые обстоятельства, повлиявшие на перенос столицы из Алматы в Астану: ',
        options: [
            'приближение к географическому центру страны',
            'отсутствие необходимых условий для роста экономики',
            'ухудшение экологической обстановки, плотная застройка',
            'близость к госгранице требовала строительства военных объектов',
            'отсутствие свободных территорий под застройку; дорогостоящее сейсмостойкое строительство',
        ],
        rightAnswer: 4
    },
    {
        question: 'В основу монумента «Байтерек» легла старинная казахская легенда о... ',
        options: [
            'волшебной птице Самрук',
            'сказочном батыре Алпамысе',
            'вечности бытия',
            'связи человека с космосом',
            'стране вечного счастья',
        ],
        rightAnswer: 0
    },
    {
        question: 'Один из первых монументальных памятников Астаны – конная статуя – посвящена великому казахскому правителю – патриоту...  ',
        options: [
            'Абылай',
            'Кеңесары',
            'Салкам Жангиру',
            'Есиму',
            'Тауке',
        ],
        rightAnswer: 1
    },
    {
        question: 'Победителем международного конкурса 1999 г. на новый генеральный план Астаны стал проект? ',
        options: [
            'японского архитектора К. Курокавы',
            'британского архитектора Ф. Нормана',
            'американского архитектора Ф. Гери',
            'британского архитектора З. Хади',
            'японского архитектора A. Исодзаки',
        ],
        rightAnswer: 0
    },
    {
        question: 'Идея выборности акимов, озвученная Главой государства в его Послании народу Казахстана в 1998 г., в качестве эксперимента в том же году была реализована в...  ',
        options: [
            'г. Темиртау Карагандинской области',
            'п. Кульсары Атырауской области',
            'г. Атбасар Акмолинской области',
            'с. Шамалган Алматинской области',
            'с. Уржар Восточно-Казахстанской области',
        ],
        rightAnswer: 3
    },
    {
        question: 'Партии, разделившие места в Мажилисе, по итогам выборов 10 октября 1999 г.: ',
        options: [
            'Отан, Гражданская',
            'Отан, Гражданская, Аграрная',
            'Аграрная и Коммунистическая',
            'Азат, Аграрная и Коммунистическая',
            'Отан, Гражданская, Аграрная и Коммунистическая',
        ],
        rightAnswer: 4
    },
    {
        question: 'В 2002 г. Казахстан первым из стран СНГ получил статус страны с... ',
        options: [
            'рыночной экономикой',
            'либеральной политикой',
            'межнациональным миром',
            'высоким благосостоянием',
            'эффективным управлением',
        ],
        rightAnswer: 0
    },
    {
        question: 'Протяжённость госграницы РК по периметру составляет? ',
        options: [
            '15 тыс. км',
            '14,5 тыс. км',
            '14 тыс. км',
            '13,7 тыс. км',
            '7,6 тыс. км',
        ],
        rightAnswer: 1
    },
    {
        question: 'Самая протяжённая сухопутная граница в мире: ',
        options: [
            'казахстанско-узбекистанская',
            'казахстанско-китайская',
            'казахстанско-российская',
            'казахстанско-монгольская',
            'казахстанско-туркменистанская',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какую песню рассмотрел Парламент 6 января 2006 г. в качестве нового Гимна РК? ',
        options: [
            '«Сарыарқа»',
            '«Үшқоңыр»',
            '«Жерiм менiң»',
            '«Менiң Қазақстаным»',
            '«Елiм менiң»',
        ],
        rightAnswer: 3
    },
    {
        question: 'В организационном плане партия «Нур Отан» возникла в декабре 2006 г. после объединения с партией «Отан»: ',
        options: [
            'партий Асар, Социал-демократической',
            'партии Народный конгресс',
            'партий Гражданской, Аграрной',
            'партии Асар ',
            'партий Асар, Гражданской, Аграрной',
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
    myAudio.volume= 0.07;
}

function playAudioWrong(){
    var myAudio1 = new Audio;
    myAudio1.src = "../../wrong-answer.mp3";
    myAudio1.play();
    myAudio1.volume= 0.07;
}
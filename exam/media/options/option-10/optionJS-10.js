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
        question: 'Книги Н.A. Назарбаева «Стратегия становления постиндустриального общества и партнерство цивилизаций», «Стратегия радикального обновления глобального сообщества и партнерство цивилизаций», «Глобальная энергоэкологическая стратегия устойчивого развития в XXI веке» (2008-11 гг.) рассматриваются как весомый вклад в: ',
        options: [
            'теорию международных отношений',
            'экономическую науку',
            'политическую науку',
            'философию',
            'философию',
        ],
        rightAnswer: 1
    },
    {
        question: 'Назарбаев Н.A.: «Девизом казахстанского председательства в ОБСЕ будут четыре «Т» (согласно английского языкa). Какой из перечисленных принципов не имелся в виду? ',
        options: [
            'Tolerance (толерантность)',
            'Transparency (транспарентность)',
            'Tradition (традиции)',
            'Trust (доверие)',
            'Тough policy (твёрдая политикa)',
        ],
        rightAnswer: 4
    },
    {
        question: 'Официальное присвоение Н.A. Назарбаеву конституционно-правового статуса Лидера нации оформлено решением? ',
        options: [
            '14 июня 2010 г. Конституционного Совета',
            '14 июня 2010 г. Парламента',
            '6 июля 2010 г. Ассамблеи народа Казахстана',
            '6 июля 2010 г. Республиканского форума народа Казахстана',
            '1 декабря 2010 г. постановлением Кабинета Министров',
        ],
        rightAnswer: 1
    },
    {
        question: 'Организация, выдвинувшая Н.A. Назарбаева кандидатом на пост Президента РК, в 2011 г.: ',
        options: [
            'Военный университет Минобороны РК',
            'ЕНУ им. Л.Н. Гумилёва',
            'собрание актива Восточно-Казахстанской области',
            'партия «Нур Отан»',
            'Ассамблея народа Казахстана',
        ],
        rightAnswer: 3
    },
    {
        question: 'Виды Вооружённых сил РК: ',
        options: [
            'Сухопутные войска, силы воздушной обороны, военно-морские силы, специальные войска',
            'Сухопутные войска, силы воздушной обороны, специальные войска',
            'Сухопутные войска, силы воздушной обороны, военно-морские силы',
            'Сухопутные войска, силы воздушной обороны, аэромобильные войска',
            'Сухопутные войска, силы воздушной обороны, военно-морские силы, аэромобильные войска',
        ],
        rightAnswer: 2
    },
    {
        question: 'Вручается исключительно высшему командному составу силовых органов орден: ',
        options: [
            'Данк',
            'Барыс',
            'Парасат',
            'Достык',
            'Курмет',
        ],
        rightAnswer: 0
    },
    {
        question: 'Высший орден РК: ',
        options: [
            'Достык',
            'Алтын Кыран',
            'Парасат',
            'Барыс',
            'Первый Президент Республики Казахстан Нурсултан Назарбаев',
        ],
        rightAnswer: 1
    },
    {
        question: 'Военный орден, имеющий 3 степени? ',
        options: [
            'Парасат',
            'Барыс',
            'Айбын',
            'Достык',
            'Шапагат',
        ],
        rightAnswer: 2
    },
    {
        question: 'Орден, которым награждаются граждане, внёсшие большой личный вклад в развитие и умножение духовного и интеллектуального потенциала? ',
        options: [
            'Достык',
            'Айбын',
            'Данк',
            'Парасат',
            'Курмет',
        ],
        rightAnswer: 3
    },
    {
        question: 'Гражданам, удостоенным званий «Халык каһарманы», вручается специальный знак отличия, а также орден: ',
        options: [
            'Данк',
            'Айбын',
            'Алтын Кыран',
            'Курмет',
            'Отан',
        ],
        rightAnswer: 4
    },
    {
        question: 'Звание «Халык каһарманы» первому присвоено?',
        options: [
            'генералу Нурмагамбетову С.К.',
            'космонавту Аубакирову Т.',
            'космонавту Мусабаеву Т.',
            'желтоксановцу Рыскулбекову К.',
            'ветерану Великой Отечественной войны Кулакову A.',
        ],
        rightAnswer: 0
    },
    {
        question: 'Поэт, писатель-литературовед О. Сулейменов является постоянным представителем РК в...  ',
        options: [
            'НАТО',
            'ЮНЕСКО ',
            'ОБСЕ',
            'ООН',
            'ЮНИСЕФ (Детский фонд)',
        ],
        rightAnswer: 1
    },
    {
        question: 'Казахстан - крупнейшая страна? ',
        options: [
            'не снарядившая самостоятельно управляемый космический полёт',
            'не принимавшая Олимпийские игры',
            'не имеющая выхода в Мировой океан',
            'не обладающая ядерным оружием',
            'не являющаяся постоянным членом Совета Безопасности ООН',
        ],
        rightAnswer: 2
    },
    {
        question: 'В рамках СНГ Казахстан стремится делать основной упор на сотрудничество в сфере: ',
        options: [
            'идеологической',
            'политической',
            'культурной',
            'экономики',
            'гуманитарной',
        ],
        rightAnswer: 3
    },
    {
        question: 'В административно-территориальном отношении РК делится на: ',
        options: [
            '4 региональных командования',
            '5 экономико-географических районов',
            '14 областей, 2 города республиканского подчинения, 5 городов совместного (казахстанско-российского) подчинения',
            '14 областей, 2 города республиканского подчинения, 1 город совместного (казахстанско-российского) подчинения',
            '14 областей, 3 города республиканского подчинения',
        ],
        rightAnswer: 4
    },
    {
        question: 'Астана расположена в географо-историческом регионе, известном как... ',
        options: [
            'Сарыарқа',
            'Бурабай',
            'Кокшетау',
            'Улы Дала',
            'Тургайская степь',
        ],
        rightAnswer: 0
    },
    {
        question: 'Казахстан по разведанным запасам золота занимает в мире место? ',
        options: [
            '4',
            '5',
            '3',
            '6',
            '7',
        ],
        rightAnswer: 1
    },
    {
        question: 'Объём доказанных запасов нефти в РК составляет от мировых запасов? ',
        options: [
            '5%',
            '4,1%',
            '3,2%',
            '5,5%',
            'нет однозначного мнения',
        ],
        rightAnswer: 2
    },
    {
        question: 'Металл, по поставкам которого на мировой рынок РК занимает 1 место в мире:',
        options: [
            'серебро',
            'хромиты',
            'свинец',
            'уран',
            'цинк',
        ],
        rightAnswer: 3
    },
    {
        question: 'Система специализированных судов РК включает? ',
        options: [
            'военные, экономические, административные, кассационные',
            'военные, экономические, административные, апелляционные',
            'военные, экономические, административные, присяжных',
            'военные, налоговые, административные',
            'военные, экономические, административные',
        ],
        rightAnswer: 4
    },
    {
        question: 'В каждой области функционируют структуры Ассамблеи народа Казахстана, именуемые? ',
        options: [
            'малая Ассамблея народа Казахстана',
            'филиал Ассамблеи народа Казахстана',
            'представительство Ассамблеи народа Казахстана',
            'региональное объединение Ассамблеи народа Казахстана',
            'областная организация Ассамблеи народа Казахстана',
        ],
        rightAnswer: 0
    },
    {
        question: 'На гербе PK изображён Тулпар - мифический конь с крыльями, встречающийся в культуре древних казахстанцев? ',
        options: [
            'массагетов',
            'саков',
            'уйсуней',
            'кангюев',
            'гуннов',
        ],
        rightAnswer: 1
    },
    {
        question: 'Голубой цвет на государственных символах является традиционным для... ',
        options: [
            'казахов',
            'символом жизни',
            'тюрков',
            'Востока',
            'человечества',
        ],
        rightAnswer: 2
    },
    {
        question: 'Автор музыки Гимна РК, композитор: ',
        options: [
            'М. Тулебаев',
            'Л. Хамиди',
            'Е. Брусиловский, Л. Хамиди',
            'Ш. Калдаяков',
            'Е. Рахмадиев',
        ],
        rightAnswer: 3
    },
    {
        question: 'Полиязычные газеты в РК выходят на языках? ',
        options: [
            'русско-молдавский',
            'русско-чеченский',
            'казахско-татарский',
            'русско-белорусский',
            'русско-казахско-английский, казахско-русско-турецкий',
        ],
        rightAnswer: 4
    },
    {
        question: 'Вид твёрдых полезных ископаемых, по запасам которого Павлодарская область занимает 1 место в РК? ',
        options: [
            'уголь',
            'соль',
            'медно-молибденовые руды',
            'золото',
            'малахит, лазурит',
        ],
        rightAnswer: 0
    },
    {
        question: 'Крупнейшее угледобывающее предприятие РК и мира? ',
        options: [
            'шахта им. Т. Кузембаева',
            'разрез «Богатырь»',
            'разрез «Восточный»',
            'разрез «Северный»',
            'шахта им. А. Пархоменко',
        ],
        rightAnswer: 1
    },
    {
        question: 'Электростанция, 50% которой принадлежит российской стороне? ',
        options: [
            'Экибастузская  ГРЭС-1',
            'Аксуская ТЭС',
            'Экибастузская  ГРЭС-2',
            'Павлодарская  ТЭЦ-1',
            'Экибастузская  ТЭЦ',
        ],
        rightAnswer: 2
    },
    {
        question: '1-я женщина-посол в истории Казахстана и РК? ',
        options: [
            'Бультрикова Б.',
            'Назарбаева Д.',
            'Абдыкалыкова Г.',
            'Арыстанбекова А.',
            'Айтимова Б.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Крупное международное мероприятие в РК 2017 г.? ',
        options: [
            'Азиада',
            'Евроазиада',
            'Олимпиада',
            'Спартакиада',
            'Всемирная Зимняя Универсиада',
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

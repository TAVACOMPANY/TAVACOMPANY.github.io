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
        question: 'Word редакторында жасалған файлдың кеңейтілуі қандай?',
        options: [
            '.word',
            '.docx',
            '.xlsx',
            '.txt',
            '.bmp',
        ],
        rightAnswer: 1
    },
    {
        question: 'Реттік сан есімді табыңыз.',
        options: [
            'Екі бүтін оннан үш.',
            'Отыз тоғыздан.',
            'Он бір.',
            'Он бірінші.',
            'Он - он бес.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Жүйелік сағат пен пернетақтаның индикаторы қайда орналасады?',
        options: [
            'Басты менюде',
            'Есептер тақтасында',
            'Жұмыс орнында',
            'Таңбашаларда',
            'Қолданбалар батырмаларында',
        ],
        rightAnswer: 1
    },
    {
        question: 'Белгілі бір нәрсе туралы таңбалар мен сигналдар түрінде берілетін мағлұматтарды қалай атайды?',
        options: [
            'Каталог',
            'Құжат',
            'Информация',
            'Файл',
            'Бума',
        ],
        rightAnswer: 2
    },
    {
        question: ' "Пуск" батырмасын басқан кезде не шығады?',
        options: [
            'Бас меню',
            'Таңбаша тақтасы',
            'Жұмыс орны',
            'Есептер тақтасы',
            'Жүйелік тақтасы',
        ],
        rightAnswer: 0
    },
    {
        question: 'Mіcrosoft Offіce-тің құрамындағы, презентациялық материалдар дайындауға арналған программа',
        options: [
            'Дұрыс жауап жоқ',
            'Power Point',
            'Microsoft Access',
            'WordPad',
            'Power Paint',
        ],
        rightAnswer: 1
    },
    {
        question: 'Берілген сөйлемді дұрыс аяқтаңыз. 16 желтоқсан -...',
        options: [
            'Ынтымақ күні',
            'Жеңіс күні.',
            'Республика күні.',
            'Конституция күні.',
            'Тәуелсіздік күні',
        ],
        rightAnswer: 4
    },
    {
        question: 'Сыртқы жад құрылғысына жатады ... .',
        options: [
            'драйвер',
            'процессор',
            'қатты диск ',
            'монитор',
            'дұрыс жауап жоқ',
        ],
        rightAnswer: 2
    },
    {
        question: 'Қазақ халқының ұлттық ойынын белгілеңіз.',
        options: [
            'Лото',
            'Тоғызқұмалақ.',
            'Баскетбол.',
            'Дойбы.',
            'Шахмат.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Компьютер электр желісінен ажыратылса барлық информация қайда өшіріледі?',
        options: [
            'дұрыс жауап жоқ',
            'қатты дискіде ',
            'жедел жадта',
            'CD-ROM дискіде',
            'иілгіш дискіде',
        ],
        rightAnswer: 2
    },
    {
        question: 'Тек үнді дауыссыздары бар сөзді табыңыз.',
        options: [
            'Алпыс.',
            'Азат.',
            'Айман',
            'Сапар.',
            'Аймақ',
        ],
        rightAnswer: 2
    },
    {
        question: '"Корзина" қолданбасы Windows-та не үшін керек?',
        options: [
            'Файл және бумалаар қасиеттерін қарап шығу үшін',
            'Жойылған файл мен бумаларды уақытша сақтау үшін',
            'Қолданбаларды тез іске қосу үшін',
            'Компьютер дискінің мазмұнын шартты түрде көрсететін бұтақты сақтау үшін ',
            'Жергілікті желін баптау үшін ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Excel-де құрылған файлдың кеңейтілуі қандай?',
        options: [
            '.exsx',
            '.xclx',
            '.docx ',
            '.txt',
            '.xlsx',
        ],
        rightAnswer: 4
    },
    {
        question: '«Сұлу» сөзінің синонимін табыңыз',
        options: [
            'Мықты',
            'Әдемі ',
            'Салмақты',
            'Сыпайы',
            'Әдепті',
        ],
        rightAnswer: 1
    },
    {
        question: 'RGB жүйесі қандай информацияны кодтауға арналған?',
        options: [
            'Графикалық информацияны',
            'Мәтіндік информацияны',
            'Сандық информацияны',
            'Дұрыс жауап жоқ',
            'Дыбысты информацияны',
        ],
        rightAnswer: 0
    },
    {
        question: 'Функционалды пернелер деп қандай пернелерді айтамыз?',
        options: [
            'Alt, Shift, Enter',
            'CapsLock, NumLock',
            'Home, Delete, PageDown ',
            'Дұрыс жауап жоқ',
            'F1..F12',
        ],
        rightAnswer: 4
    },
    {
        question: 'Қашықтан компьютерлердегі сақталатын деректер нені жасайды?',
        options: [
            'Интернетті',
            'Аппараттық ресурстарды',
            'Информациялық ресурстарды',
            'Желіні',
            'Хаттаманы',
        ],
        rightAnswer: 2
    },
    {
        question: 'Информатика деген не?',
        options: [
            'Компьютермен жұмыс істеу үйренуге мүмкіндік беретін ғылым',
            'Есептеуіш техника көмегімен құру, сақтау, бейнелеу, өңдеу және деректерді беру әдістерін және де бұл құрылғылардың жұмыс істеуі мен оларды басқару тәсілдерінің принцептерін жүйелейтін техникалық ғылым',
            'Деректерді көшіру, тасымалдау, атын өзгерту және жою тәсілдерін зерттейтін ғылым',
            'Файл құрылымда ұйымдасқан деректерді сақтау, іздеу, сүзу тұралы ғылым',
            'Дұрыс жауап жоқ',
        ],
        rightAnswer: 1
    },
    {
        question: 'Кез-келген Windows-терезенің оң жақ жоғары бұрышында орналасқан батырма не үшін керек?',
        options: [
            'Барлық экранға терезені жазу үшін',
            'Терезені жыймалау үшін',
            'Терезенің өлшемдерін қалпына келтіру үшін ',
            'Терезені жабу үшін',
            'Жұмыс орны бойынша терезені жылжыту үшін',
        ],
        rightAnswer: 3
    },
    {
        question: 'Туынды түбірді анықтаңыз.',
        options: [
            'Тазалық',
            'Жол',
            'Бол',
            'Сынып',
            'Жаңа',
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
    coratten();
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
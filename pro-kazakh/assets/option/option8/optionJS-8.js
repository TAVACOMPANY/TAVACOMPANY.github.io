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
        question: 'Баяндауышты табыңыз. Күзде жыл құстары жылы жаққа ұшып кетеді.',
        options: [
            'Жылы.',
            'Ұшып кетеді.',
            'Жыл құстары.',
            'Күзде.',
            'Жакқа.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Жедел жад не үшін арналған?',
        options: [
            'Дұрыс жауап жоқ',
            'Информацияны сақтауға',
            'Информацияны өндеуге',
            'Берілген уақыт мезгілінде бір программаны өндеуге',
            'Программаларды іске қосуға',
        ],
        rightAnswer: 3
    },
    {
        question: 'Реттік сан есімді табыңыз.',
        options: [
            'Отыз тоғыздан.',
            'Он бірінші.',
            'Он бір.',
            'Екі бүтін оннан үш.',
            'Он - он бес.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Шартты райлы етістікті табыңыз.',
        options: [
            'Ертең мектепке кел.',
            'Өзің білесің, біз момын шаруамыз.',
            'Бір көрсем, арманым болмас еді.',
            'Содан кейін мені сына.',
            'Жүкті шешпе, үйді әуре қыласың.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Бірнеше терезе бір мезгілде ашық бола ала ма?',
        options: [
            'Иә',
            'Иә, бірақ 5-тен артық емес ',
            'Иә, егер олардың тақырыптары бір мезгілде жарық түспен ерекшеленген',
            'Иә, егер олардың барлығы ерекшеленген',
            'Жоқ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Excel-де құрылған файлдың кеңейтілуі қандай?  ',
        options: [
            '.exsx',
            '.xlsx',
            '.xclx',
            '.docx',
            '.txt',
        ],
        rightAnswer: 1
    },
    {
        question: 'Windows-та объекттің орын ауыстыруы қалай іске асырылады?',
        options: [
            'Shift пернесін басып тұрып объекті сүйрету',
            'F6 функционалды пернесінің көмегімен ',
            'Ctrl пернесін басып тұрып, тышқанның оң жақ батырмасымен объектті сүйрету ',
            'Ctrl пернесін басып тұрып, тышқанның сол жақ батырмасымен объектті сүйрету ',
            'Тышқанның сол жақ батырмасымен сүйретіп',
        ],
        rightAnswer: 4
    },
    {
        question: 'Контексті менюді қалай шақыруға болады?',
        options: [
            'Windows-та мынадай менюдің түрі жоқ',
            'Керекті объект активті болғанда ALT пернені басып',
            'Тышқанныңың оң жақ батырмасын шертіп ',
            'Керекті объектіге курсорды қойып тышқанның сол жақ пернесін басып',
            'Объектті қос шерту',
        ],
        rightAnswer: 2
    },
    {
        question: 'Файл аты айқын объекті идентификациялауға мүмкіндік береді, ал кеңейтілуі нені сипаттайды?',
        options: [
            'Жасау уақытын',
            'Типін',
            'Каталогын',
            'Өлшемін',
            'Жолын',
        ],
        rightAnswer: 1
    },
    {
        question: 'Windows - терезенің оң жақ жоғары бұрышындағы үш батырманың ортасында тұрған батырма не үшін керек?',
        options: [
            'жұмыс орны бойынша терезені жылжыту үшін',
            'терезенің өлшемдерін қалпына келтіру үшін ',
            'терезені экранға толық ашу үшін ',
            'терезені ықшамдау үшін',
            'терезені жабу үшін',
        ],
        rightAnswer: 2
    },
    {
        question: 'Берілген сөйлемді дұрыс аяқтаңыз. 30 тамыз -...',
        options: [
            'Тәуелсіздік күні.',
            'Жеңіс күні.',
            'Конституция күні.',
            'Ынтымақ күні.',
            'Республика күні.',
        ],
        rightAnswer: 2
    },
    {
        question: 'Word-тағы кестенің басқа ұяшығына ауысу үшін не істеу керек?',
        options: [
            'Esc пернесін басу',
            'Тышқанды басқару пернелерін пайдалану',
            'Enter пернесін басу',
            'Home пернесін басу',
            'End пернесін басу',
        ],
        rightAnswer: 1
    },
    {
        question: '"Мой компьютер" таңбашасы не үшін қажет?',
        options: [
            'Жойылған файлдармен бумалардыды сақтау үшін',
            'Жергілікті желін баптау үшін',
            'Файл және бумаларар қасиеттерін қарап шығу үшін',
            'Windows қолданбалы программаларын іске қосу үшін',
            'Компьютер дискінің мазмұнын шартты түрде көрсететін бұтақты сақтау үшін',
        ],
        rightAnswer: 4
    },
    {
        question: 'Windows программасы программалық жасаудың қандай типіне жатады?',
        options: [
            'Стандартты қолданбалар',
            'Операциялық жүйелер',
            'Драйверлер',
            'Қолданбалы программалар',
            'Құрамдас енгізу-шығару жүйесі',
        ],
        rightAnswer: 1
    },
    {
        question: 'Компьютер электр желісінен ажыратылса барлық информация қайда өшіріледі?',
        options: [
            'жедел жадта',
            'қатты дискіде',
            'CD-ROM дискіде',
            'иілгіш дискіде',
            'дұрыс жауап жоқ',
        ],
        rightAnswer: 0
    },
    {
        question: 'Операциялық жүйе қандай функцияларды атқарады?',
        options: [
            'Компьютермен және түрлі шалғай құрылғылар арасында деректер алмасуды ұйымдастыру',
            'Дұрыс жауап жоқ',
            'Еңгізу-шығару құрылғыларын іске қосу ',
            'Файлдарды сақтау және ұйымдастыру',
            'Пайдаланушымен диалогты ұйымдастыру, аппаратураны және компьютер қорын басқару',
        ],
        rightAnswer: 4
    },
    {
        question: 'Курсордың жолдың аяғына тез ауысуын қандай перне орындайды?',
        options: [
            'Shift',
            'Ctrl',
            'End',
            'Esc',
            'Insert',
        ],
        rightAnswer: 2
    },
    {
        question: 'Синоним сөздерді табыңыз.',
        options: [
            'Бас, жақ.',
            'Әдемі, сұлу.',
            'Бас, аяқ.',
            'Мұғалім, оқушы.',
            'Үлкен, кіші.',
        ],
        rightAnswer: 1
    },
    {
        question: 'Ұяң дауыссыздан басталған қосымшаны табыңыз.',
        options: [
            'Баласыңдар.',
            'Терезелер.',
            'Жастығымыз.',
            'Қызға.',
            'Доптың.',
        ],
        rightAnswer: 3
    },
    {
        question: 'Жойылған объектілер уақытша түсетін қапшықты қалай атайды?',
        options: [
            '"Қоржын"',
            'Блокнот',
            'Бума',
            'Опретивтік қапшық',
            'Дұрыс жауап жоқ',
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
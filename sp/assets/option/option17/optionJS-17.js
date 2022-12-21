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
      msgOfResult = document.getElementById('msgOfResult'),
      br = '</br>';

const questions = [
    {
        question: 'Найдите команду обмена данных между регистрами :',
        options: [
            'XCHG AH,BX, XCHG AL,BL, XCHG AX,BX',
            'XCHG AH,BH, XCHG AL,BL, XCHG AX,BX',
            'XCHG AH,BH, XCHG AX,BL, XCHG AX,BX',
            'XCHG AX,BH, XCHG AL,BL, XCHG AX,BX',
            'XCHG AH,BH, XCHG AX,BL, XCHG AX,BX',
        ],
        rightAnswer: 1
    },
    {
        question: 'Найдите команды арифметического сдвига влево:',
        options: [
            'SAL BL,1, SAL 2,AH, SAL AL,1',
            'SAR BL,1, SAL AH,1, SAL AL,1',
            'SAL BL,1, SAL AH,1, SAL AL,1',
            'SAL 1,BL, SAL AH,1, SAL AL,1',
            'SAR BL,1, SAL AH,1, SAL AL,1',
        ],
        rightAnswer: 2
    },
    {
        question: 'Найдите команды ввода данных:',
        options: [
            'IN AL,34, IN AL,34Н, IN AL,DX',
            'IN BL,34, IN AL,34Н, IN AL,DX',
            'IN AL,34, IN BL,34Н, IN AL,DX',
            'IN AL,34, IN AL,34Н, IN CL,DX',
            'IN AL,34, IN CL,34Н, IN AL,DX',
        ],
        rightAnswer: 0
    },
    {
        question: 'Найдите команды извлечения данных из стека:',
        options: [
            'POP CS, PUSH MEM, POP SI',
            'POP CS, POP MEM, POP SI',
            'PUSH CS, POP MEM, POP SI',
            'PUSH CS, PUSH MEM, PUSH SI',
            'PUSH POP CS, POP MEM, POP SI',
        ],
        rightAnswer: 1
    },
    {
        question: 'Найдите команды логического сложения:',
        options: [
            'AND AL,1, AND BL,1, AND AH,1',
            'OR AL,1, AND BL,1, OR AH,1',
            'OR AL,1, OR BL,1, OR AH,1',
            'NOT AL,1, OR BL,1, OR AH,1',
            'OR AL,1, NOT BL,1, OR AH,1',
        ],
        rightAnswer: 2
    },
    {
        question: 'Найдите команды пересылки шестнадцатиричных данных:',
        options: [
            'MOV AL,1Н',
            'MOV AL,12',
            'MOV AL,AH',
            'MOV A,AH',
            'MOV C,AH',
        ],
        rightAnswer: 0
    },
    {
        question: 'Найдите команды работы со стеком:',
        options: [
            'XOR SI, PUSH VTV, PUSH SI',
            'XOR SI, PUSH VTV, PUSH SI',
            'POP SI, PUSH VTV, AND SI',
            'POP SI, AND VTV, PUSH SI',
            'POP SI, PUSH VTV, PUSH SI',
        ],
        rightAnswer: 4
    },
    {
        question: 'Найдите логические команды:',
        options: [
            'OR AL,CX',
            'AND BX,AH,',
            'AND AL,CX',
            'AND AL,BL',
            'OR AL,CX',
        ],
        rightAnswer: 3
    },
    {
        question: 'Укажите сегментные регистры:.',
        options: [
            'SS, SX, DS, ES',
            'SS, CS, DS, ES',
            'SS, CS, DX, ES',
            'SS, CS, DS, EX',
            'SX, CS, DS, ES',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что включает в себя, модель регистров?',
        options: [
            'регистры хранения мантиссы, регистр состояния, регистр-счетчик адреса',
            'регистры хранения порядка, регистр состояния, регистр-счетчик адреса',
            'регистры общего назначения, регистр состояния, регистр-счетчик адреса',
            'регистры с фиксированной точкой, регистр состояния, регистр-счетчик адреса',
            'регистры с плавающей точкой, регистр состояния, регистр-счетчик адреса',
        ],
        rightAnswer: 2
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
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
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
      msgOfResult = document.getElementById('msgOfResult');

const questions = [
    {
        question: 'В алгоритме шифрования S-DES каждый раунд начинается с выполнения расширяющей перестановки Р=(4,1,2,3,2,3,4,1). Пусть результат первого раунда имеет вид (11011100). Тогда результатом расширяющей перестановки в начале второго раунда будет 8-битный результат',
        options: [
            '01110110',
            '01101001',
            '00110011',
            '01100111',
            '01000101',
        ],
        rightAnswer: 1
    },
    {
        question: 'В алгоритме шифрования S-DES результат выполнения расширяющей перестановки в первом раунде имеет вид (10110100). Пусть первый подключ - (00011000). Тогда результат сложения по модулю 2 равен 8-битному слову',
        options: [
            '11000111',
            '11101100',
            '10101100',
            '10110011',
            '01000101',
        ],
        rightAnswer: 2
    },
    {
        question: 'В алгоритме шифрования S-DES результатом выполнения расширяющей перестановки во втором раунде стал 8-битный вектор (00110000). Пусть второй подключ имеет вид - (10001000). Тогда результат сложения по модулю 2 равен 8-битному слову',
        options: [
            '10100011',
            '10110011',
            '11101100',
            '10111000',
            '01000101',
        ],
        rightAnswer: 3
    },
    {
        question: 'В алгоритме шифрования S-DES используется 10-битное слово в качестве ключа К=(0001000001). На первом этапе построения подключей для каждого раунда требуется применить прямую перестановку Р=(3,5,2,7,4,10,1,9,8,6). Результатом этой операции будет слово',
        options: [
            '0001010001',
            '0010110011',
            '1110110000',
            '0000100010',
            '0000110000',
        ],
        rightAnswer: 4
    },
    {
        question: 'В алгоритме шифрования S-DES результат первого этапа построения подключей имеет вид (0001111000). При построении первого подключа был выполнен левый сдвиг на один бит. Тогда преобразованный ключ имеет вид',
        options: [
            '0011010001',
            '1110110000',
            '0011100010',
            '0010110011',
            '0011110000',
        ],
        rightAnswer: 0
    },
    {
        question: 'В алгоритме шифрования S-DES результат сдвига на один бит при построении подключей представлен преобразованным 10-битным словом вида (0000111000). При построении второго подключа был выполнен левый сдвиг на два бита. Тогда преобразованный ключ имеет вид',
        options: [
            '0010110011',
            '0011100010',
            '1110110000',
            '0011100000',
            '0010000011',
        ],
        rightAnswer: 4
    },
    {
        question: 'В алгоритме шифрования S-DES результат сдвига на один бит при построении подключей представлен преобразованным 10-битным словом вида (0000111000). Для построения первого подключа был выполнен Р-блок сжатия (6,3,7,4,8,5,10,9). Тогда первый подключ имеет вид:',
        options: [
            '11100000',
            '10110000',
            '10100010',
            '10100100',
            '11000001',
        ],
        rightAnswer: 3
    },
    {
        question: 'В алгоритме шифрования S-DES результат сдвига на два бита имеет вид (1000000001). Для построения второго подключа был выполнен Р-блок сжатия (6,3,7,4,8,5,10,9). Тогда второй подключ имеет вид:',
        options: [
            '10100000',
            '10000000',
            '00000010',
            '00000001',
            '00100010',
        ],
        rightAnswer: 2
    },
    {
        question: 'В алгоритме шифрования S-DES результат S-преобразования на первом раунде имеет вид (0110). К этому слову был применен Р-блок перестановок (2,4,3,1). Тогда результат этой операции имеет вид',
        options: [
            '0010',
            '1010',
            '0110',
            '1001',
            '1000',
        ],
        rightAnswer: 1
    },
    {
        question: 'В алгоритме шифрования S-DES результат S-преобразования на втором раунде имеет вид (1001). Тогда результатом операции прямой перестановки Р=(2,4,3,1) будет 4-битное слово',
        options: [
            '0101',
            '1010',
            '0110',
            '0011',
            '1001',
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
        msgofScore();
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

function msgofScore() {
    if(score == 0 || score == 1)  {
        msgOfResult.innerHTML = 'Cъебись с универа.';
    } 
     else if(score == 2 || score == 3) {
        msgOfResult.innerHTML = 'Паскальщик';
     }
     else if(score == 4 || score == 5) {
        msgOfResult.innerHTML = 'Дэлфин';
     }
     else if(score == 6 || score == 7) {
        msgOfResult.innerHTML = 'Крестовик';
     }
     else if(score == 8 || score == 9) {
        msgOfResult.innerHTML = 'Душитель питона';
     } else {
        msgOfResult.innerHTML = 'Хрестианин';
     }
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
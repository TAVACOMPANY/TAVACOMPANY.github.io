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
      br = '</br>';

const questions = [
    {
        question: 'В С# Преобразования в строковый тип выполняются с помощью ',
        options: [
            'метода ToString().',
            'метода String().',
            'метода ToString().',
            'метода FloatToString().',
            'метода IntToString().',
        ],
        rightAnswer: 2
    },
    {
        question: 'В результате выполнения кода' + br + 'int i=2;      switch (i)      { case 1: i += 2;case 2: i *= 3; case 6: i /= 2;' + br + '         default:;}',
        options: [
            'тело оператора switch не поменяет значение переменной i',
            'переменная i примет значение 2',
            'переменная i примет значение 5',
            'переменная i примет значение 3',
            'переменная i примет значение 6',
        ],
        rightAnswer: 3
    },
    {
        question: 'Выберите правильный вариант записи на языке C следующего условия: « x принадлежит диапазону [0;10)»',
        options: [
            '(x>=0) && (x<=10)',
            'x>=0; x<10',
            '0<=x<10',
            '(x>0) || (x<=10)',
            '(x>0) != (x<10)',
        ],
        rightAnswer: 0
    },
    {
        question: 'Укажите правильный вариант записи условного оператора в C#',
        options: [
            'IF x>0 Do y=sqrt (x)',
            'IF (x>0) { y=Math.sqrt (x)}',
            'IF y==sqrt (x) then x>0',
            'IF x>0 then y=Math.sqrt (x)',
            'IF (x>0) { y=sqrt (x)}',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какая из приведенных ниже конструкций будет верной, при нахождении суммы элементов массива а[5] ,расположенных до максимального элемента?',
        options: [
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br + ' max= a[0];' + br + ' for(i=0; i<5; i++)' + br + ' if (max > a[i] ) {max=a[i]; k=i;}' + br + ' for(i=0; i<= 5-k; i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s;' + br + ' for(i=0; i<5; i++)' + br + ' if (max < a[i] ) {max= a[i]; k=i;}' + br + ' for(i=0; i<k+1; i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br + ' for(i=0; i<5; i++)' + br + ' if (max < a[i] ) {max= a[i]; k=i;}' + br + ' for(i=0; i<k; i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s;' + br + ' max= a[0]; k=0;' + br + ' for(i=0; i<5; i++)' + br + ' if (max < a[i] ) {max=a[i]; k=i;}' + br + ' for(i=0; i<=k; i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, max, s=0;' + br + ' max= a[0]; k=0;' + br + ' for(i=0; i<5; i++)' + br + ' if (max < a[i] ) {max= a[i]; k=i;}' + br + ' for(i=0; i < k; i++)' + br + ' s+=a[i];',
        ],
        rightAnswer: 4
    },
    {
        question: 'Какая из приведенных ниже конструкций будет верной, при нахождении суммы элементов массива а[5] ,расположенных после минимального элемента?',
        options: [
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, min, s=0;' + br + ' min= a[0];' + br + ' for(i=0; i<5; i++)' + br + ' if (min > a[i] ) {min= a[i]; k=i;}' + br + ' for(i=k+1; i<=5; i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, min, s;' + br + ' for(i=0; i<5; i++)' + br + ' if (min < a[i] ) {min= a[i]; k=i;}' + br + ' for(i=0; i<k+1; i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, min, s=0;' + br + ' for(i=0; i<5; i++)' + br + ' if (min > a[i] ) {min= a[i]; k=i;}' + br + ' for(i=k; i<5; i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, min, s=0;' + br + ' min= a[0]; k=0;' + br + ' for(i=0; i<5; i++)' + br + ' if (min > a[i] ) {min= a[i]; k=i;}' + br + ' for(i=k+1; i<5; i++)' + br + ' s+=a[i];',
            'main()' + br + '{int a[5]={10,3,5,16,2,4}, i, k, min, s;' + br + ' min= a[0]; k=0;' + br + ' for(i=0; i<5; i++)' + br + ' if (min < a[i] ) {min= a[i]; k=i;}' + br + '  for(i=0; i<=k; i++)' + br + ' s+=a[i];',
        ],
        rightAnswer: 3
    },
    {
        question: 'Чему равна сумма элементов массива после выполнения следующей программы:' + br + 'using System;' + br + 'class ForeachDemo {' + br + 'public static void Main() {' + br + 'int sum = 0;' + br + 'int[] nums = new int[10];' + br + 'for(int i = 0; i < 10; i++)' + br + 'nums[i] - i;' + br + 'foreach(int x in nums) {' + br + 'Console.WriteLine("Значение элемента равно: " + х);' + br + 'sum += х;' + br + '}' + br + 'Console.WriteLine("Сумма равна: " + sum);' + br + '    }' + br + '}',
        options: [
            '75',
            '100',
            '45',
            '55',
            '56',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какой символ будет выведен на экран после выполнения фрагмента программы: string str = "test";' + br + 'Console.WriteLine(string[0]);',
        options: [
            't',
            's',
            'e',
            '0',
            '1',
        ],
        rightAnswer: 0
    },
    {
        question: 'В языке C#  объявление трех массивов с отложенной инициализацией выполняется с помощью:',
        options: [
            'int[10] a, b, c=0;',
            'int[] a, b, c=0;',
            'int[] a=0, b, c;',
            'int[] a= b= c;',
            'int[] a, b, c;',
        ],
        rightAnswer: 4
    },
    {
        question: 'Как правильно объявить двумерный массив целочисленных значений размером 10x20 с именем table?',
        options: [
            'table = new int[10, 20];',
            'int[,] table = new int[10, 20];',
            'int[ ] = new int[10, 20];',
            'int[,] table = int[10, 20];',
            'int[ ] table [10, 20];',
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

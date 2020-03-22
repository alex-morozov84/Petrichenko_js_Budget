let btnOpen = document.getElementById('start'),
    budget = document.getElementsByClassName('budget-value')[0],
    daybudget = document.getElementsByClassName('daybudget-value')[0],
    level = document.getElementsByClassName('level-value')[0],
    expenses = document.getElementsByClassName('expenses-value')[0],
    optionalexpenses = document.getElementsByClassName('optionalexpenses-value')[0],
    income = document.getElementsByClassName('income-value')[0],
    monthsavings = document.getElementsByClassName('monthsavings-value')[0],
    yearsavings = document.getElementsByClassName('yearsavings')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    btnExpenses = document.getElementsByTagName('button')[0],
    btnOptionalExpenses = document.getElementsByTagName('button')[1],
    btnCountBudget = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    savingsCheckbox = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

btnOpen.addEventListener('click', function() {
    time = prompt('Введите дату в формате YYYY-MM-DD');
    money = +prompt('Ваш бюджет на месяц?');

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?');
    }
    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

btnExpenses.addEventListener('click', function() {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
    
        if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
        && a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expences[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }
    expenses.textContent = sum;
});


btnOptionalExpenses.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpences[i] = opt;
        optionalexpenses.textContent += appData.optionalExpences[i] + ' '; 
    }
});

let appData = {
    budget: money,
    timeData: time,
    expences: {},
    optionalExpences: {},
    income: [],
    savings: true,
    chooseExpences: function() {
        
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Ежедневный бюджет" + appData.moneyPerDay);
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 1000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log('Произошла ошибка');
        }
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt('Какова сумма накоплений?'),
                percent = +prompt('Под какой процент?');
                
            appData.monthIncome = (save / 100 / 12 * percent).toFixed();
    
            alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
        }
    },
    chooseOptExpences: function() {
        for (let i = 0; i < 3; i++) {
            let expence = prompt("Статья необязательных расходов?");
            while (expence == '' || expence == null) {
                expence = prompt("Статья необязательных расходов?");
            }
        appData.optionalExpences[i + 1] = expence;
        }
    },
    chooseIncome: function() {
        let items = prompt("Что принесет дополнительный доход? Перечислите через запятую", '');
        while (items == '' || typeof(items) == null || typeof(items) !== 'string') {
            items = prompt("Что принесет дополнительный доход? Перечислите через запятую", '');
        }
        appData.income = items.split(', ');
        appData.income.push(prompt("Может что-то еще?", ''));
        appData.income.sort();
        appData.income.forEach(function(item, i) {
            document.write("Способы доп. заработка: " + (i+1) + ': ' + item);
        });
    }
};
document.addEventListener('DOMContentLoaded', () => {
    loadExpensesFromLocalStorage();
});

const messages = {
    emptyFields: "Please fill in all fields with valid values",
    titleValidationFailed: "Title should be between 1 and 20 characters.",
    amountValidationFailed: "Amount should be between 1 and 100000 USD",
    expenseAddedSuccess: "Expense added successfully!",
    expenseUpdatedSuccess: "Expense updated successfully!",
    deleteSuccess: "Expense deleted successfully!",
};

let editIndex = -1;

function loadExpensesFromLocalStorage() {
    const expenses = localStorage.getItem('expenses');
    if (expenses) {
        renderExpenses(JSON.parse(expenses));
    } else {
        document.getElementById('noExpenseMessage').textContent = 'No Expenses Found';
    }
}

function handleExpense() {
    const title = document.getElementById('title').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    if (!title || !amount || !date) {
        showMessage(messages.emptyFields, 'error');
        return;
    }

    if (title.length < 1 || title.length > 20) {
        showMessage(messages.titleValidationFailed, 'error');
        return;
    }

    if (amount < 1 || amount > 100000) {
        showMessage(messages.amountValidationFailed, 'error');
        return;
    }

    const expense = { title, amount, date };
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    if (editIndex === -1) {
        expenses.push(expense);
        showMessage(messages.expenseAddedSuccess, 'success');
    } else {
        expenses[editIndex] = expense;
        showMessage(messages.expenseUpdatedSuccess, 'success');
        editIndex = -1;
        document.getElementById('add-update-button').textContent = 'Add';
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses(expenses);
    clearForm();
}

function handleSort(columnIndex) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (columnIndex === 1) {
        expenses.sort((a, b) => a.amount - b.amount);
    } else if (columnIndex === 2) {
        expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    renderExpenses(expenses);
}

function renderExpenses(expenses) {
    const expenseList = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    const totalExpenseDiv = document.getElementById('totalExpenseValue');
    const noExpenseMessage = document.getElementById('noExpenseMessage');

    expenseList.innerHTML = '';
    let totalExpense = 0;
    expenses.forEach((expense, index) => {
        totalExpense += parseFloat(expense.amount);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.title}</td>
            <td>$${parseFloat(expense.amount).toFixed(2)}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit" onclick="editExpense(${index})">Edit</button>
                <button class="delete" onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    });
    totalExpenseDiv.textContent = `$${totalExpense.toFixed(2)}`;
    if (expenses.length === 0) {
        noExpenseMessage.textContent = 'No Expenses Found';
    } else {
        noExpenseMessage.textContent = '';
    }
}

function showMessage(msg, type) {
    const messageWrapper = document.getElementById('message-wrapper');
    messageWrapper.textContent = msg;
    messageWrapper.className = type;
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
    document.getElementById('add-update-button').textContent = 'Add';
    editIndex = -1;
    document.querySelector('h3').innerHTML = 'Add Expense';
}

function editExpense(index) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expense = expenses[index];
    document.getElementById('title').value = expense.title;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('date').value = expense.date;
    document.getElementById('add-update-button').textContent = 'Update';
    editIndex = index;
    document.querySelector('h3').innerHTML = 'Update Expense';
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses(expenses);
    showMessage(messages.deleteSuccess, 'success');
}

// Attach functions to window object for global access
window.loadExpensesFromLocalStorage = loadExpensesFromLocalStorage;
window.handleExpense = handleExpense;
window.handleSort = handleSort;
window.editExpense = editExpense;
window.deleteExpense = deleteExpense;

// Export functions for testing purposes.
// DO NOT EDIT THIS BLOCK
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        loadExpensesFromLocalStorage,
        handleExpense,
        handleSort,
        editExpense,
        deleteExpense
    };
}

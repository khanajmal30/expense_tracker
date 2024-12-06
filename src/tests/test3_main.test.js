require('@testing-library/jest-dom');
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
const { loadExpensesFromLocalStorage, editExpense } = require("../index.js");

jest.dontMock("fs");

describe("Task3_Main", () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(
                    () => '[{"title": "pizza", "amount": 60, "date": "2024-01-13"}]'
                ),
                setItem: jest.fn(),
            },
            writable: true,
        });
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        jest.resetModules();
    });

    it("should update form header when edit button is clicked", () => {
        loadExpensesFromLocalStorage();

        // Get the first row of the table
        const firstRow = document.querySelector("#expenseTable tbody tr");

        // Check if Edit and Delete buttons exist in the first row based on text content
        const editButton = [...firstRow.querySelectorAll("button")].find(
            (button) => button.textContent === "Edit"
        );

        expect(editButton).toBeTruthy();

        editButton.click();

        expect(document.getElementsByTagName("h3")[0].innerHTML).toBe(
            "Update Expense"
        );
    });
});

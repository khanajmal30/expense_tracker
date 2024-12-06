require('@testing-library/jest-dom');
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
const { handleExpense } = require("../index.js");

jest.dontMock("fs");

describe("Task2_Main", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        jest.resetModules();
    });

    it("should handle adding an expense", () => {
        document.getElementById('title').value = "Lunch";
        document.getElementById('amount').value = "20";
        document.getElementById('date').value = "2024-01-01";

        handleExpense();

        const expenseRows = document.querySelectorAll("#expenseTable tbody tr");
        expect(expenseRows.length).toBe(1);

        const row = expenseRows[0];
        const cells = row.querySelectorAll("td");

        expect(cells[0].textContent).toBe("Lunch");
        expect(cells[1].textContent).toBe("$20.00");
        expect(cells[2].textContent).toBe("2024-01-01");
        expect(cells[3].querySelector(".edit")).toBeTruthy();
        expect(cells[3].querySelector(".delete")).toBeTruthy();
    });
});

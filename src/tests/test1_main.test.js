require('@testing-library/jest-dom');
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

jest.dontMock("fs");

describe("Task1_Main", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    afterEach(() => {
        jest.resetModules();
    });

    it("should show Expense Tracker heading", () => {
        expect(document.getElementsByTagName("h2")[0].innerHTML).toBe(
            "Expense Tracker"
        );
    });

    it("should have input fields for title, date and amount", () => {
        const titleWrapper = document.querySelector(
            '[data-testid="title-wrapper"]'
        );
        const inputInsideTitleWrapper = titleWrapper.querySelector("input");
        expect(inputInsideTitleWrapper).toBeTruthy();

        const amountWrapper = document.querySelector(
            '[data-testid="amount-wrapper"]'
        );
        const inputInsideAmountWrapper = amountWrapper.querySelector("input");
        expect(inputInsideAmountWrapper).toBeTruthy();

        const dateWrapper = document.querySelector('[data-testid="date-wrapper"]');
        const inputInsideDateWrapper = dateWrapper.querySelector("input");
        expect(inputInsideDateWrapper).toBeTruthy();
    });
});

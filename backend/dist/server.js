"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://127.0.0.1:5500",
}));
const employees = [
    {
        id: "1",
        firstname: "John",
        lastname: "Doe",
        age: 30,
        isMarried: true,
    },
    {
        id: "2",
        firstname: "Jane",
        lastname: "Doe",
        age: 25,
        isMarried: false,
    },
];
app.get("/employees", (req, res) => {
    res.send(employees);
});
app.get("/employees/search", (req, res) => {
    const { firstname } = req.query;
    const employee = employees.find((employee) => employee.firstname === firstname);
    if (employee) {
        res.send(employee);
    }
    else {
        res.status(404).send("Employee not found");
    }
});
app.get("/employees/:id", (req, res) => {
    const employee = employees.find((employee) => employee.id === req.params.id);
    if (employee) {
        res.send(employee);
    }
    else {
        res.status(404).send("Employee not found");
    }
});
app.post("/employees", (req, res) => {
    const employee = req.body;
    employees.push(employee);
    console.log(employees);
    res.send(employee);
});
app.put("/employees/:id", (req, res) => {
    const index = employees.findIndex((employee) => employee.id === req.params.id);
    if (index !== -1) {
        employees[index] = req.body;
        res.send(employees[index]);
    }
    else {
        // res.status(404).send("Employee not found");
    }
});
app.delete("/employees/:id", (req, res) => {
    const index = employees.findIndex((employee) => employee.id === req.params.id);
    if (index !== -1) {
        employees.splice(index, 1);
        res.send(employees);
    }
    else {
        res.status(404).send("Employee not found");
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

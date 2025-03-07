import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app: Application = express();
dotenv.config();

const port = process.env.PORT || 5000;

interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  isMarried: boolean;
}

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

const employees: Employee[] = [
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

app.get("/employees", (req: Request, res: Response) => {
  res.send(employees);
});

app.get("/employees/search", (req, res) => {
  const { firstname } = req.query;
  const employee = employees.find(
    (employee) => employee.firstname === firstname
  );
  if (employee) {
    res.send(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

app.get("/employees/:id", (req, res) => {
  const employee = employees.find((employee) => employee.id === req.params.id);
  if (employee) {
    res.send(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

app.post("/employees", (req, res) => {
  const employee: Employee = req.body;
  employees.push(employee);
  console.log(employees);
  res.send(employee);
});

app.put("/employees/:id", (req, res) => {
  const index = employees.findIndex(
    (employee) => employee.id === req.params.id
  );
  if (index !== -1) {
    employees[index] = req.body;
    res.send(employees[index]);
  } else {
    // res.status(404).send("Employee not found");
  }
});

app.delete("/employees/:id", (req, res) => {
  const index = employees.findIndex(
    (employee) => employee.id === req.params.id
  );
  if (index !== -1) {
    employees.splice(index, 1);
    res.send(employees);
  } else {
    res.status(404).send("Employee not found");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

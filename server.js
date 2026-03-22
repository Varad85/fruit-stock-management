const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

app.use(morgan("combined"));
app.use(express.json());

// Serve index.html
app.use(express.static(path.join(__dirname, "public")));

// Temporary in-memory data
let fruits = [
  { id: 1, name: "Apple", stock: 50 },
  { id: 2, name: "Mango", stock: 30 },
  { id: 3, name: "Banana", stock: 70 }
];

// GET all fruits
app.get("/api/fruits", (req, res) => {
  res.json(fruits);
});

// ADD fruit
app.post("/api/fruits", (req, res) => {
  const newFruit = {
    id: fruits.length + 1,
    name: req.body.name,
    stock: req.body.stock
  };

  fruits.push(newFruit);
  res.json(newFruit);
});

// UPDATE fruit
app.put("/api/fruits/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const fruit = fruits.find(f => f.id === id);

  if (!fruit) return res.status(404).send("Fruit not found");

  fruit.name = req.body.name;
  fruit.stock = req.body.stock;

  res.json(fruit);
});

// DELETE fruit
app.delete("/api/fruits/:id", (req, res) => {
  const id = parseInt(req.params.id);
  fruits = fruits.filter(f => f.id !== id);
  res.send("Deleted");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

let products = [
    {
        name: "Apple",
        category: "Fruit",
        price: 30,
        id: 1
    },
    {
        name: "Banana",
        category: "Fruit",
        price: 20,
        id: 2,
    },
    {
        name: "Orange",
        category: "Fruit",
        price: 26,
        id: 3,
    },
    {
        name: "Potato",
        category: "Vegetables",
        price: 12,
        id: 4,
    },
    {
        name: "Tomato",
        category: "Vegetables",
        price: 9,
        id: 5
    }
]

function fixProductIDs(products){
    products.forEach((product, index) => {
        product.id = index + 1;
    })
}

app.get("/", (req,res) => {
    res.send("Hey there")
})

app.get("/products", (req,res) => {
    res.send(products)
})

app.get("/products/:id", (req, res) => {
    const product = products.find((c) => c.id === parseInt(req.params.id))
    if(!product) res.status(404).send("product not found")
    res.send(product)
})

app.post("/products", (req, res) => {
    const product = {
        id: products.length + 1, 
        name: req.body.name,
        category: req.body.price,
        price: req.body.price
    };
    products.push(product);
    res.send(product);
});

app.delete("/products/:id", (req, res) => {
    products = products.filter((product) => product.id != req.params.id);
    fixProductIDs(products);
    res.send("Item deleted");
})

app.patch("/products/:id", (req, res) => {
    products.forEach((product) => {
        if(product.id == req.params.id){
            (product.name = req.params.name),
            (product.category = req.params.category),
            (product.price = req.params.price);
        }
    });
    res.send("product updated")
})

app.listen(5000)
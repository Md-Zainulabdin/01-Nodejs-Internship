import express from "express"
import { nanoid } from "nanoid";
const router = express.Router();

const products = [
    {
        id: nanoid(),
        title: "Mobile",
        desc: "something about mobile",
        price: "500$"
    }
]

// API Routes

// -> GET request

router.get('/', (req, res) => {
    res.json({
        products,
    })
});

// -> POST request

router.post('/product', (req, res) => {
    const body = req.body;

    if (
        !body.title
        && !body.desc
        && !body.price) {
        return res.json({
            message: `Every feild is required: example data sample = > {
                title: "your product name",
                desc: "your product description",
                price: "your product price"
            }`
        })
    }

    // add product to variable..

    products.push({
        id: nanoid(),
        title: body.title,
        desc: body.desc,
        price: body.price,
    })
    return res.status(201).send({
        message: `product added sucessfully`
    })
});

// -> PUT request 

router.put('/product/:id', (req, res) => {
    const productId = req.params.id;
    if (
        !req.body.title
        && !req.body.desc
        && !req.body.price
    ) {
        return res.status(403).send({
            message: "required parameter is missing!"
        })
    }

    let isFound = false;

    for (let i = 0; i <= products.length; i++) {
        if (products[i].id == productId) {
            isFound = i;
            break;
        }
    }

    if (isFound) {
        return res.status(404).send({
            message: "product not found!"
        })
    }

    if (req.body.title) products[isFound].title = req?.body.title;
    if (req.body.desc) products[isFound].desc = req?.body.desc;
    if (req.body.price) products[isFound].price = req?.body.price;

    return res.json({
        message: "product updated",
        status: 201,
    })

})

// -> DELETE Request

router.delete('/product/:id', (req, res) => {
    const productId = req.params.id;

    const index = products.findIndex((item) => item.id == productId);

    if (index > -1) {
        products.splice(index, 1)
    } else {
        return res.status(404).send({
            message: `product not found!`,
        })
    }

    return res.status(202).send({
        message: `product deleted successfully`,
    })
})

export default router;

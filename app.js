const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());

const sequelize = require('./util/database');
const Review = require('./models/Review');


app.use(bodyParser.json({ extended: false}));

app.post('/addReview', async (req, res, next) => {
    try{
        const companyName = req.body.companyName;
        const pros = req.body.pros;
        const cons = req.body.cons;
        const rating = req.body.rating;
        const data = await Review.create( { companyName: companyName, pros: pros, cons: cons, rating: rating });
        res.status(201).json({reviewDetail: data});
        
    } catch(err) {
        res.status(500).json({ err: err});
    }
});

app.get('/getReview/:companyName', async (req, res, next) => {
    try {
        const companyName = req.params.companyName;
        const companyData = await Review.findAll({ where: { companyName: companyName}});
        res.json({companyData: companyData});
        
    } catch(err) {
        console.log(err);
    }
})


sequelize
.sync()
.then(result => {
    app.listen(3000);
}).catch(err => console.log(err));

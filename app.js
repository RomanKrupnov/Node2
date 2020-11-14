const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const myNews = require('./getNews');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'twig')
app.set('views', path.join(__dirname +'/views'));
app.use(cookieParser());

app.get('/', (req, res)=>{
    const member = req.cookies['member'] || 3;
    res.render('index', {title: "NEWS", message: 'Новости от RBK', member})
});
app.post('/news', (req, res) =>{
    const request = req.body;
    res.cookie('member',request.qty);
    myNews(request).then((nres)=>{
        res.render('index',{news: nres, message: "Вот ваши новости", title: "Последние новости", })
    }).catch((err)=>{
        console.log(err);
        res.status('500').render('index', { message: err.message });
        res.end();
    })
});
app.listen(3000, ()=>{
    console.log("Listen port 3000")
});
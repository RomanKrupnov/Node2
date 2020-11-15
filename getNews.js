const cheerio = require('cheerio');
const axios = require('axios');
module.exports = function myNews(request) {
    let qty = request.qty;
    return axios.get('https://rbc.ru/').then((res) => {
        let $ = cheerio.load(res.data);
        const result=[];
        $('.main__feed__title').each(function(i, element){
            if (result.length < qty) {
                result.push($(this).text());
            }
        });
        return result;
    }).catch((err) => {
        console.log(err);
    })
}


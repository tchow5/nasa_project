var express = require('express');
var router = express.Router();

const request = require('request');
var nasaKey = 'RqKH1d6LQYKMH2YxL5968aG7TfsQBXBdl2m6eOdC';
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  

    console.log(req.query.date);
    console.log(res.date);

    var date = req.query.date;
    var info = date.split(' ');

    console.log(info);
    console.log(getMonthFromString(info[1]))

    var month = getMonthFromString(info[1])
    var stringMonth = pad(month, 2);
    var stringDate = info[2];
    var stringYear = info[3];

    var apiDate = stringYear + '-' + stringMonth + '-' + stringDate

    console.log(apiDate);
    
    getNasa();
    //var q = url.parse(req)

    function getNasa(){

        const options ={

            url: 'https://api.nasa.gov/planetary/apod?api_key=' + nasaKey + '&date=' + apiDate,
            method: 'get',
        };

        request(options, function (err, result, body) {
            console.log(body)
            var resp = JSON.parse(body);

            console.log(resp);
            

            if (resp.media_type === 'image'){
                res.send(resp.url);
            } else {
                res.send('https://apod.nasa.gov/apod/image/1904/M81salvatore1024.jpg');
            }


        })




    }


    function getMonthFromString(mon){
        return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
     }

     function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

});

module.exports = router;
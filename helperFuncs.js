const parse = require('node-html-parser').parse;
var nodemailer = require('nodemailer');
var https = require('https');

module.exports.classArr = [
    {
        name:"Ethan",
        class:"CSCI0220",
        phoneNumEmail:"3479311383@vtext.com",
        postBody:"%7B%22group%22%3A%22code%3ACSCI%200220%22%2C%22key%22%3A%22crn%3A24988%22%2C%22srcdb%22%3A%22201920%22%2C%22matched%22%3A%22crn%3A24988%22%7D"

     },{
        name:"Ethan",
        class:"MATH 0180 C01",
        phoneNumEmail:"3479311383@vtext.com",
        postBody:"%7B%22group%22%3A%22code%3AMATH%200180%22%2C%22key%22%3A%22crn%3A25300%22%2C%22srcdb%22%3A%22201920%22%2C%22matched%22%3A%22crn%3A25298%2C25300%22%7D"

     },{
        name:"Ethan",
        class:"MATH 0180 C02",
        phoneNumEmail:"3479311383@vtext.com",
        postBody:"%7B%22group%22%3A%22code%3AMATH%200180%22%2C%22key%22%3A%22crn%3A25301%22%2C%22srcdb%22%3A%22201920%22%2C%22matched%22%3A%22crn%3A25298%2C25300%22%7D"
     },{
        name:"Ethan",
        class:"MATH0180 C03",
        phoneNumEmail:"3479311383@vtext.com",
        postBody:"%7B%22group%22%3A%22code%3AMATH%200180%22%2C%22key%22%3A%22crn%3A25302%22%2C%22srcdb%22%3A%22201920%22%2C%22matched%22%3A%22crn%3A25296%2C25298%2C25299%2C25300%2C25301%2C25302%2C25303%22%7D"
     },{
        name:"Ethan",
        class:"MATH0180 C04",
        phoneNumEmail:"3479311383@vtext.com",
        postBody:"%7B%22group%22%3A%22code%3AMATH%200180%22%2C%22key%22%3A%22crn%3A25303%22%2C%22srcdb%22%3A%22201920%22%2C%22matched%22%3A%22crn%3A25296%2C25298%2C25299%2C25300%2C25301%2C25302%2C25303%22%7D"
        }
    ];


module.exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'polleyethan@gmail.com',
      pass: '4582Polley'
    }
  });


module.exports.getSeatsData = function(d){
    var data = JSON.parse(d.toString());
    var maxSeats = parseInt(parse(data.seats).querySelector('.seats_max').text);
    var seatsAvail = parseInt(parse(data.seats).querySelector('.seats_avail').text);

    return{ maxSeats: maxSeats, 
            seatsAvail: seatsAvail};
}

module.exports.dataRetrieved = function(d){
    var seatData = exports.getSeatsData(d);

    if(seatData.seatsAvail>0){
        exports.sendText(seatData.maxSeats,seatData.seatsAvail,this.classData);
    }
    else if(this.classData.alertOnNone){
        exports.sendNoneText(seatData.maxSeats,seatData.seatsAvail, this.classData);
    }
}

module.exports.sendText = function(seatstot, seatsremaining, reqdata){
    var msgText = "Seats Remaining in "+ reqdata.class +": "+seatsremaining;
    var mailOptions = {
        from: 'polleyethan@gmail.com',
        to: reqdata.phoneNumEmail,
        text: msgText
    };


    exports.transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}


module.exports.iterateThrough = function(err, array){
    if(err){
        console.log(err);
    }else{
        for(var i=0; i<array.length; i++){
            console.log(array[i].toString());
            var options = {
            hostname: 'cab.brown.edu',
            path: '/api/?page=fose&route=details',
            method: 'POST',
            headers: {
                'Content-Type': 'raw',
                'Content-Length': array[i].codeBody.length
                }
            };
            
            var req = https.request(options, function(res){
                res.on('data', exports.dataRetrieved.bind({classData:this.classData}));
            }.bind( { classData: array[i] } ));
            
            req.on('error', (e) => {
            console.error(e);
            });
            
            req.write(array[i].codeBody);
            req.end();

        }
    }
}


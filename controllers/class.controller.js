const Class = require('../models/Class.model');



module.exports.getClassReqById =  (req, res, next) => {
    try{
    Class.findById(req.params.reqid, function (err, classreq) {
        if(err) {
            return res.status(404).send({"error":err});
        }else{
            return res.status(200).send({"class":classreq});
        }
    });
    }catch(error){
        return res.status(500).send({"error":error});
    }
}

module.exports.getAllClassReqs = (req, res, next) => {
    try{
    Class.find({}, function (err, classreqs) {
        if(err) {
            return res.status(404).send({"error":err});
        }else{
            return res.status(200).send({"classreqs":classreqs});
        }
    });
    }catch(error){
        return res.status(500).send({"error":error});
    }
}




module.exports.createReq = async (req,res,next)  => {
    try{
            //Create New User
            var emailToSend = "f";
            const classreq = new Class({
                codeBody: "test",
                classCode: req.body.classCode,
                sectionCode: req.body.sectionCode,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                phoneCarrier: req.body.phoneCarrier,
                phoneNumEmail: emailToSend
            });

            await classreq.save();

            return res.status(200).json({"success":true});

    } catch(error){
        return res.status(500).send({"error":error});
    }

}


module.exports.confirmReq = (req, res) => {
    try{
        Class.findOneAndUpdate({_id: req.params.reqid}, {hasBeenConfirmed:true}, {upsert:false}, function(err, classreq){
            if (err){
                return res.send(500, { error: err });
            }else{
                return res.send("succesfully confirmed");
            }
        });
    }catch(error){
        return res.status(500).send({"error":error});
    }
}

module.exports.turnoff = (req, res) => {
    try{
        Class.findOneAndUpdate({_id: req.body.reqid}, {isOn:false}, {upsert:false}, function(err, classreq){
            if (err){
                return res.send(500, { error: err });
            }else{
                return res.send("succesfully turned off");
            }
        });
    }catch(error){
        return res.status(500).send({"error":error});
    }
}


module.exports.editreq = async (req, res, next) => {

}

module.exports.deletereq = async (req, res, next) => {

}
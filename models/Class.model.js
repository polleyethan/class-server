var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassReqSchema = new Schema({
  codeBody:{
    type: String,
    required: true
  },
  classCode:  {
    type: String,
    required: true
  },
  sectionCode:   {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  isOn: {
    type: Boolean,
    default: true
  },
  phone:{
    type:String,
    required: true
  },
  phoneCarrier:{
    type:String,
    required:true
  },
  phoneNumEmail:{
    type:String,
    required:true
  },
  hasBeenConfirmed: {
    type:Boolean,
    default: false
  },
  alertOnNone:{
    type:Boolean,
    default:false
  },
  createdDate:{
    type: Date,
    default: new Date()
  }

});
const ClassReq = mongoose.model('ClassReq', ClassReqSchema);
 
module.exports = ClassReq;
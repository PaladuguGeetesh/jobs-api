const mongoose=require('mongoose');
const User = require('./User');


const Jobschema=mongoose.Schema({

    company:{
        type:String,
        required:[true,'please provide the company name'],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,'please provide company name'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview','pending','declined'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide the user who created the job']

    }
},
    {timestamps:true}
);

module.exports=mongoose.model('Job',Jobschema);
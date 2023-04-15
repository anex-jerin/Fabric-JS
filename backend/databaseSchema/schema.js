const mongoose = require('mongoose')
const schema = mongoose.Schema

const Fabric = new schema({
    date:{
        type:String,
        default:Date,
        require:true
    },
    data:{
        type:Object
    }
})

module.exports = mongoose.model('Fabric',Fabric)
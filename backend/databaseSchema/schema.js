const mongoose = require('mongoose')
const schema = mongoose.Schema

const Fabric = new schema({
    date:{
        default:Date
    },
    data:{
        type:String
    }
})

module.exports = mongoose.model('Fabric',Fabric)
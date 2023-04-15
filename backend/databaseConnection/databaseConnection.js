const mongoose = require('mongoose')

const databaseConnection = (link)=>{
    mongoose.connect(link);
    console.log('Database is connected')
}

module.exports = databaseConnection
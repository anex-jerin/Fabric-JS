const fabricSchema = require('../databaseSchema/schema.js');




const addFabric = async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    const fabric = await fabricSchema.create({data});
    res.json(fabric);
  } catch (error) {
    res.json(error); 
  } 
};  
const getFabric = async (req, res) => {
  try {
    console.log(req.body)
    const fabric = await fabricSchema.find({});
    res.json(fabric);
  } catch (error) {
    res.json(error);
  }
};




module.exports = {  addFabric ,getFabric};

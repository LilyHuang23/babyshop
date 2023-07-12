const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    
    const result = await mongodb.getDb().db('babyshop').collection('product').find();

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
     catch (err) {
      res.status(500).json("Can't find the data");
    }
};

const getSingle = async (req, res) => {
 
  const infoId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('babyshop').collection('product').find({ _id: infoId });
   try {
    if (!infoId || !result) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
 
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
} catch (err) {
  res.status(500).json(err);
}
};

const createInfo = async (req, res) => {
  try {
    if (
      !req.body.name || !req.body.description || !req.body.gender||
      !req.body.price || !req.body.size || !req.body.season ||
      !req.body.images) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return
    }
  const info = {
    name:req.body.name,
    description: req.body.description,
    gender: req.body.gender,
    size: req.body.size,
    price: req.body.price,
    season: req.body.season,
    images: req.body.images
  };
  const response = await mongodb.getDb().db('babyshop').collection('product').insertOne(info);
 
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the Info.');
    }
    
  }
  catch (err) {
    res.status(500).json(err);
  }
};

const updateInfo = async (req, res) => {
  const infoId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  try {
    if (
      !req.body.name || !req.body.description || !req.body.gender ||
      !req.body.price || !req.body.size || !req.body.season ||
      !req.body.images) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return
    }
  const info = {
    name:req.body.name,
    description: req.body.description,
    gender:req.body.gender,
    price: req.body.price,
    size: req.body.size,
    season: req.body.season,
    images:req.body.images
  };
  const response = await mongodb
    .getDb()
    .db('babyshop')
    .collection('product')
    .replaceOne({ _id: infoId }, info);
  // console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } 
  }
  catch (err) {
    res.status(500).json(err);
  }
};

const deleteInfo = async (req, res) => {
  try {
  const infoId = new ObjectId(req.params.id);
  let response = await mongodb.getDb().db('babyshop').collection('product').deleteOne({_id: infoId });
  console.log(response);
    if (response.acknowledged = true) {
      res.status(200).send();
    } 
    else {
      res.status(400).send({message: "Nothing can be delete."});
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createInfo,
  updateInfo,
  deleteInfo
};

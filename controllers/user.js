const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  try {
    
    const result = await mongodb.getDb().db('babyshop').collection('user').find();

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  }
     catch (err) {
      res.status(500).json("Can't find the data");
    }
};

const getSingleUser = async (req, res) => {
 
  const infoId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('babyshop').collection('user').find({ _id: infoId });
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

const createUserInfo = async (req, res) => {
  try {
    if (
      !req.body.userName || !req.body.displayName || 
      !req.body.favoriteColor ||
      !req.body.birthday ||
      !req.body.password ||
      !req.body.email ) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return
    }
  const info = {
    userName:req.body.userName,
    displayName:req.body.displayName,
    favoriteColor:req.body.favoriteColor || null,
    birthday:req.body.birthday,
    password:req.body.password,
    email:req.body.email,

  };
  const response = await mongodb.getDb().db('babyshop').collection('user').insertOne(info);
 
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

const updateUserInfo = async (req, res) => {
  const infoId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  try {
    if (
      !req.body.userName || !req.body.displayName || 
      !req.body.favoriteColor ||
      !req.body.birthday ||
      !req.body.password ||
      !req.body.email ) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return
    }
  const info = {
    userName:req.body.userName,
    displayName:req.body.displayName,
    favoriteColor:req.body.favoriteColor || null,
    birthday:req.body.birthday,
    password:req.body.password,
    email:req.body.email,
  };
  const response = await mongodb
    .getDb()
    .db('babyshop')
    .collection('user')
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

const deleteUserInfo = async (req, res) => {
  try {
  const infoId = new ObjectId(req.params.id);
  let response = await mongodb.getDb().db('babyshop').collection('user').deleteOne({_id: infoId });
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
  getAllUsers,
  getSingleUser,
  createUserInfo,
  updateUserInfo,
  deleteUserInfo
};
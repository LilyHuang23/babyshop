const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    
    const result = await mongodb.getDb().db('babyshop').collection('airbnb').find();

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
  const result = await mongodb.getDb().db('babyshop').collection('airbnb').find({ _id: infoId });
   try {
    if (!infoId || !result) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
 
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
} catch (err) {
  res.status(500).json(err);
}
};

const createInfo = async (req, res) => {
  try {
    if (
      !req.body.listing_url || !req.body.name || !req.body.description || 
      !req.body.property_type ||
      !req.body.room_type ||
      !req.body.bed_type ||
      !req.body.cancellation_policy ||
      !req.body.amenities ||
      !req.body.price ||
      !req.body.weekly_price ||
      !req.body.monthly_price ||
      !req.body.guests_included || !req.body.images) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return
    }
  const info = {
    listing_url:req.body.listing_url,
    name:req.body.name,
    description:req.body.description,
    transit:req.body.transit || null,
    interaction:req.body.interaction || null,
    house_rules:req.body.house_rules || null,
    property_type:req.body.property_type,
    room_type:req.body.room_type,
    bed_type:req.body.bed_type,
    minimum_nights:req.body.minimum_nights || null,
    maximum_nights:req.body.maximum_nights || null,
    cancellation_policy:req.body.cancellation_policy,
    price:req.body.price,
    weekly_price:req.body.weekly_price,
    monthly_price:req.body.monthly_price,
    cleaning_fee:req.body.cleaning_fee || null,
    extra_people:req.body.extra_people || null,
    guests_included:req.body.guests_included,
    images:req.body.images
  };
  const response = await mongodb.getDb().db('airbnb_info').collection('airbnb').insertOne(info);
 
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
      !req.body.listing_url || !req.body.name || !req.body.description || 
      !req.body.property_type ||
      !req.body.room_type ||
      !req.body.bed_type ||
      !req.body.cancellation_policy ||
      !req.body.amenities ||
      !req.body.price ||
      !req.body.guests_included || !req.body.images) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return
    }
  const info = {
    listing_url:req.body.listing_url,
    name:req.body.name,
    description:req.body.description,
    transit:req.body.transit || null,
    interaction:req.body.interaction || null,
    house_rules:req.body.house_rules || null,
    property_type:req.body.property_type,
    room_type:req.body.room_type,
    bed_type:req.body.bed_type,
    minimum_nights:req.body.minimum_nights || null,
    maximum_nights:req.body.maximum_nights || null,
    cancellation_policy:req.body.cancellation_policy,
    price:req.body.price,
    weekly_price:req.body.weekly_price || null,
    monthly_price:req.body.monthly_price || null,
    cleaning_fee:req.body.cleaning_fee || null,
    extra_people:req.body.extra_people || null,
    guests_included:req.body.guests_included,
    images:req.body.images
  };
  const response = await mongodb
    .getDb()
    .db('airbnb_info')
    .collection('airbnb')
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
  let response = await mongodb.getDb().db('airbnb_info').collection('airbnb').deleteOne({_id: infoId });
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

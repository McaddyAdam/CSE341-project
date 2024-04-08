const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Look at all the Nike shoes listed. 👞 📋']
  const result = await mongodb.getDatabase().db().collection('nike').find();
  result.toArray().then((nikeShoes) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(nikeShoes);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Look up a pair of Nike by inventory id. 🥾 🆔']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid shoe id to find a shoe.');
  }
  const shoeId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('nike').find({ _id: shoeId});
  result.toArray().then((nikeShoes) => {
   res.setHeader('Content-Type', 'application/json');
   res.status(200).json(nikeShoes[0]);
  });
};

const createShoe = async (req, res) => {
  //#swagger.tags=['Input a pair of Nike shoes. 👟']
  const shoe = {
    brand: req.body.brand,
    line: req.body.line,
    model: req.body.model,
    height: req.body.height,
    colors: req.body.colors
  };
  const response = await mongodb.getDatabase().db().collection('nike').insertOne(shoe);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating a shoe.');
  }
}

const updateShoe = async (req, res) => {
  //#swagger.tags=['Update a pair of Nike shoes. 🥿']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid shoe id to find update shoe.');
  }
  const shoeId = new ObjectId(req.params.id);
  const shoe = {
    brand: req.body.brand,
    line: req.body.line,
    model: req.body.model,
    height: req.body.height,
    colors: req.body.colors
  };
  const response = await mongodb.getDatabase().db().collection('nike').replaceOne({ _id: shoeId}, shoe);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the shoe.');
  }
}

const deleteShoe = async (req, res) => {
  //#swagger.tags=['Delete a pair of Nike shoes. 🥺']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid shoe id to delete a shoe.');
  }
  const shoeId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('nike').deleteOne({ _id: shoeId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting a shoe.');
  }
}

module.exports = {
  getAll, getSingle, createShoe, updateShoe, deleteShoe
}
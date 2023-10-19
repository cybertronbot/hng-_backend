const Resources = require("../models/resources");
const uuid = require('uuid');
const mongoose = require("mongoose");
const multer = require('multer');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dfxu5hvrw', 
  api_key: '235297942498392', 
  api_secret: '-N970A8IobIZ-n_KrHlkOeK7mmY' 
});


const upload = multer({
  storage: multer.memoryStorage(), 
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

const getResources = async (req, res) => {
  const resources = await Resources.find({}).sort({ createdAt: -1 });

  res.status(200).json(resources);
};

const getResource = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Resources" });
  }

  const resources = await Resources.findById(id);

  if (!resources) {
    return res.status(404).json({ error: "No Resources" });
  }

  res.status(200).json(resources);
};

const createResources = async (req, res) => {
  const { title, name, role, company, ratings, reviews, currency, price, coursetype,category,description} =
    req.body;
    const contentImageBuffer = req.file.buffer;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!name) {
    emptyFields.push("name");
  }
  if (!role) {
    emptyFields.push("role");
  }
  if (!company) {
    emptyFields.push("company");
  }
  if (!ratings) {
    emptyFields.push("ratings");
  }
  if (!reviews) {
    emptyFields.push("reviews");
  }
  if (!currency) {
    emptyFields.push("currency");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!coursetype) {
    emptyFields.push("coursetype");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!description) {
    emptyFields.push("description");
  }
 
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {

    const contentImageString = contentImageBuffer.toString('base64')
    const contentImageDataUri = `data:${req.file.mimetype};base64,${contentImageBuffer.toString('base64')}`
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(contentImageDataUri, 
      {
        resource_type: 'auto',
        public_id: `picture/${uuid.v4()}`,
        file: contentImageString
      },
      (error, result) => {
        if (error) {
          console.error('Error uploading image to Cloudinary:', error);
          return res.status(500).json({ error: 'Something went wrong' });
          
        }

        console.log(result)
        return result
      });
    

  
    const resources = await Resources.create({
      title,
      name,
      role,
      company,
      ratings,
      reviews,
      currency,
      price,
      coursetype,
      category,
      description,
      imageUrl: result.secure_url,
    
    });
    res.status(200).json(resources);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error)
    console.log(contentImageBuffer)
    console.log(req.body)
  }
  }

const deleteResources = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such resources" });
  }

  const resources = await Resources.findOneAndDelete({ _id: id });

  if (!resources) {
    return res.status(400).json({ error: "No such resources" });
  }

  res.status(200).json(resources);
};

const updateResources = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such resources" });
  }

  const resources = await Resources.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!resources) {
    return res.status(400).json({ error: "No such resources" });
  }

  res.status(200).json(resources);
};

module.exports = {
  getResource,
  getResources,
  createResources,
  deleteResources,
  updateResources,
  upload,
};

const Post = require('../models/post.model')

module.exports.list = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(console.error);
};

module.exports.detail = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if(post){
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(console.error);
};

module.exports.create = (req, res) => {
  Post.create(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.update = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Devuelva el objeto nuevo
    runValidators: true, // ejecute validaciones
  })
  .then((post) => {
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

module.exports.delete = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
  .then((post) => {
    if(post){
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Post not found" });
    }
    
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};
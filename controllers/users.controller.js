const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

module.exports.list = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch(console.error);
};

module.exports.detail = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if(user){
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(console.error);
};

module.exports.create = async (req, res) => {
  const { name, email, password, bio } = req.body;

  // Verifico si el correo electrónico ya está registrado
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
  }

  User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Devuelva el objeto nuevo
    runValidators: true, // ejecute validaciones
  })
  .then((user) => {
    if(user){
      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

module.exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then((user) => {
    res.status(204).send();
  })
  .catch((err) => {
    res.status(400).json(err);
  });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Buscar el usuario por su correo electrónico
  const user = await User.findOne({ email }).catch(console.error);
  if (!user) {
    return res.status(404).json({ message: 'Usuario not fond' });
  }

  // Verificar la contraseña utilizando el método checkPassword definido en el esquema de usuario
  const passwordMatch = await user.checkPassword(password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({
      sub: user.id,
      exp: Date.now() / 1000 + 70,
    }, 
    process.env.JWT_SECRET // 'super secret'
  );

  res.json({token});  
};

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).end()
}
const bcrypt = require('bcrypt');
const User = require('../models/user.modele');
const createToken = require('../helpers/token');

const saltRounds = process.env.saltRounds ?? 10;

const registration = async (req, res) => {
  const { name, pass } = req.body;

  if (name && password) {
    try {
      const userPass = await bcrypt.hash(pass, Number(saltRounds));

      const newUser = new User({
        name,
        password: userPass,
      });

      const payload = { id: newUser._id };

      newUser.accessToken = createToken('access', payload);
      newUser.refreshToken = createToken('refresh', payload);

      await newUser.save();

      return res.json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: 'Name already exists in system' });
    }
  }
  return res.sendStatus(204);
};

module.exports = registration;

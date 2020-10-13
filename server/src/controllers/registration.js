const bcrypt = require('bcrypt');
const User = require('../models/user.modele');
const createToken = require('../helpers/token');
const roles = require('../helpers/roles');

const saltRounds = process.env.saltRounds ?? 10;

const registration = async (req, res) => {
  const { name, psw, invite } = req.body;

  if (name && psw && roles[invite]) {
    try {
      const userPass = await bcrypt.hash(psw, Number(saltRounds));

      const newUser = new User({
        name,
        password: userPass,
      });

      const payload = { id: newUser._id };

      newUser.accessToken = createToken('access', payload);
      newUser.refreshToken = createToken('refresh', payload);

      newUser.role = roles[invite];

      await newUser.save();

      return res.json({
        name: newUser.name,
        role: newUser.role,
        accesToken: newUser.accessToken,
        refreshToken: newUser.refreshToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: 'Name already exists in system' });
    }
  }
  return res.status(401).json({ message: 'bad invite' });
};

module.exports = registration;

const bcrypt = require('bcrypt');
const User = require('../models/user.modele');
const createToken = require('../helpers/token');

const login = async (req, res) => {
  const { name, psw } = req.body;

  if (name && psw) {
    try {
      const user = await User.findOne({ name }).exec();
      if (user) {
        const isValidPass = await bcrypt.compare(psw, user.password);

        if (isValidPass) {
          const payload = { id: user._id };
          user.accessToken = createToken('access', payload);
          user.refreshToken = createToken('refresh', payload);

          user.save();
          return res.json({
            name: user.name,
            role: user.role,
            accesToken: user.accessToken,
            refreshToken: user.refreshToken,
          });
        } else return res.status(401).json({ message: 'invalid password' });
      } else return res.status(401).json({ message: 'user not registred' });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(401);
};

module.exports = login;

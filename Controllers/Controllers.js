const { comparePassword } = require("../Helpers/bycripts");
const { signToken } = require("../Helpers/jwt");
const { User} = require('../models')

class Controller {
  static async register() {
    try {
      let { email, password } = req.body;
      let user = await User.create({ email, password });
      console.log(user);

      res.status(201).json({
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      next(err);
    }
  }

  static async login(req, res,next) {
    try {
      let { email, password } = req.body;
      if (!email) throw { name: "email is required" };
      if (!password) throw { name: "password is required" };
      let data = await User.findOne({ where: { email } });
      if (!data) throw { name: "invalid email/password" };
      let validate = comparePassword(password, data.password);
      if (!validate) throw { name: "invalid email/password" };
      let payload = {
        id: data.id,
        
      };
      let acces_token = signToken(payload);

      console.log(acces_token);

      res.status(200).json({ acces_token });
    } catch (error) {
      next(error)
    }
  }

  static async googleLogin(req, res, next) {
    const { googleToken } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,

        });
        const payload = ticket.getPayload();
        const [user, created] = await User.findOrCreate({
            where: { email: payload.email },
            defaults: {
                username: payload.name,
                email: payload.email,
                picture: payload.picture,
                provider: 'google',
                password: 'google_id'
            },
            hooks: false
        });

        const token = signToken({ id: user.id }, process.env.JWT_SECRET);
        res.status(created ? 201 : 200).json({ access_token: token });
    } catch (error) {
        next(error)
    }
}
}


module.exports = Controller;

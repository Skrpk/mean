import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pick from 'lodash/pick';

import User from '../models/User';
import config from '../config/config';

import ValidateSignUpInput from '../shared/validations/signUp';
import transporter from '../services/transporter';

const signUp = async (req, res, next) => {
  const credentials = req.body;
  let user;

  const { errors, isValid } = ValidateSignUpInput(credentials);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    try {
      const passwordDigest = bcrypt.hashSync(credentials.password, 10);
      credentials.password = passwordDigest;
      user = await User.create(credentials);

      jwt.sign(
        {
          user: pick(user, 'email'),
        },
        config.EMAIL_SECRET,
        {
          expiresIn: '1d',
        },
        (err, emailToken) => {
          if (err) {
            throw err;
          }

          const url = `http://localhost:${config.port}/auth/confirmation/${emailToken}`;

          transporter.sendMail({
            to: user.email,
            subject: 'Confirm Email',
            html: `Please click this link to confirm your email: <a href=${url}>${url}</a>`,
          });
        }
      );

      res.json({ success: true });
    } catch ({ message }) {
      console.log(message);
      return next({
        status: 400,
        message,
      });
    }
  }
};

const confirmEmail = async (req, res) => {
  try {
     const { user: { email } } = jwt.verify(req.params.token, config.EMAIL_SECRET);
     await User.findOneAndUpdate({ email }, { configrmed: true });
  } catch (e) {
    return res.send('ERROR');
  }
};

export default {
  signUp,
  confirmEmail,
}

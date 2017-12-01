import nodemailer from 'nodemailer';

import config from '../config';

export default nodemailer.createTransport({
  service: config.emailService,
  auth: {
    user: 'tester.testerov02@gmail.com',
    pass: 'test.test',
  }
})

import User from '../models/user';

async function checkUserExists(req, res, next) {
  console.log('!!!!!!!!!!!!!!!!!!!!');
  
  User.find({
    [req.body.field]: req.body.val,
  })
    .then((data) => {
      if (data.length) {
        console.log('EXISTS');
        res.status(409).json({ [req.body.field]: `User with current ${req.body.field} already exists` });
      } else {
        console.log('NOT EXISTS');
        res.json({ success: true });
      }
    })
    .catch((error) => {
      throw error;
    });
}

export default {
  checkUserExists,
}

const User = require('../models/User');
const bcrypt = require('bcrypt');

function add(req, res) {
  res.render('users/register', {
    title: 'Register User',
    message: '',
  });
}

function getLogin(req, res) {
  res.render('users/login', { title: 'Login', message: '' });
}

async function login(req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.render('users/login', {
        title: 'Login',
        message: 'Please enter all fields',
      });
    let re = new RegExp(`^${email}$`, 'i');
    user = await User.findOne({ email: re });
    if (!user)
      return res.render('users/login', {
        title: 'Login',
        message: 'Incorrect Email or Password',
      });
    if (!(await bcrypt.compare(password, user.hashedPassword)))
      return res.render('users/login', {
        title: 'Login',
        message: 'Incorrect Email or Password',
      });
    return res.cookie('user', user._id, { httpOnly: true }).redirect('/');
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  try {
    let { username, email, password, passwordVerify } = req.body;
    if (!username || !password || !email || !passwordVerify)
      return res.render('users/register', {
        title: 'Register User',
        message: 'Please enter all fields',
      });
    if (password !== passwordVerify)
      return res.render('users/register', {
        title: 'Register User',
        message: 'Passwords do not match',
      });
    let re = new RegExp(`^${username}$`, 'i');
    let user = await User.findOne({ username: re });
    if (user)
      return res.render('users/register', {
        title: 'Register User',
        message: 'User already Exists',
      });
    re = new RegExp(`^${email}$`, 'i');
    user = await User.findOne({ email: re });
    if (user)
      return res.render('users/register', {
        title: 'Register User',
        message: 'Email already Exists',
      });
    let hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, hashedPassword });
    await user.save();
    return res.redirect('/users/login');
  } catch (err) {
    console.log(err);
  }
}

module.exports = { add, create, getLogin, login };

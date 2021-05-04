const User = require('../models/User');
const bcrypt = require('bcrypt');

function add(req, res) {
  let { username, email, message } = req.session;
  res.render('users/register', {
    title: 'Register User',
    message,
    username,
    email,
  });
}

function getLogin(req, res) {
  let message = req.session.message;
  res.render('users/login', { title: 'Login', message });
  req.session.message = null;
}

async function login(req, res) {
  try {
    req.session.message = null;
    let { email, password } = req.body;
    if (!email || !password) return res.redirect('/users/login');
    let re = new RegExp(`^${email}$`, 'i');
    user = await User.findOne({ email: re });
    if (!user) {
      req.session.message = 'Invalid User Name or Password';
      return res.redirect('/users/login');
    }
    if (!(await bcrypt.compare(password, user.hashedPassword))) {
      req.session.message = 'Invalid User Name or Password';
      return res.redirect('/users/login');
    }
    req.session.user = user._id;
    let redirectURL = req.session.history[req.session.history.length - 2];
    return res.redirect(redirectURL);
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  try {
    req.session.message = null;
    let { username, email, password, passwordVerify } = req.body;
    req.session.username = username;
    req.session.email = email;
    if (!username || !password || !email || !passwordVerify)
      return res.redirect('/users/register');
    if (password !== passwordVerify) {
      req.session.message = 'Passwords Do Not Match';
      return res.redirect('/users/register');
    }
    let re = new RegExp(`^${username}$`, 'i');
    let user = await User.findOne({ username: re });
    if (user) {
      req.session.message = 'Username Already Exists';
      return res.redirect('/users/register');
    }
    re = new RegExp(`^${email}$`, 'i');
    user = await User.findOne({ email: re });
    if (user) {
      req.session.message = 'Email Already Exists';
      return res.redirect('/users/register');
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, hashedPassword });
    await user.save();
    req.session.username = '';
    req.session.email = '';
    return res.redirect('/users/login');
  } catch (err) {
    console.log(err);
  }
}

function logout(req, res) {
  req.session.user = '';
  res.redirect('/');
}

module.exports = { add, create, getLogin, login, logout };

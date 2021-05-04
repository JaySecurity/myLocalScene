module.exports = (req, res, next) => {
  console.log('running middleware');
  if (req.session.history) req.session.history.push(req.headers.referer);
  else req.session.history = [req.headers.referer];
  next();
};

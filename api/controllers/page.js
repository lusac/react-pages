const Page = require('../models/page');

exports.page_create = function (req, res) {
  let page = new Page({
    name: req.body.name,
  });

  page.save(function (err, next) {
    if (err) {
      return next(err);
    }
    res.send('Page Created successfully - ' + page.id);
  })
};

exports.page_update = function (req, res, next) {
  Page.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
    if (err) return next(err);
    res.send('Product udpated.');
  });
};

exports.page_details = function (req, res, next) {
  Page.findById(req.params.id, function (err, page) {
    if (err) return next(err);
    res.send(page);
  })
};

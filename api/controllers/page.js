const Page = require('../models/page');

exports.pageCreate = function (req, res) {
  let page = new Page({
    name: req.body.name,
    content: req.body.content
  });

  page
    .save()
    .then((page) => res.send('Page Created successfully - ' + page.id))
    .catch(err => err)
};

exports.pageUpdate = function (req, res) {
  Page
    .findByIdAndUpdate(req.params.id, {$set: req.body})
    .then(() => res.send('Product udpated.'))
    .catch(err => err);
};

exports.pageDetails = function (req, res) {
  Page
    .findById(req.params.id)
    .then((page) => res.send(page))
    .catch(err => err)
};

exports.pages = function (req, res) {
  Page
    .find({})
    .then(function (pages) {
      res.send(pages);
    });
};

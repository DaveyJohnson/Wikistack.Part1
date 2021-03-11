const express = require('express');
const router = express.Router();
const views = require('../views');
const { Page } = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(views.main(pages));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(views.addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    if (page) {
      res.send(views.wikiPage(page));
    } else {
      next(new Error('Page not found'));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

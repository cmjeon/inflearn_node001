const { User } = require('../../models');

const index = (req, res) => {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  User.findAll({
    limit: limit
  }).then(users => {
    res.json(users);
  });
}

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) return res.status(404).end();
    res.json(user);
  })
}

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  User.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.status(204).end();
  });
}

const create = (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }
  User.create({ name }).then((user) => {
    return res.status(201).json(user);
  }).catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).end();
    }
  });
}

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  User.findOne({
    where: { id }
  }).then((user) => {
    if (!user) return res.status(404).end();
    user.name = name;
    user.save().then(() => {
      res.json(user);
    }).catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).end();
      }
    });
  });
}

module.exports = {
  index: index,
  show: show,
  destroy: destroy,
  create: create,
  update: update,
};
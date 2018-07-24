import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'

import Account from '../models/Account'

export const accountLogin = (req, res) => {
  const { username, password } = req.body

  Account.findOne({ username }, (err, user) => {
    if (err || !user) return res.status(401).send();

    bcrypt.compare(password, user.password, (err, valid) => {
      if (err || !valid) return res.status(401).send();

      const token = jwt.sign({ _id: user._id }, config.get('secret'), { expiresIn: '1h'})

      res.json({ account: { username: user.username }, token })
    })
  })
}

export const accountCreate = (req, res) => {
  const { username, password } = req.body;

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    Account.create({
      username,
      password: hash
    }, (err, account) => {
      if (err) return res.status(500).send();
      res.status(200).send()
    })
  })
}

export const accountCheck = (req, res) => {
  jwt.verify(req.headers['x-authorization'], config.get('secret'), (err, decoded) => {
    if (err) return res.status(401).send();
    res.status(200).send()
  })
}

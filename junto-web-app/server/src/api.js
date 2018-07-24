import express, { Router } from 'express'

import {
  accountLogin,
  accountCreate,
  accountCheck
} from './routes/authentication'

const router = Router()

router.get('/account/check', accountCheck)
router.post('/account/login', accountLogin)
router.post('/account/create', accountCreate)


module.exports = router;

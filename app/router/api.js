/**
 * api router list
 */
import express from 'express'
import wordController from '../controller/wordController'

const router = express()

//set api word router
router.get('/word', wordController.Get)
router.post('/word', wordController.Post)

export default router
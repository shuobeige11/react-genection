import express from 'express'
import routers from './serverRender'
const router = express.Router() 
var SREVER_RENDER = true

router.get('/', (req, res) => {
    routers(req, res, SREVER_RENDER)
})

router.get('/test', (req, res) => {
    routers(req, res, SREVER_RENDER)
})

router.get('/test1', (req, res) => {
    routers(req, res)
})
export default router
import express from 'express'
import request from 'request'
var router = express.Router()
router.get('/map', () => {
	request('http://api.map.baidu.com/geocoder/v2/?address=北京市海淀区上地十街10号&output=json&ak=nyo2HGj9teu2hGW6ceSvC5F7v89noe0n&callback=showLocation', (err, res, body) => {
		if(!err && res.statusCode == 200) {
			console.log(body)
		}
	})
})

router.get('/login', (req, res) => {
    res.json({title: 'dddd'})
})
export default router
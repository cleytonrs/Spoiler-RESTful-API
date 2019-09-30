const express = require('express');
const controller = require('../controller/spoilers'); 
const router = express.Router();
  
router.get('/spoilers/:id', controller.findOne)
  
router.get('/spoilers', controller.findAll)
  
router.post('/spoilers', controller.create)
  
router.put('/spoilers/:id', controller.update)
  
router.delete('/spoilers/:id', controller.delete)
  
module.exports = router
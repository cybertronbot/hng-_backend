const express = require('express')
const {
  getCommunityy, 
  getCommunity, 
  createCommunity, 
  deleteCommunity, 
  updateCommunity
} = require('../controllers/community')

const router = express.Router()


router.get('/', getCommunityy)

router.get('/:id', getCommunity)


router.post('/', createCommunity)


router.delete('/:id', deleteCommunity)


router.patch('/:id', updateCommunity)

module.exports = router
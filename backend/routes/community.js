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

router.get('/:slug', getCommunity)


router.post('/', createCommunity)


router.delete('/:slug', deleteCommunity)


router.patch('/:slug', updateCommunity)

module.exports = router
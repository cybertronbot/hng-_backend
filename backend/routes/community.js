const express = require('express')
const {
  getCommunities, 
  getCommunity, 
  createCommunities, 
  deleteCommunities, 
  updateCommunities
} = require('../controllers/community')

const router = express.Router()


router.get('/', getCommunities)

router.get('/:id', getCommunity)


router.post('/', createCommunities)


router.delete('/:id', deleteCommunities)


router.patch('/:id', updateCommunities)

module.exports = router
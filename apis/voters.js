'use strict'
const express = require('express')
const router = express.Router()
const db = require('../models/mongodb')
const { Validator } = require('../models/blockchain/validator')

router.get('/:voter/candidates', async function (req, res, next) {
    let validator = await Validator.deployed()
    let voters = await db.Voter.find({
        smartContractAddress: validator.address,
        voter: req.params.voter
    }).limit(100).skip(0)
    return res.json(voters)
})

module.exports = router

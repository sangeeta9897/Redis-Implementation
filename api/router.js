const express = require('express');
const router = express.Router();

const RedisRepo = require('../Repository/redis-repo');
const redisRepo = new RedisRepo();

const utility = require('../utility/helper');

const GetUser = require('./getUser');
const getUser = new GetUser(utility, redisRepo);

const SetUser = require('./setUser');
const setUser = new SetUser(utility, redisRepo);

const GetPosition = require('./getPosition');
const getPosition = new GetPosition(utility, redisRepo);

const AddRequest = require('./addRequest');
const addRequest = new AddRequest(utility, redisRepo);

const GetAllRequests = require('./getAllRequests');
const getAllRequests = new GetAllRequests(utility, redisRepo);

router.get('/getUser/:id', (req, res) => {
	getUser.handleRequest(req, res);
});

router.post('/setUser/:id/:name', (req, res) => {
	setUser.handleRequest(req, res);
});

router.get('/getPosition/:id', (req, res) => {
	getPosition.handleRequest(req, res);
});

router.post('/addRequest/:id', (req, res) => {
	addRequest.handleRequest(req, res);
});

router.get('/getAllRequests/:start/:end', (req, res) => {
	getAllRequests.handleRequest(req, res);
});

router.get('/getAllRequests', (req, res) => {
	getAllRequests.handleRequest(req, res);
});

module.exports = router;
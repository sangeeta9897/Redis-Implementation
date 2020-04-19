const express = require('express');
const router = require('./api/router');
const app = express();

app.use(express.json())
app.use('/redis-service', router);

app.listen(3000, () => {
    console.log('Redis-helper started at -', 3000);
});

function invoker(promise) {
    return promise.then(data => {
        return [null, data];
    })
    .catch(err => [err, null]);
}

function writeResponse(code, msg, res) {
    let err = null;
    if(code === 500) {
        err = 'INTERNAL_SERVER_ERROR';
        msg = null;
    }
    if(code === 400) {
        err = 'INVALID_REQUEST';
    }
    return res.status(code).send({
        err, msg
    });
}

module.exports = {
    invoker, writeResponse
}
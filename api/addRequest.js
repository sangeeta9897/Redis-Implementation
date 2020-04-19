class AddRequest {
    constructor(utility, redisRepo) {
        this.redisRepo = redisRepo;
        this.utility = utility;
    }

    async handleRequest(req, res) {
        const id = req.params.id;
        let [getErr, name] = await this.utility.invoker(this.redisRepo.get(id));
        if (getErr) {
            return this.utility.writeResponse(500, {
                res: null,
                resErr: getErr
            }, res);
        }
        if (name === null) {
            return this.utility.writeResponse(400, {
                res: null,
                resErr: 'Member not present in database'
            }, res);
        }
        const score = Date.now();
        let [addErr, requested] = await this.utility.invoker(this.redisRepo.addToRequestList('RequestList', id, score));
        if (addErr) {
            return this.utility.writeResponse(500, {
                res: null,
                resErr: addErr
            }, res);
        }
        return this.utility.writeResponse(200, {
            res: 'Successfully Requested',
            resErr: null
        }, res);
    }
}

module.exports = AddRequest;
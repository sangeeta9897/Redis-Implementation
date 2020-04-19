class SetUser {
    constructor(utility, redisRepo) {
        this.redisRepo = redisRepo;
        this.utility = utility;
    }

    async handleRequest(req, res) {
        const id = req.params.id;
        const name = req.params.name;
        const expiry = req.query.expiry;
        let [setErr, setSucessfully] = await this.utility.invoker(this.redisRepo.set(id, name));
        if(setErr) {
            return this.utility.writeResponse(500, {
                res: null,
                resErr: setErr,
            }, res);
        }
        if(expiry) {
            let [expireErr, setExpiry] = await this.utility.invoker(this.redisRepo.expiry(id, expiry));
            if(expireErr) {
                return this.utility.writeResponse(500, {
                    res: 'Could not set expire',
                    resErr: expireErr
                }, res);
            }
        }
        return this.utility.writeResponse(200, {
            res: 'Successfully set key',
            resErr: null
        }, res);
    }
}

module.exports = SetUser;
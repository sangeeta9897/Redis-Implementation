class GetUser {
    constructor(utility, redisRepo) {
        this.redisRepo = redisRepo;
        this.utility = utility;
    }

    async handleRequest(req, res) {
        const id = req.params.id;
        let [getErr, got] = await this.utility.invoker(this.redisRepo.get(id));
        if(getErr) {
            return this.utility.writeResponse(500, {
                name: null,
                resErr: getErr
            }, res);
        }
        if(!got) {
            return this.utility.writeResponse(400, {
                name: null,
                resErr: 'No such id exists'
            }, res);
        }
        return this.utility.writeResponse(200, {
            name: got,
            resErr: null
        }, res)
    }
}

module.exports = GetUser;
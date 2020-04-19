class GetAllRequests {
    constructor(utility, redisRepo) {
        this.redisRepo = redisRepo;
        this.utility = utility;
    }

    async handleRequest(req, res) {
        const start = req.params.start || 0;
        const end = req.params.end || -1;
        let [getAllErr, allRequests] = await this.utility.invoker(this.redisRepo.GetAllRequests('RequestList', start, end));
        if (getAllErr) {
            return this.utility.writeResponse(500, {
                list: null,
                resErr: getAllErr
            }, res);
        }
        return this.utility.writeResponse(200, {
            list: allRequests,
            resErr: null
        }, res);
    }
}

module.exports = GetAllRequests;
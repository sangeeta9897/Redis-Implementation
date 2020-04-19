class GetPosition {
    constructor(utility, redisRepo) {
        this.redisRepo = redisRepo;
        this.utility = utility;
    }

    async handleRequest(req, res) {
        const id = req.params.id;
        let [positionErr, position] = await this.utility.invoker(this.redisRepo.getPosition('RequestList', id));
        if(positionErr) {
            return this.utility.writeResponse(500, {
                position: null,
                resErr: positionErr
            }, res);
        }
        if(position === null) {
            return this.utility.writeResponse(400, {
                position: null,
                resErr: 'Member not present'
            }, res);
        }
        position++;
        return this.utility.writeResponse(200, {
            position,
            resErr: null
        }, res);
    }
}

module.exports = GetPosition;
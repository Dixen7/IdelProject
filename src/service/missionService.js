const { DB } = require('../database');

class MissionsService {
    constructor() {
        this.mission = DB.mission;
    }

    async missionExist(mission, user) {

    }

    async createMission(mission) {
        const missionCreated = await this.mission.create({ ...mission });
        return missionCreated;
    }
}

module.exports = { MissionsService: new MissionsService() };
module.exports.default = new MissionsService();
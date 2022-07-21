const { DB } = require('../database');

class UsersService {
    constructor() {
        this.user = DB.user;
    }

    async userExist(newUser) {
        const user = await this.user.findOne({
            where: {
                [Op.or]: [{
                    [Op.and]: [
                        { phone_number: newUser.phone_number },
                        {
                            phone_number: {
                                [Op.not]: null
                            }
                        }
                    ]
                },
                {
                    [Op.and]: [
                        { email: newUser.email },
                        {
                            email: {
                                [Op.not]: null
                            }
                        }
                    ]
                }]
            }
        });
        return user;
    }

    async createUser(user) {
        const userCreated = await this.user.create({ ...user });
        return userCreated;
    }
}

module.exports = { UsersService: new UsersService() };
module.exports.default = new UsersService();
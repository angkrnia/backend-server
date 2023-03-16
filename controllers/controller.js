const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { User, Content } = require('../models');

class SuperController {
    static async welcome(req, res, next) {
        res.status(200).json({
            message: 'Hello Welcome to FE Kawah Edukasi BE Server',
        });
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw { name: 'Invalid Credentials' };
            }

            const user = await User.findOne({
                where: { username },
            });

            if (!user || !comparePassword(password, user.password)) {
                throw { name: 'Invalid Credentials' };
            }

            const payload = { id: user.id ,fullname: user.fullname, username: user.username, role: user.role };
            res.status(200).json({ access_token: createToken(payload) });
        } catch (error) {
            next(error);
        }
    }

    static async register(req, res, next) {
        try {
            const { username, fullname, password } = req.body;
            const result = await User.findOne({ where: { username } });
            console.log(result);
            if (result) {
                throw {
                    name: 'Username already exists',
                };
            }
            const user = await User.create({ username, fullname, password });
            res.status(201).json({
                message: 'User created successfully',
            });
        } catch (error) {
          console.log(error);
            next(error);
        }
    }
}

module.exports = SuperController;

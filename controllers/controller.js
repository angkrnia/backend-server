const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User, Content } = require('../models')

class SuperController {
  static async welcome(req, res, next) {
    res.status(200).json({
      message: 'Hello Welcome to FE Kawah Edukasi BE Server'
    })
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      if (username && password) {
        const user = await User.findOne({ where: { username: username } })
        if (user) {
          const isValidPass = comparePassword(password, user.password)
          if (isValidPass) {
            const payload = {
              username: user.username
            }
            res.status(200).json({
                access_token: createToken(payload),
            });
          } else {
            throw ({
              name: 'Invalid Username or Password'
            })
          }
        } else {
          throw ({
            name: 'Invalid Username or Password'
          })
        }
      } else {
        throw ({
          name: 'Invalid Username or Password'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getContent(req, res, next) {
    try {
      const contents = await Content.findAll()
      console.log(contents);
      if (contents) {
        res.status(200).json(contents)
      } else {
        throw ({
          name: 'Content Not Found'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async getContentDetail(req, res, next) {
    try {
      const id = req.params.id
      const contents = await Content.findOne({
        where: {
          id
        }
      })
      console.log(contents);
      if (contents) {
        res.status(200).json(contents)
      } else {
        throw ({
          name: 'Content Not Found'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async createContent(req, res, next) {
    try {
      const {
        name,
        image,
        description1,
        description2,
        description3,
        description4,
        description5,
        description6
      } = req.body
      const UserId = req.user.id
      await Content.create({
        UserId,
        name,
        image,
        description1,
        description2,
        description3,
        description4,
        description5,
        description6
      })
      res.status(201).json({
        message: 'Success Create'
      })
    } catch (error) {
      next(error)
    }
  }

  static async putContent(req, res, next) {
    try {
      const {
        name,
        image,
        description1,
        description2,
        description3,
        description4,
        description5,
        description6
      } = req.body
      const contentId = req.params.id
      const result = await Content.findByPk(contentId)
      if (result) {
        await Content.update({
          name,
          image,
          description1,
          description2,
          description3,
          description4,
          description5,
          description6
        }, {
          where: {
            id: contentId
          }
        })
        res.status(200).json({
          message: 'Success Put'
        })
      } else {
        throw ({
          name: 'Content Not Found'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteContent(req, res, next) {
    try {
      const contentId = req.params.id
      const result = await Content.findByPk(contentId)
      if (result) {
        await Content.destroy({
          where: {
            id: contentId
          }
        })
        res.status(200).json({
          message: 'Success Delete'
        })
      } else {
        throw ({
          name: 'Content Not Found'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = SuperController
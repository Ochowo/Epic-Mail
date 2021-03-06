/* eslint-disable no-useless-catch */
import database from '../models';

const { User, Group, Message } = database;

class UserService {
  static async signup(newUser, email) {
    return User.findOrCreate({
      where: { email },
      defaults: newUser,
    });
  }

  static async getAllUsers() {
    try {
      return await User.findAll({});
    } catch (error) {
      throw (error);
    }
  }

  static getAUser(email) {
    return User.findOne({
      include: [
        {
          model: Message,
        },
        {
          model: Group,
        }],
      where: { email },
    });
  }
}

export default UserService;

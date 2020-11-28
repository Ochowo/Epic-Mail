import Response from '../utils/response';
import { userService } from '../services';
import Authenticate from '../middleware/auth/Authenticate';

const response = new Response();

class UserController {
  /**
   * @param  {} req
   * @param  {} res
   */
  static async registerUser(req, res) {
    try {
      const [user, created] = await userService.signup(req.body, req.body.email);
      const {
        id, firstName, lastName, email,
      } = user;
      const token = Authenticate.generateToken(id, user.email);
      if (created) {
        const data = {
          user: {
            id,
            firstName,
            lastName,
            email,
          },
          token,
        };
        response.setSuccess(201, 'User created successfully', data);
        return response.send(res);
      }
      response.setError(409, 'User already exist');
      return response.send(res);
    } catch (error) {
      response.setError(500, error.message);
      return response.send(res);
    }
  }

  /**
   * @param  {} req
   * @param  {} res
   */
  static async login(req, res) {
    const {
      email, password,
    } = req.body;
    const user = await userService.findUser(email);
    console.log(user);
    if (!user) {
      console.log('noooooooooooooo');
      response.setError(404, 'User does not exist');
      return response.send(res);
    }
    if (user.comparePassword(password, user)) {
      const token = Authenticate.generateToken(user.id, user.email);
      const data = { user, token };
      response.setSuccess(200, 'Login successful', data);
      return response.send(res);
    }
    response.setError(401, 'Invalid credentials');
    return response.send(res);
  }
}

export default UserController;
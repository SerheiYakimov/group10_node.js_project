import Users from '../../repository/users';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async isUserExist(email) {
    const user = await Users.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { id, name, email, balance, verifyToken } = await Users.create(body);
    return {
      id,
      name,
      email,
      balance,
      verifyToken,
    };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword || !user?.verify) {
      return null;
    }
    return user;
  }

  async getUserGoogle(email) {
    const user = await Users.findByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }

  async getBalance(userId) {
    const { balance } = await Users.findById(userId);
    return balance;
  }

  async setBalance(userId, balance) {
    return await Users.updateBalance(userId, balance);
  }
}

export default new AuthService();

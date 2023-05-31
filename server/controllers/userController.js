/** @format */

import { User, Basket } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "6h",
  });
};

class UserController {
  async registration(req, res) {
    const { email, password, role } = req.body;
    const exp =
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (!exp.test(email)) {
      return res.status(400).json("Некоректный email");
    }
    if (!email || !password) {
      res.status(400).json({ message: "Некорректный email или password" });
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      res
        .status(400)
        .json({ message: "Пользователь c таким email уже существует" });
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    await Basket.create({ userId: user.dataValues.id });
    const token = generateJwt(user.dataValues.id, email, role);
    res.status(200).json({ token });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(403).json({ message: "Пользователь не найден" });
    }
    let comparePassword = bcrypt.compareSync(
      password,
      user.dataValues.password
    );
    if (!comparePassword) {
      return res.status(403).json({ message: "Указан неверный пароль" });
    }
    const token = generateJwt(user.dataValues.id, email, user.dataValues.role);
    return res.json({ token });
  }

  async check(req, res) {
    res.json({ message: "work!!!" });
  }
}

export default new UserController();

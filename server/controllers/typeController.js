/** @format */

import { Type } from "../models/models.js";

class TypeController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (e) {
      return res.json(e);
    }
  }

  async getAll(req, res) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new TypeController();

/** @format */

import { Brand } from "../models/models.js";

class BrandController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (e) {
      return res.json(e);
    }
  }

  async getAll(req, res) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new BrandController();

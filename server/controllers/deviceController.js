/** @format */

import { Device } from "../models/models.js";
import path from "path";
import { fileURLToPath } from "url";
import * as uuid from "uuid";

class DeviceController {
  async create(req, res) {
    try {
      const { name, price, brandId, typeId } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      return res.json(device);
    } catch (e) {
      return res.json(e);
    }
  }

  async getAll(req, res) {
    try {
      const brands = await Device.findAll();
      return res.json(brands);
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new DeviceController();

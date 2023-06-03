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

  async updateRating(req, res) {
    try {
      const id = req.query.id;
      const { rating } = req.body;
      const sum = (await Device.findOne({ where: { id: id } })).dataValues
        .sumrating;
      const num = (await Device.findOne({ where: { id: id } })).dataValues
        .numrating;
      await Device.update(
        {
          sumrating: sum + rating,
          numrating: num + 1,
        },
        { where: { id: id } }
      );
      await Device.update(
        {
          rating: (
            (await Device.findOne({ where: { id: id } })).dataValues.sumrating /
            (
              await Device.findOne({ where: { id: id } })
            ).dataValues.numrating
          ).toFixed(1),
        },
        { where: { id: id } }
      );
      return res.json(await Device.findOne({ where: { id: id } }));
    } catch (e) {
      return res.json(e);
    }
  }
}

export default new DeviceController();

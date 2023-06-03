/** @format */

import { Router } from "express";
import TypeController from "../controllers/typeController.js";
import BrandController from "../controllers/brandController.js";
import UserController from "../controllers/userController.js";
import DeviceController from "../controllers/deviceController.js";

const router = Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/check", UserController.check);

router.post("/typecreate", TypeController.create);
router.get("/typegetAll", TypeController.getAll);

router.post("/brandcreate", BrandController.create);
router.get("/brandgetAll", BrandController.getAll);

router.post("/devicecreate", DeviceController.create);
router.put("/updaterating", DeviceController.updateRating);

export default router;

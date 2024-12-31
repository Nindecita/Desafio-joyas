import express from "express";
import {
  jewels,
  filtersJewels,
} from "../../src/controllers/jewels.controller.js";
const router = express.Router();

router.get("/joyas", jewels);
router.get("/joyas/filtros", filtersJewels);

export default router;

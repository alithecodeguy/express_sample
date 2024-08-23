const express = require("express");

const router = express.Router();

const {
  addItem,
  getAllItems,
  getOneItemById,
  getAllItemsByName,
  updateOneItem,
  deleteOneItem,
} = require("../controller/itemController");

router.post("/items", addItem);
router.get("/items", getAllItems);
router.get("/items/:id", getOneItemById);
router.get("/items/name/:name", getAllItemsByName);
router.put("/items/:id", updateOneItem);
router.delete("/items/:id", deleteOneItem);

module.exports = router;

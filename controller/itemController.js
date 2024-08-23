const mysqlConnection = require("../connection/dbconnection");

// Create an Item
exports.addItem = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const sql =
      "INSERT INTO menu (name, category, price, description) VALUES (?, ?, ?, ?)";
    const results = await mysqlConnection.query(sql, [
      name,
      category,
      price,
      description,
    ]);
    res
      .status(200)
      .json({ message: "Item created successfully", recordInserted: results });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all Items
exports.getAllItems = async (req, res) => {
  try {
    const sql = "SELECT * FROM menu";
    const results = await mysqlConnection.query(sql);
    res.status(200).json({ results });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get One Menu Item
exports.getOneItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM menu WHERE menuId = ?";
    const rows = await mysqlConnection.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ menuItem: rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Menu Items by Name
exports.getAllItemsByName = async (req, res) => {
  try {
    const { name } = req.params;
    const sql = "SELECT * FROM menu WHERE name LIKE ?";
    const rows = await mysqlConnection.query(sql, [`%${name}%`]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Food name not found" });
    }

    res.status(200).json({ menus: rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a Menu
exports.updateOneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description } = req.body;
    const sqlCheckExistence = "SELECT * FROM menu WHERE menuId = ?";
    const sqlUpdate =
      "UPDATE menu SET name = ?, category = ?, price = ?, description = ? WHERE menuId = ?";

    const existingRows = await mysqlConnection.query(sqlCheckExistence, [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Food menu Item not found" });
    }

    await mysqlConnection.query(sqlUpdate, [
      name,
      category,
      price,
      description,
      id,
    ]);
    res.status(200).json({ message: "Food menu Item has been updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a menu
exports.deleteOneItem = async (req, res) => {
  try {
    const { id } = req.params;
    const sqlCheckExistence = "SELECT * FROM menu WHERE menuId = ?";
    const sqlDelete = "DELETE FROM menu WHERE menuId = ?";

    const existingRows = await mysqlConnection.query(sqlCheckExistence, [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    await mysqlConnection.query(sqlDelete, [id]);
    res.status(200).json({ message: "Menu Item has been deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

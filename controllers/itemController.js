const Item = require('../models/item');

// 取得所有 items
exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// 新增 item
exports.createItem = async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.status(201).json(newItem);
};

// 更新 item
exports.updateItem = async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true },
  );
  res.json(updatedItem);
};

// 刪除 item
exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
};

const Item = require('../models/item');

const getDepartmentFromOrder = (productionOrder) => {
  if (!productionOrder) return '未分類';
  const prefix = productionOrder.substring(0, 4);
  switch (prefix) {
    case '5341':
      return '泵浦組立線';
    case '5346':
      return '機械加工課';
    case '5347':
      return '塑膠射出課';
    case '5348':
      return '射出加工組';
    default:
      return '未分類';
  }
};

// 取得所有 items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 新增 item
exports.createItem = async (req, res) => {
  const { productionOrder } = req.body;

  try {
    // 檢查製令編號是否存在
    const existingItem = await Item.findOne({ productionOrder });

    // 根據檢查結果設定 firstPieceInspection 的值
    const newItemData = {
      ...req.body,
      firstPieceInspection: existingItem ? '巡檢' : '首件',
      department: getDepartmentFromOrder(productionOrder),
    };

    const newItem = new Item(newItemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    // 如果是唯一性約束錯誤，給出更具體的提示
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: '此製令編號已存在，請使用不同的編號。' });
    }
    res.status(400).json({ message: error.message });
  }
};

// 更新 item
exports.updateItem = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.productionOrder) {
      updateData.department = getDepartmentFromOrder(
        updateData.productionOrder,
      );
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      },
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 刪除 item
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

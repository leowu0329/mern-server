const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    firstPieceInspection: {
      type: String,
      enum: ['首件', '巡檢'],
      required: true,
      default: '首件',
    },
    salesType: { type: String, enum: ['內銷', '外銷'], required: true },
    customer: { type: String, required: true },
    department: { type: String, required: true },
    productionOrder: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    time: { type: String, required: true },
    operator: { type: String, required: true },
    drawingVersion: { type: String, required: true },
    inspector: { type: String, required: true },
  },
  { timestamps: true },
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;

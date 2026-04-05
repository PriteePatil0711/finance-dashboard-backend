const mongoose = require('mongoose');

const financialRecordSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 0 },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  note: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// Indexes for performance
financialRecordSchema.index({ date: 1 });
financialRecordSchema.index({ category: 1 });
financialRecordSchema.index({ type: 1 });
financialRecordSchema.index({ userId: 1 });

module.exports = mongoose.model('FinancialRecord', financialRecordSchema);
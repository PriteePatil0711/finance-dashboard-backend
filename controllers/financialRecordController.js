const FinancialRecord = require('../models/FinancialRecord');

exports.createRecord = async (req, res) => {
  try {
    const record = new FinancialRecord({ ...req.body, userId: req.user._id });
    await record.save();
    res.status(201).send({ success: true, record });
  } catch (e) {
    res.status(400).send({ success: false, message: e.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, startDate, endDate, search } = req.query;
    const query = { isDeleted: false };
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }
    if (type) query.type = type;
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    if (search) {
      query.$or = [
        { category: new RegExp(search, 'i') },
        { note: new RegExp(search, 'i') }
      ];
    }
    const records = await FinancialRecord.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'name');
    const total = await FinancialRecord.countDocuments(query);
    res.send({ success: true, records, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, isDeleted: false };
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }
    const record = await FinancialRecord.findOneAndUpdate(query, req.body, { new: true });
    if (!record) {
      return res.status(404).send({ success: false, message: 'Record not found.' });
    }
    res.send({ success: true, record });
  } catch (e) {
    res.status(400).send({ success: false, message: e.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id, isDeleted: false };
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }
    const record = await FinancialRecord.findOneAndUpdate(query, { isDeleted: true }, { new: true });
    if (!record) {
      return res.status(404).send({ success: false, message: 'Record not found.' });
    }
    res.send({ success: true, message: 'Record deleted.' });
  } catch (e) {
    res.status(400).send({ success: false, message: e.message });
  }
};
const FinancialRecord = require('../models/FinancialRecord');

exports.getSummary = async (req, res) => {
  try {
    const match = { isDeleted: false };
    if (req.user.role === 'analyst') {
      match.userId = req.user._id;
    }
    const summary = await FinancialRecord.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
            }
          }
        }
      }
    ]);
    const data = summary[0] || { totalIncome: 0, totalExpense: 0 };
    data.netBalance = data.totalIncome - data.totalExpense;
    res.send({ success: true, summary: data });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const match = { isDeleted: false };
    if (req.user.role === 'analyst') {
      match.userId = req.user._id;
    }
    const categories = await FinancialRecord.aggregate([
      { $match: match },
      {
        $group: {
          _id: { category: '$category', type: '$type' },
          total: { $sum: '$amount' }
        }
      },
      {
        $group: {
          _id: '$_id.category',
          income: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'income'] }, '$total', 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'expense'] }, '$total', 0]
            }
          }
        }
      }
    ]);
    res.send({ success: true, categories });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.getTrends = async (req, res) => {
  try {
    const match = { isDeleted: false };
    if (req.user.role === 'analyst') {
      match.userId = req.user._id;
    }
    const trends = await FinancialRecord.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type'
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);
    res.send({ success: true, trends });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.getRecent = async (req, res) => {
  try {
    const query = { isDeleted: false };
    if (req.user.role === 'analyst') {
      query.userId = req.user._id;
    }
    const records = await FinancialRecord.find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name');
    res.send({ success: true, records });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.getInsights = async (req, res) => {
  try {
    const match = { isDeleted: false };
    if (req.user.role === 'analyst') {
      match.userId = req.user._id;
    }
    // Highest spending category
    const highestSpending = await FinancialRecord.aggregate([
      { $match: { ...match, type: 'expense' } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 1 }
    ]);
    // Percentage change from last month
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthTotal = await FinancialRecord.aggregate([
      { $match: { ...match, date: { $gte: thisMonth } } },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
            }
          }
        }
      }
    ]);
    const lastMonthTotal = await FinancialRecord.aggregate([
      { $match: { ...match, date: { $gte: lastMonth, $lt: thisMonth } } },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
            }
          }
        }
      }
    ]);
    const thisNet = (thisMonthTotal[0]?.income || 0) - (thisMonthTotal[0]?.expense || 0);
    const lastNet = (lastMonthTotal[0]?.income || 0) - (lastMonthTotal[0]?.expense || 0);
    const percentageChange = lastNet === 0 ? (thisNet > 0 ? 100 : 0) : ((thisNet - lastNet) / lastNet) * 100;
    const insights = {
      highestSpendingCategory: highestSpending[0]?._id || 'None',
      percentageChangeFromLastMonth: percentageChange.toFixed(2)
    };
    res.send({ success: true, insights });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};
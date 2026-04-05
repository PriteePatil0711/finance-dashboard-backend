const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = await User.findOne({ email: 'analyst@test.com' }).lean();
    console.log(JSON.stringify(user, null, 2));
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

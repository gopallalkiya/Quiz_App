const mongoose = require('mongoose');

/* Intialize Mongoose Connection */
mongoose.connect('mongodb+srv://dsentdesigns1.nk0rd.mongodb.net/quiz-app?retryWrites=true&w=majority',
  { user: 'dsent_admin', pass: 'Gopal@123', useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('Database Connected'))
  .catch(err => console.error('Could not connect to mongodb', err));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
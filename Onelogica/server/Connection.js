const mongoose=require('mongoose');
const MONGO_URI='mongodb+srv://mishravicky0141:g03yFFCFxfiNOpvo@onelogicacluster.kzwt9tz.mongodb.net/signup'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

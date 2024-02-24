import 'dotenv/config'
import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('open', () => console.log('DB is connected'));
mongoose.connection.on('error', (error: Error) => console.log(error));

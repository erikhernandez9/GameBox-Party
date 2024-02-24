import express from 'express';
import router from './routes/index.routes';
import cors from 'cors';
import * as initialSetup from './utils/initialSetup.utils';

const app = express();

initialSetup.createRoles();
initialSetup.createMasterUser();
initialSetup.createUploadsFolder();

app.use(cors({
    credentials: true,
}));

app.use('/api/public', express.static('uploads/img'));

app.use(express.json());

app.use('/api', router());

export default app;
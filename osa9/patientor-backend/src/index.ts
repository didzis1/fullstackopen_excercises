import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    console.log('ponged here');
    res.send('ponged.');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`We are on port ${PORT}`);
});
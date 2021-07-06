import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises as calcExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

type Body = {
    daily_exercises: number[],
    target: number
};

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const request = req.query;
    if (!request.height || !request.weight) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const bmi: string = calculateBmi(height, weight);
    return res.json({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body as Body;
    // console.log('BODY:',body);
    if (!daily_exercises || !target ) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    // Check if daily_exercises is an array, if target is not a number and if every value in daily_exercises is a number
    if(!Array.isArray(daily_exercises) || isNaN(target) || !daily_exercises.every(n => typeof n === 'number')) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    const result = calcExercises(daily_exercises, target);
    console.log('RESULT:',result);
    return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
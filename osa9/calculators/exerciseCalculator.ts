interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


export const calculateExercises = (exerciseHours: number[], target: number ): Result => {
    let average = 0;
    let rating = 0;
    let ratingDescription = '';
    const trainingDays = exerciseHours.filter(h => h !== 0).length;
    const success = average < target ? false : true;
    const periodLength = exerciseHours.length;

    exerciseHours.forEach(day => {
        average += day;
    });
    average = average / exerciseHours.length;

    if (trainingDays > exerciseHours.length * 0.70) {
        rating = 3;
        ratingDescription = 'Keep up the good work!';
    } else if (trainingDays > exerciseHours.length * 0.50) {
        rating = 2;
        ratingDescription = 'Not bad, but you could work out a bit more!';
    } else if (trainingDays > exerciseHours.length * 0.30) {
        rating = 1;
        ratingDescription = 'You need more training days...';
    }
    

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

if (process.argv.length > 3) {
    const target = Number(process.argv[2]);
    const exerciseHours: number[] = process.argv.slice(3).map(x => Number(x));
    console.log(calculateExercises(exerciseHours, target));
}
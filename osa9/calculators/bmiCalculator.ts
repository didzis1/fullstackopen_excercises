export const calculateBmi = (height: number, weight: number): string => {
    const result: number = ((weight / height**2) * 10000);
    if (result < 15) {
        return 'Very severely underweight';
    } else if (result >= 15 && result <= 16) {
        return 'Severely underweight';
    } else if (result >= 16 && result <= 18.5) {
        return 'Underweight';
    } else if (result >= 18.5 && result <= 25) {
        return 'Normal (healthy weight)';
    } else if (result >= 25 && result <= 30) {
        return 'Overweight';
    } else if (result >= 30 && result <= 35) {
        return 'Obese Class I (Moderately obese)';
    } else if (result >= 35 && result <= 40) {
        return 'Obese Class II (Severely obese)';
    } else if (result >= 40) {
        return 'Obese Class III (Very severely obese)';
    } else {
        throw new Error('There were some problems calculating...');
    }
};

// const height: number = Number(process.argv[2]);
// const weight: number = Number(process.argv[3]);
// console.log(calculateBmi(height, weight));
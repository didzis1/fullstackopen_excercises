import React from 'react';
import CoursePart from '../types'

const Total = ({courseParts}: { courseParts: CoursePart[] } ): JSX.Element => {
    const totalExercises: number = courseParts.reduce((counter, current) => counter + current.exerciseCount, 0);
    return (
        <div>
			<br />
            <p>Number of exercises {totalExercises}</p>
        </div>
    )
};

export default Total;
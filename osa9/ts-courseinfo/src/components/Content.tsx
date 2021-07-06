import React from 'react';
import Part from './Part'
import CoursePart from '../types'



const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
	//console.log(courseParts);
	return (
		<>
			{
				courseParts.map((coursePart) => (
					<Part key={coursePart.name} coursePart={coursePart} />
				))
			}
		</>
	)
};

export default Content;
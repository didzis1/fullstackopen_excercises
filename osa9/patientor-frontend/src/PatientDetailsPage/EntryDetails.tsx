import React from 'react';
import { Entry } from '../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';

interface Props {
	entry: Entry;
}

const assertNever = (value: never): never => {
	console.log(value);
	throw new Error(
		`Wrong entry type`
	);
};

const EntryDetails = ({ entry } : Props) => {

	switch (entry.type) {
		case "Hospital":
			return <Hospital entry={entry} />;
		case "HealthCheck":
			return <HealthCheck entry={entry} />;
		case "OccupationalHealthcare":
			return <OccupationalHealthcare entry={entry} />;
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
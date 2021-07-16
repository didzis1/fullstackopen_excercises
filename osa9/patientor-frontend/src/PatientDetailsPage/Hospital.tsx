import React from 'react';

import { HospitalEntry } from '../types';
import { useStateValue } from '../state/';
import { Segment } from 'semantic-ui-react';

interface Props {
	entry: HospitalEntry;
}

const Hospital = ({ entry }: Props) => {
	const [{ diagnosis }] = useStateValue();
	return (
		<Segment>
			<h3>{entry.date}</h3>
			{entry?.diagnosisCodes?.map((diagnosisCode) => {
				return (
					<p key={diagnosisCode}>{diagnosisCode} - {diagnosis[diagnosisCode].name}</p>
				);
			})}
			<i>{entry.description}</i>
		</Segment>
	);
};

export default Hospital;
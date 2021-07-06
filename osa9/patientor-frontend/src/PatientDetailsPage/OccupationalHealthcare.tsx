import React from 'react';

import { OccupationalHealthCareEntry } from '../types';
import { useStateValue } from '../state/';
import { Segment } from 'semantic-ui-react';

interface Props {
	entry: OccupationalHealthCareEntry;
}

const OccupationalHealthcare = ({ entry }: Props) => {
	console.log(entry);
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
			<br />
			<br/>
			{entry?.sickLeave ? <p>Patient has sick leave from <strong>{entry.sickLeave.startDate}</strong> to <strong>{entry.sickLeave.endDate}</strong></p> : null}
		</Segment>
	);
};

export default OccupationalHealthcare;
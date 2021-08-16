import React from 'react';

import { HealthCheckEntry } from '../types';
import { useStateValue } from '../state/';
import { Segment } from 'semantic-ui-react';

interface Props {
	entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: Props) => {
	const [{ diagnosis }] = useStateValue();

	const healthRatingIcon = (rating: number) => {
		switch (rating) {
			case 0:
				return '🧡';
			case 1:
				return '💛';
			case 2:
				return '💙';
			case 3:
				return '🖤';
		}
	};

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
			{entry?.healthCheckRating ? healthRatingIcon(entry.healthCheckRating) : null}
		</Segment>
	);
};

export default HealthCheck;
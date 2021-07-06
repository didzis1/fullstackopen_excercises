import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnosis } from "./types";
import { setDiagnosisList, setPatientList } from './state/reducer';

import PatientListPage from "./PatientListPage";
import PatientDetailsPage from "./PatientDetailsPage";

const App = () => {
	const [, dispatch] = useStateValue();
	React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
	
    const fetchPatientList = async () => {
		try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
			`${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
		} catch (e) {
        console.error(e);
		}
    };
    void fetchPatientList();
	}, [dispatch]);

	React.useEffect(() => {
		const fetchDiagnosisList = async () => {
			try {
				const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
				dispatch(setDiagnosisList(diagnosisListFromApi));
			} catch (e) {
				console.log(e);
			}
		};
		void fetchDiagnosisList();
	}, [dispatch]);

	return (
    <div className="App">
		<Router>
        <Container>
			<Header as="h1">Patientor</Header>
			<Button as={Link} to="/" primary>
            Home
			</Button>
			<Divider hidden />
			<Switch>
			<Route path="/patients/:id">
				<PatientDetailsPage />
			</Route>
            <Route path="/">
				<PatientListPage />
            </Route>
			</Switch>
        </Container>
		</Router>
    </div>
	);
};

export default App;
import React from "react";
import {Jumbotron, Container, Card} from 'react-bootstrap';
import AdvisingWindowSettings from './SetAdvisingWindow';

function Settings() {
    return (
        <>
        <Jumbotron fluid>
            <Container>
                <h1>Settings</h1>
                <p>myAdvisor Staff Settings Page</p>
            </Container>
        </Jumbotron>
        


        <Card className="settings-card">
            <Card.Header>Advising Window</Card.Header>
            <Card.Body>
                <AdvisingWindowSettings/>
            </Card.Body>
        </Card>
                
        </>
    );
}

export default Settings;
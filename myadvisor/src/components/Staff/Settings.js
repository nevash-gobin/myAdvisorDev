import React from "react";
import {Jumbotron, Container, Card, Row, Col} from 'react-bootstrap';
import AdvisingWindowSettings from './SetAdvisingWindow';
import AddAccount from './AddAccount';

/*
    Settings is a component that displays all the settings components on the system.  
*/
function Settings() {
    return (
        <>
        <Jumbotron fluid>
            <Container>
                <h2>Settings</h2>
            </Container>
        </Jumbotron>
        
        <Container>
            <Row>
                <Col>
                    <Card className="settings-card">
                        <Card.Header>Advising Window</Card.Header>
                        <Card.Body>
                            <AdvisingWindowSettings/>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                <Card className="settings-card">
                    <Card.Header>Add Account</Card.Header>
                    <Card.Body>
                        <AddAccount/>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
                
        </>
    );
}

export default Settings;
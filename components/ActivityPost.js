import React, {useState, useContext} from 'react';
import {
  Segment,
  Label,
  Icon,
  Button,
  Container
} from 'semantic-ui-react';
import person from './images/person.png';
import company from './images/company.png';
import location from './images/location.png';

const ActivityPost = ({children}) => {
    return (
        <div>
            <Segment style={{ marginTop: '2em' }}>
                <Label as='a' color='blue' ribbon style={{marginBottom:'3.5em'}}>
                    <Icon name='calendar' />
                    Meeting
                </Label>
                <Button.Group basic size='small' floated='right'>
                    <Button icon='file' />
                    <Button icon='save' />
                    <Button icon='upload' />
                    <Button icon='download' />
                </Button.Group>
                <p className='post-content'>
                    {children}
                </p>
                <Container style={{marginTop:'3em'}}>
                    <Label as='a' image>
                        <img src={person} />
                        John Stamos
                    </Label>
                    <Label as='a' image>
                        <img src={company} />
                        Google
                    </Label>
                    <Label as='a'  image>
                        <img src={location} />
                        San Francisco, USA
                    </Label>
                </Container>
            </Segment>
        </div>
)}

export default ActivityPost;
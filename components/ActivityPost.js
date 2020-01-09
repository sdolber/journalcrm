import React, {useState, useContext} from 'react';
import Moment from 'react-moment';
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

const ActivityPost = ({activity}) => {

    const getActivityTypeLabel = (activityType) => {
        if (activityType === 'MEETING') {
            return (<Label as='a' color='blue' ribbon style={{marginBottom:'3.5em'}}>
                        <Icon name='calendar' />
                            Meeting
                    </Label>);
        }

        if (activityType === 'PHONE') {
            return (<Label as='a' color='teal' ribbon style={{marginBottom:'3.5em'}}>
                        <Icon name='phone' />
                            Call
                    </Label>);
        }

        if (activityType === 'EMAIL') {
            return (<Label as='a' color='red' ribbon style={{marginBottom:'3.5em'}}>
                        <Icon name='mail' />
                            Email
                    </Label>);
        }

        return <></>;
    }

    const getPersonLabel = (activityPersons) => {
        if (activityPersons) {
            return <Label as='a' image>
                    <img src={person} />
                        {activityPersons[0].firstName}
                    </Label>
        }

        return <></>;
    }

    const getFollowUpDate = (activityFollowUp) => {
        if (activityFollowUp) {
            return <Label color='blue' >
                        <Icon name='calendar check' /> Follow-up
                        <Label.Detail>
                            <Moment format="MM/DD/YYYY">
                                {activityFollowUp}
                            </Moment>
                        </Label.Detail>
                    </Label>
        }

        return <></>;
    }

    const getSentiment = (sentiment) => {
        if (sentiment)
        {
            return (<Label color={sentiment === 'GOOD'? 'green' : 'red'}>
                        {sentiment === 'GOOD'? 'positive' : 'negative'}
                    </Label>);
        }
        
        return <></>;
    }

    return (
        <div>
            <Segment style={{ marginTop: '2em' }}>
                <>
                    {getActivityTypeLabel(activity.type)}
                    <Button.Group basic size='small' floated='right'>
                        <Button icon='edit' />
                        <Button icon='save' />
                    </Button.Group>
                </>
                <p className='post-content'>
                    {activity.content}
                </p>
                <Container style={{marginTop:'3em'}}>
                    {getPersonLabel(activity.contacts)}
                    {
                        activity.organization &&
                        <Label as='a' image>
                            <img src={company} />
                            {activity.organization}
                        </Label>
                    }
                    { getFollowUpDate(activity.followUpDate)}
                    { getSentiment(activity.sentiment) }
                </Container>
            </Segment>
        </div>
)}

export default ActivityPost;
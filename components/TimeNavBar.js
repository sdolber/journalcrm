import React from 'react';
import {
  Grid,
  Header,
} from 'semantic-ui-react';
import Moment from 'react-moment';

const TimeNavBar = () => {

  return (
    
  <div>
      <Grid className="header-grid">
        <Grid.Row>
          <Grid.Column width={2}>
            <span className="arrow-container">
              <i className='arrow alternate circle left icon' />
            </span>
          </Grid.Column>
          <Grid.Column width={12}>
          <Header as='h1' className="header-date">
            <Moment format="MMMM, dddd Do YYYY">
                {new Date()}
            </Moment> {`  `}
            <i className='dropdown icon' style={{display:"inline"}} />
          </Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <span className="arrow-container">
              <i className='arrow alternate circle right icon' />
            </span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
)}

export default TimeNavBar;
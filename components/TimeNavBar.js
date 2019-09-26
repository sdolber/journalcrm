import React, {useState, useEffect} from 'react';
import {
  Grid,
  Header,
  Button,
} from 'semantic-ui-react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const TimeNavBar = ({onDateChange}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    onDateChange();
  }, [currentDate]);

  return (
    
  <div>
      <Grid className="header-grid">
        <Grid.Row>
          <Grid.Column width={2}>
          <span className="arrow-container">
              <i className='arrow alternate circle left icon' 
                onClick={() => {
                  setCurrentDate(( d => new Date(d.setDate(d.getDate() - 1)) )(currentDate));
                }
              } />
            </span>
          </Grid.Column>
          <Grid.Column width={12}>
          <Header as='h1' className="header-date">
            <Moment format="MMMM, dddd Do YYYY">
                {currentDate}
            </Moment> {`  `}
            <i className='dropdown icon' style={{display:"inline"}} />
          </Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <span className="arrow-container">
              <i className='arrow alternate circle right icon' 
                  onClick={() => {
                    setCurrentDate(( d => new Date(d.setDate(d.getDate() + 1)) )(currentDate));
                  }
              } />
            </span>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
)}

TimeNavBar.propTypes = {
  onDateChange: PropTypes.func,
};

export default TimeNavBar;
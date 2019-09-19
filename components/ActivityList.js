import React from 'react';
import {
    Transition,
    List
  } from 'semantic-ui-react';
import ActivityPost from './ActivityPost';
import PropTypes from 'prop-types';

const ActivityList = ({items}) => {
  return (
    <div>
      <Transition.Group
          as={List}
          duration={200}
          divided
          size='huge'
          verticalAlign='middle'
        >
          {items.map((item) => (
            <ActivityPost>
                {item}
            </ActivityPost>
          ))}
        </Transition.Group>
    </div>
)}

ActivityList.propTypes = {
    items: PropTypes.array,
};

export default ActivityList;
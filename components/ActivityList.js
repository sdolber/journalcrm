import React from 'react';
import {
    Transition,
    List
  } from 'semantic-ui-react';
import ActivityPost from './ActivityPost';
import PropTypes from 'prop-types';

const ActivityList = ({activities}) => {
  console.log(activities);
  return (
    <div>
      {activities.map((activity) => (
            <ActivityPost key={Math.random()} activity={activity} />
          ))}
    </div>
)}

ActivityList.propTypes = {
    activities: PropTypes.array,
};

export default ActivityList;
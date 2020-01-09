import React, {useState, useEffect} from 'react';
import {
  Divider,
} from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import TimeNavBar from '../components/TimeNavBar';
import SubmitPost from '../components/SubmitPost';
import ActivityList from '../components/ActivityList';
import useJournalServicesApi from '../hooks/JournalServicesApi';
import {ApiActions} from '../enums';
import PROCESS_ACTIVITY from '../mutations/ProcessActivity';

const Index = () => {
  const [activities, setActivities] = useState([]);
  const [processActivity, { loading, data, error }] = useMutation(PROCESS_ACTIVITY);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      updateActivity(data.processActivity);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(`Error: ${error}`);
    }
  }, [error]);

  const updateActivity = (activity) => {
    let updatedActivities = activities.slice(0);
    updatedActivities.unshift(activity);

    setActivities(updatedActivities);
  }

  const onActivityDateChange = () => {
      setActivities([]);
  }

  const onSubmitPost = (content) => {
    processActivity({ variables: { text: content}});
  }

  return (
    <> 
      <TimeNavBar onDateChange={onActivityDateChange}></TimeNavBar>
      <SubmitPost onSubmitPost={onSubmitPost} isLoading={loading}></SubmitPost>
      <Divider horizontal><i className='leaf icon' /></Divider>
      <ActivityList activities={activities}></ActivityList>
    </>
)}

export default Index;
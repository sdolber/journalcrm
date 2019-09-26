import React, {useState, useEffect} from 'react';
import {
  Divider,
} from 'semantic-ui-react';
import TimeNavBar from '../components/TimeNavBar';
import SubmitPost from '../components/SubmitPost';
import ActivityList from '../components/ActivityList';
import useJournalServicesApi from '../hooks/JournalServicesApi';
import {ApiActions} from '../enums';

const Index = () => {
  const [activities, setActivities] = useState([]);
  const { responseData, isLoading, errorMsg, doApiAction } = useJournalServicesApi();

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle api repsonse
  useEffect(() => {

    if (responseData.isError) {
        return;
    }

    switch (responseData.action) {
        case ApiActions.POST_PARSEACTIVITY:
            updateActivity(responseData.payload);
            break;
        default:
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const updateActivity = (activity) => {
    let updatedActivities = activities.slice(0);
    updatedActivities.unshift(activity);

    setActivities(updatedActivities);
  }

  const onActivityDateChange = () => {
      setActivities([]);
  }

  const onSubmitPost = (content) => {

    doApiAction(ApiActions.POST_PARSEACTIVITY, {'message': content});

  }

  return (
    <> 
      <TimeNavBar onDateChange={onActivityDateChange}></TimeNavBar>
      <SubmitPost onSubmitPost={onSubmitPost} isLoading={isLoading}></SubmitPost>
      <Divider horizontal><i className='leaf icon' /></Divider>
      <ActivityList activities={activities}></ActivityList>
    </>
)}

export default Index;
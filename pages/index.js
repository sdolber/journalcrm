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
    setActivities(['I had a meeting with John Stamos from Google last week in their headquarters.',
    'A text container is used for the main container, which is useful for single column layouts.',
    'A text container is used for the main container, which is useful for single column layouts.']);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle api repsonse
  useEffect(() => {
    console.log(responseData);
    if (responseData.isError) {
        return;
    }

    switch (responseData.action) {
        case ApiActions.POST_PARSEACTIVITY:
            console.log(responseData.payload);
            break;
        default:
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [responseData]);

  const onSubmitPost = (content) => {
    const loadMetadata = async () => {

      await doApiAction(ApiActions.POST_PARSEACTIVITY, {'message': content});

    };

    loadMetadata();

    setActivities([content, ...activities]);
  }

  return (
    <> 
      <TimeNavBar></TimeNavBar>
      <SubmitPost onSubmitPost={onSubmitPost}></SubmitPost>
      <Divider horizontal><i className='leaf icon' /></Divider>
      <ActivityList items={activities}></ActivityList>
    </>
)}

export default Index;
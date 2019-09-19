import React, {useState, useEffect} from 'react';
import {
  Divider,
} from 'semantic-ui-react';
import Layout from '../components/Layout';
import TimeNavBar from '../components/TimeNavBar';
import SubmitPost from '../components/SubmitPost';
import ActivityList from '../components/ActivityList';

const Index = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setActivities(['I had a meeting with John Stamos from Google last week in their headquarters.',
    'A text container is used for the main container, which is useful for single column layouts.',
    'A text container is used for the main container, which is useful for single column layouts.']);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitPost = (content) => {
    setActivities([content, ...activities]);
  }

  return (
    <Layout>
      <TimeNavBar></TimeNavBar>
      <SubmitPost onSubmitPost={onSubmitPost}></SubmitPost>
      <Divider horizontal><i className='leaf icon' /></Divider>
      <ActivityList items={activities}></ActivityList>
    </Layout>
)}

export default Index;
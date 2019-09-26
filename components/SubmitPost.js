import React, {useState} from 'react';
import {
  Divider,
  Segment,
  Form,
  TextArea,
  Button,
  Icon,
  Loader
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SubmitPost = ({onSubmitPost, isLoading}) => {
    const [postContent, setPostContent] = useState('');

    return (

    <div>
    <Segment style={{ marginBottom: '2em' }} className="clearing">
        <Form className='floated'>
            <TextArea placeholder='Type a new entry' rows={5} value={postContent} onChange={(ev, textarea) => {setPostContent(textarea.value)}} />
            <Divider className="hidden" />
            <Loader active={isLoading} inline />
            <Button disabled={isLoading} secondary animated className="ui right floated" onClick={() => {onSubmitPost(postContent); setPostContent('');}}>
            <Button.Content visible>Post</Button.Content>
            <Button.Content hidden>
                <Icon name='arrow right' />
            </Button.Content>
            </Button>
        </Form>
        </Segment>
    </div>
)}

SubmitPost.propTypes = {
    onSubmitPost: PropTypes.func,
};

export default SubmitPost;
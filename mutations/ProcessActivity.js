import gql from 'graphql-tag';

export default gql`
    mutation processActivity($text: String!) {
        processActivity(text: $text) {
        id
        type
        organization
        contacts {
            firstName
        }
        sentiment
        content
        }
}`


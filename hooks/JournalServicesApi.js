import { useState, useEffect, useContext } from 'react';
import { getUrlForAction } from '../enums';
import {AuthContext, AuthProvider} from './AuthContext';

const useJournalServicesApi = () => {
  const [responseData, setResponseData] = useState({});
  const [request, setRequest] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const servicesApiUrl = 'https://us-central1-journalcrm.cloudfunctions.net/services';
  const currentUser = useContext(AuthContext);
  const [userToken, setUserToken] = useState('');

  const toggleLoading = (status, hasCallback) => {
        if (hasCallback) {
            setIsLoading(status);
        }
  }

  useEffect(() => {
      if (currentUser) {
        currentUser.getIdTokenResult().then(res => {
            setUserToken(res.token);
        });
      }
    
  }, [currentUser]);

  useEffect(() => {
    
    if (request.action === undefined) {
        return;
    }

    toggleLoading(true, request.withCallback);

    let res = { action: request.action, isError: false, payload: undefined };
        
    let requestParams = { 
                    method: request.method,
                    requestParamscrossDomain:true,
                    withCredentials: true,
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Bearer ' + userToken,
                        'X-FP-API-KEY': 'web',
                        'Content-Type': 'application/json'
                    } };

    if (request.method === 'post') {
        requestParams.body = JSON.stringify(request.params);
    }
    else {
        request.url += request.params !== null ? `?${request.params}` : '';
    }

    fetch(request.url, requestParams)
        .then(function(response) {
            
            toggleLoading(false, request.withCallback);

            if (response.status !== 200 &&
                    response.status !== 202 &&
                        response.status !== 404 &&
                        response.status !== 422) {
                res.isError = true;
                setErrorMsg('Sorry, something went wrong.'); // Generic msg, may use response from API in the future
            }

            return response.text();
    }).then(function(data) {
        let jsonData = null;
        
        try {
            jsonData = JSON.parse(data);
        }
        catch (e) {

        }

        if (jsonData === null && data.length > 0) {
            res.isError = true;
            setErrorMsg(data);
        }

        res.payload = jsonData;

        if (request.withCallback) {
            setResponseData(res);
        }
    });

  }, [request]);

  const doApiAction = (action, params, withCallback = true) => {
    let method = action.indexOf("POST_") > -1 ? "post" : "get";
    setRequest({
        action: action, 
        method: method, 
        params: params, 
        url: `${servicesApiUrl}/${getUrlForAction(action)}`,
        withCallback: withCallback
    });
  };

  return { responseData, isLoading, errorMsg, doApiAction };
};

export default useJournalServicesApi;
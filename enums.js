export const ApiActions = Object.freeze({
  POST_PARSEACTIVITY: "POST_PARSEACTIVITY",
  });
  
  export const getUrlForAction = (action) => {
    switch (action) {
            case ApiActions.POST_PARSEACTIVITY:
                return "parseActivity";
            default:
                return "";
    }
  }
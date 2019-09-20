export const ApiActions = Object.freeze({
    POST_PARSETIME: "POST_PARSETIME",
  });
  
  export const getUrlForAction = (action) => {
    switch (action) {
          case ApiActions.POST_PARSETIME:
              return "parseTime";
          default:
              return "";
    }
  }
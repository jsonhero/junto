import { AUTH_CHECK } from 'store/features/authentication/constants';

function createRootRoute (store) {

  const checkToken = (nextState, replace, callback) => {
    store.dispatch({ type: AUTH_CHECK, callback, replace })
  }

  const rootRoute = {
    path: '/',
    indexRoute: {
      component: require('./Login').default,
    },
    childRoutes: [
      {
        onEnter: checkToken,
        path: '/',
        component: require('containers/AppWrap').default,
        childRoutes: [
          {
            path: 'dashboard',
            component: require('./Dashboard').default
          }
        ]
      }
    ]
  }


  return rootRoute

}


export default createRootRoute;

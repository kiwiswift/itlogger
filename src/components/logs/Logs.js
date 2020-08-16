import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

/*

Here is an example of using redux with react. 

For an overview, refer to Lecture 83 - Connecting Redux to a component (8:30)
*/

//Since this component is connected to redux we bring in the state and the actions
// we want to run in the component as props.
//The state is the same that has been converted from state to props method below
const Logs = ({ logState: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }
  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

Logs.propTypes = {
  logState: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

//In order to bring the state to the component, we need to map the state to props by doing this:
const mapStateToProps = (state) => ({
  logState: state.logState,
});
/*
Instead of bringing the whole state, we could also do:
```
    const mapStateToProps = (state) => ({
      logs: state.logState.logs,
      loading: state.logState.loading
    });
```
If that is the case, we need to change the props declaration for the component as:
```
const Logs = ({ logs, loading }) => {

```
*/
//Here, we connect redux to the React Component, by returning the connect method with the
//maps State to Props method as a parameter, together with an object with all actions we
//want to run in this component
export default connect(mapStateToProps, { getLogs })(Logs);

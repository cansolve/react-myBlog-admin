import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Action from '../action';

function mapStateToProps(state) {
	return {
		...state.reducers
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Action, dispatch);
}

function Dispatch(module) {
	return connect(mapStateToProps, mapDispatchToProps)(module)
}

export default Dispatch;
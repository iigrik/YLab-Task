import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from "../../store/actions";
import ListInlineEditing from "../../components/lists/list-inline-editing";

class ListInlineEditingContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch( actions.list.getData() );
  }

  onChangeFinishItem = (id, value) => {
    this.props.dispatch(actions.list.update(id, value));
  }

  render() {
    const data = this.props.list.data;
    return (
      <ListInlineEditing
        data={data}
        onChangeFinishItem={this.onChangeFinishItem}
      />
    );
  }
}

export default connect(state => ({
  list: state.list
}))(ListInlineEditingContainer);

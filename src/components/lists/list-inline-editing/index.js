import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.less';
import ListItem from './list-item';

export default class ListInlineEditing extends Component {

  static propTypes = {
    data: PropTypes.array,
    onChangeFinishItem: PropTypes.func
  };

  generateDataTree(dataArray) {
    const map = {};
    const dataTree = [];

    for (let i = 0; i < dataArray.length; i++) {
        map[dataArray[i]._id] = i;
        dataArray[i].items = [];
    }

    for (let i = 0; i < dataArray.length; i++) {
        const node = dataArray[i];

        if (node.parent !== null) {
            dataArray[map[node.parent]].items.push(node);
        } else {
            dataTree.push(node);
        }
    }

    return dataTree;
  }

  render() {
    const data = this.props.data;

    if (data) {
      const dataTree = this.generateDataTree(data);
      const titleData = dataTree[0];
      const {_id, items, title} = titleData;

      return (
        <div className="ListInlineEditingBlock">
          <ListItem
            id={_id}
            title={title}
            items={items}
            onChangeFinish={this.props.onChangeFinishItem}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ListItem from '../list-item';
import './style.less';

export default class List extends Component {

  static propTypes = {
    items: PropTypes.array,
    onChangeFinishItem: PropTypes.func
  };

  render() {
    const items = this.props.items.map((itemData, index) =>
      <li
        key={index}
        className={cn("ListInlineEditing__item", {"ListInlineEditing__item_not_first": index > 0})}
      >
        <ListItem
          id={itemData._id}
          title={itemData.title}
          items={itemData.items}
          isEditable={true}
          onChangeFinish={this.props.onChangeFinishItem}
        />
      </li>
    );
    return (
      <ul className="ListInlineEditing">
        {items}
      </ul>
    );
  }

}

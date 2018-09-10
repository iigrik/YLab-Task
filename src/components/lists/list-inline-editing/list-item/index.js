import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import List from '../list';
import ListItemInput from './list-item-input';
import './style.less';

export default class ListItem extends Component {

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    items: PropTypes.array,
    onChangeFinish: PropTypes.func,
    isEditable: PropTypes.bool
  };

  static defaultProps = {
    isEditable: false,
  };

  constructor(props) {
    super(props);
    this.state = ({
      title: this.props.title,
      isEditing: false,
      isInputValid: true
    });

    this.titleSaved
  }

  handleTitleClick = () => {
    this.setState({
      isEditing: true
    });
  }

  handleInputOnChange = (value) => {
    this.setState({
      title: value
    }, () => {
      this.validateInput();
    });
  }

  handleInputOnBlur = () => {
    this.handleInputChangesEnd();
  }

  handleInputKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleInputChangesEnd();
    }
  }

  handleInputChangesEnd = () => {
    const isValid = this.state.isInputValid;
    if (isValid) {
      this.setState({
        isEditing: false
      }, () => {
        const id = this.props.id;
        const value = this.state.title;
        this.props.onChangeFinish(id, value);
      });
    }
  }

  validateInput = () => {
    const isValidOld = this.state.isInputValid;
    const isLengthValid = this.validateInputLength(this.state.title);
    if (isLengthValid != isValidOld) {
      this.setState({
        isInputValid: isLengthValid
      });
    }
  }

  validateInputLength = (value) => {
    if (value.length > 0 && value.length < 256) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {title, isEditing} = this.state;
    const {items, isEditable} = this.props;
    const isInputValid = this.state.isInputValid;

    return (
      <div className="ListItem">
        <div className="ListItem__header">
          <span className={cn("ListItem__title", {"ListItem__title_editing": isEditing})}>
            <span className={cn("ListItem__title-text", {"ListItem__title-text_editable": isEditable})}>
              {title}
              {isEditable &&
                <button
                  className="ListItem__editButton"
                  onClick={isEditing ? null : this.handleTitleClick}
                  type="button"
                  hidden
                >
                  редактировать
                </button>
              }
            </span>
          </span>
          {isEditing &&
            <div className="ListItem__input">
              <ListItemInput
                value={title}
                isValid={isInputValid}
                onChange={this.handleInputOnChange}
                onBlur={this.handleInputOnBlur}
                onKeyPress={this.handleInputKeyPress}
              />
            </div>
          }
        </div>
        {items.length > 0 &&
          <div className="ListItem__subitems">
            <List
              items={items}
              onChangeFinishItem={this.props.onChangeFinish}
            />
          </div>
        }
      </div>
    );
  }

}

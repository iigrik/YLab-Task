import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './style.less';

export default class ListItemInput extends Component {

  static propTypes = {
    value: PropTypes.node.isRequired,
    isEditing: PropTypes.bool,
    isValid: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    isEditing: false,
    isValid: true,
    onBlur: () => {
    },
    onChange: () => {
    },
    onKeyPress: () => {
    }
  };

  onChange = (e) => {
    const value = e.target.value;
    return this.props.onChange(value);
  };

  onBlur = () => this.props.onBlur();

  onKeyPress = (e) => {
    this.props.onKeyPress(e);
  };

  constructor(props) {
    super(props);
    this.state = ({
      value: this.props.value,
      isValid: true
    });
  }

  componentDidMount() {
    this.element.focus();
  }

  render() {
    const value = this.props.value;
    const isValid = this.props.isValid;
    return (
      <div className="ListItemInput">
        <input
          className={cn("ListItemInput__field", {"ListItemInput__field_theme_error": !isValid})}
          value={value}
          type="text"
          tabIndex="-1"
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyPress={this.onKeyPress}
          ref={(input) => {this.element = input;}}
        />
        {!isValid &&
          <div className="ListItemInput__error">!</div>
        }
      </div>
    );
  }

}

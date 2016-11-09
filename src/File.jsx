var React = require('react');
var Radium = require('radium');
var PureMixin = require('react-pure-render/mixin');
var Button = require('./Button');
var colors = require('./stylesVariables').colors;

var styles = {
  file: {
    position: 'absolute',
    overflow: 'hidden',
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    font: 'inherit',
    zIndex: '-1'
  },

  focus: {
    outline: '-webkit-focus-ring-color auto 5px'
  },

  input_file_errors: {
    font: 'inherit',
    color: colors.danger
  }
};

var File = React.createClass({
  mixins: [PureMixin],

  componentWillMount: function () {
    this.setState({
      isFocus: false,
      isValid: !this.props.required
    });
  },

  onFocus: function () {
    this.setState({isFocus: true});
  },
  onBlur: function () {
    this.setState({isFocus: false});
  },
  onChange: function () {
    this.setState({isValid: this.isValid()});
  },

  isRequireValid: function () {
    var isValid = true;

    if (this.props.required) {
      if (!this.refs.file || this.refs.file.files.length === 0) {
        isValid = false;
      }
    }

    return isValid;
  },

  isValid: function () {
    return this.isRequireValid();
  },

  getValue: function () {
    var value;

    if (this.props.multiple) {
      value = this.refs.file.files;
    } else {
      value = this.refs.file.files[0];
    }

    return value;
  },

  render: function () {
    var props = this.props,
        isValid = this.state.isValid,
        text = 'Choose a file...',
        focusStyle = this.state.isFocus ? styles.focus : null;

    if (this.refs.file) {
      if (this.refs.file.files.length === 1) {
        text = this.refs.file.files[0].name;
      } else if (this.refs.file.files.length > 1) {
        text = this.refs.file.files.length + ' files selected';
      }
    }

    return (
      <div>
        <label style={focusStyle}>
          <input
            key="file"
            ref="file"
            type="file"
            style={styles.file}
            name={props.name}
            accept={props.accept}
            multiple={props.multiple}
            required={props.required}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          <Button
            type="div"
            display={props.display || 'block'}
            text={text}
            logo="FaUpload"
            color={isValid ? colors.success : colors.danger}
          />
        </label>
      </div>
    )
  }
});

module.exports = Radium(File);

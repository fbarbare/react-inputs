var React = require('react');
var Radium = require('radium');
var Map = require('immutable').Map;
var List = require('immutable').List;
var fromJS = require('immutable').fromJS;
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
          <input key="file" ref="file" style={styles.file} type="file" name={props.name} accept={props.accept} onChange={this.onChange} required={props.required} multiple={props.multiple} onFocus={this.onFocus} onBlur={this.onBlur}/>
          <Button text={text} color={this.state.isValid ? 'success' : 'danger'} logo="FaUpload" display="block" type="div" />
        </label>
        <div style={styles.input_file_errors}>
          {!this.isRequireValid()
            ? <div>This field is required</div>
            : null
          }
        </div>
      </div>
    )
  }
});

module.exports = Radium(File);

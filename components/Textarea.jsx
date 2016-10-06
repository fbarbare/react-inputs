var React = require('react');
var Radium = require('radium');
var PureMixin = require('react-pure-render/mixin');
var colors = require('./stylesVariables').colors;

var styles = {
  textarea_input: {
    boxSizing: 'border-box',
    display: 'block',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: colors.dark2,
    borderRadius: '2px',
    padding: '2px 5px',
    width: '100%',
    font: 'inherit',
    color: colors.dark2
  },
  textarea_input_error: {
    borderColor: colors.danger
  },
  textarea_input_valid: {
    borderColor: colors.success
  },

  textarea_errors: {
    color: colors.danger
  }
};

var Textarea = React.createClass({
  mixins: [PureMixin],

  componentWillMount: function () {
    this.validate();
  },
  componentDidMount: function () {
    this.validate();
  },

  validate: function () {
    var requireValid = this.isRequireValid();
    var valueValid = this.isValueValid();
    var state = this.state || {};

    if (requireValid !== state.requireValid || valueValid !== state.valueValid) {
      this.setState({requireValid, valueValid});
    }
  },

  isRequireValid: function () {
    var isValid = true;

    if (this.props.required) {
      if (!this.refs.textarea || !this.refs.textarea.value) {
        isValid = false;
      }
    }

    return isValid;
  },
  isValueValid: function () {
    var isValid = true;

    if (this.props.pattern) {
      var regExp = new RegExp('^' + this.props.pattern + '$');
      var value = this.refs.textarea ? this.refs.textarea.value : '';

      if (value && !regExp.test(value)) {
        isValid = false;
      }
    }

    return isValid;
  },

  isValid: function () {
    return this.state.requireValid && this.state.valueValid;
  },
  getValue: function () {
    return this.refs.textarea.value;
  },

  render: function () {
    var props = this.props,
        status = '',
        css = {};

    if (this.isValid()) {
      status = 'valid';
    } else {
      status = 'error';
    }

    if (props.resize) {
      css.resize = props.resize;
    }

    return (
      <div>
        <label>
          <textarea ref="textarea" style={[styles.textarea_input, css, styles['textarea_input_' + status]]} onChange={this.validate} name={props.name} placeholder={props.placeholder || ''} autoComplete={props.autoComplete} required={props.required} defaultValue={props.defaultValue} />
        </label>
        <div style={styles.textarea_errors}>
          {!this.state.requireValid
            ? <div>This field is required</div>
            : null
          }
          {!this.state.valueValid
            ? <div>{props.errorMessage || 'The value entered is not valid'}</div>
            : null
          }
        </div>
      </div>
    )
  }
});

module.exports = Radium(Textarea);

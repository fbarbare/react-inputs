var React = require('react');
var Radium = require('radium');
var PureMixin = require('react-pure-render/mixin');
var colors = require('./stylesVariables').colors;

var styles = {
  input_text_input: {
    boxSizing: 'border-box',
    display: 'block',
    margin: '0',
    borderTop: '0',
    borderLeft: '0',
    borderRight: '0',
    borderBottom: 'solid 1px',
    borderColor: colors.dark2,
    width: '100%',
    font: 'inherit',
    color: colors.dark2,
    outline: 'none'
  },
  input_text_input_error: {
    borderColor: colors.danger
  },
  input_text_input_valid: {
    borderColor: colors.success
  },

  input_text_errors: {
    color: colors.danger
  }
};

var Text = React.createClass({
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
      if (!this.refs.input || !this.refs.input.value) {
        isValid = false;
      }
    }

    return isValid;
  },

  isValueValid: function () {
    var isValid = true;

    if (this.props.pattern) {
      var regExp = new RegExp('^' + this.props.pattern + '$');
      var value = this.refs.input ? this.refs.input.value : '';

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
    return this.refs.input.value;
  },

  render: function () {
    var props = this.props,
        statusClassName = '';

    if (this.isValid()) {
      statusClassName = 'valid';
    } else {
      statusClassName = 'error';
    }

    return (
      <div style={styles.input_text}>
        <label>
          <input ref="input" type={props.type || 'text'} style={[styles.input_text_input, styles['input_text_input_' + statusClassName]]} name={props.name} onChange={this.validate} placeholder={props.placeholder || ''} autoComplete={props.autoComplete} required={props.required} defaultValue={props.defaultValue} />
        </label>
        <div style={styles.input_text_errors}>
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

module.exports = Radium(Text);

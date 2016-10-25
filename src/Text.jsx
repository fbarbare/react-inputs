var React = require('react');
var Radium = require('radium');
var PureMixin = require('react-pure-render/mixin');
var colors = require('./stylesVariables').colors;

var styles = {
  input: {
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
    backgroundColor: 'inherit',
    outline: 'none'
  },
  input_error: {
    borderColor: colors.danger
  },
  input_valid: {
    borderColor: colors.success
  },

  errors: {
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
    var isValid = this.isValid();

    if (!this.state || isValid !== this.state.isValid) {
      this.setState({isValid});
    }
  },

  isValid: function () {
    var isValid = true;

    if (this.refs.input) {
      isValid = this.refs.input.checkValidity();
    } else if (this.props.required) {
      isValid = false;
    }

    return isValid;
  },

  getValue: function () {
    return this.refs.input.value;
  },

  render: function () {
    var props = this.props,
        isValid = this.state.isValid;

    return (
      <div>
        <label>
          <input ref="input" type={props.type || 'text'} style={[styles.input, isValid ? styles['input_valid'] : styles['input_error']]} name={props.name} onChange={this.validate} placeholder={props.placeholder || ''} defaultValue={props.defaultValue} autoComplete={props.autoComplete} autoFocus={props.autoFocus} pattern={props.pattern} required={props.required} />
        </label>
        <div style={styles.errors}>
          {props.errorMessage && !isValid
            ? <div>{props.errorMessage}</div>
            : null
          }
        </div>
      </div>
    )
  }
});

module.exports = Radium(Text);

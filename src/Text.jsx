var React = require('react');
var Radium = require('radium');
var PureMixin = require('react-pure-render/mixin');
var Color = require('color');
var Icons = require('react-icons/lib/fa');
var colors = require('./stylesVariables').colors;

var styles = {
  label: {
    position: 'relative',
    display: 'inline-block',
    width: '100%'
  },
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
    backgroundColor: 'inherit',
    outline: 'none'
  },
  input_error: {
    borderColor: colors.danger
  },
  input_valid: {
    borderColor: colors.success
  },
  input_icon: {
    paddingLeft: '25px'
  },

  icon: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    display: 'inline-block',
    textAlign: 'left',
    fontSize: '16px'
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

  getColor: function () {
    return this.props.color || 'inherit';
  },

  getValue: function () {
    return this.refs.input.value;
  },

  render: function () {
    var props = this.props,
        color = this.getColor(),
        isValid = this.state.isValid,
        Icon = props.logo ? Icons[props.logo] : null;

    return (
      <div>
        <label style={styles.label}>
          <input
            ref="input"
            type={props.type || 'text'}
            style={[
              styles.input,
              {color},
              isValid ? styles['input_valid'] : styles['input_error'],
              Icon ? styles.input_icon : null
            ]}
            name={props.name}
            onChange={this.validate}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            autoComplete={props.autoComplete}
            autoFocus={props.autoFocus}
            pattern={props.pattern}
            required={props.required}
          />
          {Icon
            ? <div style={[styles.icon, {color}]}>
                <Icon />
              </div>
            : null
          }
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

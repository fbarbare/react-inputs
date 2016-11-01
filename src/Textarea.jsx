var React = require('react');
var Radium = require('radium');
var PureMixin = require('react-pure-render/mixin');
var colors = require('./stylesVariables').colors;

var styles = {
  input: {
    boxSizing: 'border-box',
    display: 'block',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '2px',
    padding: '2px 5px',
    width: '100%',
    lineHeight: 1.2,
    fontSize: 'inherit',
    fontFamily: 'inherit'
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

var Textarea = React.createClass({
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

    if (this.refs.textarea) {
      isValid = this.refs.textarea.checkValidity();
    } else if (this.props.required) {
      isValid = false;
    }

    return isValid;
  },
  getValue: function () {
    return this.refs.textarea.value;
  },

  getHeight: function () {
    return ((this.props.numberOfLines || 3) * 1.2 * 14) + 4;
  },
  getColor: function () {
    return this.props.color || '#000';
  },

  render: function () {
    var props = this.props,
        color = this.getColor(),
        height = this.getHeight(),
        isValid = this.state.isValid;

    return (
      <div>
        <label>
          <textarea
            ref="textarea"
            style={[
              styles.input,
              {height: height + 'px', color, borderColor: color, resize: props.resize || 'both'},
              isValid ? styles['input_valid'] : styles['input_error']
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

module.exports = Radium(Textarea);

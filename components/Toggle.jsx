var React = require('react');
var Radium = require('radium');
var PureMixin = require('react-pure-render/mixin');
var colors = require('./stylesVariables').colors;

var width = 30;

var styles = {
  checkbox: {
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1'
  },

  focus: {
    outline: '-webkit-focus-ring-color auto 5px'
  },

  input_toggle_label: {
    display: 'inline-block',
    cursor: 'pointer'
  },

  input_toggle_container: {
    position: 'relative',
    margin: '5px ' + (width/3) + 'px',
    borderRadius: '2.5px',
    width: width + 'px',
    height: (width*2/3) + 'px'
  },

  input_toggle_rail: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    borderRadius: (width/3) + 'px',
    width: '100%',
    height: 'calc(100% * 2 / 3)',
    opacity: '0.1',
    background: colors.dark3,
    transition: '.1s 0s ease-in-out'
  },

  input_toggle_ball: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    margin: 'auto',
    transform: 'translateX(-50%)',
    borderRadius: '50%',
    width: 'calc(100% * 2 / 3)',
    height: '100%',
    background: colors.dark3,
    transition: '.1s 0s ease-in-out'
  },

  input_toggle_rail_enabled: {
    background: colors.success
  },
  input_toggle_ball_enabled: {
    left: '100%',
    background: colors.success
  }
};


var Toggle = React.createClass({
  mixins: [PureMixin],

  componentWillMount: function () {
    this.setState({
      isFocused:false,
      checked: !!this.props.defaultChecked
    });
  },
  componentDidMount: function () {
    this.onChange();
  },

  onBlur: function () {
    this.setState({isFocused: false});
  },
  onFocus: function () {
    this.setState({isFocused: true});
  },
  onChange: function () {
    this.setState({checked: this.refs.checkbox.checked});
  },

  isValid: function () {
    return true;
  },
  getValue: function () {
    return this.refs.checkbox.checked;
  },

  render: function () {
    var status = '';

    if (this.state.checked) {
      status = 'enabled';
    }

    return (
      <div style={[styles.input_toggle, styles['input_toggle_' + status]]}>
        <label style={[styles.input_toggle_label, this.state.isFocused ? styles.focus : null]}>
          <input ref="checkbox" type="checkbox" style={styles.checkbox} name={this.props.name} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} defaultChecked={this.props.defaultChecked} />
          <div style={styles.input_toggle_container}>
            <div style={[styles.input_toggle_rail, styles['input_toggle_rail_' + status]]}></div>
            <div style={[styles.input_toggle_ball, styles['input_toggle_ball_' + status]]}></div>
          </div>
        </label>
      </div>
    )
  }
});

module.exports = Radium(Toggle);

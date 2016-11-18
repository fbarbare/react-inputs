var React = require('react');
var Radium = require('radium');
var PureMixin = require('react-pure-render/mixin');
// var Icons = require('react-icons/lib/fa');

var styles = {
  label: {
    boxSizing: 'border-box',
    display: 'inline-block',
    margin: 0,
    borderRadius: '2px',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: 0,
    cursor: 'pointer'
  },
  label_display_inline: {
    padding: '2px 4px',
    width: '40px',
    height: '30px'
  },
  label_display_block: {
    padding: '5px 7px',
    width: '100%',
    height: '40px'
  },

  input: {
    boxSizing: 'border-box',
    margin: 0,
    border: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    cursor: 'pointer'
  }
};

var Color = React.createClass({
  mixins: [PureMixin],

  getDisplay: function () {
    return this.props.display || 'block';
  },
  getColor: function () {
    return this.props.color || '#000';
  },

  getValue: function () {
    return this.refs.input.value;
  },

  render: function () {
    var props = this.props,
        display = this.getDisplay(),
        color = this.getColor();

    return (
      <div>
        <label style={[
          styles.label,
          {borderColor: color},
          styles['label_display_' + display]
        ]}>
          <input
            ref="input"
            type="color"
            name={props.name}
            style={styles.input}
            defaultValue={props.defaultValue}
            autoComplete={props.autoComplete}
            autoFocus={props.autoFocus}
          />
        </label>
      </div>
    )
  }
});

module.exports = Radium(Color);

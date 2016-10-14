var React = require('react');
var Radium = require('radium');
var Map = require('immutable').Map;
var List = require('immutable').List;
var fromJS = require('immutable').fromJS;
var PureMixin = require('react-pure-render/mixin');
var Button = require('./Button');
var colors = require('./stylesVariables').colors;

var styles = {
  select_section: {
    position: 'relative'
  },

  select_label: {
    position: 'relative',
    display: 'block'
  },

  select: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'block',
    border: '0',
    width: '100%',
    font: '14px',
    color: 'transparent',
    background: 'transparent',
    cursor: 'pointer'
  },

  select_option: {
    color: '#000000'
  }
};

var Select = React.createClass({
  mixins: [PureMixin],

  componentWillMount: function () {
    this.setOptions(undefined, this.props.options);
  },

  componentWillReceiveProps(nextProps) {
    this.setOptions(this.props.options, nextProps.options);
  },

  setOptions(oldOptions, newOptions) {
    oldOptions = fromJS(oldOptions || []);
    newOptions = fromJS(newOptions || []);

    if (!this.state || (this.state && !this.state.options) || !newOptions.equals(oldOptions)) {
      var options = newOptions.map(function (option) {
        return Map({
          text: option.get('text'),
          value: option.get('value'),
          selected: option.get('selected') || false
        });
      });

      this.setState({options: options});
    }
  },

  onChange: function () {
    var value = this.refs.select.value;
    var options = this.state.options.map(function (option) {
      return Map({
        text: option.get('text'),
        value: option.get('value'),
        selected: option.get('value') === value
      });
    });

    this.setState({options: options});

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  },

  isValid: function () {
    return true;
  },

  getValue: function () {
    return this.refs.select.value;
  },

  render: function () {
    var props = this.props,
        selectedOptions,
        selectedOption;

    selectedOptions = this.state.options.filter(function (option) {
      return option.get('selected');
    });
    selectedOption = selectedOptions.get(0) || Map();

    return (
      <div style={styles.select_section}>
        <label style={styles.select_label}>
          <Button text={selectedOption.get('text') || props.defaultText || 'Select an option'} logo="FaAngleDown" logo-side="right" type="div" display="block" color={props.color} colorHover={props.colorHover} />
          <select ref="select" style={styles.select} name={props.name} onChange={this.onChange}>
            {this.state.options.map(function (option) {
              return <option key={'select-' + props.name + '-' + option.get('value')} style={styles.select_option} value={option.get('value')} defaultValue={option.get('selected')}>{option.get('text')}</option>
            })}
          </select>
        </label>
      </div>
    )
  }
});

module.exports = Radium(Select);

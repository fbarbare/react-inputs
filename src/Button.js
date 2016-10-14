var React = require('react');
var Radium = require('radium');
var Link = require('react-router').Link;
var PureMixin = require('react-pure-render/mixin');
var Icons = require('react-icons/lib/fa');
var colors = require('./stylesVariables').colors;

var styles = {
  button: {
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'top',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: '2px',
    borderColor: 'transparent',
    padding: '10px 0',
    textDecoration: 'none',
    font: 'inherit',
    backgroundColor: 'transparent',
    backgroundClip: 'padding-box',
    cursor: 'pointer',
    transition: '.1s 0s ease-in-out'
  },

  button_type_button: {
    ':focus': {
      outline: '-webkit-focus-ring-color auto 5px'
    }
  },

  button_size_standard: {
    padding: '5px 0'
  },

  logo: {
    display: 'table-cell',
    verticalAlign: 'middle',
    color: 'inherit'
  },
  logo_centering: {
    display: 'block',
    marginTop: '-2px'
  },

  separator: {
    display: 'table-cell',
    borderRight: 'solid 1px',
    borderColor: 'inherit',
    verticalAlign: 'middle',
    transition: 'border 1s 0s ease-in-out'
  },

  text: {
    display: 'table-cell',
    textAlign: 'left',
    wordBreak: 'break-all'
  },
  text_display_block: {
    width: '100%'
  },
  text_display_inline: {
    width: 'initial'
  }
};

var Component = React.createClass({
  mixins: [PureMixin],

  getEvents: function () {
    var eventNames = ['onClick'],
        events = {};

    for (var i = eventNames.length - 1; i >= 0; i--) {
      if (this.props.hasOwnProperty(eventNames[i])) {
        events[eventNames[i]] = this.props[eventNames[i]];
      }
    }

    return events;
  },

  render: function () {
    var props = this.props,
        container,
        attributes = this.getEvents(),
        size = props.size || 'big',
        type = props.type || 'div',
        display = props.display || 'block',
        color = colors[props.color || 'dark2'] || props.color,
        colorHover = colors[props.colorHover || 'light1'] || props.colorHover,
        colorStyle = {color: color, borderColor: color, ':hover': {color: colorHover, backgroundColor: color}},
        content = this.getContent(size, display, color, colorHover);

    if (props.keyName) {
      attributes.key = props.keyName;
    }

    attributes.style = [styles.button, styles['button_size_' + size], styles['button_type_' + type], colorStyle];

    if (props.href) {
     attributes.to = props.href;
     attributes.target = props.target;

      return (
        <Link {...attributes}>
          {content}
        </Link>
      )
    } else if (props.type === 'button') {
      return (
        <button {...attributes}>
          {content}
        </button>
      )
    } else {
      return (
        <div {...attributes}>
          {content}
        </div>
      )
    }
  },

  getContent: function (size, display, color, colorHover) {
    var padding = size === 'standard' ? '0 10px' : '0 20px';
    var elements = [];
    var Icon = 'span';
    var logo;
    var text;
    var separator;

    if (this.props.logo) {
      if (Icons[this.props.logo]) {
        Icon = Icons[this.props.logo];
      } else {
        console.error('The logo "' + this.props.logo + '" does not exist');
      }
    }

    logo = <span key="button-logo" style={[styles.logo, {padding}]}><span style={styles.logo_centering}><Icon type={this.props.logo} /></span></span>;
    separator = <span key="button-separator" style={[styles.separator, {':hover': {borderColor: colorHover}}]}></span>;
    text = <span key="button-text" style={[styles.text, styles['text_display_' + display], {padding}]}>{this.props.text}</span>;

    if (this.props['logo-side'] === 'right') {
      if (this.props.text) {
        elements.push(text);
      }

      if (this.props.logo && this.props.text) {
        elements.push(separator);
      }

      if (this.props.logo) {
        elements.push(logo);
      }
    } else {
      if (this.props.logo) {
        elements.push(logo);
      }

      if (this.props.logo && this.props.text) {
        elements.push(separator);
      }

      if (this.props.text) {
        elements.push(text);
      }
    }

    return (
      <div>
        {elements.map(function (element) { return element; })}
      </div>
    );
  }
});

module.exports = Radium(Component);

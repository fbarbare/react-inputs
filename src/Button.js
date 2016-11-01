var React = require('react');
var Radium = require('radium');
var Link = require('react-router').Link;
var LinkRadium = Radium(Link);
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

  button_display_block: {
    width: '100%'
  },

  content: {
    display: 'table',
    width: '100%'
  },

  logo: {
    boxSizing: 'border-box',
    display: 'table-cell',
    verticalAlign: 'middle',
    color: 'inherit'
  },
  logo_size_standard: {
    padding: '0 10px'
  },
  logo_size_big: {
    padding: '0 20px'
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
    boxSizing: 'border-box',
    display: 'table-cell',
    textAlign: 'center',
    wordBreak: 'break-all'
  },
  text_size_standard: {
    padding: '0 10px'
  },
  text_size_big: {
    padding: '0 20px'
  },
  text_display_block: {
    width: '100%'
  },
  text_display_inline: {
  }
};

var Button = React.createClass({
  mixins: [PureMixin],

  getType: function () {
    return this.props.type || 'div';
  },
  getSize: function () {
    return this.props.size || 'big';
  },
  getDisplay: function () {
    return this.props.display || 'block';
  },
  getColor: function () {
    return this.props.color || '#000';
  },
  getColorHover: function () {
    return this.props.colorHover || '#fff';
  },

  render: function () {
    var props = this.props,
        attributes = {},
        type = this.getType(),
        size = this.getSize(),
        display = this.getDisplay(),
        color = this.getColor(),
        colorHover = this.getColorHover();

    if (props.onClick) {
      attributes.onClick = props.onClick;
    }

    if (props.keyName) {
      attributes.key = props.keyName;
    }

    attributes.style = [
      styles.button,
      styles['button_type_' + type],
      styles['button_size_' + size],
      styles['button_display_' + display],
      {
        color: color,
        borderColor: color,
        ':hover': {
          color: colorHover,
          backgroundColor: color
        }
      }
    ];

    if (props.href) {
     attributes.to = props.href;
     attributes.target = props.target;

      return (
        <LinkRadium {...attributes}>
          {this.getContent()}
        </LinkRadium>
      )
    } else if (props.type === 'button') {
      return (
        <button {...attributes}>
          {this.getContent()}
        </button>
      )
    } else {
      return (
        <div {...attributes}>
          {this.getContent()}
        </div>
      )
    }
  },

  getContent: function (size, display, color, colorHover) {
    var props = this.props,
        type = this.getType(),
        size = this.getSize(),
        display = this.getDisplay(),
        color = this.getColor(),
        colorHover = this.getColorHover();

    return (
      <div style={styles.content}>
        {(function () {
          if (props.logo) {
            let Icon = Icons[props.logo] || 'span';

            return (
              <span key="button-logo" style={[styles.logo, styles['logo_size_' + size]]}>
                <span style={styles.logo_centering}>
                  <Icon />
                </span>
              </span>
            );
          }
        })()}
        {props.logo && props.text
          ? <span key="button-separator" style={[styles.separator, {':hover': {borderColor: colorHover}}]}></span>
          : null
        }
        {props.text
          ? <span key="button-text" style={[styles.text, styles['text_size_' + size], styles['text_display_' + display]]}>{props.text}</span>
          : null
        }
        {props.logoRight && props.text
          ? <span key="button-separator" style={[styles.separator, {':hover': {borderColor: colorHover}}]}></span>
          : null
        }
        {(function () {
          if (props.logoRight) {
            let Icon = Icons[props.logoRight] || 'span';

            return (
              <span key="button-logo" style={[styles.logo, styles['logo_size_' + size]]}>
                <span style={styles.logo_centering}>
                  <Icon />
                </span>
              </span>
            );
          }
        })()}
      </div>
    );
  }
});

module.exports = Radium(Button);

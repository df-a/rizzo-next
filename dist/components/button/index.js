"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _radium = require("radium");

var _radium2 = _interopRequireDefault(_radium);

var _settings = require("../../../sass/settings.json");

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  base: {
    appearance: "none",
    backfaceVisibility: "hidden",
    border: 0,
    borderRadius: 0,
    cursor: "pointer",
    display: "inline-block",
    fontWeight: 600,
    lineHeight: 1,
    outline: "none",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    textAlign: "center",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "color 400ms, border 400ms, background-color 400ms",
    verticalAlign: "middle",
    whiteSpace: "nowrap",

    ":hover": {
      textDecoration: "none"
    },
    ":focus": {
      textDecoration: "none"
    },
    ":active": {
      textDecoration: "none"
    }
  },

  color: {
    blue: {
      backgroundColor: _settings2.default.color.blue,
      color: _settings2.default.color.white,

      ":hover": {
        backgroundColor: _settings2.default.color.blue, // + 15
        color: _settings2.default.color.white
      },
      ":focus": {
        backgroundColor: _settings2.default.color.blue, // + 15
        color: _settings2.default.color.white
      },
      ":active": {
        backgroundColor: _settings2.default.color.blue, // + 15
        color: _settings2.default.color.white
      }
    },

    white: {
      backgroundColor: _settings2.default.color.white,
      color: _settings2.default.color.blue,

      ":hover": {
        backgroundColor: _settings2.default.color.white,
        color: _settings2.default.color.blue },
      ":focus": {
        backgroundColor: _settings2.default.color.white,
        color: _settings2.default.color.blue },
      ":active": {
        backgroundColor: _settings2.default.color.white,
        color: _settings2.default.color.blue }
    }
  },

  size: {
    tiny: {},
    small: {},
    medium: {
      fontSize: "1.2rem"
    },
    large: {},
    huge: {}
  },

  height: {
    short: {
      paddingBottom: "1rem",
      paddingTop: "1.2rem"
    },
    normal: {
      paddingBottom: "1.4rem",
      paddingTop: "1.8rem"
    },
    tall: {
      paddingBottom: "2rem",
      paddingTop: "2.3rem"
    }
  },

  type: {
    rounded: {
      borderRadius: "2.2rem"
    },
    full: {
      display: "block",
      width: "100%"
    }
  }
};

/**
 * Button component
 *
 * @usage
 * <Button href="/foo">Bar</Button>
 */

// import color from "color";
function Button(_ref) {
  var href = _ref.href,
      children = _ref.children,
      onClick = _ref.onClick,
      color = _ref.color,
      size = _ref.size,
      height = _ref.height,
      rounded = _ref.rounded,
      full = _ref.full;

  var Element = href ? "a" : "button";
  var role = Element === "a" ? "button" : "";

  var style = [styles.base];

  if (color) {
    style.push(styles.color[color]);
  }

  if (size) {
    style.push(styles.size[size]);
  }

  if (height) {
    style.push(styles.height[height]);
  }

  if (rounded) {
    style.push(styles.type.rounded);
  }

  if (full) {
    style.push(styles.type.full);
  }

  return _react2.default.createElement(
    Element,
    {
      className: "Button",
      style: style,
      href: href,
      onClick: onClick,
      role: role
    },
    children
  );
}

Button.propTypes = {
  /**
   * Pass an href prop to make the Button an `a` element instead of a `button`
   */
  href: _react2.default.PropTypes.string,

  /**
   * Content for the button
   */
  children: _react2.default.PropTypes.node.isRequired,

  /**
   * Function to run when the button is clicked
   */
  onClick: _react2.default.PropTypes.func,

  /**
   * Color of the button
   */
  color: _react2.default.PropTypes.oneOf(["blue", "white"]),

  /**
   * Size of the button
   */
  size: _react2.default.PropTypes.oneOf(["tiny", "small", "medium", "large", "huge"]),

  /**
   * Height of the button
   */
  height: _react2.default.PropTypes.oneOf(["short", "normal", "tall"]),

  /**
   * Use a rounded button
   */
  rounded: _react2.default.PropTypes.bool,

  /**
   * Allow button to span available width
   */
  full: _react2.default.PropTypes.bool
};

Button.defaultProps = {
  href: "",

  onClick: null,

  color: "blue",

  size: "medium",

  height: "normal",

  rounded: true,

  full: false,

  children: "Button"
};

exports.default = (0, _radium2.default)(Button);
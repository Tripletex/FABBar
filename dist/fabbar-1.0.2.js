;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.FABBar = factory();
  }
}(this, function() {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This FAB-bar exposes a row of secondary FAB buttons when clicked or on hover.
 *
 * You can choose in which direction the secondary buttons goes with a parameter.
 * Position of the FAB-bar is done with CSS. In this example, I use the style
 * classes upperLeft, lowerRight, etc ... but that is up to whoever uses this
 * component.
 *
 * The actions are given by an array of objects:
 *
 * { action, icon, label, url, target }
 *
 * action is a js function executed on click. If given an url, the button is
 * turned in to a normal link (able to right-click > Open Link in New Tab).
 * This link can also be given a target (optional).
 *
 * The icon must be a Material Icons icon, only using the text content.
 *
 * Per default, clicking on any secondary button closes the FAB bar again. This
 * can be avoided by giving an function as action that returns true.
 *
 * The secondary buttons can be used both as links, function buttons and both.
 *
 * The primary button can turn into a action button, with the attribute
 * primaryAction set to true. This uses the first given action as the primary
 * action.
 *
 * When setting openOnHover or alwaysOpen to true, the primary button will
 * always work as an action button.
 *
 * alwaysOpen will show all the buttons ALL THE TIME.
 *
 *
 * TODO:
 * - Clicking outside FAB Speed Dial closes it.
 * - On mobile, white transparent overlay on whole screen.
 * - Different color when button is active.
 *
 */

function FAB(_ref) {
  var style = _ref.style,
      onClick = _ref.onClick,
      href = _ref.href,
      _ref$target = _ref.target,
      target = _ref$target === undefined ? '' : _ref$target,
      icon = _ref.icon,
      label = _ref.label,
      primary = _ref.primary,
      _ref$staticLabel = _ref.staticLabel,
      staticLabel = _ref$staticLabel === undefined ? false : _ref$staticLabel;

  return React.createElement(
    'a',
    { style: style,
      role: 'menuitem',
      href: href,
      target: target,
      'aria-label': label,
      onClick: onClick,
      className: 'tlx-material-fab-button ' + (primary ? 'primary' : 'secondary') },
    React.createElement(
      'i',
      { className: 'material-icons tlx-fab-bar--icon' },
      icon
    ),
    staticLabel ? React.createElement(
      'span',
      { 'class': 'tlx-fab-bar--label' },
      label
    ) : null
  );
}

var FABBarModal = function (_React$Component) {
  _inherits(FABBarModal, _React$Component);

  function FABBarModal(props) {
    _classCallCheck(this, FABBarModal);

    var _this = _possibleConstructorReturn(this, (FABBarModal.__proto__ || Object.getPrototypeOf(FABBarModal)).call(this, props));

    _this.state = {
      open: props.alwaysOpen,
      direction: props.direction || 'up',
      primaryActive: false
    };
    return _this;
  }

  // Open/closes the FAB Bar


  _createClass(FABBarModal, [{
    key: 'openClose',
    value: function openClose() {
      var _this2 = this;

      this.setState(function (prevState) {
        return { open: !prevState.open };
      });
      if (this.props.primaryAction || this.props.openOnHover || this.props.direction === 'menu') {
        setTimeout(function () {
          return _this2.setState(function (prevState) {
            return { primaryActive: prevState.open };
          });
        }, 100);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      if (this.props.closeOnScroll) {
        this.scrollHandler = function () {
          _this3.state.open && _this3.openClose();
        };
        window.addEventListener('scroll', this.scrollHandler);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.closeOnScroll) {
        window.removeEventListener('scroll', this.scrollHandler);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var openClose = this.openClose.bind(this);
      var props = this.props;
      var orientation = props.direction === 'up' || props.direction === 'down' ? 'vertical' : 'horizontal';
      var primaryAction = props.primaryAction !== undefined ? props.primaryAction : props.alwaysOpen || props.openOnHover;
      var primary = primaryAction ? props.actions[0] : {};
      var staticLabels = this.props.direction === 'menu';

      var classes = ['tlx-fab-bar', 'tlx-fab-bar--' + (this.state.open ? 'open' : 'closed'), 'tlx-fab-bar--' + props.direction,
      // This style class is inserted/removed 100ms after menu is open/closed
      // For making animations betterish
      this.state.primaryActive ? 'tlx-fab-bar--primaryActive' : '', props.className].join(' ');

      return [this.props.isModal ? React.createElement('div', { 'class': 'tlx-fab-bar-overlay tlx-fab-bar-overlay' + (this.state.open ? '--open' : '--closed'), onClick: openClose }) : null, React.createElement(
        'div',
        { className: classes,
          style: this.props.style,
          role: 'toolbar',
          'aria-expanded': this.state.open,
          'aria-orientation': orientation,
          'aria-haspopup': 'true',
          onMouseEnter: props.openOnHover && !props.alwaysOpen ? openClose : undefined,
          onMouseLeave: props.openOnHover && !props.alwaysOpen ? openClose : undefined },
        React.createElement(FAB, { icon: this.state.primaryActive && props.alwaysOpen ? primary.icon : 'close',
          href: primary.url,
          target: primary.target,
          label: primary.label || props.label,
          staticLabel: staticLabels,
          primary: 'true',
          onClick: function onClick() {
            (_this4.state.primaryActive || props.alwaysOpen) && primary.action && primary.action();
            if (props.openOnHover || _this4.props.alwaysOpen) return;
            openClose();
          } }),
        React.createElement(
          'div',
          { className: 'tlx-fab-bar--link-container' },
          props.actions.slice(primaryAction ? 1 : 0).map(function (button) {
            function onClick() {
              if (props.openOnHover || props.alwaysOpen) {
                button.action && button.action();
                return;
              }
              var ceepOpen = button.action && button.action();
              if (!ceepOpen) {
                openClose();
              }
            }

            return React.createElement(FAB, { icon: button.icon,
              href: button.url,
              target: button.target,
              staticLabel: staticLabels,
              label: button.label,
              onClick: onClick });
          })
        )
      )];
    }
  }]);

  return FABBarModal;
}(React.Component);

var FABBar = function (_React$Component2) {
  _inherits(FABBar, _React$Component2);

  function FABBar(props) {
    _classCallCheck(this, FABBar);

    var _this5 = _possibleConstructorReturn(this, (FABBar.__proto__ || Object.getPrototypeOf(FABBar)).call(this, props));

    _this5.rootSelector = document.querySelector('body');
    _this5.container = document.createElement('div');
    return _this5;
  }

  _createClass(FABBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootSelector.appendChild(this.container);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.rootSelector.removeChild(this.container);
    }
  }, {
    key: 'render',
    value: function render() {
      return ReactDOM.createPortal(React.createElement(FABBarModal, this.props), this.container);
    }
  }]);

  return FABBar;
}(React.Component);
return FABBar;
}));

//# sourceMappingURL=fabbar-1.0.2.js.map

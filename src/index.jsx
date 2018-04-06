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

function FAB({style, onClick, href, target = '', icon, label, primary, staticLabel=false}) {
  return (
    <a style={style}
       role="menuitem"
       href={href}
       target={target}
       aria-label={label}
       onClick={onClick}
       className={'tlx-material-fab-button ' + (primary ? 'primary' : 'secondary')}>
      <i className="material-icons tlx-fab-bar--icon">{icon}</i>
      {staticLabel ? <span className="tlx-fab-bar--label">{label}</span> : null}
    </a>
  );
}

class FABBarModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: props.alwaysOpen,
      direction: props.direction || 'up',
      primaryActive: false
    };
  }

  // Open/closes the FAB Bar
  openClose() {
    this.setState(prevState => ({open: !prevState.open}));
    if(this.props.primaryAction || this.props.openOnHover || this.props.direction === 'menu') {
      setTimeout(() => this.setState(prevState => ({primaryActive: prevState.open})), 100);
    }
  }

  componentDidMount() {
    if(this.props.closeOnScroll) {
      this.scrollHandler = () => {
        this.state.open && this.openClose();
      };
      window.addEventListener('scroll', this.scrollHandler);
    }
  }

  componentWillUnmount() {
    if(this.props.closeOnScroll) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  render() {
    const openClose = this.openClose.bind(this);
    const props = this.props;
    const orientation = props.direction === 'up' || props.direction === 'down' ? 'vertical' : 'horizontal';
    const primaryAction = props.primaryAction !== undefined ? props.primaryAction : props.alwaysOpen || props.openOnHover;
    const primary = primaryAction ? props.actions[0] : {};
    const staticLabels = this.props.direction === 'menu';

    const classes = [
      'tlx-fab-bar',
      'tlx-fab-bar--' + (this.state.open ? 'open' : 'closed'),
      'tlx-fab-bar--' + props.direction,
      // This style class is inserted/removed 100ms after menu is open/closed
      // For making animations betterish
      this.state.primaryActive ? 'tlx-fab-bar--primaryActive' : '',
      props.className
    ].join(' ');


    return (
      [this.props.isModal ? <div className={'tlx-fab-bar-overlay tlx-fab-bar-overlay' + (this.state.open ? '--open' : '--closed')} onClick={openClose}></div> : null,
      <div className={classes}
		   style={this.props.style}
           role="toolbar"
           aria-expanded={this.state.open}
           aria-orientation={orientation}
           aria-haspopup="true"
           onMouseEnter={
             props.openOnHover && !props.alwaysOpen ? openClose : undefined
           }
           onMouseLeave={
             props.openOnHover && !props.alwaysOpen ? openClose : undefined
           }>

        <FAB icon={this.state.primaryActive && props.alwaysOpen ? primary.icon : 'close' }
             href={primary.url}
             target={primary.target}
             label={primary.label || props.label}
             staticLabel={staticLabels}
             primary="true"
             onClick={() => {
               (this.state.primaryActive || props.alwaysOpen) && primary.action && primary.action();
               if(props.openOnHover || this.props.alwaysOpen) return;
               openClose();
             }} />

         <div className="tlx-fab-bar--link-container">
        {props.actions.slice(primaryAction ? 1 : 0).map(
          button => {
            function onClick() {
              if(props.openOnHover || props.alwaysOpen) {
                button.action && button.action();
                return;
              }
              const ceepOpen = button.action && button.action();
              if(!ceepOpen) {
                openClose();
              }
            }

            return <FAB icon={button.icon}
                        href={button.url}
                        target={button.target}
                        staticLabel={staticLabels}
                        label={button.label}
                        onClick={onClick} />;
        })}
         </div>
      </div>]
    );
  }
}

class FABBar extends React.Component {
  constructor(props) {
    super(props);
    this.rootSelector = document.querySelector('body');
    this.container = document.createElement('div');
  }

  componentDidMount() {
    this.rootSelector.appendChild(this.container);
  }

  componentWillUnmount() {
    this.rootSelector.removeChild(this.container);
  }

  render () {
    return ReactDOM.createPortal(<FABBarModal {...this.props} />, this.container);
  }
}

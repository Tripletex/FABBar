# FABBar


This is a React implementation of a Floating Action Button, as described by the
[Material Design guidelines](https://material.io/guidelines/components/buttons-floating-action-button.html).

The following features are implemented:

+ **Toolbar**: Opens from the bottom right.
+ **Menu**: Opens from the bottom right.
+ **Speed dial**: New buttons flow out from FAB in one of four directions.



All animations are done with CSS. There are currently no touch ripples when
interacting with button.


## Usage


```
ReactDOM.render(
  <FABBar
      className="upperRight"
      alwaysOpen={false}
      direction="down"
      actions={actions}
      closeOnScroll={true}
      openOnHover={false}
      isModal={false}
      primaryAction={false}
  />,
  document.getElementById('fabbutton')
)

```

### Options

+ ***actions*** The actions and icons used for the different buttons. An array
  of JS-objects, which consists of:
⋅⋅+ `action`: A js function that runs when clicking on button.
⋅⋅+ `url`: The button behaves just like a link.
⋅⋅+ `label`: Used as a label for menu. Should also be used as tooltip (not implemented)
⋅⋅+ `icon`: A Material Icons icon, used for the button.
+ ***className*** is just used as-is in the `class` attribute.
+ ***alwaysOpen*** The FAB Bar starts as open, and can not be closed. Should only
  be used with Speed Dial, but you should consider avoiding this usage either way.
+ ***direction*** Speed dial specific: which direction the smaller buttons should flow.
+ ***closeOnScroll*** Closes the widget when users scroll. Handy for toolbar on mobile.
+ ***openOnHover*** Open the widgets on hower. Just like the speed dial on Google Inbox.
+ ***isModal*** Places an overlay over the screen when FABBar is open.
+ ***primaryAction*** When true, the FAB button itself becomes an action when FABBar is open.



### Installation

```
npm install fabbar
```


You can either use the compiled distributed files from `dist` or the raw
source-code from `src`, depending on your needs.

In `src` you will find React jsx components, where `FABBar` is the one you would
want to import into your project. You also find scss code for buttons, menu and
toolbar. If you don't intend to use toolbar or menu, you can simply skip
importing these files from your scss code.

What would be the simplest way for you to use/import this package? Let us
know! :-)

In `dist` you will find transpiled javascript and css. These can be sent as-is
directly to the browser. The javascript-file can also be used as an AMD or
CommonJS module.


# Behavior

This is a React 16.2.0 component. It relies on React portals to make sure your
FAB will display "correctly" even if you don't run it from a React application.

This means that no matter where you place the button, it will be appended as a
direct child of body. Thus it will placed above everything else on the screen
(with a fixed position).

All animations are done with CSS and class toggling from js. We hope this will
give a nice performance even on slower devices.

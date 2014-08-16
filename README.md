# Marionette.TemplateManager

> Load and cache external templates in Marionette with jQuery. Returns a promise.

Useful for preloading external templates in Marionette applications.

## Usage

```js
// Create an instance
var templateManager = new Marionette.TemplateManager();

// Add templates to the cache
templateManager.template('hello');
templateManager.template('world');

// Compile templates and use with promises
templateManager.template('hello')
    .done(function () {
        var MyView = Backbone.Marionette.ItemView.extend({
            template: 'hello'
        });

        new MyView().render();
    });
```

## API

### Marionette.TemplateManager(options)

Create the TemplateManager object. Pass in an options object to override the default setting.

#### options.dirname

Type: `String`  
Default: `js/templates/`  

Specify the path to the template file.

#### options.extname

Type: `String`  
Default: `.html`  

Specify the template file extension name.

## License 

The MIT License

Copyright (c) 2014, Jonathan Kemp

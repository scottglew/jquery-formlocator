jQuery Form Locator
===================

Stop asking users for their country or state when filling out a form on your site. Apply this plugin to any form to automatically add hidden (or visible) fields to the form with the user's location information. Alternatively populate your own form's fields with location data.

Demos
-----
* [Default (No Options)](http://jsfiddle.net/scottglew/RmrnV/)
* [Hidden](http://jsfiddle.net/scottglew/RmrnV/1/)
* [Populating existing form fields](http://jsfiddle.net/scottglew/RmrnV/2/)
* [Without Fieldset](http://jsfiddle.net/scottglew/RmrnV/3/)
* [Custom Fieldset Class](http://jsfiddle.net/scottglew/RmrnV/4/)
* [Show Specific Fields](http://jsfiddle.net/scottglew/RmrnV/5/)
* [Show Specific Fields and Label (with custom label)](http://jsfiddle.net/scottglew/RmrnV/6/)


Usage
-----

    $("#myForm").formLocator();

Options
-------

    $("#myForm").formLocator({
        serviceURL : "http://freegeoip.net/json/", // this service returns a json object of location data. See fieldOverrides below for list of fields returned. 
        hidden : false, // creates all the new location fields as hidden fields. 
        inputClass : "lc8_input", // specify a custom class for the text input fields that get created. Separate multiple classes with spaces (class1 class2 class3)
        labelClass : "lc8_label", // specify a custom class for the label fields that get created. Separate multiple classes with spaces (class1 class2 class3)
        useFieldset : true, // when true, wraps all the created fields in a <fieldset></feildset>
        fieldSetClass : "lc8_fieldset", //specify a custom class for the field set. Separate multiple classes with spaces (class1 class2 class3)
        fieldOverrides : // override the display and styles of specific fields. Also use this object to populate your own form fields with location data instead of appending new fields to your form.
          {
            ip : {
              hidden : true, // shows/hides this field. Overrides the global settings.hidden option for this field.
              showLabel : false, // shows/hides this field's label.
              inputID : "myCustomInput", // specify an ID if you want to populate one of your own form's text inputs. Otheriwse, a text input field will be created and appended to the form.
              labelID : "myCustomLabel", // specify an id if you want to populate your own label field.
              labelText : "My Custom Label Text" // your own custom label text. Otherwise the default field names are used (such as country_name, metro_code etc).
            },
            country_code: {
              ...
            },
            country_name : {
              ...
            },
            region_code: {
              ...
            },
            region_name: {
              ...
            },            
            city: {
              ...
            },
            zipcode: {
              ...
            },
            latitude: {
              ...
            },
            longitude: {
              ...
            },
            metro_code: {
              ...
            },
            areacode: {
              ...
            }
    });

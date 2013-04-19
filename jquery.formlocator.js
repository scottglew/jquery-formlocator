(function( $ ) {
    var settings;

    var getLocation = function (callback) {
      $.getJSON(settings.serviceURL,
          function(data){
            callback(data);
       });
    }

    var createInput = function(field, val){
      var input = document.createElement("input");
      
      if (settings.fieldOverrides[field]) {
        if (settings.fieldOverrides[field].hidden === undefined) {
          input.type = (settings.hidden) ? "hidden" : "text";
        }
        else {
          input.type = (settings.fieldOverrides[field].hidden)  ? "hidden" : "text";
        }
        input.className = settings.inputClass + " lc8_input ";
        input.id = (settings.fieldOverrides[field].inputID) || "lc8_" + field;
      }
      else {
        input.type = (settings.hidden) ? "hidden" : "text";
        input.className = settings.inputClass;
        input.id = "lc8_" + field;
      }
      input.value = val;
      return input;
    }

    var createLabel = function(field) {
      var label = document.createElement("label");
      if (settings.fieldOverrides[field]) {
        label.id = (settings.fieldOverrides[field].labelID) || "lc8_" + field + "_label";
        label.setAttribute("for", (settings.fieldOverrides[field].inputID) || "lc8_" + field);
        if (settings.fieldOverrides[field].showLabel === undefined) {
          if (settings.hidden) {
            label.setAttribute("style", "display : none");
          }
        }
        else if (!settings.fieldOverrides[field].showLabel) {
          label.setAttribute("style", "display : none");
        }
        label.innerHTML = (settings.fieldOverrides[field].labelText) || field;
      }
      else {
        label.id = "lc8_" + field + "_label";
        label.setAttribute("for", "lc8_" + field);
        if (settings.hidden) {
          label.setAttribute("style", "display : none");
        }
        label.innerHTML = field;
      }
      label.setAttribute("name", field);
      label.className = settings.labelClass + " lc8_label";
      return label;
    }

    var appendFormFields = function (data){
      var inputType = settings.hidden ? "hidden" : "text",
         fieldsetDisplay = settings.hidden ? "none" : "block",
         id = settings.useFieldset ? "lc8_info" : settings.formID,
         input,
         label,
         $el;

      if (settings.useFieldset && $("#lc8_info").length < 1) {
        $("#" + settings.formID).append("<fieldset id=\"lc8_info\" class=\"lc8_fieldset " + settings.fieldSetClass + "\" style=\"display : " + fieldsetDisplay + "\" ></fieldset>");
      }

      $el = $("#" + id);
      
      $.each(data, function(i, val){
          var $inpt, $lbl;
          
          if (settings.fieldOverrides.hasOwnProperty(i)) {
            $inpt = $("#" + settings.fieldOverrides[i].inputID);
            $lbl = $("#" + settings.fieldOverrides[i].labelID);
            if ($inpt.length > 0)
              $inpt.val(val);
            if (settings.fieldOverrides[i].hidden) {
              $inpt.hide();
            }
            if ($lbl.length > 0)
              $lbl.text(settings.fieldOverrides[i].labelText || i);
            if (!settings.fieldOverrides[i].showLabel) {
              $lbl.hide();
            }
          }

          if ($inpt === undefined || $inpt.length < 1){
            input = createInput(i, val);
            $inpt = $(input);
            $el.append($inpt[0]);
          }
          if ($lbl === undefined || $lbl.length < 1) {
            label = createLabel(i);
            $lbl = $(label);
            $inpt.before($lbl[0]);
          }
      });
     
    }

    var locate = function locate (){
      getLocation(function(result) {
          appendFormFields(result);
      });
    }
  
    var methods = {
        init : function( options ) { 
        
        settings = $.extend( {
            serviceURL : "http://freegeoip.net/json/", // returns json object of location data. See fieldOverrides below for list of fields returned. 
            hidden : false, // creates all the new location fields as hidden fields. 
            inputClass : "lc8_input", // specify a custom class for the text input fields that get created. Separate multiple classes with spaces (class1 class2 class3)
            labelClass : "lc8_label", // specify a custom class for the label fields that get created. Separate multiple classes with spaces (class1 class2 class3)
            useFieldset : true, // when true, wraps all the created fields in a <fieldset></feildset>
            fieldSetClass : "lc8_fieldset", //specify a custom class for the field set. Separate multiple classes with spaces (class1 class2 class3)
            fieldOverrides : // over ride the display and styles of specific fields. Also use this object to populate your own form fields with the locaiton data instead of appending new fields to your form.
              {
               /* 
                ip : {
                  hidden : true, // shows/hides this field. If settings.hidden is true, you can use this to hide specific fields. Or if settings.hidden is false, use this to show specific fields.
                  showLabel : false, // shows/hides this field's label.
                  inputID : "myCustomInput", // specify an id if you want to populate one of your own form's text inputs. Otheriwse, a text input field will be created and appended to the form.
                  labelID : "myCustomLabel", // specify an id if you want to populate your own label field.
                  labelText : "My Custom Label Text" // your own custom label text. Otherwise the default field names are used (such as country_name, metro_code etc).
                },
                country_name : {
                  ...
                },
                areacode: {
                  ...
                },
                city: {
                  ...
                },
                country_code: {
                  ...
                },
                country_name: {
                  ...
                },
                ip: {
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
                region_code: {
                  ...
                },
                region_name: {
                  ...
                },
                zipcode: {
                  ...
                }
                */
            }
        }, options);  
          
        settings.formID = this[0].id;
              
        locate();
        return this; //maintain chainability
      },

      update : function() {
        locate();
      }
  }; 
    
  $.fn.formLocator = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist' );
    }    
  
  };
})( jQuery );
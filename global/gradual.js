Macro.add('gradual_end',
{
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "";

        var sv = State.variables;

    	content += "<<set $gradual_current_trigger to -1>>";

        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
   	}
})

Macro.add('gradual_include',
{
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "";

        var sv = State.variables;

        var set_state = this.args[0];

        content += "<span id =\"gradual_" + String(set_state) + "\"></span>";

        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
   	}
})

Macro.add('gradual_trigger',
{
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "";

        var sv = State.variables;

        var trigger_link = this.args[0];
        var link_location = this.args[1];
        var set_state = this.args[2];
        var keep_link_text = this.args[3];

        if(sv.gradual_current_trigger < set_state)
        {
        	content += "<<linkreplace \"" + trigger_link + "\">>\ ";
            if(keep_link_text)
            {
                content += trigger_link;
            }				
                content += "<<set $gradual_current_trigger to " + String(set_state) + ">>\
                            <<replace #gradual_" + String(set_state) + ">>\
                                <div class=\"gradual_transition\"><<include "+ link_location + ">></div>\
                            <</replace>>";
            content += "<</linkreplace>>";   
        }
                            
        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
   	}
})

 
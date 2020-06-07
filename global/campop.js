Macro.add('campop_mod',
{
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "";

        var sv = State.variables;
        var tv = State.temporary;

        var current_campop_mod = 0;
        while(tv["campop_mod_" + String(current_campop_mod)] != null)
        {
        	current_campop_mod++;
        }

        tv["campop_mod_" + String(current_campop_mod)] = true; 

        var has_timeout_effect = true;
        var has_ban_effect = true;

        if(this.args[0] == null || this.args[0] == 0)
        {
        	has_timeout_effect = false;
        }
       
       	if(this.args[2] == null || this.args[2] == 0)
        {
        	has_ban_effect = false;
        }


        console.log(has_timeout_effect);
        console.log(has_ban_effect);
        //Timeout section

        content += "<span id=\"campop_timeout_"+String(current_campop_mod)+"\">\
        				<<linkreplace \"Timeout \">>";

       	if(has_timeout_effect)
        {
        	content += "@@.ChatSystem;This user was timed out for 10 minutes @@";
        	content += "<<set $" + this.args[0] + " to " + String(this.args[1]) + ">>"; 
        }
        else
        {
        	content += "@@.PlayerThink;I see no reason to timeout this guy @@";
        }

        if(!has_ban_effect || (has_timeout_effect && has_ban_effect))
        { 
        	content += "<<replace #campop_ban_"+String(current_campop_mod)+">><</replace>>";
        }
        content += "<</linkreplace>></span>";

        //Ban section
        content += "<span id=\"campop_ban_"+String(current_campop_mod)+"\">\
        				<<linkreplace \"Ban \">>";

       	if(has_ban_effect)
        {
        	content += "@@.ChatSystem;This user was Banned from the channel. @@";
        	content += "<<set $" + this.args[2] + " to " + String(this.args[3]) + ">>"; 
        }
        else 
        {
        	content += "@@.PlayerThink;I see no reason to ban this guy. @@";
        }

        if(!has_timeout_effect || (has_timeout_effect && has_ban_effect))
        { 
        	content += "<<replace #campop_timeout_"+String(current_campop_mod)+">><</replace>>"
        }

        content += "<</linkreplace>></span>";

        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
   	}
})
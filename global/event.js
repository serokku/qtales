Macro.add('event_available',
{
	skipArgs : true,
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "";

        var sv = State.variables;

        if(Scripting.evalJavaScript(this.args.full))
        {
        	content += "@@.EventAvailable;! @@";
        }
  
        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
    }
})
Macro.add('first', {
    skipArgs : true,
        tags : ['then', 'finally'],
     handler : function () 
		{

        var $wrapper = $(document.createElement('span')),
            last     = this.payload[this.payload.length - 1],
            visits   = visited() - 1, 
            content;
            
            if (visits < this.payload.length) {
                content = this.payload[visits].contents;
            } else {
                content = (last.name === 'finally') ? last.contents : '';
            }

        $wrapper
            .wiki(content)
            .addClass('macro-' + this.name)
            .appendTo(this.output);
    }
});

Macro.add('player_name',
{
		handler  : function () 
		{
				var $wrapper = $(document.createElement('span'));
			
				$wrapper
						.wiki("<<print $player_name.toLocaleUpperCase()>>")
						.addClass('macro-' - this.name)
						.appendTo(this.output);
		}
})

Macro.add('toggle',
{
        handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                $wrapper
                        .wiki(" <<link \"toggle\">>\
                                    <<if "+this.args[0]+" is true>>\
                                        <<set "+this.args[0]+" to false>>\
                                    <<else>>\
                                        <<set "+this.args[0]+" to true>>\
                                    <<endif>>\
                                    <<goto `passage()`>>\
                                <</link>>")
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})
Macro.add('debug_manip',
{
        handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                $wrapper
                        .wiki(" <<minusminus \"" + this.args[0] + "\">> \
                                <<minus \"" + this.args[0] + "\">> \
                                <<plus \"" + this.args[0] + "\">> \
                                <<plusplus \"" + this.args[0] + "\">>")
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

Macro.add('minusminus',
{
        handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                $wrapper
                        .wiki(" <<link \"-5\">>\
                                    <<set " + this.args[0] + " to "+ String(get_story_variable(this.args[0])-5)+">>\
                                    <<goto `passage()`>>\
                                <</link>>")
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})


Macro.add('minus',
{
        handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                $wrapper
                        .wiki(" <<link \"-1\">>\
                                    <<set " + this.args[0] + " to "+ String(get_story_variable(this.args[0])-1)+">>\
                                    <<goto `passage()`>>\
                                <</link>>")
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

Macro.add('plus',
{
        handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                $wrapper
                        .wiki(" <<link \"+1\">>\
                                    <<set " + this.args[0] + " to "+ String(get_story_variable(this.args[0])+1)+">>\
                                    <<goto `passage()`>>\
                                <</link>>")
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

Macro.add('plusplus',
{
        handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                $wrapper
                        .wiki(" <<link \"+5\">>\
                                    <<set " + this.args[0] + " to "+ String(get_story_variable(this.args[0])+5)+">>\
                                    <<goto `passage()`>>\
                                <</link>>")
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})
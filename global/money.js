
Macro.add('buy',
{
    handler  : function () 
        {
                var sv = State.variables;

                var $wrapper = $(document.createElement('span'));

                var content = ""; 

                if(sv.cur_money - this.args[0] < 0)
                {
                    content = "You dont have enough money for this."
                }
                else
                {
                    content = "[[Buy|" + this.args[1] + "]]";
                }

                $wrapper
                        .wiki(content)
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})
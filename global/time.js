var day_dict = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function get_week_day(day_no)
{
    return day_dict[day_no%7];
}

function is_night()
{   
    var sv = State.variables;

    return !(parseInt(sv.time_h) > 6 && parseInt(sv.time_h) < 20);
}

function add_day(day)
{
    var sv = State.variables;

    sv.cur_day += day;
    sv.week_day = get_week_day(sv.cur_day);
}


function add_time(hour, min, ignore_decay=false)
{
    var sv = State.variables;

    if(ignore_decay == false)
    {
        add_var("hunger", sv.hunger_decay * (hour*60) + sv.hunger_decay*min);
        add_var("mood", sv.mood_decay * (hour*60) + sv.mood_decay*min);
        add_var("lust", sv.lust_decay * (hour*60) + sv.lust_decay*min);
    }

    sv.time_m = parseInt(sv.time_m) + min;
    sv.time_h = parseInt(sv.time_h) + hour;

    if(sv.time_m >= 60)
    {
        sv.time_m -= 60;
        sv.time_h += 1;
    }

    if(sv.time_m < 0)
    {
        sv.time_m += 60;
        sv.time_h -= 1;
    }

    if(sv.time_h >= 24)
    {
        sv.time_h -= 24;
        add_day(1);
    }

    if(sv.time_h < 0)
    {
        sv.time_h += 24;
        add_day(-1);
    }

    sv.time_m = pad(sv.time_m, 2);
    sv.time_h = pad(sv.time_h, 2);

    sv.is_night = is_night(); 
}

Macro.add('set_time_increment',
{
    handler  : function () 
    {   
        var sv = State.variables;
        if(this.args.length == 1)
        {
            sv.time_increment_hour = 0;
            sv.time_increment_min = this.args[0];
        }

        if(this.args.length == 2)
        {
            sv.time_increment_hour = this.args[0];
            sv.time_increment_min = this.args[1];
        }
    }
})

Macro.add('add_time',
{
    handler  : function () 
    {
        if(this.args.length == 1)
        {
            if(typeof this.args[0] == "number")
            {
                add_time(0, this.args[0], false);
            }
            else
            {
                console.log("ERROR WITH ADD_TIME MACRO, SEROKKU FUCKED UP, TELL HIM THAT.")
            }
        }

        if(this.args.length == 2)
        {
            if(typeof this.args[1] == "boolean")
            {
                add_time(0, this.args[0], this.args[1]);
            }
            else if(    typeof this.args[0] == "number" && 
                        typeof this.args[1] == "number")
            {
                add_time(this.args[0], this.args[1], false);
            }
            else
            {
                console.log("ERROR WITH ADD_TIME MACRO, SEROKKU FUCKED UP, TELL HIM THAT.")
            }
        }
        if(this.args.length == 3)
        {
            if( typeof this.args[0] == "number" && 
                typeof this.args[1] == "number" && 
                typeof this.args[2] == "boolean")
            {
                add_time(this.args[0], this.args[1], this.args[2]);
            }
            else
            {
                console.log("ERROR WITH ADD_TIME MACRO, SEROKKU FUCKED UP, TELL HIM THAT.")
            }
        }
    }
})

Macro.add('time_manip_minus',
{
        handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                $wrapper
                        .wiki(" <<link \"-5m\">>\
                                    <<add_time "+String(0)+" "+String(-5)+" true>>\
                                    <<goto `passage()`>>\
                                <</link>>\
                                <<link \"-30m\">>\
                                    <<add_time "+String(0)+" "+String(-30)+" true>>\
                                    <<goto `passage()`>>\
                                <</link>>\
                                <<link \"-1h\">>\
                                    <<add_time "+String(-1)+" "+String(0)+" true>>\
                                    <<goto `passage()`>>\
                                <</link>>\
                                <<link \"-1d\">>\
                                    <<add_time "+String(-24)+" "+String(0)+" true>>\
                                    <<goto `passage()`>>\
                                <</link>>")
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

Macro.add('time_manip_plus',
{
        handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                $wrapper
                        .wiki(" <<link \"+5m\">>\
                                    <<add_time "+String(0)+" "+String(5)+" true>>\
                                    <<goto `passage()`>>\
                                <</link>>\
                                <<link \"+30m\">>\
                                    <<add_time "+String(0)+" "+String(30)+" true>>\
                                    <<goto `passage()`>>\
                                <</link>>\
                                <<link \"+1h\">>\
                                    <<add_time "+String(1)+" "+String(0)+" true>>\
                                    <<goto `passage()`>>\
                                <</link>>\
                                <<link \"+1d\">>\
                                    <<add_time "+String(24)+" "+String(0)+" true>>\
                                    <<goto `passage()`>>\
                                <</link>>")
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})
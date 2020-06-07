var npc_schedule = [["phoebe", [["online", 10,0, 8,0], 
                                ["sleep",  20,0, 10,0]] ],
                    ["clint",  [["online", 20,0, 10,0], 
                                ["sleep",  10,0, 10,0]] ]];

function set_character_state(character, state_name, value)
{
    State.variables[character+'_'+state_name] = value;
}

function is_hour_in_range(start_day, start_hour, range_length)
{
    var sv = State.variables;

    var start_day_hour = start_day*24 + start_hour;
    var cur_day_hour = sv.cur_day*24 + parseInt(sv.time_h);

    if(cur_day_hour < (start_day_hour + range_length))
    {
        return true;
    }
    else
    {
        return false;
    }
}

Macro.add('override_state',
{
    handler  : function () 
    {
        var sv = State.variables;

        sv[this.args[0] + "_ow_state"] = this.args[2];
        sv[this.args[0] + "_ow_state_name"] = this.args[1];
        sv[this.args[0] + "_ow_start_day"] = sv.cur_day;
        sv[this.args[0] + "_ow_start_hour"] = parseInt(sv.time_h);
        sv[this.args[0] + "_ow_length"] = this.args[3];
        sv[this.args[0] + "_ow"] = true;
    }
})



function update_schedule()
{
    var sv = State.variables;

    for(var char of npc_schedule)
    {
        for(var state of char[1])
        {
            var start_h = state[1];
            var start_m = state[2];
            var length_h = state[3];
            var length_m = state[4];

            var end_h = start_h + length_h;
            var end_m = start_m + length_m;

            if(end_m > 60)
            {
                end_m = end_m - 60;
                end_h = end_h + 1;
            }

            if(end_h > 24)
            {
                end_h = end_h - 24
            }

            var current_h = parseInt(sv.time_h);
            var current_m = parseInt(sv.time_m);
            
            var in_state = false;

            if(start_h < end_h)
            {
                if( (current_h == start_h && current_m >= start_m) ||
                    (current_h > start_h && current_h < end_h) ||
                    (current_h == end_h && current_m < end_m))
                {
                    in_state = true;
                }
            }
            else
            {
                if( (current_h == start_h && current_m >= start_m) ||
                    (current_h > start_h || current_h < end_h) ||
                    (current_h == end_h && current_m < end_m))
                {
                    in_state = true;
                }
            }
                
            if( sv[char[0] + "_ow"] == true && 
                sv[char[0] + "_ow_state_name"] == state[0])
            {
                if(is_hour_in_range(    sv[char[0] + "_ow_start_day"], 
                                        sv[char[0] + "_ow_start_hour"], 
                                        sv[char[0] + "_ow_length"]))
                {
                    console.log("IN RANGE");
                    set_character_state(char[0], state[0], sv[char[0] + "_ow_state"]);
                }
                else
                {
                    sv[char[0] + "_ow"] = false;
                }
            }
            
            if( sv[char[0] + "_ow"] == false || 
                sv[char[0] + "_ow_state_name"] != state[0])
            {
                set_character_state(char[0], state[0], in_state);
            }
        }
    }
}
// first macro, by chapel; for sugarcube 2
// version 1.1.1
// see the documentation: https://github.com/ChapelR/custom-macros-for-sugarcube-2#first-macro

// <<first>> macro


function pad(num, size)
{
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function get_story_variable(variable_name)
{
    var r = State.variables[variable_name.slice(1)];
    return r;
}

function add_var(var_name, value)
{
    var sv = State.variables;

    switch(var_name)
    {
        case "hunger":
            sv.cur_hunger += value;
            sv.cur_hunger = Math.max(0, Math.min(sv.cur_hunger, sv.max_hunger));
            break;

        case "mood":
            sv.cur_mood += value;
            sv.cur_mood = Math.max(0, Math.min(sv.cur_mood, sv.max_mood));
            break;

        case "lust":
            sv.cur_lust += value;
            sv.cur_lust = Math.max(0, Math.min(sv.cur_lust, sv.max_lust));
            break;

        case "energy":
            console.log("ADDING ENERGY");
            console.log(sv.cur_energy);
            sv.cur_energy += value;
            sv.cur_energy = Math.max(0, Math.min(sv.cur_energy, sv.max_energy));
            console.log(sv.cur_energy);
            break;

        case "money":
            sv.cur_money += value;
            sv.cur_money = Math.max(0, sv.cur_money);
            break;

        case "supplies":
            sv.cur_supplies += value;
            sv.cur_supplies = Math.max(0, sv.cur_supplies);
            break;
    }
}

Macro.add('link_requirements',
{
    handler  : function () 
        {
                var sv = State.variables;

                var $wrapper = $(document.createElement('span'));

                var content = "";  

                var energy_condition = false;
                var hunger_condition = false;
                var mood_condition = false;
                var lust_condition = false;

                if(this.args[2] != null) 
                {
                    if(this.args[2] >= 0)
                    {
                        energy_condition = (sv.cur_energy >= this.args[2]);
                    }
                    else
                    {
                        energy_condition = (sv.cur_energy <= -this.args[2]);
                    }
                }   
                else
                {
                    energy_condition = true;
                }

                if(this.args[3] != null) 
                {
                    if(this.args[3] >= 0)
                    {
                        hunger_condition = (sv.cur_hunger/sv.max_hunger >= this.args[3]);
                    }
                    else
                    {
                        hunger_condition = (sv.cur_hunger/sv.max_hunger <= -this.args[3]);
                    }
                }   
                else
                {
                    hunger_condition = true;
                }

                if(this.args[4] != null) 
                {
                    if(this.args[4] >= 0)
                    {
                        mood_condition = (sv.cur_mood/sv.max_mood >= this.args[4]);
                    }
                    else
                    {
                        mood_condition = (sv.cur_mood/sv.max_mood <= -this.args[4]);
                    }
                }   
                else
                {
                    mood_condition = true;
                }

                if(this.args[5] != null) 
                {
                    if(this.args[5] >= 0)
                    {
                        lust_condition = (sv.cur_lust/sv.max_lust >= this.args[5]);
                    }
                    else
                    {
                        lust_condition = (sv.cur_lust/sv.max_lust <= -this.args[5]);
                    }
                }   
                else
                {
                    lust_condition = true;
                }

                if(energy_condition && hunger_condition && mood_condition && lust_condition)
                {
                    content = "[["+this.args[0]+"|"+this.args[1]+"]]";
                }
                else
                {
                    content += "<<linkreplace \"" + this.args[0] + "\" " + this.args[1] +">>";
                    content += "@@.Red;";

                    var had_previous = false;
                    
                    if(!energy_condition)
                    {
                        content += "Not enough energy, you need some rest.";
                        had_previous = true;
                    }

                    if(!hunger_condition)
                    {
                        if(had_previous) content += "\n";
                        if(this.args[3] >= 0)
                        {
                            content += "You are not hungry enough for this.";
                        }
                        else
                        {
                            content += "You are way too hungry, go eat something.";
                        }
                        had_previous = true;
                    }

                    if(!mood_condition)
                    {
                        if(had_previous) content += "\n";
                        if(this.args[4] >= 0)
                        {
                            content += "You are too depressed to do this right now.";
                        }
                        else
                        {
                            content += "You are feeling too good for this.";
                        }
                        had_previous = true;
                    }

                    if(!lust_condition)
                    {
                        if(had_previous) content += "\n";
                        if(this.args[5] >= 0)
                        {
                            content += "You are not aroused enough for this.";
                        }
                        else
                        {
                            content += "You are too aroused to do this right now.";
                        }
                        had_previous = true;
                    }

                    content += "@@<</linkreplace>>";
                }

                $wrapper
                        .wiki(content)
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

Macro.add('add',
{
    handler  : function () 
    {
        add_var(this.args[0], this.args[1]);
    }
})

Macro.add('sub',
{
    handler  : function () 
    {
        add_var(this.args[0], -this.args[1]);
    }
})


Config.navigation.override = function (dest)
{
    var sv = State.variables;
    
    if(dest != State.passage)
    {
        add_time(parseInt(sv.time_increment_hour), parseInt(sv.time_increment_min));
    }

    update_schedule();
}
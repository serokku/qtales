//Quest Format Bank[quest_id, quest_name, [quest_stages]]
var quests_bank = [ [0,"Intro",["Go check for supplies in the kitchen"]],
                    [1,"The search for work",[  "Talk to Clint about internet work, he's ususally online later on the day.",
                                                "Clint is working on it, give it a day.",
                                                "The new job software is installed, go check it out!"]],
                    [2,"Phoebe's New Groove",[  "Go help Phoebe with her stream."]],
                    [3,"The Little Shit Who Spied on me",[  "Talk with Clint.",
                                                            "Buy XJ-9 Hijacker.",
                                                            "Wait for drone, and hijack it."]]]

//Current Quests Format
//[[quest, current_stage]]

Macro.add('add_quest',
{
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "ERROR - NO SUCH QUEST, CONTACT SEROKKU, THIS SHOULDN'T HAPPEN, HE FUCKED UP";

        var sv = State.variables;
        var tv = State.temporary;

        var current_quests = State.variables.current_quests;

        for(var quest of quests_bank)
        {
            if(this.args[0] == quest[0])
            {
                var current_quest = [quest, 0];
                
                var quest_active = false;

                for(var active_quest of current_quests)
                {
                    if(active_quest[0][0] == current_quest[0][0])
                    {
                        quest_active = true;
                    }
                }

                if(quest_active)
                {
                    content = "";
                    break;
                }

                current_quests.push(current_quest);
                content = "@@.QuestNew;New Quest - " + quest[1] + "@@";
                break;
            }
        }

        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
   	}
})

Macro.add('set_quest_stage',
{
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "ERROR - THAT QUEST ISN'T IN THE CURRENT QUESTS LIST, CONTACT SEROKKU, THIS SHOULDN'T HAPPEN, HE FUCKED UP";

        var sv = State.variables;
        var tv = State.temporary;

        var current_quests = State.variables.current_quests;

        for(var quest of current_quests)
        {
            if(this.args[0] == quest[0][0])
            {
                if(this.args[1] == null)
                {
                    content = "ERROR - NO STAGE PROVIDED, CONTACT SEROKKU, THIS SHOULDN'T HAPPEN, HE FUCKED UP"
                    break;
                }

                quest[1] = this.args[1];
                content = "@@.QuestUpdate;Quest Updated - " + quest[0][1] + "@@";
                break;
            }
        }  

        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
    }
})

Macro.add('increment_quest_stage',
{
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "ERROR - THAT QUEST ISN'T IN THE CURRENT QUESTS LIST, CONTACT SEROKKU, THIS SHOULDN'T HAPPEN, HE FUCKED UP";

        var sv = State.variables;
        var tv = State.temporary;

        var current_quests = State.variables.current_quests;

        for(var quest of current_quests)
        {
            if(this.args[0] == quest[0][0])
            {
                quest[1] ++;
                content = "@@.QuestUpdate;Quest Updated - " + quest[0][1] + "@@";
                break;
            }
        }  

        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
    }
})

Macro.add('print_questlog',
{
    handler  : function () 
    {
        var $wrapper = $(document.createElement('span'));

        var content = "";

        var current_quests = State.variables.current_quests;

        for(var quest of current_quests)
        {
            var completed = false;

            if(quest[1] >= quest[0][2].length)
            {
                completed = true;
            }

            content += "@@.Quest;" + quest[0][1] + "";

            if(!completed)
            {
                content += " (Active) @@\n"
            }
            else
            {
                content += " (Completed) @@\n"
            }

            for(var i=0; i < quest[1]; i++)
            {
                content += "@@.QuestObjectiveCompleted;" + quest[0][2][i] + "@@\n";
            }
            
            if(!completed)
            {
                content += "@@.QuestObjectiveCurrent;" + quest[0][2][quest[1]] + "@@\n";
            }

            content += "\n";
        }

        console.log(current_quests.length);
        if(current_quests.length == 0)
        {
            console.log(current_quests.length);
            content = "There are no current quests!";
        }

        $wrapper
            .wiki(content)
            .addClass('macro-' - this.name)
            .appendTo(this.output);
    }
})

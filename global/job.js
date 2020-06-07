var job_porn_survey_imgs = ["images/job/porn_survey/0.webm",
							"images/job/porn_survey/1.webm",
							"images/job/porn_survey/2.webm",
							"images/job/porn_survey/3.jpg",
                            "images/job/porn_survey/4.webm",
                            "images/job/porn_survey/5.webm",
                            "images/job/porn_survey/6.webm",
                            "images/job/porn_survey/7.webm"];

var job_porn_survey_tags = [["Hetero", "2 People", "Amateur", "Anal"],
							["Hetero", "2 People", "BDSM", "Blowjob"],
							["Hetero", "4+ People", "Interracial", "Blowjob"],
							["Solo", "Facial"],
                            ["Solo"],
                            ["Solo", "Anal", "Amateur"],
                            ["Solo", "Amateur"],
                            ["Hetero", "2 People", "Anal"]];

var job_porn_survey_tags_all = ["Hetero", 
								"Gay", 
								"Lesbian", 
								"Solo", 
								"2 People", 
								"3 People", 
								"4+ People", 
								"Amateur", 
								"Anal",
								"BDSM", 
								"Blowjob", 
								"Facial",
								"Interracial"];

Macro.add('job_porn_survey_confirm',
{
    handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                var correct = true;

                for (var i = 0; i < job_porn_survey_tags_all.length; i++)
                {
                	console.log(State.temporary["porn_survey_tag_"+String(i)]);
                	if(State.temporary["porn_survey_tag_"+String(i)] != true)
                	{
                		correct = false;
                	}
                }

                var content;

                if(correct)
                {
                	content = "<<include job_survey_porn_correct>>";
                }
                else
                {
                	content = "<<include job_survey_porn_incorrect>>";
                }

                $wrapper
                        .wiki(content)
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

Macro.add('job_porn_survey_checkboxes',
{
    handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                var content = "";

                var i = 0;
                for(var tag of job_porn_survey_tags_all)
                {
                	var is_tag_correct = false;
                	
                	for(var correct_tag of job_porn_survey_tags[this.args[0]])
                	{
                		if(correct_tag == tag)
                		{
                			is_tag_correct = true;
                		}
                	}
                	
                	var checkbox_values = "";

                	if(is_tag_correct)
                	{
                		checkbox_values = "false true";
                	}
                	else
                	{
                		checkbox_values = "true false";
                	}

                	content += "<<checkbox \"_porn_survey_tag_" + String(i) + "\" " + checkbox_values + ">> " +  tag + "\n";
                	i++;
                }

                content += "\n<<linkreplace \"Confirm Categories\">><<job_porn_survey_confirm>><</linkreplace>>";

                $wrapper
                        .wiki(content)
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

Macro.add('job_porn_survey',
{
    handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                var image_num = job_porn_survey_imgs.length;
          		var selected_image = Math.floor(Math.random() * image_num);

                var image = "<<image \"" + job_porn_survey_imgs[selected_image] + "\">>";

                var content = image + "\n" + "<<job_porn_survey_checkboxes " + String(selected_image) + ">>";
                $wrapper
                        .wiki(content)
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})
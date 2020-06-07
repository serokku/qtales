Macro.add('image',
{
    handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                var content = "";
                
                if(this.args[0].slice(-4) == "webm")
                {
                    content = "<div align=\"center\"><video width=\"100%\" height=\"500px\" playsinline autoplay muted loop controls><source src=\"" + this.args[0] + "\" type=\"video/webm\"></video></div>"
                }
                else
                {
                    content = "<div align=\"center\"><img src=\"" + this.args[0] + "\" width=\"75%\"></div>";
                }
                
                $wrapper
                        .wiki(content)
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

Macro.add('show_random_image',
{
    handler  : function () 
        {
                var $wrapper = $(document.createElement('span'));

                var sv = State.variables;

                var image_num = image_list[this.args[0]].length;
                var selected_image = 0;

                if(image_num > 1)
                {
                    do
                    {
                        selected_image = Math.floor(Math.random() * image_num);
                    }
                    while(selected_image == sv.random_image_choice)
                }
            
                sv.random_image_choice = selected_image;

                var image = "<<image \"" + image_list[this.args[0]][selected_image] + "\">>";

                $wrapper
                        .wiki(image)
                        .addClass('macro-' - this.name)
                        .appendTo(this.output);
        }
})

/*
function get_image(folder, number)
{
    var found_file = false;
    var found_extension = null;

    for(var format of supported_formats)
    {
        var file = folder + "/" + String(number) + format; 

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
          if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
            found_file = true;
          }
        };
        xmlhttp.open("GET",file,true);
        xmlhttp.send();
    }

    if(found_file == false)
    {
        return null;
    }
    else
    {
        return format;
    }   
}

function get_number_of_images_at(folder)
{
    var count = 0;

    while(get_image(folder, count))
    {
        count++;
    }

    console.log("GOT " + String(count));
    return count;
}*/
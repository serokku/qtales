/* Health Bar code - Start */
window.Health = function (CurHP, MaxHP, BarID, Horizontal, Container) {
    if (Container == undefined) {
        Container = document;
    }
    var HP = parseInt((CurHP / MaxHP) * 100);
    if (HP < 0) HP = 0;
    if (HP > 100) HP = 100;
    var BarElement = $(Container).find("#" + BarID);
    if (Horizontal) {
        BarElement.css( { width : HP + "%" } );
    } else {
        BarElement.css( { height : HP + "%" } );
    }
    BarElement.attr("title", CurHP + "/" + MaxHP + " HP");
    $(Container).find("#" + BarID + "bkg").attr("title", CurHP + "/" + MaxHP + " HP");
};
/* Health Bar code - End */
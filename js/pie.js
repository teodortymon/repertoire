    function plotData(inputEvents, date_class, day_class) {
    var canvas;
    var ctx;
    var lastend = 0;
    var amount = 100/inputEvents.length;
    var Colors = {
    Powszechny: "#ECD078",
    Współczesny: "#D95B43",
    Narodowy: "#C02942",
    Rozmaitości: "#542437",
    Dramatyczny: "#53777A",
    };
    //canvas = document.getElementById("canvas");
    canvas = $("tr").find("." + date_class).find("#canvas").get(0);
    //console.log("." + date_class + "#canvas");
    //console.log(canvas);
    //canvas = $("#canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    var centerX = Math.floor(canvas.width / 2);
    var centerY = Math.floor(canvas.height / 2);
    var radius = Math.floor(canvas.width / 2);
    ctx.font = '21pt Lucida Sans Unicode';
    
    var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],width=w.innerWidth||e.clientWidth||g.clientWidth;
        
    if(width < 400){
        ctx.font = '19pt Lucida Sans Unicode';
        radius = Math.floor(canvas.width / 3);
    }
    
    $.each(inputEvents, function(index) {
        console.log("#"+inputEvents[index]["theatre"]);
        ctx.fillStyle = $("#"+inputEvents[index]["theatre"]).css('background-color');
//        ctx.fillStyle = Colors[inputEvents[index]["theatre"]];
        //console.log(ctx.fillStyle);
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        ctx.arc(centerX,centerY,radius,lastend,lastend+
                (Math.PI*2*(amount/100)),false);
//        ctx.lineWidth = 0.5;
//        ctx.strokeStyle = 'black';
//        ctx.stroke();
        ctx.lineTo(centerX,centerY);
        ctx.fill();
        lastend += Math.PI*2*(amount/100);
    });
        
    var background = $("body").css("background-color");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX,centerY,radius/1.5,lastend,lastend+ (Math.PI*2),false);
    ctx.lineTo(centerX,centerY);
    ctx.fill();
    lastend += Math.PI*2;
    
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle'; 
    ctx.fillText(day_class, centerX, centerY);
};
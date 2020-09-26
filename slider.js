$(document).ready(()=>{
    let x = 0 ;
    let ajax = new XMLHttpRequest();
        ajax.open("GET", "slider.json");
        ajax.send();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                showSlide(this.responseText);
            }
        }

    function showSlide(text){
        let obj = JSON.parse(text);
        let arraySlide = [];
        let len = obj.slider.length;
        let t ;
        
        for(i=0;i<len;i++){
            arraySlide[i] = '<div class="slide"><img src="img/'+ obj.slider[i].image+'"/></div>';
        };
        $("#slider").append(arraySlide);
        start();

		setInterval(function(){$(".slide img").css({
            "width": $("#main").width(),
            "height": $("#main").height()
        });},1);

		function start(){
            changeText(obj,x);
            changeSlide();
			stop();
            t = setInterval(()=>{ x++; 
                if(x >= len) x = 0;
                else if(x<0) x= len-1;
                changeText(obj,x);
                changeSlide(); },3000);
        };
        
        function stop(){
            clearInterval(t);
        };
        
        $(".numbers").append('<i class="fas fa-angle-left"></i>');
        for(i=0;i<len;i++){
            $(".numbers").append("<div>"+(i+1)+"</div>");
        };
        $(".numbers").append('<i class="fas fa-angle-right"></i>');
        $(".numbers div").click(function(){
            x = $(this).text()-1;
            start();
        });
        
        $(".fa-angle-right").click(function() {
            x++;
            if(x >= len) x = 0;
            else if(x<0) x= len-1;
            start();
        });
        $(".fa-angle-left").click(function(){
            x--;
            if(x >= len) x = 0;
            else if(x<0) x= len-1;
            start();
        });
        $(".numbers div:first-child").addClass("active");
        function changeText(obj ,x){
            $(".text h1").text(obj.slider[x].text.h1);
            $(".text p").text(obj.slider[x].text.p); 
            $("a").attr("href", obj.slider[x].url);
            $(".numbers div:nth-child("+(x+2)+")").addClass("active");
            $(".numbers div:nth-child("+(x+2)+")").siblings().removeClass("active");
        };

    };

    
    function changeSlide(){
        $("#slider").animate({ left:-100*x + "%"}, "slow");
    }
});
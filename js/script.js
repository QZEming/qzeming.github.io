(function(){
    let backTop = document.getElementById('backTop')
    window.addEventListener('scroll',function(){
        if(document.documentElement.scrollTop>document.documentElement.clientHeight&&backTop.className=="backTop icon-arrow-up hideBtn"){
            backTop.className = "backTop icon-arrow-up showBtn";
        }else if(document.documentElement.scrollTop<=document.documentElement.clientHeight&&backTop.className=="backTop icon-arrow-up showBtn"){
            backTop.className = "backTop icon-arrow-up hideBtn";
        }
    })
    backTop.addEventListener('click',function(){
        function move(){
            if(document.documentElement.scrollTop<10){
                document.documentElement.scrollTop = 0;
                return false;
            }else{
                document.documentElement.scrollTop-=document.documentElement.scrollTop/10
                return true;
            }
        }
        requestAnimationFrame(function fn(){
            if(move()){
                console.log(1)
                requestAnimationFrame(fn)
            }   
        })
    })
})()
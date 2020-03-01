(function(){
    // 回到顶部
    let backTop = document.getElementById("backTop")
    window.addEventListener("scroll",function(){
        if(document.documentElement.scrollTop>document.documentElement.clientHeight&&backTop.className=="backTop icon-arrow-up hideBtn"){
            backTop.className = "backTop icon-arrow-up showBtn"
        }else if(document.documentElement.scrollTop<=document.documentElement.clientHeight&&backTop.className=="backTop icon-arrow-up showBtn"){
            backTop.className = "backTop icon-arrow-up hideBtn"
        }
    })
    backTop.addEventListener("click",function(){
        function move(){
            if(document.documentElement.scrollTop<10){
                document.documentElement.scrollTop = 0
                return false
            }else{
                document.documentElement.scrollTop-=document.documentElement.scrollTop/10
                return true
            }
        }
        requestAnimationFrame(function fn(){
            if(move()){
                requestAnimationFrame(fn)
            }   
        })
    })
    // 侧边栏标签收起和展开
    let tagsSpread = document.querySelector("#tagsSpread")
    tagsSpread&&tagsSpread.addEventListener("click",()=>{
        document.querySelector("#tagsContainer").className = "asideContent spreadContainer"

    })
    let tagsPackUP = document.querySelector("#tagsPackUP")
    tagsPackUP&&tagsPackUP.addEventListener("click",()=>{
        document.querySelector("#tagsContainer").className = "asideContent shrinkContainer"
    })

    // 侧边栏分类收起和展开
    let categoriesSpread = document.querySelector("#categoriesSpread")
    categoriesSpread&&categoriesSpread.addEventListener("click",()=>{
        document.querySelector("#categoriesContaner").className = "asideContent spreadContainer"

    })
    let categoriesPackUP = document.querySelector("#categoriesPackUP")
    categoriesPackUP&&categoriesPackUP.addEventListener("click",()=>{
        document.querySelector("#categoriesContaner").className = "asideContent shrinkContainer"
    })
})()
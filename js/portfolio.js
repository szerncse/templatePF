const $CateList = document.querySelectorAll(".cateList li");
$CateList[0].classList.add("on")

const $container = document.querySelector(".port-content")

function PortfolioData(data){
    data.map((e,i)=>{
       
        let div = document.createElement("div");
        div.className = "bg-white mb-8 pt-12 group px-8 pb-16 rounded-md flex border dark:bg-[#272929] dark:text-[#ebf4f1] flex-wrap";


        let div_child1 = document.createElement("div");
        div_child1.className = "basis-[48%] relative mokup-img group-even:order-1 xl:group-even:order-2";

        for(let a = 1; a <= 3; a++){
            let div_= document.createElement("div");
            let img_= document.createElement("img");      
            img_.className = "w-full";
            img_.src = `images/mokup-${a}.png`;
            img_.alt = `mokup`;
            
           div_.appendChild(img_);
           div_child1.appendChild(div_);
                  
        }


        let div_child2 = document.createElement("div");
        div_child2.className = "basis-[52%] relative mokup-img group-even:order-2 xl:group-even:order-1 pt-10";

        let h3 = document.createElement("h3");
        h3.className = "text-2xl font-bold pt-[10px] lg:p1-[50px]";
        h3.textContent = e.descTitle
        div_child2.appendChild(h3)

        let descs = [
            e.desc,
            "키워드 : ",
            "컬러 : ",
            "폰트 : "+e.font,
            "사용툴 : ",
            "작업기간 : "+e.data,
            "기여도 : "+e.contribution
        ]

        for(let a = 0; a < descs.length; a++){
            let p = document.createElement("p");
            p.className = "text-base pt-[10px] pb-[10px] lg:pl-[50px]"
         
            if(a === 1 && e.Keyword){
                let text = "키워드 : ";
                e.Keyword.forEach(el =>{
                    text += el + " ";
                })
                p.textContent = text;

            }else if(a === 2 && e.color){
                let text = "컬러 : ";
                e.color.forEach(el =>{
                    let span = document.createElement("span");
                    span.className = "w-5 h-5 inline-block align-middle mr-2";
                    span.style.backgroundColor =el;
                    p.appendChild(span)
                })
                p.prepend(text)

            }else if(a === 4 && e.tools){
                let text = "사용툴 : ";
                text += e.Keyword.join();
                // e.Keyword.forEach(el =>{
                //     text += el + ", ";
                // })
                p.textContent = text;
            }else{
                p.textContent = descs[a];
            }


            div_child2.appendChild(p)
        }
        let ul = document.createElement("ul");
        ul.className = "flex justify-center mt-6"
        div_child2.appendChild(ul);


        const creatList = (href, text, extra = false)=>{  
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.classList.add("py-1","px-8","boder", "rounded-md", 'dark:bg-[#272929]', 'dark:text-[#ebf4f1]', "text-sm", "mr-4");
            a.href = href;
            a.textContent = text;
            a.setAttribute("target", "_blank");

            li.appendChild(a);
            return li;
        }

        if(e.original){
            ul.appendChild(creatList(e.original,"Original"));
        }
        if(e.create){
            ul.appendChild(creatList(e.create,"Create"));
        }
        if(e.git){
            ul.appendChild(creatList(e.git,"Git"));
        }


        div.appendChild(div_child1)
        div.appendChild(div_child2)


        $container.append(div)
    })
}


$CateList.forEach((e,i)=>{
    e.addEventListener("click", function(){
        $CateList.forEach((el,index)=>{
            $CateList[index].classList.remove("on")
        })
        const $attr = e.getAttribute("data-type");
 
        $CateList[i].classList.add("on")

        axios.get("data.json")
        .then(function(res){
            let PortData;
            console.log(res)
            if($attr === "전체"){

            }else{
                PortData = res.data.portfolio.filter(item => item.type == $attr)
                // item.type 필터에 한에서 값을 바로 보낼때는 중괄호를 생략한다.
            }
            PortfolioData(PortData);
        })
       
        $container.innerHTML = '';
    })
})

axios.get("data.json")
.then(function(res){
    console.log(res.data.portfolio)
    PortfolioData(res.data.portfolio)
})
.catch(function(error){
    console.log(error)
})

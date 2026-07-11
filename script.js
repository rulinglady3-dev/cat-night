// YILDIZ OLUŞTURMA

const stars = document.querySelector(".stars");


function createStar(){

    const star = document.createElement("div");

    star.className = "star";


    star.style.left =
    Math.random()*100 + "%";


    star.style.top =
    Math.random()*70 + "%";


    star.style.animationDuration =
    (2 + Math.random()*3) + "s";


    stars.appendChild(star);



    setTimeout(()=>{

        star.remove();

    },5000);


}



setInterval(
createStar,
300
);

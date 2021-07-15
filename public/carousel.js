    var imagenes=[]
    for (i=1;i<15;i++){
        var img=`steam${i}.jpg`
        imagenes.push(img)
    }
    sacarFotos(imagenes)
    function sacarFotos(array){
        var arrayFotos=array
        //console.log(arrayFotos)
        var carousel=`<div id="carouselExampleFade" class="carousel slide carousel-dark" data-bs-ride="carousel">
                        <div class="carousel-inner">`
        for (cont=0;cont<arrayFotos.length;cont++){
            if (cont==0){
                carousel+=`<div class="carousel-item active">
                            <img src="static/images/carousel/${arrayFotos[cont]}" class="carrousel">
                        </div>`
            }else{
            carousel+=`<div class="carousel-item">
                            <img src="static/images/carousel/${arrayFotos[cont]}" class="carrousel">
                        </div>`
            }
        }
        carousel+=`</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"  data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"  data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    </div>`
        console.log(carousel)
        document.getElementById("carouselFotos").innerHTML=carousel
    }
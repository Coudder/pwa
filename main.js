//CONFIGURACION DE SERVICE WORKER
if('serviceWorker' in navigator){
    console.log('Puedes usar los serviceWorker en tu navegador');

    navigator.serviceWorker.register('./sw.js')
                            .then(res =>console.log('serviceWorker cargado correctamente', res))
                            .catch(err => console.log('serviceWorker no se ah podido registrar',err));

}else{
    console.log('No Puedes usar los serviceWorker en tu navegador');
}

//js pirncipal SCROLL SUAVIZADO
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault();

       // console.log($('#services').offset().top);

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });

        return false;
    });
});
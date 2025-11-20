const alignScrollBtn = document.getElementById('align_scroll');
const fullScreenBtn = document.getElementById('full_screen');
const livretoFullScreen = document.getElementById('livreto_full_screen');
const livretoFullScreenExitBtn = document.getElementById('livreto_full_screen_exit_btn');



function goToPaging() {
    let scrollDestination = alignScrollBtn.parentElement.getBoundingClientRect().top + window.scrollY - 9;
    console.log(scrollDestination);
    window.scrollTo({
        top: scrollDestination,
        behavior: "smooth"
    });
}

alignScrollBtn.addEventListener('click', goToPaging);

fullScreenBtn.addEventListener('click', ()=>{
    goToPaging();
    document.body.style.overflow = "hidden"
    livretoFullScreen.style.display = "flex";
})

livretoFullScreenExitBtn.addEventListener('click', ()=>{
    document.body.style.overflow = "auto"
    livretoFullScreen.style.display = "none";
})
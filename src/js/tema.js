let temaSelecion = localStorage.getItem("selected-theme");

if(temaSelecion == "dark") {
    document.body.classList[temaSelecion === 'dark' ? 'add' : 'remove']('dark-theme');
}
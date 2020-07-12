let btn = document.getElementById('btn-del');
btn.addEventListener('click', function(){
    localStorage.clear();
    window.location.reload();
    alert("всё удалено!");
});
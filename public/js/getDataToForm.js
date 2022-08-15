$(document).ready(function() {
    function getCondominio() {
        const ajax = new XMLHttpRequest;

        ajax.open('GET', 'http://localhost:8000/clientes');

        ajax.onreadystatechange = () => {
            if(ajax.readyState === 4 && ajax.status === 200){

                let condominio = JSON.parse(ajax.responseText);

                for (let i in condominio){
                    let option = document.createElement('option');
                    option.value = condominio[i].id_condominio;

                    let selecCond = document.getElementById('condominio');
                    let span = document.createElement('span');
                    option.appendChild(span);
                    span.innerHTML = condominio[i].no_condominio.substring(0, 25);
                    selecCond.appendChild(option);
                }
            }
        }

        ajax.send();
    }

    function getOsTipo() {
        const ajax = new XMLHttpRequest;

        ajax.open('GET', 'http://localhost:8000/os-tipo');

        ajax.onreadystatechange = () => {
            if(ajax.readyState === 4 && ajax.status === 200){

                let osTipo = JSON.parse(ajax.responseText);

                for (i in osTipo) {
                    //console.log(osTipo[i]);
                    let option = document.createElement('option');
                    option.value = osTipo[i].id_os_tipo;

                    selecTipo = document.getElementById('os_tipo');
                    let span = document.createElement('span');
                    option.appendChild(span);
                    span.innerHTML = osTipo[i].no_os_tipo;
                    selecTipo.appendChild(option);
                }
            }
        }

        ajax.send();
    }

    getCondominio();

    getOsTipo();

});
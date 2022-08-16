function sendForm() {
    let osForm = new FormData(document.querySelector('form'));

    const request = new XMLHttpRequest;

    const url = 'http://localhost:8000/os';

    request.open('POST', url);

    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200) {
            let osResponse = JSON.parse(request.responseText);

            console.log(osResponse);

            let tabela = document.getElementById('os_dados');

            let filho = tabela.querySelector('#corpo');

            if(filho !== null){
                filho.remove();
            }
            let tbody = document.createElement('tbody');
            tbody.id = 'corpo';
            tabela.appendChild(tbody);
            
            for(let i in osResponse){

                let tr = document.createElement('tr');
                let tdCliente = document.createElement('td');
                let tdTipo = document.createElement('td');
                let tdAbertura = document.createElement('td');
                let tdFuncionario = document.createElement('td');
                let tdOsStatus = document.createElement('td');

                tr.appendChild(tdCliente);
                tr.appendChild(tdTipo);
                tr.appendChild(tdAbertura);
                tr.appendChild(tdFuncionario);
                tr.appendChild(tdOsStatus);

                tdCliente.innerHTML = osResponse[i].no_condominio;
                tdTipo.innerHTML = osResponse[i].no_os_tipo;
                tdAbertura.innerHTML = osResponse[i].dt_inicio;
                tdFuncionario.innerHTML = osResponse[i].no_fornecedor_funcionario;
                tdOsStatus.innerHTML = osResponse[i].no_os_status;

                tbody.appendChild(tr);

            }
        }
    }

    request.send(osForm);
}
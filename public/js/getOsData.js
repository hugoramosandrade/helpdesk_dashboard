function sendForm() {
    let osForm = new FormData(document.querySelector('form'));

    const request = new XMLHttpRequest;

    const url = 'http://localhost:8000/os';

    request.open('POST', url);

    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200) {
            let osResponse = JSON.parse(request.responseText);

            console.log(osResponse);

            let tbody = document.createElement('tbody');
            let tabela = document.getElementById('os_dados');
            tabela.appendChild(tbody);
            
            for(let i in osResponse){

                let tr = document.createElement('tr');
                let tdCliente = document.createElement('td');
                let tdTipo = document.createElement('td');
                let tdAbertura = document.createElement('td');
                let tdFuncionario = document.createElement('td');
                let tdSla = document.createElement('td');

                tr.appendChild(tdCliente);
                tr.appendChild(tdTipo);
                tr.appendChild(tdAbertura);
                tr.appendChild(tdFuncionario);
                tr.appendChild(tdSla);

                tdCliente.innerHTML = osResponse[i].no_condominio;
                tdTipo.innerHTML = osResponse[i].no_os_tipo;
                tdAbertura.innerHTML = osResponse[i].dt_inicio;
                tdFuncionario.innerHTML = osResponse[i].no_fornecedor_funcionario;
                tdSla.innerHTML = osResponse[i].sla;

                tbody.appendChild(tr);

            }
        }
    }

    request.send(osForm);
}
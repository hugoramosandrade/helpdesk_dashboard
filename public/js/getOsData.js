function sendForm() {
    let osForm = new FormData(document.querySelector('form'));

    let id_condominio = osForm.get('id_condominio');
    let data_inicial = new Date(osForm.get('data_inicial') + ' 00:00:00');
    let data_final = new Date(osForm.get('data_final') + ' 23:59:59');

    if (data_inicial == 'Invalid Date' || data_final == 'Invalid Date') {
        let osFormGrid = document.getElementById('os-form-grid');

        let filho = osFormGrid.querySelector('#msg-erro');

        if (filho !== null) {
            filho.remove();
        }

        let erroMsg = document.createElement('span');
        erroMsg.id = 'msg-erro';
        erroMsg.className = 'text-danger';
        erroMsg.innerHTML = 'O(s) seguinte(s) campo(s) não foi(foram) preenchido(s): <br>';
        osFormGrid.appendChild(erroMsg);
        if (id_condominio.length === 0) {
            let erroIdCondominio = document.createElement('span');
            erroIdCondominio.innerHTML = "* Condominio<br>";
            erroMsg.appendChild(erroIdCondominio);
        }
        if (osForm.get('data_inicial') === '') {
            let erroDataInicial = document.createElement('span');
            erroDataInicial.innerHTML = "* Data Inicial<br>";
            erroMsg.appendChild(erroDataInicial);
        }
        if (osForm.get('data_final') === '') {
            let erroDataFinal = document.createElement('span');
            erroDataFinal.innerHTML = "* Data Final<br>";
            erroMsg.appendChild(erroDataFinal);
        }
    } else {
        let osFormGrid = document.getElementById('os-form-grid');

        let filho = osFormGrid.querySelector('#msg-erro');

        if (filho !== null) {
            filho.remove();
        }

        //Formato as datas e atualizo no formData
        osForm.set('data_inicial', data_inicial.toLocaleString('sv'));
        osForm.set('data_final', data_final.toLocaleString('sv'));

        console.log(osForm.get('data_inicial'));
        console.log(osForm.get('data_final'));

        const request = new XMLHttpRequest;

        const url = 'http://localhost:8000/os';

        request.open('POST', url);

        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                let osResponse = JSON.parse(request.responseText);

                console.log(osResponse);

                let tabela = document.getElementById('os_dados');

                let filho = tabela.querySelector('#corpo');

                if (filho !== null) {
                    filho.remove();
                }
                let tbody = document.createElement('tbody');
                tbody.id = 'corpo';
                tabela.appendChild(tbody);

                for (let i in osResponse) {

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
}
$(document).ready(function () {
    function makeTable() {
        let conteudo = document.getElementById('painel');

        //Cração da tabela
        let tabela = document.createElement('table');
        let thead = document.createElement('thead');
        let trTop = document.createElement('tr');
        let thCliente = document.createElement('th');
        let thOsTipo = document.createElement('th');
        let thDt_abertura = document.createElement('th');
        let thFechamento = document.createElement('th');
        let thFuncionario = document.createElement('th');
        let thOsStatus = document.createElement('th');
        let thSla = document.createElement('th');

        trTop.appendChild(thCliente);
        trTop.appendChild(thOsTipo);
        trTop.appendChild(thDt_abertura);
        trTop.appendChild(thFechamento);
        trTop.appendChild(thFuncionario);
        trTop.appendChild(thOsStatus);
        trTop.appendChild(thSla);

        thead.appendChild(trTop);

        tabela.appendChild(thead);

        tabela.className = "table";

        thCliente.setAttribute('scope', 'col');
        thOsTipo.setAttribute('scope', 'col');
        thDt_abertura.setAttribute('scope', 'col');
        thFuncionario.setAttribute('scope', 'col');
        thOsStatus.setAttribute('scope', 'col');

        thCliente.innerHTML = 'Cliente';
        thOsTipo.innerHTML = 'Tipo';
        thDt_abertura.innerHTML = 'Abertura';
        thFechamento.innerHTML = 'Fechamento'
        thFuncionario.innerHTML = 'Funcionario';
        thOsStatus.innerHTML = 'Status';
        thSla.innerHTML = 'SLA';
        tabela.id = "os_dados";

        conteudo.appendChild(tabela);
    }
    makeTable();
});
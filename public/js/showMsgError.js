function showMsgError() {
    //recupera o elemento html que contem o formulário
    let osFormGrid = document.getElementById('os-form-grid');

    //verifica se já existe o elemente que exibe a mensagem de erro | "falta de algum campo obrigaatório"
    let filho = osFormGrid.querySelector('#msg-erro');
    if (filho !== null) {
        filho.remove(); //caso já exista o elemente, ele é removido para ser adicionado a mensagem de erro atualizada
    }

    //cria elemento que vai conter a mensagem de erro, e insere o texto base da msg de erro
    let erroMsg = document.createElement('span');
    erroMsg.id = 'msg-erro';
    erroMsg.className = 'text-danger';
    erroMsg.innerHTML = 'Para fazer a consulta é preciso preencher pelo menos os campos de datas';

    //adiciona o elemento span com a mensagem de erro no grid do formulário.
    osFormGrid.appendChild(erroMsg);
}
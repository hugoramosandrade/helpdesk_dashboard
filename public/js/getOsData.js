function sendForm(url) {
    //recupera o form
    let osForm = new FormData(document.querySelector('form'));

    //acrescenta a hora inicial e a hora final para realizar a consulta
    let data_inicial = new Date(osForm.get('data_inicial') + ' 00:00:00');
    let data_final = new Date(osForm.get('data_final') + ' 23:59:59');

    // verifica se a data enviada é válida | validação da consulta
    if (data_inicial == 'Invalid Date' || data_final == 'Invalid Date') {
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
        erroMsg.innerHTML = 'Para fazer a consulta falta preencher o(s) campo(s): <br>';

        //adiciona o elemento span com a mensagem de erro no grid do formulário.
        osFormGrid.appendChild(erroMsg);
        
        //verifica se o campo data_inicial estava vazio, caso sim, adiciona o texto na mensagem de erro
        if (osForm.get('data_inicial') === '') {
            let erroDataInicial = document.createElement('span');
            erroDataInicial.innerHTML = "* Data Inicial<br>";
            erroMsg.appendChild(erroDataInicial);
        }
        //verifica se o campo data_final está vazio, caso sim, adiciona o texto na mensagem de erro
        if (osForm.get('data_final') === '') {
            let erroDataFinal = document.createElement('span');
            erroDataFinal.innerHTML = "* Data Final<br>";
            erroMsg.appendChild(erroDataFinal);
        }
    } else {
        //cria animação de loading
        if(!document.getElementById('loading')){
            let divLoad = document.createElement('div');
            divLoad.className = 'position-absolute loading fa-10x text-dark d-flex justify-content-center align-items-center';
            divLoad.id = 'loading';
            let iconLoad1 = document.createElement('i');
            let iconLoad2 = document.createElement('i');
            iconLoad1.className = 'fa-solid fa-cog fa-spin-pulse';
            iconLoad2.className = 'fa-solid fa-cog fa-spin-pulse fa-spin-reverse';
            iconLoad2.setAttribute('style', '--fa-rotate-angle: 0.4deg;');
            divLoad.appendChild(iconLoad1);
            divLoad.appendChild(iconLoad2);
            document.getElementById('conteudo').appendChild(divLoad);
        }

        //recupera o elemento html onde tem o grid do formulário, e procurao elemento que contem a tag com msg de erro
        let osFormGrid = document.getElementById('os-form-grid');
        let filho = osFormGrid.querySelector('#msg-erro');

        //verifica se a tag html com msg de erro existe, e caso existir, remove a TAG.
        if (filho !== null) {
            filho.remove();
        }

        //Formata as datas e atualizo no formData
        osForm.set('data_inicial', data_inicial.toLocaleString('sv'));
        osForm.set('data_final', data_final.toLocaleString('sv'));

        //instancia o objeto XMLHttpRequest
        const request = new XMLHttpRequest;

        //abre conexão com backend
        request.open('POST', url);

        //método que verifica a resposta da consulta
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                //remove o ícone de loading
                document.getElementById('loading').remove();
                //converte a resposta da requisição em um objeto literal
                let osResponse = JSON.parse(request.responseText);

                console.log(osResponse);

                //recupera o elemento que vai conter os dados da das Os's consultadas
                let tabela = document.getElementById('os_dados');

                //procura o elemento tbody que tem o id #corpo, armazena o resultado da busca na variável filho
                let filho = tabela.querySelector('#corpo');

                //verifica se filho (tag tbody) existe, caso exista, ela é removida para poder inserir os dados da nova consulta
                if (filho !== null) {
                    filho.remove();
                }

                //cria a tag tbody com id #corpo, id serve para poder remover a tag caso uma nova consulta seja feita.
                let tbody = document.createElement('tbody');
                tbody.id = 'corpo';
                tabela.appendChild(tbody);

                //inicio da montagem dos registros da tabela.
                for (let i in osResponse.data) {

                    //cria o elemento tr e os td's onde vão conter os dados da OS
                    let tr = document.createElement('tr');
                    let tdCliente = document.createElement('td');
                    let tdTipo = document.createElement('td');
                    let tdAbertura = document.createElement('td');
                    let tdFechamento = document.createElement('td');
                    let tdFuncionario = document.createElement('td');
                    let tdOsStatus = document.createElement('td');
                    let tdSla = document.createElement('td');

                    //adiciona cada td dentro do elemento tr
                    tr.appendChild(tdCliente);
                    tr.appendChild(tdTipo);
                    tr.appendChild(tdAbertura);
                    tr.appendChild(tdFechamento);
                    tr.appendChild(tdFuncionario);
                    tr.appendChild(tdOsStatus);
                    tr.appendChild(tdSla);

                    //
                    let dt_inicio = new Date(osResponse.data[i].dt_inicio);
                    let dt_fechamento = new Date(osResponse.data[i].dt_fechamento)
                    let sla = '';
                    if(osResponse.data[i].dt_fechamento !== null){
                        let ms = dt_fechamento.getTime() - dt_inicio.getTime();

                        sla = msToHours(ms);
                        tdFechamento.innerHTML = dt_fechamento.toLocaleString('pt-BR');
                    }

                    tdCliente.innerHTML = osResponse.data[i].no_condominio;
                    tdTipo.innerHTML = osResponse.data[i].no_os_tipo;
                    tdAbertura.innerHTML = dt_inicio.toLocaleString('pt-BR');
                    tdFuncionario.innerHTML = osResponse.data[i].no_fornecedor_funcionario;
                    tdOsStatus.innerHTML = osResponse.data[i].no_os_status;
                    tdSla.innerHTML = sla;

                    tbody.appendChild(tr);

                }
                let painel = document.getElementById('painel');

                let paginate = painel.querySelector('#paginate');

                if(paginate !== null){
                    paginate.remove();
                }
                //Montagem da paginação
                let nav = document.createElement('nav');
                let ul = document.createElement('ul');
                nav.setAttribute('aria-label', 'Page navigation');
                nav.className = 'd-flex lign-items-center p-3';
                nav.id = 'paginate';
                ul.className = 'pagination';
                nav.appendChild(ul)
                painel.appendChild(nav);

                let liPrev = document.createElement('li');
                let spanPrev = document.createElement('li');
                liPrev.className = 'page-item';
                spanPrev.className = 'page-link';
                spanPrev.style.cursor = 'pointer';
                spanPrev.innerHTML = '&laquo;';
                liPrev.appendChild(spanPrev);
                ul.appendChild(liPrev);
                if(osResponse.links[0].url === null){
                    liPrev.className += ' disabled';
                } else{
                    spanPrev.setAttribute('onclick', "sendForm('"+ osResponse.links[0].url +"')");
                }

                let liFirstPage = document.createElement('li');
                let spanFirstPage = document.createElement('span');
                liFirstPage.className = 'page-item';
                spanFirstPage.className = 'page-link';
                spanFirstPage.innerHTML = 'Primeira';
                spanFirstPage.style.cursor = 'pointer';
                liFirstPage.appendChild(spanFirstPage);
                ul.appendChild(liFirstPage);
                spanFirstPage.setAttribute('onclick', "sendForm('"+ osResponse.links[1].url +"')");
                if(osResponse.links[1].active === true){
                    liFirstPage.className += ' disabled';
                }

                for(let i in osResponse.links){
                    if(osResponse.current_page === 1 && i >= osResponse.current_page &&  i <= 5 && osResponse.links[i].url !== null){
                        let li = document.createElement('li');
                        let span = document.createElement('span');
                        
                        li.className = 'page-item';
                        span.className = 'page-link';
                        span.style.cursor = 'pointer';
                        span.innerHTML = osResponse.links[i].label;
                        li.appendChild(span);
                        ul.appendChild(li);
                        span.setAttribute('onclick', "sendForm('"+ osResponse.links[i].url +"')");
                        if(osResponse.links[i].active === true){
                            li.className += ' active';
                        }
                    } else if(i >= (osResponse.current_page - 1) && i <= (osResponse.current_page + 3) && i < osResponse.last_page && i != 0){
                        let li = document.createElement('li');
                        let span = document.createElement('span');
                        li.className = 'page-item';
                        span.className = 'page-link';
                        span.style.cursor = 'pointer';
                        span.innerHTML = osResponse.links[i].label;
                        li.appendChild(span);
                        ul.appendChild(li);
                        span.setAttribute('onclick', "sendForm('"+ osResponse.links[i].url +"')");
                        if(osResponse.links[i].active === true){
                            li.className += ' active';
                        }
                    } else if((i >= (osResponse.last_page - 4)) && (i <= osResponse.last_page) && (osResponse.current_page >= (osResponse.last_page - 3)) && i != 0){
                        let li = document.createElement('li');
                        let span = document.createElement('span');
                        li.className = 'page-item';
                        span.className = 'page-link';
                        span.style.cursor = 'pointer';
                        span.innerHTML = osResponse.links[i].label;
                        li.appendChild(span);
                        ul.appendChild(li);
                        span.setAttribute('onclick', "sendForm('"+ osResponse.links[i].url +"')");
                        if(osResponse.links[i].active === true){
                            li.className += ' active';
                        }
                    }


                }
                let liLastPage = document.createElement('li');
                let spanLastPage = document.createElement('span');
                liLastPage.className = 'page-item';
                spanLastPage.className = 'page-link';
                spanLastPage.style.cursor = 'pointer';
                spanLastPage.innerHTML = 'Últina';
                liLastPage.appendChild(spanLastPage);
                ul.appendChild(liLastPage);
                let btnLastPage = osResponse.last_page;
                spanLastPage.setAttribute('onclick', "sendForm('"+ osResponse.links[btnLastPage].url +"')");
                if(osResponse.links[btnLastPage].active === true){
                    liLastPage.className += ' disabled';
                }

                let liNext = document.createElement('li');
                let spanNext = document.createElement('span');
                liNext.className = 'page-item';
                spanNext.className = 'page-link';
                spanNext.style.cursor = 'pointer';
                spanNext.innerHTML = '&raquo;';
                liNext.appendChild(spanNext);
                ul.appendChild(liNext);
                let btnNext = osResponse.last_page + 1;
                if(osResponse.links[btnNext].url === null){
                    liNext.className += ' disabled';
                } else{
                    spanNext.setAttribute('onclick', "sendForm('"+ osResponse.links[btnNext].url +"')");
                }

            }
        }

        request.send(osForm);
    }
}
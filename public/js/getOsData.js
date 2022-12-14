function sendForm(url) {
    //recupera o form
    let osForm = new FormData(document.querySelector('form'));

    //acrescenta a hora inicial e a hora final para realizar a consulta
    let data_inicial = new Date(osForm.get('data_inicial') + ' 00:00:00');
    let data_final = new Date(osForm.get('data_final') + ' 23:59:59');

    // verifica se a data enviada é válida | validação da consulta
    if (data_inicial == 'Invalid Date' || data_final == 'Invalid Date') {
        showMsgError();
    } else {
        //cria animação de loading
        if (!document.getElementById('loading')) {
            let divLoad = document.createElement('div');
            divLoad.className = 'position-absolute loading text-dark d-flex justify-content-center align-items-center';
            divLoad.id = 'loading';
            let divWrapper = document.createElement('div');
            divWrapper.className = 'loader-wrapper';
            let divLoader = document.createElement('div');
            divLoader.className = 'loader';
            let divLoaderInner = document.createElement('div');
            divLoaderInner.className = 'loader loader-inner';
            divLoader.appendChild(divLoaderInner);
            divWrapper.appendChild(divLoader);
            divLoad.appendChild(divWrapper);
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

        //estabelece conexão com backend
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

                    //Instancia o objeto Date para manipular as datas
                    let dt_inicio = new Date(osResponse.data[i].dt_inicio);
                    let dt_fechamento = new Date(osResponse.data[i].dt_fechamento)
                    let dt_finalizado = new Date(osResponse.data[i].dt_finalizado);
                    let sla = '';
                    let ms = '';

                    /*verifica se a dt_fechamento está vazio, caso esteja significa
                    **que a OS foi fechada por um funcionário interno ao invés do técnico do externo
                    */
                    if (osResponse.data[i].id_os_status !== 31) {
                        tdFechamento.innerHTML = '';
                    } else if (osResponse.data[i].dt_fechamento !== null) {
                        /**
                         * Detalhe importante é que a variável dt_fechamento recebe o campo dt_inicio
                         * da tabela os_resposta. Sempre que o técnico do externo fecha uma OS ele
                         * é obrigado a inserir um registro na os_resposta, com isso conseguimos recuperar
                         * a os_resposta do momento em que fechou a OS. Apelido o dt_inicio desse momento de
                         * dt_fechamento para ficar mais fácil de entender o objetivo dessa data.
                         * ------------------------------------------------------------------------------------
                         * 
                         * Uso o método getTime() do objeto date para converter o dt_fechamento e o dt_inicio
                         * para milisegundos, e efetuo uma subtração para conseguir o valor de milisegundos
                         * entre o dt_inicio e o dt_fechamento e o resultado é armazenado na
                         * variável ms (milisegundos).
                         */
                        ms = dt_fechamento.getTime() - dt_inicio.getTime();

                        //passo a variável ms para a função msToHours(ms) que espera receber um parâmetro
                        //do tipo int e retorna o valor dele em hh:mm:ss do parâmetro informado.
                        //Dessa forma consigo o valor do sla.
                        sla = msToHours(ms);
                        //formada o dt_fechamento para o padrão brasileiro de data e hora
                        tdFechamento.innerHTML = dt_fechamento.toLocaleString('pt-BR');
                    } else {
                        ms = dt_finalizado.getTime() - dt_inicio.getTime();

                        sla = msToHours(ms);
                        tdFechamento.innerHTML = dt_finalizado.toLocaleString('pt-BR') + ' ';
                        let aIcon = document.createElement('a');
                        let icon = document.createElement('i');
                        icon.className = 'fa-solid fa-circle fa-2xs';
                        aIcon.appendChild(icon);
                        aIcon.className = 'text-primary';
                        aIcon.setAttribute('data-bs-toggle', 'tooltip');
                        aIcon.setAttribute('data-bs-title', 'Fechada por um técnico interno');
                        tdFechamento.appendChild(aIcon);
                    }

                    //insere os dados da OS dentro do elemento td
                    tdCliente.innerHTML = osResponse.data[i].no_condominio;
                    tdTipo.innerHTML = osResponse.data[i].no_os_tipo;
                    tdAbertura.innerHTML = dt_inicio.toLocaleString('pt-BR');
                    tdFuncionario.innerHTML = osResponse.data[i].no_fornecedor_funcionario;
                    tdOsStatus.innerHTML = osResponse.data[i].no_os_status;
                    tdSla.innerHTML = sla;
                    //insere o elemento tr dentro do tbody
                    tbody.appendChild(tr);

                }
                //Verifica se já existe alguma paginação na tela.
                //Caso exista, ela é removida para montar a próxima paginação
                let painel = document.getElementById('painel');
                let paginate = painel.querySelector('#paginate');
                if (paginate !== null) {
                    paginate.remove();
                }

                //Cria os elementos nav e ul que vai comportar a paginação.
                let nav = document.createElement('nav');
                let ul = document.createElement('ul');
                nav.className = 'd-flex lign-items-center p-3';
                nav.id = 'paginate';
                ul.className = 'pagination';
                nav.appendChild(ul)
                painel.appendChild(nav);

                //cria o elemento li que vai comportar o botão de ir para a página anterior
                let liPrev = document.createElement('li');
                let spanPrev = document.createElement('li');
                liPrev.className = 'page-item';
                spanPrev.className = 'page-link';
                spanPrev.style.cursor = 'pointer';
                spanPrev.innerHTML = '&laquo;';
                liPrev.appendChild(spanPrev);
                ul.appendChild(liPrev);

                //Verifica se a url do botão anterior existe.
                //Caso exista signifca que está em uma página acima da página 1, e o botão recebe link e fica ativo.
                //Caso não exista, significa que a página atual é 1, e o botão de pagina anterior fica desativado.
                if (osResponse.links[0].url === null) {
                    liPrev.className += ' disabled';
                } else {
                    spanPrev.setAttribute('onclick', "sendForm('" + osResponse.links[0].url + "')");
                }


                //Percorre cada um dos links para montar a paginação.
                for (let i in osResponse.links) {

                    if (i != 0 && i != (osResponse.links.length - 1)) {
                        let li = document.createElement('li');
                        let span = document.createElement('span');

                        li.className = 'page-item';
                        span.className = 'page-link';
                        span.style.cursor = 'pointer';
                        span.innerHTML = osResponse.links[i].label;
                        li.appendChild(span);
                        ul.appendChild(li);
                        if (osResponse.links[i].active === true) {
                            li.className += ' active';
                        }
                        if (osResponse.links[i].url !== null && osResponse.links[i].active !== true) {
                            span.setAttribute('onclick', "sendForm('" + osResponse.links[i].url + "')");
                        }
                    }


                }

                //cria o botão próxima página
                let liNext = document.createElement('li');
                let spanNext = document.createElement('span');
                liNext.className = 'page-item';
                spanNext.className = 'page-link';
                spanNext.style.cursor = 'pointer';
                spanNext.innerHTML = '&raquo;';
                liNext.appendChild(spanNext);
                ul.appendChild(liNext);
                let btnNext = osResponse.links.length - 1;
                //Verifica se o link do botão próxima página está vazio.
                //caso esteja o botão é desabilitado.
                if (osResponse.links[btnNext].url === null) {
                    liNext.className += ' disabled';
                } else {
                    spanNext.setAttribute('onclick', "sendForm('" + osResponse.links[btnNext].url + "')");
                }

            }
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        }
        //envia a requisição para o backend com os dados do formulários para a consulta das Os's
        request.send(osForm);
    }
}
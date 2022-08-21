function sendForm(url) {
    let osForm = new FormData(document.querySelector('form'));

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
        erroMsg.innerHTML = 'Para fazer a consulta falta preencher o(s) campo(s): <br>';
        osFormGrid.appendChild(erroMsg);
        
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

        const request = new XMLHttpRequest;

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

                for (let i in osResponse.data) {

                    let tr = document.createElement('tr');
                    let tdCliente = document.createElement('td');
                    let tdTipo = document.createElement('td');
                    let tdAbertura = document.createElement('td');
                    let tdFechamento = document.createElement('td');
                    let tdFuncionario = document.createElement('td');
                    let tdOsStatus = document.createElement('td');
                    let tdSla = document.createElement('td');

                    tr.appendChild(tdCliente);
                    tr.appendChild(tdTipo);
                    tr.appendChild(tdAbertura);
                    tr.appendChild(tdFechamento);
                    tr.appendChild(tdFuncionario);
                    tr.appendChild(tdOsStatus);
                    tr.appendChild(tdSla);

                    let dt_inicio = new Date(osResponse.data[i].dt_inicio);
                    let dt_fechamento = new Date(osResponse.data[i].dt_fechamento)
                    let sla = '';
                    if(osResponse.data[i].dt_fechamento !== null){
                        let time = new Date(dt_fechamento.getTime() - dt_inicio.getTime());
                        sla = time.toISOString().slice('11', '19');
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
function getDataChart(url) {
    //recupera os campos do formulário
    let osForm = new FormData(document.querySelector('form'));

    //recupera os valores de datas do formulário
    let data_inicial = osForm.get('data_inicial');
    let data_final = osForm.get('data_final');
    //verifica se as datas estão preenchidas
    if (data_inicial !== '' && data_final !== '') {

        //cria animação de loading
        if(!document.getElementById('loading')){
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

        osForm.set('data_inicial', data_inicial + ' 00:00:00');
        osForm.set('data_final', data_final + ' 23:59:59');

        //instancia o objeto XMLHttpRequest
        const request = new XMLHttpRequest;

        //estabelece conexão com o backend
        request.open('POST', url);

        //atributo que recebe uma função que é executada toda vez que o estado da requisição muda
        request.onreadystatechange = () => {
            //verifica se o estado da requisição é 4 e o status é 200
            if (request.readyState === 4 && request.status === 200) {
                //remove o ícone de loading
                document.getElementById('loading').remove();
                
                let resposta = JSON.parse(request.responseText);
                let response = resposta[0];
                console.log(resposta);

                let tableChart = [];
                tableChart = [['Tipo', 'Quantidade', { role: "style" }]];
                for (let i in response) {
                    tableChart.push([response[i].no_os_tipo, parseInt([response[i].qtd_os]), generateColor()]);
                }

                console.log(tableChart);

                //código que monta o gráfico
                // Load the Visualization API and the corechart package.
                google.charts.load('current', { 'packages': ['corechart'] });

                // Set a callback to run when the Google Visualization API is loaded.
                google.charts.setOnLoadCallback(drawChart);

                // Callback that creates and populates a data table,
                // instantiates the pie chart, passes in the data and
                // draws it.
                function drawChart() {

                    // Create the data table.
                    var data = google.visualization.arrayToDataTable(tableChart);

                    let divTitle = document.createElement('div');
                    // Set chart options
                    var options = {
                        title: 'Todos os Clientes\n',
                        legend: { position: "none" }
                    };
                    if(resposta[1][0].no_condominio !== ''){
                        options.title = resposta[1][0].no_condominio + '\n';
                    }

                    options.title += 'Período de ' + formatarData(data_inicial) + ' até ' + formatarData(data_final);

                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                }

            }
        };

        //envia a requisição para o backend
        request.send(osForm);
    } else {
        console.log('Os campos de datas precisam ser preenchidos');
    }
}

function formatarData(date) {
    let data = new Date(date);
    return data.getDate() + '/' + data.getMonth() + '/' + data.getFullYear();
}
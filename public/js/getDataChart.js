function getDataChart(url) {
    //recupera os campos do formulário
    let osForm = new FormData(document.querySelector('form'));

    //recupera os valores de datas do formulário
    let data_inicial = osForm.get('data_inicial');
    let data_final = osForm.get('data_final');
    //verifica se as datas estão preenchidas
    if (data_inicial !== '' && data_final !== '') {

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
                let response = JSON.parse(request.responseText);
                //console.log(response);
                let tableChart = [];
                tableChart = [['Tipo', 'Quantidade', { role: "style" }]];
                for (let i in response) {
                    tableChart.push([response[i].no_os_tipo, parseInt([response[i].qtd_os]), generateColor()]);
                }

                console.log(tableChart);
                console.log(generateColor());

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

                    // Set chart options
                    var options = {
                        title: 'Quantidade de OS por Tipo',
                        legend: { position: "none" }
                    };

                    // Instantiate and draw our chart, passing in some options.
                    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
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
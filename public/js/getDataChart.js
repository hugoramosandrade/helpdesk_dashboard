function getDataChart(url) {
    let osForm = new FormData(document.querySelector('form'));

    console.log(osForm.get('data_inicial') + ' 00:00:00');
    console.log(osForm.get('data_final') + ' 23:59:59');
}
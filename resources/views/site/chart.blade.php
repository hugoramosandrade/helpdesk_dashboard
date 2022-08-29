@extends('site.layouts.basico', ['function' => 'getDataChart', 'rota_consulta' => '/os-chart', 'page' => 'chart'])

@section('titulo', 'Gráficos')

@section('conteudo')
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="{{ asset('js/getDataChart.js') }}"></script>
<script src="{{ asset('js/colorGenerate.js') }}"></script>
@component('site.components.nav_bar', ['class_link_detalhe' => '', 'class_link_chart' => 'active disabled'])
    
@endcomponent
<div class="painel mt-3 p-2" id="painel">
    <div id="chart_div" style="width: 100%; height: 100%;"></div>
</div>
@endsection
@extends('site.layouts.basico', ['function' => 'getDataChart', 'url_consulta' => 'http://localhost:8000/os-chart'])

@section('titulo', 'Gráficos')

@section('conteudo')
@component('site.components.nav_bar', ['class_link_detalhe' => '', 'class_link_chart' => 'active disabled'])
    
@endcomponent
<div class="painel mt-3 p-2" id="painel">Olá Mundo!</div>
@endsection
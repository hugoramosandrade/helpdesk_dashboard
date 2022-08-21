@extends('site.layouts.basico')

@section('titulo', 'Gráficos')

@section('conteudo')
@component('site.components.nav_bar', ['class_link_detalhe' => '', 'class_link_chart' => 'active disabled'])
    
@endcomponent
<div class="painel mt-3" id="painel">Olá Mundo!</div>
@endsection
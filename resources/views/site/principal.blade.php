@extends('site.layouts.basico', ['function' => 'sendForm', 'rota_consulta' => '/os', 'page' => 'principal'])

@section('titulo', 'Principal')

@section('conteudo')
@component('site.components.nav_bar', ['class_link_detalhe' => 'active disabled', 'class_link_chart' => ''])
    
@endcomponent
<div class="painel mt-3 overflow-auto" id="painel"></div>
<script src="{{ asset('js/makeTable.js') }}"></script>
@endsection
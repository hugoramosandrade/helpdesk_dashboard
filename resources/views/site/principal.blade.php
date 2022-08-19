@extends('site.layouts.basico')

@section('titulo', 'Principal')

@section('conteudo')
<nav class="navbar navbar-expand-lg bg-light top-nav-menu">
    <div class="container-fluid">
        <span class="navbar-brand"><i class="fa-solid fa-tv"></i> Dashboard Panel</span>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a href="" class="nav-link active">Relatorio Detalhado</a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link">Gráficos</a>
            </li>
        </ul>
    </div>
</nav>
<div class="painel mt-3" id="painel"></div>
<script src="{{ asset('js/makeTable.js') }}"></script>
@endsection
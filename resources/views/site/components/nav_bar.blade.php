{{ $slot }}

<nav class="navbar navbar-expand-lg bg-light top-nav-menu">
    <div class="container-fluid">
        <span class="navbar-brand"><i class="fa-solid fa-tv"></i> Dashboard Panel</span>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a href="/principal" class="nav-link {{ $class_link_detalhe }}">Relatorio Detalhado</a>
            </li>
            <li class="nav-item">
                <a href="/chart" class="nav-link {{ $class_link_chart }}">Gráficos</a>
            </li>
        </ul>
    </div>
</nav>
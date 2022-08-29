{{ $slot }}

<form id="os-form" name="os-form">
    @csrf
    <label class="form-label text-light" for="condominio" id="condLoad">Condomínio </label>
    <select name="id_condominio" id="condominio" class="form-select text-center" aria-label="Default select">
        <option value="">Selecione o Condomínio</option>
    </select>
    @if ($page == 'principal')
        <label for="os_tipo" class="form label col-12 mt-2 text-light" id="tipo">Tipo da OS </label>
        <select name="id_os_tipo" id="os_tipo" class="form-select text-center mt-1">
            <option value="">Selecione o Tipo</option>
        </select>
    @elseif ($page = 'chart')
    <label for="order" class="form col-12 text-light mt-2">Ordenação</label>
    <select name="order" id="order" class="form-select text-center mt-1">
        <option value="desc">Decrescente</option>
        <option value="asc">Crescente</option>
    </select>
    <label for="limit" class="form col-12 text-light mt-2">Qtd de Registro</label>
    <input type="number" name="limit" id="limit" class="form-control text-center" placeholder="Ex.: 3">
    @endif
    <label for="data_inicial" class="form-label col-12 mt-2 text-light">Data Inicio</label>
    <input type="date" name="data_inicial" id="data_inicial" class="form-control col-12 text-center">
    <label for="data_final" class="form-label col-12 mt-2 text-light">Data Fim</label>
    <input type="date" name="data_final" id="data_final" class="form-control col-12 text-center">
</form>
<button class="botao text-white col-12" onclick='{{ $function }}("{{ env("APP_URL") . $rota_consulta }}")'>
    <i class="fa-solid fa-magnifying-glass"></i> Consultar
</button>

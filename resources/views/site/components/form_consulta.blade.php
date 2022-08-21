{{ $slot }}

<form id="os-form" name="os-form">
    @csrf
    <label class="form-label text-light" for="condominio">Condomínio</label>
    <select name="id_condominio" id="condominio" class="form-select text-center"
        aria-label="Default select">
        <option value="">Selecione o Condomínio</option>

    </select>
    <label for="os_tipo" class="form label col-12 mt-2 text-light" aria-label="Default select">Tipo da
        OS</label>
    <select name="id_os_tipo" id="os_tipo" class="form-select text-center mt-1">
        <option value="">Selecione o Tipo</option>
    </select>
    <label for="data_inicial" class="form-label col-12 mt-2 text-light">Data Inicio</label>
    <input type="date" name="data_inicial" id="data_inicial"
        class="form-control col-12 text-center">
    <label for="data_final" class="form-label col-12 mt-2 text-light">Data Fim</label>
    <input type="date" name="data_final" id="data_final"
        class="form-control col-12 text-center">
    </form>
    <button class="botao text-white col-12" onclick='sendForm("{{ $url_consulta }}")'><i class="fa-solid fa-magnifying-glass"></i> Consultar</button>
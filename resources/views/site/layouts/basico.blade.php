<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://kit.fontawesome.com/969190e5b6.js" crossorigin="anonymous"></script>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous">
    </script>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="{{ asset('js/getDataToForm.js') }}"></script>
    <script src="{{ asset('js/getOsData.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/layout.css') }}">
    <title>Helpdesk Dashboard - @yield('titulo')</title>
</head>

<body>

    <div class="d-flex align-items-lg-stretch corpo">
        <div class="col-xxl-2 col-xl-4 left-side-bar p-3 bg-dark">
            <div class="text-center mt-5">
                <img src="{{ asset('img/logo-site-cd.webp') }}" alt="Condominio Dedicado">
            </div>
            <div class="text-center mt-5">
                <form id="os-form" name="os-form">
                    @csrf
                    <label class="form-label text-light" for="condominio">Selecione o Condomínio</label>
                    <select name="id_condominio" id="condominio" class="form-select text-center"
                        aria-label="Default select">
                        <option>Condomínio</option>

                    </select>
                    <label for="os_tipo" class="form label col-12 mt-2 text-light" aria-label="Default select">Tipo da
                        OS</label>
                    <select name="id_os_tipo" id="os_tipo" class="form-select text-center mt-1">
                        <option value="">Selecione o Tipo</option>
                    </select>
                    <label for="data_inicial" class="form-label col-12 mt-2 text-light">Data Inicio</label>
                    <input type="datetime-local" name="data_inicial" id="data_inicial"
                        class="form-control col-12 text-center">
                    <label for="data_final" class="form-label col-12 mt-2 text-light">Data Fim</label>
                    <input type="datetime-local" name="data_final" id="data_final"
                        class="form-control col-12 text-center">
                </form>
                <button class="btn botao text-white col-12" onclick="sendForm()"><i
                        class="fa-solid fa-magnifying-glass"></i> Consultar</button>
            </div>
        </div>
        <div class="col-xxl-10 col-xl-8 p-2 conteudo">
            @yield('conteudo')
        </div>
    </div>
</body>

</html>

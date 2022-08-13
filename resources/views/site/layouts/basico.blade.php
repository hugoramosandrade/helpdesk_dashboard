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
                <form action="">
                    <label class="form-label text-light" for="condominio">Selecione o Condomínio</label>
                    <select name="id_condominio" id="condominio" class="form-select text-center" aria-label="Default select">
                        <option>Condomínio</option>
                        {{--
                        @foreach ($condominios as $condominio)
                        <option value="{{ $condominio->id_condominio }}">{{ $condominio->no_condominio }}</option>
                        @endforeach
                        --}}
                    </select>
                    <label for="os_tipo" class="form label col-12 mt-2 text-light" aria-label="Default select">Tipo da OS</label>
                    <select name="os_tipo" id="os_tipo" class="form-select text-center mt-1">
                        <option value="">Selecione o Tipo</option>
                    </select>
                    <label for="dt_inicio" class="form-label col-12 mt-2 text-light">Data Inicio</label>
                    <input type="datetime-local" name="dt_inicio" id="dt_inicio" class="form-control col-12 text-center">
                    <label for="dt_fim" class="form-label col-12 mt-2 text-light">Data Fim</label>
                    <input type="datetime-local" name="dt_fim" id="dt_fim" class="form-control col-12 text-center">
                    <button class="btn botao text-white col-12"><i class="fa-solid fa-magnifying-glass"></i> Consultar</button>
                </form>
            </div>
        </div>
        <div class="col-xxl-10 col-xl-8 p-2 conteudo">
            @yield('conteudo')
        </div>
    </div>
</body>

</html>

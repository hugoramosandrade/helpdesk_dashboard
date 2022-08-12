<?php
    dd($condominios);
?>

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
        <div class="col-md-2 left-side-bar p-2">
            <div class="left-bar-topo text-center mt-5">
                <span class="text-white"><i class="fa-solid fa-chart-line"></i> Analitcs</span>
            </div>
            <div class="text-center mt-5">
                <form action="">
                    <label class="form-label" for="condominio">Selecione o Condomínio</label>
                    <select name="id_condominio" id="condominio" class="form-control text-center">
                        <option>Condomínio</option>
                        <option value="">Dedicado Proprio</option>
                    </select>
                </form>
            </div>
        </div>
        <div class="col-md-10 p-2 conteudo">
            Olá Mundo 2
        </div>
    </div>

    @yield('conteudo')
</body>

</html>

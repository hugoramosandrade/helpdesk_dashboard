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
    <script src="{{ asset('js/showMsgError.js') }}"></script>
    <script src="{{ asset('js/getDataToForm.js') }}"></script>
    <script src="{{ asset('js/getOsData.js') }}"></script>
    <script src="{{ asset('js/msToHours.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/loader.css') }}">
    <link rel="stylesheet" href="{{ asset('css/layout.css') }}">
    <link rel="icon" href="https://dedicado-upload.s3-us-west-2.amazonaws.com/fornecedor_imagem/dedicado-favicon.png" type="img/png">
    <title>Helpdesk Dashboard - @yield('titulo')</title>
</head>

<body>

    <div class="d-flex align-items-md-stretch corpo">
        <div class="col-xxl-2 col-md-4 left-side-bar p-3 bg-dark">
            <div class="text-center mt-5">
                <img src="{{ asset('img/logo-site-cd.webp') }}" alt="Condominio Dedicado">
            </div>
            <div class="text-center mt-5" id="os-form-grid">
                @component('site.components.form_consulta', ['function' => $function , 'rota_consulta' => $rota_consulta, 'page' => $page])
                    
                @endcomponent
            </div>
        </div>
        <div class="col-xxl-10 col-md-8 p-2 conteudo" id="conteudo">
            @yield('conteudo')
        </div>
    </div>
</body>

</html>

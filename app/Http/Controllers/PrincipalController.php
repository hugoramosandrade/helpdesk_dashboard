<?php

namespace App\Http\Controllers;

use App\Models\Condominio;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;

class PrincipalController extends Controller
{
    public function index()
    {
        /*$condominios = Condominio::select('id_condominio', 'no_condominio')
        ->whereNull('dt_fim')
        ->whereNotNull('no_condominio')
        ->where('is_condominio_teste', false)
        ->orderBy('no_condominio', 'asc')->get();*/

        return view('site.principal');
    }

    public function getAllClientes(Response $response)
    {
        $condominios = Condominio::select('id_condominio', 'no_condominio')
        ->whereNull('dt_fim')
        ->whereNotNull('no_condominio')
        ->where('is_condominio_teste', false)
        ->orderBy('no_condominio', 'asc')->get();
    }
}

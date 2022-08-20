<?php

namespace App\Http\Controllers;

use App\Models\Condominio;
use App\Models\OsTipo;
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

    public function getAllClientes()
    {
        $condominios = Condominio::select('condominio.id_condominio', 'condominio.no_condominio')
        ->join('fornecedor_condominio', 'condominio.id_condominio', '=', 'fornecedor_condominio.id_condominio')
        ->whereNull('condominio.dt_fim')
        ->whereNotNull('condominio.no_condominio')
        ->where('fornecedor_condominio.id_fornecedor', 32)
        ->orderBy('condominio.no_condominio', 'asc')->get();

        return response()->json($condominios);
    }

    public function getAllOsTipo()
    {
        $os_tipo = OsTipo::select('id_os_tipo', 'no_os_tipo')
        ->whereNull('dt_fim')
        ->where('id_fornecedor', 32)->get();

        return response()->json($os_tipo);
    }
}

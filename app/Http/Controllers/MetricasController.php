<?php

namespace App\Http\Controllers;

use App\Models\Condominio;
use Illuminate\Http\Request;

class MetricasController extends Controller
{
    public function index()
    {
        $condominios = Condominio::select('id_condominio', 'no_condominio')
        ->whereNull('dt_fim')
        ->whereNotNull('no_condominio')
        ->where('is_condominio_teste', false)
        ->orderBy('no_condominio', 'asc')->get();

        return view('site.metricas', ['condominios' => $condominios]);
    }
}

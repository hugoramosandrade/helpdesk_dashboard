<?php

namespace App\Http\Controllers;

use App\Models\Os;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    public function index()
    {
        return view('site.chart');
    }
    public function getOsDataChart(Request $request)
    {
        $id_condominio = $request->input('id_condominio');
        $id_os_tipo = $request->input('id_os_tipo');
        $data_inicial = $request->input('data_inicial');
        $data_final = $request->input('data_final');

        $os = new Os();

        $consulta = $os->selectRaw('os_tipo.no_os_tipo, count(os_tipo.no_os_tipo) as qtd_os')
        ->join('os_tipo', 'os.id_os_tipo', 'os_tipo.id_os_tipo')
        ->whereBetween('os.dt_inicio', [$data_inicial, $data_final])
        ->groupBy('os_tipo.no_os_tipo');

        $rs = $consulta->get();
        return response()->json($rs);
    }
}

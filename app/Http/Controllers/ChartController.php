<?php

namespace App\Http\Controllers;

use App\Models\Condominio;
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
        $condominio = [0 => ['no_condominio' => '']];

        $os = new Os();

        $consulta = $os->selectRaw('os_tipo.no_os_tipo, count(os_tipo.no_os_tipo) as qtd_os')
        ->join('os_tipo', 'os.id_os_tipo', 'os_tipo.id_os_tipo')
        ->whereBetween('os.dt_inicio', [$data_inicial, $data_final])
        ->orderBy('qtd_os', 'desc')
        ->groupBy('os_tipo.no_os_tipo');

        if($id_condominio != ''){
            $consulta = $consulta->where('os.id_condominio', $id_condominio);
            $condominio = Condominio::select('no_condominio')
            ->where('id_condominio', $id_condominio)->get();
        }

        $rs = [$consulta->get(), $condominio];
        return response()->json($rs);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Os;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PainelController extends Controller
{
    public function getOs(Request $request)
    {
        $id_condominio = $request->input('id_condominio');
        $id_os_tipo = $request->input('id_os_tipo');
        $data_inicial = $request->input('data_inicial');
        $data_final = $request->input('data_final');
        

        $os = new Os();
        $consulta = $os->select(
            'os.id_os',
            'condominio.no_condominio',
            'os_tipo.no_os_tipo',
            'os.dt_inicio',
            'fornecedor_funcionario.no_fornecedor_funcionario',
            'os.ds_os',
            'os.ds_os_solucao',
            'os_status.no_os_status'
        )
        ->join('condominio', 'os.id_condominio', 'condominio.id_condominio')
        ->join('os_tipo', 'os.id_os_tipo', 'os_tipo.id_os_tipo')
        ->join('os_status', 'os.id_os_status', 'os_status.id_os_status')
        ->join('os_fornecedor_funcionario', 'os.id_os', 'os_fornecedor_funcionario.id_os')
        ->join('fornecedor_funcionario', 'os_fornecedor_funcionario.id_fornecedor_funcionario', 'fornecedor_funcionario.id_fornecedor_funcionario')
        ->whereBetween('os.dt_inicio', [$data_inicial, $data_final])
        ->orderBy('os.dt_inicio', 'desc');

        if($id_condominio != ''){
            $consulta = $consulta->where('os.id_condominio', $id_condominio);
        }
        if($id_os_tipo != ''){
            $consulta = $consulta->where('os_tipo.id_os_tipo', $id_os_tipo);
        }
        
        $rs = $consulta->paginate(15);

        return response()->json($rs);
    }
}

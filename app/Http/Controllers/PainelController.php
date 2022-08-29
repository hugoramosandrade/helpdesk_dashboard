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
        
        $log = DB::table('log')->select('log.id_log')
        ->where('log.id_registro', '=', 'os.id_os')
        ->where('log.no_tabela', '=', 'os')
        ->orderBy('log.dt_inicio', 'desc')
        ->limit(1);
        $os = new Os();
        $consulta = $os->select(
            'os.id_os',
            'condominio.no_condominio',
            'os_tipo.no_os_tipo',
            'os.dt_inicio',
            'fornecedor_funcionario.no_fornecedor_funcionario',
            'os.ds_os',
            'os.ds_os_solucao',
            'os_status.no_os_status',
            'os_resposta.dt_inicio as dt_fechamento',
            DB::raw("(select log.dt_inicio from log where log.id_registro = os.id_os and no_tabela = 'os' order by log.dt_inicio desc limit 1) as dt_finalizado")
        )
        ->join('condominio', 'os.id_condominio', 'condominio.id_condominio')
        ->join('os_tipo', 'os.id_os_tipo', 'os_tipo.id_os_tipo')
        ->join('os_status', 'os.id_os_status', 'os_status.id_os_status')
        ->join('os_fornecedor_funcionario', 'os.id_os', 'os_fornecedor_funcionario.id_os')
        ->join('fornecedor_funcionario', 'os_fornecedor_funcionario.id_fornecedor_funcionario', 'fornecedor_funcionario.id_fornecedor_funcionario')
        ->leftJoin('os_resposta', function($join){
            $join->on('os_resposta.id_os', '=','os.id_os')
            ->where('os_resposta.id_os_status', '=', 30);
        })
        ->whereBetween('os.dt_inicio', [$data_inicial, $data_final])
        ->whereNull('os.dt_fim')
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

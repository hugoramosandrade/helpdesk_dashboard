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

        $data_inicial = date('Y-m-d H:i:s', strtotime($data_inicial));
        $data_final = date('Y-m-d H:i:59', strtotime($data_final));
/*
        $data1 = date_create($data_inicial);
        $data2 = date_create($data_final);
        $intervalo = date_diff($data2, $data1);*/
        

        $os = new Os();
        $os->select(
            'os.id_os',
            'condominio.no_condominio',
            'os_status.no_os_status',
            'os_tipo.no_os_tipo',
            'os.dt_inicio',
            'fornecedor_funcionario.no_fornecedor_funcionario',
            'os.ds_os',
            'os.ds_os_solucao',
            'os_resposta.ds_os_resposta',
            'os_resposta.dt_inicio as dt_inicio_resposta',
            DB::raw('age(os_resposta.dt_inicio, os.dt_inicio) as sla')
        )
        ->join('condominio', 'os.id_condominio', 'condominio.id_condominio')
        ->join('os_tipo', 'os.id_os_tipo', 'os_tipo.id_os_tipo')
        ->join('os_resposta', 'os.id_os', 'os_resposta.id_os')
        ->join('os_status', function($join){
            $join->on('os_resposta.id_os_status', '=', 'os_status.id_os_status')
            ->where('os_status.ref_os_status', '=', 'fechada');
        })
        ->join('os_fornecedor_funcionario', 'os.id_os', 'os_fornecedor_funcionario.id_os')
        ->join('fornecedor_funcionario', 'os_fornecedor_funcionario.id_fornecedor_funcionario', 'fornecedor_funcionario.id_fornecedor_funcionario')
        ->where('os.id_condominio', $id_condominio)
        ->whereBetween('os.dt_inicio', [$data_inicial, $data_final]);
        
        if($id_os_tipo != ''){
            $os->where('os_tipo.id_os_tipo', $id_os_tipo);
        }

        $os->get();
        
/*
        $retorno = [
            'id_condominio' => $id_condominio,
            'id_os_tipo' => $id_os_tipo,
            'data_inicial' => $data_inicial,
            'data_final' => $data_final
        ];*/
        

        return response()->json($os);
    }
}

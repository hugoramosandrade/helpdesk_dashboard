<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PainelController extends Controller
{
    public function getOs(Request $request)
    {
        $id_condominio = $request->input('id_condominio');
        $id_os_tipo = $request->input('id_os_tipo');
        $data_inicial = $request->input('data_inicial');
        $data_final = $request->input('data_final');

        $retorno = [
            'id_condominio' => $id_condominio,
            'id_os_tipo' => $id_os_tipo,
            'data_inicial' => date('Y-m-d H:i',$data_inicial),
            'data_final' => $data_final
        ];

        return response()->json($retorno);
    }
}

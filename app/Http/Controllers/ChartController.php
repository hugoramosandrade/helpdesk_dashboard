<?php

namespace App\Http\Controllers;

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

        $rs = $request->all();
        return response()->json($rs);
    }
}

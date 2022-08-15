<?php

use App\Http\Controllers\PainelController;
use App\Http\Controllers\PrincipalController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/principal', [PrincipalController::class, 'index'])
->name('principal.index');

Route::get('/clientes', [PrincipalController::class, 'getAllClientes'])
->name('principal.getclients');

Route::get('/os-tipo', [PrincipalController::class, 'getAllOsTipo'])
->name('princiupal.ostipo');

Route::post('/os', [PainelController::class, 'getOs'])
->name('painel.getos');
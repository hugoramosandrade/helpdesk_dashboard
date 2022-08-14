<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OsTipo extends Model
{
    use HasFactory;
    protected $table = 'os_tipo';
    protected $primaryKey = 'id_os_tipo';
    public $timestamps = false;
}

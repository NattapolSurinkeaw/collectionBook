<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillItem extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function volumes()
    {
        return $this->hasMany(BookVolume::class, 'book_id');
    }
}

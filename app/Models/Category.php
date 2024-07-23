<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'cate_title',
        'cate_description',
        'cate_keywords',
        'cate_url',
        'cate_icon',
        'cate_link',
        'cate_thumbnail',
        'cate_parent_id',
        'cate_position',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'cate_h1',
        'cate_h2',
        'cate_topic',
        'is_menu',
        'is_footer',
        'cate_priority',
        'status_display',
    ];
}

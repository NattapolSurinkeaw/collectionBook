<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('cate_title');
            $table->string('cate_description');
            $table->string('cate_keywords');
            $table->string('cate_url');
            $table->string('cate_icon')->nullable();
            $table->string('cate_link')->nullable();
            $table->string('cate_thumbnail')->nullable();
            $table->integer('cate_parent_id');
            $table->integer('cate_position');
            /* Web SEO */
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->string('cate_h1')->nullable();
            $table->string('cate_h2')->nullable();
            $table->string('cate_topic')->nullable();
            /*End Web SEO */
            $table->boolean('is_menu')->default(false);
            $table->boolean('is_footer')->default(false);
            $table->integer('cate_priority');
            $table->boolean('status_display');
            $table->timestamps();
        });

        DB::table('categories')->insert([
            [
                'id' => 1,
                'cate_title' => "หมวดหมู่หลัก",
                'cate_description' => "หมวดหมู่หลัก",
                'cate_keywords' => "หมวดหมู่หลัก",
                'cate_url' => "หมวดหมู่หลัก",
                'cate_icon' => "",
                'cate_link' => "หมวดหมู่หลัก",
                'cate_thumbnail' => "",
                'cate_parent_id' => "1",
                'cate_position' => "1",
                'meta_title' => "",
                'meta_description' => "",
                'meta_keywords' => "",
                'cate_h1' => "",
                'cate_h2' => "",
                'is_menu' => false,
                'is_footer' => false,
                'cate_priority' => 1,
                'status_display' => true,
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};

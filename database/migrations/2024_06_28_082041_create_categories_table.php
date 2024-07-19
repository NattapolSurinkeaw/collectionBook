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
            $table->string('title');
            $table->string('description');
            $table->string('keywords');
            $table->string('slug');
            $table->string('icon')->nullable();
            $table->string('link')->nullable();
            $table->string('image')->nullable();
            $table->integer('parent_id');
            $table->integer('position');
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->string('h1')->nullable();
            $table->string('h2')->nullable();
            $table->boolean('is_menu')->default(false);
            $table->boolean('is_footer')->default(false);
            $table->integer('priority');
            $table->boolean('status_display');
            $table->timestamps();
        });

        DB::table('categories')->insert([
            [
                'id' => 1,
                'title' => "หมวดหมู่หลัก",
                'description' => "หมวดหมู่หลัก",
                'keywords' => "หมวดหมู่หลัก",
                'slug' => "หมวดหมู่หลัก",
                'icon' => "",
                'link' => "หมวดหมู่หลัก",
                'image' => "",
                'parent_id' => "1",
                'position' => "1",
                'meta_title' => "",
                'meta_description' => "",
                'meta_keywords' => "",
                'h1' => "",
                'h2' => "",
                'is_menu' => false,
                'is_footer' => false,
                'priority' => 1,
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

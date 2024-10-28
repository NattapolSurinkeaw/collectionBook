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
        Schema::create('book_categories', function (Blueprint $table) {
            $table->id();
            $table->string("title_cate");
            $table->string("description_cate");
            $table->integer("priority");
            $table->boolean("status_display")->default(true);
            $table->timestamps();
        });

        DB::table('book_categories')->insert([
            'title_cate' => "love comedy",
            'description_cate' => "love comedy",
            'priority' => 1,
            'status_display' => true,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_categories');
    }
};

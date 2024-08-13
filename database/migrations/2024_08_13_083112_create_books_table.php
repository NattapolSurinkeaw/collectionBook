<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->text("title_TH");
            $table->text("title_EN");
            $table->text("title_Another");
            $table->text("description");
            $table->date("lc_release_date");
            $table->string("thumbnail");
            $table->string("cate_id");
            $table->foreignId('writer_id')->constrained('writers')->onDelete('cascade');
            $table->foreignId('ilust_id')->constrained('illustrators')->onDelete('cascade');
            $table->foreignId('publis_id')->constrained('publishers')->onDelete('cascade');
            $table->string("volume_book")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};

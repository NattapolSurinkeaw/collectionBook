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
        Schema::create('book_volumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->constrained('books')->onDelete('cascade');
            $table->string('title_volumes');
            $table->string('description')->nullable();
            $table->string('isbn_code')->nullable();
            $table->string('front_cover')->nullable();
            $table->string('back_cover')->nullable();
            $table->string('book_spine')->nullable();
            $table->decimal('price', 8, 2);
            $table->string('link_product')->nullable();
            $table->date('release_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_volumes');
    }
};

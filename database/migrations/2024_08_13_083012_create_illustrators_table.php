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
        Schema::create('illustrators', function (Blueprint $table) {
            $table->id();
            $table->string('illust_name');
            $table->string('another_name')->nullable();
            $table->timestamps();
        });

        DB::table('illustrators')->insert([
            'illust_name' => "nattapol"
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('illustrators');
    }
};

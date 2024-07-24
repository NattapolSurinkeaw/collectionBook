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
        Schema::create('language_availables', function (Blueprint $table) {
            $table->id();
            $table->string('abbv_name');
            $table->string('name');
            $table->string('flag')->nullable();
            $table->boolean('defaults')->default(false);
            $table->boolean('display')->default(true);
            $table->timestamps();
        });

        DB::table('language_availables')->insert([
            [ 'id' => 1, 'abbv_name' => 'th', 'flag' => 'upload/2022/10/11/th-flag.png', 'name' => 'ไทย' , "defaults" => 1, "display" => 1],
            [ 'id' => 2, 'abbv_name' => 'en', 'flag' => 'upload/2022/10/11/en-flag.png', 'name' => 'English', "defaults" => 0, "display" => 1],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('language_availables');
    }
};

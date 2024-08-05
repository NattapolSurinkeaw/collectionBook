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
        Schema::create('role_users', function (Blueprint $table) {
            $table->id();
            $table->string("role_name");
            $table->string("cate_id")->nullable();
            $table->integer("priority");
            $table->boolean("status_display");
            $table->timestamps();
        });

        DB::table('role_users')->insert([
            [
                'id' => 1,
                'role_name' => 'superadmin',
                'priority' => 1,
                'status_display' => true
            ],
            [
                'id' => 2,
                'role_name' => 'admin',
                'priority' => 2,
                'status_display' => true
            ],
            [
                'id' => 3,
                'role_name' => 'user',
                'priority' => 3,
                'status_display' => true
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_users');
    }
};

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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('profile_img')->nullable();
            $table->foreignId('role_id')->constrained('role_users')->onDelete('cascade');
            $table->boolean('dark_mode')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'nattapol suinkeaw',
                'email' => 'nutaponza123456@gmail.com',
                'email_verified_at' => '2024-07-12 01:03:56',
                'password' => '$2y$12$kQGyC7637zUJaYQn7rPe7.W8OsdzRzrUEhVhELpto4mFOYqA2WEQS',
                'profile_img' => NULL,
                'role_id' => 1,
                'remember_token' => NULL,
                'created_at' => '2024-07-12 01:03:44',
                'updated_at' => '2024-07-12 01:03:56',
            ],
            [
                'id' => 2,
                'name' => 'nattapol suinkeaw',
                'email' => 'nattapol.surinkeaw@gmail.com',
                'email_verified_at' => '2024-07-12 01:03:56',
                'password' => '$2y$12$kQGyC7637zUJaYQn7rPe7.W8OsdzRzrUEhVhELpto4mFOYqA2WEQS',
                'profile_img' => NULL,
                'role_id' => 1,
                'remember_token' => NULL,
                'created_at' => '2024-07-12 01:03:44',
                'updated_at' => '2024-07-12 01:03:56',
            ],
            [
                'id' => 3,
                'name' => 'nattapol suinkeaw',
                'email' => 'nattapolsu.ebook@gmail.com',
                'email_verified_at' => '2024-07-12 01:03:56',
                'password' => '$2y$12$kQGyC7637zUJaYQn7rPe7.W8OsdzRzrUEhVhELpto4mFOYqA2WEQS',
                'profile_img' => NULL,
                'role_id' => 3,
                'remember_token' => NULL,
                'created_at' => '2024-07-12 01:03:44',
                'updated_at' => '2024-07-12 01:03:56',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};

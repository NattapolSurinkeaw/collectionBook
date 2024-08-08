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
            $table->integer('cate_type')->comment('back or front Office')->default(1);
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
                'cate_type' => 1,
                'cate_priority' => 1,
                'status_display' => true,
            ],
            [
                'id' => 2,
                'cate_title' => "Page",
                'cate_description' => "Page",
                'cate_keywords' => "Page",
                'cate_url' => "/backoffice/page",
                'cate_icon' => "",
                'cate_link' => "Page",
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
                'cate_type' => 1,
                'cate_priority' => 2,
                'status_display' => true,
            ],
            [
                'id' => 3,
                'cate_title' => "Dashboard",
                'cate_description' => "Dashboard",
                'cate_keywords' => "Dashboard",
                'cate_url' => "/backoffice/dashboard",
                'cate_icon' => "",
                'cate_link' => "Dashboard",
                'cate_thumbnail' => "",
                'cate_parent_id' => "2",
                'cate_position' => "2",
                'meta_title' => "",
                'meta_description' => "",
                'meta_keywords' => "",
                'cate_h1' => "",
                'cate_h2' => "",
                'is_menu' => false,
                'is_footer' => false,
                'cate_type' => 1,
                'cate_priority' => 3,
                'status_display' => true,
            ],
            [
                'id' => 4,
                'cate_title' => "MangeCategory",
                'cate_description' => "MangeCategory",
                'cate_keywords' => "MangeCategory",
                'cate_url' => "/backoffice/category",
                'cate_icon' => "",
                'cate_link' => "MangeCategory",
                'cate_thumbnail' => "",
                'cate_parent_id' => "2",
                'cate_position' => "2",
                'meta_title' => "",
                'meta_description' => "",
                'meta_keywords' => "",
                'cate_h1' => "",
                'cate_h2' => "",
                'is_menu' => false,
                'is_footer' => false,
                'cate_type' => 1,
                'cate_priority' => 5,
                'status_display' => true,
            ],
            [
                'id' => 5,
                'cate_title' => "ManageUser",
                'cate_description' => "ManageUser",
                'cate_keywords' => "ManageUser",
                'cate_url' => "/backoffice/manageuser",
                'cate_icon' => "",
                'cate_link' => "ManageUser",
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
                'cate_type' => 1,
                'cate_priority' => 6,
                'status_display' => true,
            ],
            [
                'id' => 6,
                'cate_title' => "User",
                'cate_description' => "User",
                'cate_keywords' => "User",
                'cate_url' => "/backoffice/user",
                'cate_icon' => "",
                'cate_link' => "User",
                'cate_thumbnail' => "",
                'cate_parent_id' => "5",
                'cate_position' => "2",
                'meta_title' => "",
                'meta_description' => "",
                'meta_keywords' => "",
                'cate_h1' => "",
                'cate_h2' => "",
                'is_menu' => false,
                'is_footer' => false,
                'cate_type' => 1,
                'cate_priority' => 7,
                'status_display' => true,
            ],
            [
                'id' => 7,
                'cate_title' => "Role",
                'cate_description' => "Role",
                'cate_keywords' => "Role",
                'cate_url' => "/backoffice/role",
                'cate_icon' => "",
                'cate_link' => "role",
                'cate_thumbnail' => "",
                'cate_parent_id' => "5",
                'cate_position' => "2",
                'meta_title' => "",
                'meta_description' => "",
                'meta_keywords' => "",
                'cate_h1' => "",
                'cate_h2' => "",
                'is_menu' => false,
                'is_footer' => false,
                'cate_type' => 1,
                'cate_priority' => 8,
                'status_display' => true,
            ],
            [
                'id' => 8,
                'cate_title' => "ManageContent",
                'cate_description' => "ManageContent",
                'cate_keywords' => "ManageContent",
                'cate_url' => "/backoffice/content",
                'cate_icon' => "",
                'cate_link' => "ManageContent",
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
                'cate_type' => 1,
                'cate_priority' => 8,
                'status_display' => true,
            ],
            [
                'id' => 9,
                'cate_title' => "WebContent",
                'cate_description' => "WebContent",
                'cate_keywords' => "WebContent",
                'cate_url' => "/backoffice/webcontent",
                'cate_icon' => "",
                'cate_link' => "WebContent",
                'cate_thumbnail' => "",
                'cate_parent_id' => "8",
                'cate_position' => "2",
                'meta_title' => "",
                'meta_description' => "",
                'meta_keywords' => "",
                'cate_h1' => "",
                'cate_h2' => "",
                'is_menu' => false,
                'is_footer' => false,
                'cate_type' => 1,
                'cate_priority' => 9,
                'status_display' => true,
            ],
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

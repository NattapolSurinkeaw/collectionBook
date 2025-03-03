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
        Schema::create('bill_book_purchase_receipts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->string('store_sell')->nullable();
            $table->decimal('price', 8,2);
            $table->string('transport')->comment('ขนส่ง')->nullable();
            $table->string('parcel_number')->comment('เลขพัสดุ')->nullable();
            $table->string('image_slip')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bill_book_purchase_receipts');
    }
};

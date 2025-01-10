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
        Schema::create('bill_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bill_id')->constrained('bill_book_purchase_receipts')->onDelete('cascade'); // บิลที่เชื่อมโยง
            $table->foreignId('book_vol_id')->constrained('book_volumes')->onDelete('cascade'); // หนังสือเล่มนั้น
            $table->integer('quantity')->default(1); // จำนวนหนังสือที่ซื้อ
            $table->decimal('price_per_unit', 8, 2); // ราคาต่อเล่ม
            $table->decimal('discount_per_unit', 8, 2); // ราคาลดต่อเล่ม
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bill_items');
    }
};

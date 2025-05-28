<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use Illuminate\Support\Facades\Route;

Route::prefix('/admin')->group(function () {
    Route::prefix('/roles')->group(function () {
        Route::get('/', [RoleController::class, 'index'])->name('admin.roles.index');
        Route::get('/create', [RoleController::class, 'create'])->name('admin.roles.create');
        Route::post('/', [RoleController::class, 'store'])->name('admin.roles.store');
        Route::get('/{role}/edit', [RoleController::class, 'edit'])->name('admin.roles.edit');
        Route::put('/{role}', [RoleController::class, 'update'])->name('admin.roles.update');
        Route::delete('/{role}', [RoleController::class, 'destroy'])->name('admin.roles.destroy');
    });
    Route::prefix('/permissions')->group(function () {
        Route::get('/', [PermissionController::class, 'index'])->name('admin.permissions.index');
        Route::post('/', [PermissionController::class, 'store'])->name('admin.permissions.store');
        Route::put('/{permission}', [PermissionController::class, 'update'])->name('admin.permissions.update');
        Route::delete('/{permission}', [PermissionController::class, 'destroy'])->name('admin.permissions.destroy');
    });
});

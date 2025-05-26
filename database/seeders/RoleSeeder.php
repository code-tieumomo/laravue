<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = RoleEnum::cases();

        DB::transaction(function () use ($roles) {
            foreach ($roles as $role) {
                $roleInserted = Role::create([
                    'name' => $role->value,
                ]);

                $defaultPermissions = config('auth.default_permissions.' . $role->value);
                if ($defaultPermissions) {
                    $roleInserted->syncPermissions($defaultPermissions);
                }
            }
        });
    }
}

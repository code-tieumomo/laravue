<?php

namespace App\Http\Controllers\Admin;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();

        return inertia('admin/roles/Index', [
            'roles' => $roles,
        ]);
    }

    public function edit(Role $role)
    {
        $role->load('permissions');

        $permissions = Permission::all();

        return inertia('admin/roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $name = $request->input('name');
        $permissions = $request->input('permissions', []);

        $role->name = $name;
        $role->save();
        $role->syncPermissions($permissions);

        return redirect()->back()->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        if ($role->users()->count() > 0) {
            return redirect()->back()->withErrors(['error', 'Cannot delete role with assigned users.']);
        }

        if ($role->name === RoleEnum::ADMIN->value) {
            return redirect()->back()->withErrors(['error', 'Cannot delete the admin role.']);
        }

        $role->permissions()->detach();
        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully.');
    }
}

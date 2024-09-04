<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Category;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $roleUser = $user ? $user->roleUser : null;
        $cate = [];

        if ($roleUser) {
            $cate = Category::whereIn('id', explode(',', $roleUser->cate_id))
            ->where('cate_type', 1)
            ->where('status_display', true)
            ->orderBy('cate_priority')
            ->get();
        }

        return [
            
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'categories' => $cate
        ];
    }
}



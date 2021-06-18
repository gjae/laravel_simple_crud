<?php

namespace App\Providers;

use App\Models\User;
use App\Src\Interfaces\UserRepository;
use App\Src\Repositories\UserRepository as RepositoriesUserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(UserRepository::class, fn() => new RepositoriesUserRepository(User::class));
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}

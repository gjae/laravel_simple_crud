<?php

use App\Models\User;
use App\Src\Interfaces\UserRepository;
use App\Src\Repositories\UserRepository as RepositoriesUserRepository;

it("UserRepositoryInterface resolve UserRepositoryClass", function() {

    $di = app(UserRepository::class);

    expect($di)
        ->toBeObject()
        ->toBeInstanceOf(RepositoriesUserRepository::class)
        ->createModel()->toBeObject()->toBeInstanceOf(User::class);

});
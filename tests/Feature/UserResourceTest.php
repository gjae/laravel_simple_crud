<?php

use function Pest\Laravel\{get, postJson, putJson};
use App\Models\User;

beforeEach(function() {
    User::factory()->count(4)->create();
});

it("/api/users - Index OK", function() {
    get(route("users.index"))
        ->assertStatus(200)
        ->assertJsonCount(4, "data")
        ->assertJsonFragment(User::first()->toArray());
});


it("/api/users/1 - Show Ok", function() {
    get(route("users.show", ['user'=> User::first()->id]))
        ->assertStatus(200)
        ->assertJsonFragment(User::first()->toArray());
});

it("/api/users/33 - Show expect 404", function() {
    get(route("users.show", ['user' => 33]))
        ->assertStatus(404);

});

it("POST /api/users - Store Ok", function() {

    $users = User::factory()
                ->make(['phone_number' => "0412000000000", "email" => "test@gmail.com"])
                ->toArray();

    postJson(route("users.store", $users))
        ->assertStatus(201)
        ->assertJsonFragment($users);

});

it("POST /api/users - Store error: email duplicated", function() {

    $user = User::first();
    $userData = User::factory()->make([
        'email' => $user->email,
        'phone_number' => '041200000000'
    ])->toArray();

    postJson(route("users.store", $userData))
        ->assertStatus(422)
        ->assertSee('Este email esta siendo usado por alguien mas, no puede repetirse');


});

it("POST: /api/users - Store error: email invalid format", function() {

    $userData = User::factory()->make([
        'email' => 'it_isnt_valid_email',
        'phone_number' => '041200000000'
    ])->toArray();

    postJson(route("users.store", $userData))
        ->assertStatus(422)
        ->assertSee("El email suministrado no tiene un formato valido.");
});

it("Update /api/user/{user} - Update ok", function() {
    
    $user = User::first();

    putJson(
        route("users.update", ["user" => $user->id]), 
        ["email" => $user->email, "name" => "Jaimito"]
    )
    ->assertOk()
    ->assertJsonFragment(["name" => "Jaimito", "email" => $user->email]);
});
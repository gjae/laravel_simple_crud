<?php
use Illuminate\Database\Eloquent\Model;
use function Pest\Faker\faker;

use App\Models\User;
use App\Src\Repositories\UserRepository;

beforeEach(function() {
    $this->userRepository = new UserRepository(User::class);
    $this->userData = [
        'name' => faker()->name,
        'email' => faker()->unique()->safeEmail,
        'phone_number' => faker()->phoneNumber,
        'id_card' => '123456789'
    ];
});


it("createModel method should return new model instance", function() {
    expect($this->userRepository->createModel())
        ->toBeInstanceOf(User::class)
        ->toBeInstanceOf(Model::class);

});

it("createModel shoud return new User model with initial data", function() {
    expect($this->userRepository->createModel($this->userData))
        ->toBeInstanceOf(User::class)
        ->email
        ->toBe($this->userData['email'])
        ->id_card
        ->toBeString
        ->toBe("123456789");
});

it("Create a new user record", function() {

    $newModel = $this->userRepository->create(
        name: $this->userData['name'],
        email :$this->userData['email'],
        phone: $this->userData['phone_number'],
        id_card: $this->userData['id_card'],
    );

    expect($newModel)
        ->toBeObject()
        ->toBeInstanceOf(User::class)
        ->email->toBeString()->toBe($this->userData['email'])
        ->phone_number->toBeString()->toBe($this->userData['phone_number']);

    // Valida que el usuario se creara de manera correcta y exista
    // ese unico registro en la BD
    expect(User::count())->toBe(1);
});


it("FindById should retrieve user by id", function() {
    $users = User::factory()->count(3)->create();

    expect($this->userRepository->findById($users[0]->id))
        ->toBeObject()
        ->toBeInstanceOf(User::class)
        ->email->toBeString()->toBe($users[0]->email)
        ->id_card->toBeString()
        ->id->toBe($users[0]->id);
});


it("Raise exception because user ID no exists", function() {
    $this->userRepository->findById(9);
})->throws(\Illuminate\Database\Eloquent\ModelNotFoundException::class);

it("Update model from repository", function() {
    $user = User::factory()->create();

    $result = $this->userRepository->update(
        $user->id,
        $this->userData
    );

    expect($result)->toBeTrue();
    expect(User::find($user->id))
        ->toBeObject()
        ->email->toBeString()->toBe($this->userData['email']);
});


it("Delete method return true when user ID is valid", function() {
    $user = User::factory()->create();
    expect($this->userRepository->deleteById($user->id))
        ->toBeTrue();
});

it("Delete method return false when user ID is invalid", function() {
    $user = User::factory()->create();

    expect($this->userRepository->deleteById(1550))
        ->toBeFalse();
});
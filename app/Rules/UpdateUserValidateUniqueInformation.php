<?php

namespace App\Rules;

use App\Src\Interfaces\UserRepository;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UpdateUserValidateUniqueInformation implements Rule
{
    private int $currentUserId;
    private UserRepository $repository;
    private string $errorString = "";

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(int $requestUserId)
    {
        $this->currentUserId = $requestUserId;
        $this->repository = app(UserRepository::class);
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        try {
            $user = $this->repository->findById($this->currentUserId);
            if ($user->{$attribute} == $value) {
                return true;
            }

            $duplicateEmail = $this->repository->createModel()->where($attribute, $value)->first();
            if($duplicateEmail) {
                return true;
            } else {
                $this->errorString = "Este {$attribute} esta siendo utilizado por otra persona, vuelva a intentarlo";
                return false;
            }

        } catch(ModelNotFoundException $e) {
            return true;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->errorString;
    }
}

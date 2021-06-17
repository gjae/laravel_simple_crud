<?php

namespace App\Http\Requests;

use App\Rules\UpdateUserValidateUniqueInformation;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserFormRequest extends UserFormRequest
{
    private int $userRouteId;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $this->userRouteId = $this->route("user");
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'sometimes|string|min:3|max:190',
            'email' => ['sometimes', new UpdateUserValidateUniqueInformation($this->userRouteId)],
            'id_card' => ["sometimes", new UpdateUserValidateUniqueInformation($this->userRouteId)],
            'phone_number' => 'sometimes|numeric'
        ];
    }
}

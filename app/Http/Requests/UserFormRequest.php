<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
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
            'name' => 'required|string|min:3|max:190',
            'email' => 'required|email|unique:users,email',
            'id_card' => 'required|unique:users,id_card|numeric',
            'phone_number' => 'required|numeric'
        ];
    }


    public function messages()
    {
        return [
            'name.required' => 'En nombre del usuario es requerido',
            'name.min' => 'El rango de caracteres del nombre del usuario debe estar entre :min y :max',
            'name.max' => 'El nombre del usuario es mas largo de lo permitido',
            'id_card.required' => 'La cedula del usuario es requerida',
            'id_card.unique' => 'Esta cedula ya ha sido registrada y no puede ser reutilizada',
            'id_card.numeric' => 'La cedula del usuario solo puede contener caracteres numericos',
            'phone_number.required' => 'El número telefonico del usuario es requerido',
            'phone_number.numeric' => 'El número telefonico solo puede contener digitos numericos.',
            'email.unique' => 'Este email esta siendo usado por alguien mas, no puede repetirse',
            'email.email' => 'El email suministrado no tiene un formato valido.'
        ];
    }
}

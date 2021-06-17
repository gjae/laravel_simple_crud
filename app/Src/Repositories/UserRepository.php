<?php

namespace App\Src\Repositories;

use App\Src\Interfaces\{Repository, UserRepository as BaseUserInterface};
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserRepository implements Repository, BaseUserInterface{

    private Model $model;
    
    private string $modelClass;

    public function __construct(string $modelClass)
    {
        $this->modelClass = $modelClass;
        $this->model = new $modelClass();
    }

    public function createModel(?array $data = null) {

        if (!is_null($data)) {
            return new $this->modelClass($data);
        }

        return new $this->modelClass();
    }

    /**
     * Create a new user register
     *
     * @param string $name
     * @param string $email
     * @param string $phone
     * @param string $id_card
     * 
     * @return Model
     */
    public function create(
        string $name, 
        string $email, 
        string $phone, 
        string $id_card
    ) : Model {
        $this->model = $this->createModel([
            'name' => $name,
            'email' => $email,
            'phone_number' => $phone,
            'id_card' => $id_card
        ]);

        $this->model->save();

        return $this->model;
    }

    /**
     * Search user by id
     *
     * @param integer $id
     * @return Model|null
     */
    public function findById(int $id) : ?Model {
        $this->model = $this->createModel()->findOrFail($id);
        return $this->model;
    }

    /**
     * Update record by $id using $updateData
     *
     * @param integer $id
     * @param array $updateData
     * @return boolean
     */
    public function update(int $id, array $updateData) : bool {
        $isUpdated = $this->createModel()->findOrFail($id)->update($updateData);
        return true;
    }

    /**
     * Delete a record by $id
     *
     * @param integer $id
     * @return boolean
     */
    public function deleteById(int $id) : bool {
        try {
            $this->findById($id)->delete();
            return true;
        } catch(ModelNotFoundException $e) {
            return false;
        }
    }

    /**
     * Return all records from user models
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->createModel()->all();
    }


}
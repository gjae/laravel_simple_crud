<?php

namespace App\Src\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface Repository {

    /**
     * Create a new user register
     *
     * @param string $name
     * @param string $cedula
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
    ) : Model;

    /**
     * Search user by id
     *
     * @param integer $id
     * @return Model|null
     */
    public function findById(int $id) : ?Model;

    /**
     * Update record by $id using $updateData
     *
     * @param integer $id
     * @param array $updateData
     * @return boolean
     */
    public function update(int $id, array $updateData) : bool;

    /**
     * Delete a record by $id
     *
     * @param integer $id
     * @return boolean
     */
    public function deleteById(int $id) : bool;

    /**
     * Retrieve all user records from database
     *
     * @return Collection
     */
    public function getAll() : Collection;

}
<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserFormRequest;
use App\Http\Requests\UserFormRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Src\Interfaces\UserRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserController extends Controller
{

    private UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new UserCollection( $this->repository->getAll() );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserFormRequest $request)
    {
        return new UserResource(
            $this->repository->create(
                name: $request->name,
                phone: $request->phone_number,
                id_card: $request->id_card,
                email: $request->email
            )
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $user = $this->repository->findById($id);
            return new UserResource($user);
        } catch(ModelNotFoundException $e) {
            return response(status: 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserFormRequest $request, $id)
    {
        $res = $this->repository->update($id, $request->all());
        if ($res) {
            return new UserResource($this->repository->findById($id));
        }

        return response()->json(["Ha ocurrido un errror al intentar actualizar el registro"], 501);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

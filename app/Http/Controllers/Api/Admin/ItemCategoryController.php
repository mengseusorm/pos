<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemCategoryRequest;
use App\Http\Requests\PaginateRequest;
use App\Http\Resources\ItemCategoryResource;
use App\Services\ItemCategoryService;
use Exception; 

class ItemCategoryController extends Controller
{
    protected $itemCategoryService;

    public function __construct(ItemCategoryService $itemCategoryService)
    {
        $this->itemCategoryService = $itemCategoryService;
    }
    public function index(PaginateRequest $request) : \Illuminate\Http\Response | \Illuminate\Http\Resources\Json\AnonymousResourceCollection | \Illuminate\Contracts\Foundation\Application | \Illuminate\Contracts\Routing\ResponseFactory
    {
        return ItemCategoryResource::collection($this->itemCategoryService->list($request));
    }

    public function store(ItemCategoryRequest $request) : \Illuminate\Http\Response | ItemCategoryResource | \Illuminate\Contracts\Foundation\Application | \Illuminate\Contracts\Routing\ResponseFactory
    { 
        try {
            return new ItemCategoryResource($this->itemCategoryService->store($request));
        } catch (Exception $exception) {
            return response(['status' => false, 'message' => $exception->getMessage()], 422);
        }
        
    }
}

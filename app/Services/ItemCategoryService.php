<?php

namespace App\Services;

use App\Http\Requests\ItemCategoryRequest;
use App\Http\Requests\PaginateRequest;
use App\Models\ItemCategory;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str; 

/**
 * Class ItemCategoryService
 * @package App\Services
 */
class ItemCategoryService
{ 
    protected $itemCateFilter = [
        'name',
        'slug',
        'description',
        'status',
        'branch_id',
        'last_updated'
    ];

    protected $exceptFilter = [
        'excepts'
    ];

    public function list(PaginateRequest $request){
        $requests    = $request->all();
        $method      = $request->get('paginate', 0) == 1 ? 'paginate' : 'get';
        $methodValue = $request->get('paginate', 0) == 1 ? $request->get('per_page', 10) : '*';
        $orderColumn = $request->get('order_column') ?? 'id';
        $orderType   = $request->get('order_type') ?? 'desc';

        return ItemCategory::with('media')->where(function ($query) use ($requests) {
                foreach ($requests as $key => $value) {
                    if (in_array($key, $this->itemCateFilter)) {
                        if ($key == 'last_updated') {
                            // Filter categories updated after the provided timestamp
                            $query->where('updated_at', '>', $value);
                        } else {
                            $query->where($key, 'like', '%' . $value . '%');
                        }
                    }

                    // if (in_array($key, $this->exceptFilter)) {
                    //     $explodes = explode('|', $value);
                    //     if (is_array($explodes)) {
                    //         foreach ($explodes as $explode) {
                    //             $query->where('id', '!=', $explode);
                    //         }
                    //     }
                    // }
                }
            })->orderBy($orderColumn, $orderType)->$method(
                $methodValue
            );
    }

    public function store(ItemCategoryRequest $request){
        try {
            $itemCategory = ItemCategory::create($request->validated() + ['slug' => Str::slug($request->name)]);
            if ($request->image) {
                $itemCategory->addMediaFromRequest('image')->toMediaCollection('item-category');
            }
            return $itemCategory;
        } catch (Exception $exception) {
            Log::info($exception->getMessage());
            throw new Exception($exception->getMessage(), 422);
        }
    }
}

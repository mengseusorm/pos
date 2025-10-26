<?php

namespace App\Services;

use App\Http\Requests\ItemCategoryRequest;
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

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    { 
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'email' => 'The provided credentials are incorrect.'
            ], 422);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Logout error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error during logout'
            ], 500);
        }
    }
}

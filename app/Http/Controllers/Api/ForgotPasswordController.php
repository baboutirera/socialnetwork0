<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    //
    public function sendResetLinkEmail(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required | string | max:255 | email',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT ? $this->sendResetLinkResponse($request, $response) : $this->sendResetLinkFailedResponse($request, $response);
    }

    public function broker() {
        return Password::broker();
    }

    public function sendResetLinkResponse(Request $request, $response) {
        return response()->json(["message" => "E-mail envoyé", "response" => $response], 200);
    }

    public function sendResetLinkFailedResponse(Request $request, $response) {
        return response()->json(["message" => "Impossible d'envoyer un e-mail", "response" => $response], 500);
    }
}

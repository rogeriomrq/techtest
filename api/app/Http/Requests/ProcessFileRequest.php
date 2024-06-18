<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProcessFileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'file' => 'required|file|mimes:csv,txt,xlsx'
        ];
    }

    public function messages()
    {
        return [
            'file.required' => 'Nenhum arquivo enviado.',
            'file.mimes' => 'O arquivo deve ser um dos seguintes tipos: csv, txt, xlsx.',
        ];
    }
}

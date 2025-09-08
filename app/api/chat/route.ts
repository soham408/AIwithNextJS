// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,

// });

// export async function POST(request){
//     try {
//         const {message} = await request.json()

//         const completion = await openai.chat.completions.create({
//             model: "apt-3.5-turbo",
//             messages: [{role: 'user', content: message}]
//         })

//         return Response.json({
//             response: completion.choices[0].message.content,
//         }) 
//     } catch (error) {
//         return Response.json(
//             {
//                 error: "Failed to process request"
//             },
//             { status: 500 }
//         )
//     }
// }


import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
    try {
        const { message } = await req.json();

        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // or your specific model
            contents: message,
        });

        // Extract the generated text from the result object
        const generatedText = result.candidates[0]?.content?.parts[0]?.text;

        if (!generatedText) {
            throw new Error('No generated text found');
        }

        return NextResponse.json({
            response: generatedText,
        });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            error: error.message || "Failed to process request",
        }, { status: 500 });
    }
}

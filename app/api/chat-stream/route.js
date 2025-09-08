// import OpenAI from "openai";
// import stream from "stream";


// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,

// });

// export async function POST(request){
//      try {
//         const {message} = await request.json()

//         const stream = await openai.chat.completions.create({
//             model: "apt-3.5-turbo",
//             messages: [{role: 'user', content: message}],
//             stream: true
//         })

//         const encoder = new TextEncoder()

//         const readable = new ReadableStream({
//             async start(controller){
//                     for await(const chunk of stream){
//                         const content = chunk.choices[0]?.delts?.content | ""
//                         if(content){
//                             controller.enqueue(encoder.encode(`data: ${JSON.stringify({content})}\n\n`))
//                         }
//                     }
//                     controller.close()
//                 }
//             })

//             return new Response(readable, {
//                 headers: {
//                     'Content-Type': "text/event-stream",
//                     'cache-control': 'no-cache',
//                     'Connection': "keep-alive"
//                 }
//             })

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
            model: 'gemini-2.5-flash', // or your correct model
            contents: message,
        });

        const generatedText = result.candidates[0]?.content?.parts[0]?.text;

        if (!generatedText) {
            throw new Error('No generated text found');
        }

        // Create a readable stream for the response
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content: generatedText })}\n\n`));
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
            }
        });

    } catch (error) {
        console.error("Chat-stream error:", error);
        return NextResponse.json({
            error: error.message || "Failed to process stream request",
        }, { status: 500 });
    }
}

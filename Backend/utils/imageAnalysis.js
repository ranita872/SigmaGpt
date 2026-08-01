import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const analyzeImage = async (imagePath, question) => {
    const base64Image = fs.readFileSync(imagePath, {
        encoding: "base64"
    });

    const response = await client.responses.create({
        model: "gpt-4o-mini",
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: `
${question}

Please analyze the image comprehensively:
- Describe every visible object.
- Mention colors and positions.
- Describe the environment.
- Mention any text present.
- Describe people without identifying them.
- Mention notable details and context.
- Provide a final detailed summary.
`
                    },
                    {
                        type: "input_image",
                        image_url: `data:image/jpeg;base64,${base64Image}`
                    }
                ]
            }
        ]
    });

    return response.output_text;
};

export default analyzeImage;
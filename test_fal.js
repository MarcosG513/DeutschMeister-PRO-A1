import 'dotenv/config';
import { fal } from "@fal-ai/client";

fal.config({ credentials: process.env.FAL_KEY || process.env.VITE_FAL_KEY });

async function run() {
    try {
        const result = await fal.subscribe("fal-ai/flux/dev", {
            input: {
                prompt: "A test prompt", 
                image_size: "square_hd",
                num_inference_steps: 30,
                guidance_scale: 3.0,
                output_format: "webp"
            }
        });
        console.log("Success:", result);
    } catch (e) {
        console.log("Error body:", JSON.stringify(e.body, null, 2));
    }
}
run();

import { prevUser } from "./utils/UserContext";

export async function query() {
	const response = await fetch(
		"https://router.huggingface.co/fal-ai/fal-ai/fast-sdxl",
		{
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({prompt: prevUser.prompt}),
		}
	);
	const result = await response.blob();
	return result;
}



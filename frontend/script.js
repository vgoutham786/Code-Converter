
// Define your ChatGPT API endpoint and API key in the global scope

const chatGptApiEndpoint = "https://api.openai.com/v1/chat/completions"; // Use the provided endpoint
// const chatGptApiKey = window.config.OPENAI_API_KEY; // Replace with your actual API key

var chatGptApiKey = ""
// Initialize Monaco Editor if you need it
// ...
fetch("https://apikey-5drn.onrender.com/get-api-key")
    .then((response) => response.json())
    .then((data) => {
        chatGptApiKey = data.apiKey;
        // console.log(chatGptApiKey)
        // console.log("API Key:", apiKey);
        // Now you can use the apiKey in your JavaScript
    })
    .catch((error) => {
        console.error("Error fetching API key:", error);
    });
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai"); // You can choose a different theme
editor.session.setMode("ace/mode/javascript"); // Set the default language
editor.setOptions({
    fontSize: "14px",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
});


// Access the initial code from the editor
//const code= editor.getValue();
//console.log(code)
// Function to interact with ChatGPT
async function interactWithChatGpt(prompt) {
    // console.log(apiKey)
    try {
        const response = await fetch(chatGptApiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${chatGptApiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Specify the model
                messages: [{ role: "system", content: "You are a code interpreter." }, { role: "user", content: prompt }],
            }),
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        return reply;
    } catch (error) {
        console.error("Error interacting with ChatGPT:", error);
        throw error;
    }
}

// Handle code debugging request
document.getElementById("debugButton").addEventListener("click", async () => {
    // const code = document.getElementById("code").value;
    const code = editor.getValue();
    try {
        // Send the code to ChatGPT for debugging
        const debugResults = await interactWithChatGpt(`Debug the following code:\n\n${code}`);

        document.getElementById("debugResults").textContent = debugResults;
    } catch (error) {
        console.error("Error during debugging", error);
    }
});

// Handle code quality check request
document.getElementById("qualityCheckButton").addEventListener("click", async () => {
    // const code = document.getElementById("code").value;
    const code = editor.getValue();
    try {
        // Send the code to ChatGPT for quality checking
        const qualityCheckResults = await interactWithChatGpt(`Check the quality and syntax of the following code:\n\n${code}`);

        document.getElementById("qualityCheckSuggestions").innerHTML = `<li>${qualityCheckResults}</li>`;
    } catch (error) {
        console.error("Error during quality checking", error);
    }
});

// Handle code conversion request
document.getElementById("convertButton").addEventListener("click", async () => {
    // const code = document.getElementById("code").value;
    const code = editor.getValue();
    const targetLanguage = document.getElementById("language").value;

    try {
        // Send the code to ChatGPT for code conversion
        const conversionResults = await interactWithChatGpt(`Convert the following code to ${targetLanguage}:\n\n${code}`);

        document.getElementById("convertedCode").textContent = conversionResults;
    } catch (error) {
        console.error("Error during code conversion", error);
    }
});


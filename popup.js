document.addEventListener("DOMContentLoaded", () => {
    const rewriteBtn = document.getElementById("rewriteBtn");
  
    rewriteBtn.addEventListener("click", async () => {
      const inputText = document.getElementById("inputText").value;
      const outputBox = document.getElementById("outputText");
  
      if (!inputText.trim()) {
        alert("Please enter some text.");
        return;
      }
  
      outputBox.value = " Rewriting...";
  
      const apiKey = "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"; // Replace with a freshly regenerated key
  
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "user", content: `Rephrase this text: ${inputText}` }
            ],
            temperature: 0.7
          })
        });
  
        const data = await response.json();
        console.log("GPT raw response:", data);
  
        // ✅ Check for API errors
        if (data.error) {
          outputBox.value = ` API Error: ${data.error.message}`;
          return;
        }
  
        // ✅ Check if response contains choices
        const message = data?.choices?.[0]?.message?.content;
        if (message) {
          outputBox.value = message.trim();
        } else {
          outputBox.value = " No message returned. Try again.";
        }
  
      } catch (err) {
        console.error("API call failed:", err);
        outputBox.value = " Network/API error. See console.";
      }
    });
  });
  
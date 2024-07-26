async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    loaderContainer.style.display = "flex";
    outputBox.style.display = "none";
    outputTextbox.style.display = "none";
  
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Upload failed");
      }
  
      const data = await response.json();
  
      loaderContainer.style.display = "none";
      outputBox.style.display = "block";
      outputTextbox.style.display = "block";
  
      if (data.roast) {
        console.log("Upload successful:", data);
        outputTextbox.textContent = data.roast; // Display roast text
        // Save the data in local storage for future use
        localStorage.setItem("roast", data.roast);
      } else {
        outputBox.textContent = "No roast available, please try again.";
      }
    } catch (error) {
      console.error("Error:", error);
      loaderContainer.style.display = "none";
      outputBox.style.display = "block";
      outputBox.textContent = "An error occurred, please try again.";
    }
  }
  
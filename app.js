function getSelectedOption() {
  const inputValue = document.getElementById("myInput").value;

  if (inputValue === "") {
    alert("Please type a message!");
    return;
  }
  const userMessage = document.createElement("div");
  userMessage.className = "message sent";
  userMessage.innerText = inputValue;
  document.getElementById("message-box").appendChild(userMessage);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: inputValue,
          },
        ],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={API_key}",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      let responseText = result.candidates[0].content.parts[0].text;

      const newMessage = document.createElement("div");
      newMessage.className = "message received";
      newMessage.innerText = responseText;
      document.getElementById("message-box").appendChild(newMessage);
    })
    .catch((error) => {
      console.error("Error:", error);

      const errorMessage = document.createElement("div");
      errorMessage.className = "message received error";
      errorMessage.innerText = "An error occurred. Please try again.";
      document.getElementById("message-box").appendChild(errorMessage);
    });

  document.getElementById("myInput").value = "";
}

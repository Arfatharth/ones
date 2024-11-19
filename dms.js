document.addEventListener("DOMContentLoaded", () => {
  const memberList = document.getElementById("member-list");
  const addMemberButton = document.getElementById("add-member-button");
  const memberSearch = document.getElementById("member-search");
  const chatContent = document.getElementById("chat-content");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  // Retrieve data from localStorage or initialize
  const conversations = JSON.parse(localStorage.getItem("conversations")) || {};
  const members = JSON.parse(localStorage.getItem("members")) || [];
  let currentMember = null;

  // Render chat for selected member
  function renderChat(memberName) {
    chatContent.innerHTML = ""; // Clear current chat
    if (conversations[memberName]) {
      conversations[memberName].forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", message.type);
        messageDiv.textContent = message.text;
        chatContent.appendChild(messageDiv);
      });
    }
    chatContent.scrollTop = chatContent.scrollHeight; // Scroll to bottom
  }

  // Save state to localStorage
  function saveState() {
    localStorage.setItem("conversations", JSON.stringify(conversations));
    localStorage.setItem("members", JSON.stringify(members));
  }

  // Add new member
  addMemberButton.addEventListener("click", () => {
    const newMemberName = prompt("Enter member's name:");
    if (newMemberName && !members.includes(newMemberName)) {
      // Add to members list
      members.push(newMemberName);

      // Create a new list item for the member
      const newMember = document.createElement("li");
      newMember.classList.add("member-item");
      newMember.textContent = newMemberName;

      // Append the new member to the member list
      memberList.appendChild(newMember);

      // Initialize conversation for the new member
      conversations[newMemberName] = [];

      // Add click event listener to the new member
      newMember.addEventListener("click", () => {
        currentMember = newMemberName;
        document.querySelectorAll(".member-item").forEach((item) => {
          item.classList.remove("active-member");
        });
        newMember.classList.add("active-member");
        renderChat(currentMember);
      });

      // Save state
      saveState();
    } else if (members.includes(newMemberName)) {
      alert("Member already exists!");
    }
  });

  // Member search functionality
  memberSearch.addEventListener("input", () => {
    const searchValue = memberSearch.value.toLowerCase();
    document.querySelectorAll(".member-item").forEach((member) => {
      if (member.textContent.toLowerCase().includes(searchValue)) {
        member.style.display = "block";
      } else {
        member.style.display = "none";
      }
    });
  });

  // Send a message
  sendButton.addEventListener("click", () => {
    const messageText = messageInput.value.trim();
    if (messageText && currentMember) {
      // Add message to the conversation
      if (!conversations[currentMember]) {
        conversations[currentMember] = [];
      }
      conversations[currentMember].push({ type: "sent", text: messageText });

      // Render updated chat
      renderChat(currentMember);

      // Save state
      saveState();

      // Clear the input field
      messageInput.value = "";
    }
  });

  // Initialize members and conversations on page load
  members.forEach((memberName) => {
    const member = document.createElement("li");
    member.classList.add("member-item");
    member.textContent = memberName;

    // Append to member list
    memberList.appendChild(member);

    // Add click event listener
    member.addEventListener("click", () => {
      currentMember = memberName;
      document.querySelectorAll(".member-item").forEach((item) => {
        item.classList.remove("active-member");
      });
      member.classList.add("active-member");
      renderChat(currentMember);
    });
  });

  // Restore conversations for the first member
  if (members.length > 0) {
    currentMember = members[0];
    document.querySelector(`.member-item:nth-child(1)`).classList.add("active-member");
    renderChat(currentMember);
  }
});

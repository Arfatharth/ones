document.addEventListener("DOMContentLoaded", () => {
  const addMemberBtn = document.getElementById("addMemberBtn");
  const addMemberModal = document.getElementById("addMemberModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const addMemberForm = document.getElementById("addMemberForm");
  const membersList = document.getElementById("membersList");

  let memberCount = 0;

  // Retrieve saved members from localStorage
  const savedMembers = JSON.parse(localStorage.getItem("membersData")) || [];

  // Function to render members
  function renderMembers() {
    membersList.innerHTML = ""; // Clear the current list
    memberCount = 0; // Reset count

    savedMembers.forEach((member) => {
      memberCount++;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${memberCount}</td>
        <td>${member.name}</td>
        <td>${member.semester}</td>
      `;
      membersList.appendChild(row);
    });
  }

  // Save members to localStorage
  function saveMembers() {
    localStorage.setItem("membersData", JSON.stringify(savedMembers));
  }

  // Open modal
  addMemberBtn.addEventListener("click", () => {
    addMemberModal.style.display = "flex";
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    addMemberModal.style.display = "none";
  });

  // Close modal when clicking outside of content
  window.addEventListener("click", (event) => {
    if (event.target === addMemberModal) {
      addMemberModal.style.display = "none";
    }
  });

  // Handle form submission
  addMemberForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const memberName = document.getElementById("memberName").value.trim();
    const memberSem = document.getElementById("memberSem").value.trim();

    if (memberName && memberSem) {
      // Add new member to the saved members list
      savedMembers.push({ name: memberName, semester: memberSem });

      // Render updated member list
      renderMembers();

      // Save updated list to localStorage
      saveMembers();

      // Reset form
      addMemberForm.reset();

      // Close modal
      addMemberModal.style.display = "none";
    }
  });

  // Render members on page load
  renderMembers();
});

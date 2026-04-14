document.getElementById('predictBtn').addEventListener('click', async function () {
  const errorMessage = document.getElementById('errorMessage');
  const formData = {
    age: document.getElementById('age').value,
    restingBP: document.getElementById('restingBP').value,
    cholesterol: document.getElementById('cholesterol').value,
    fastingBS: document.getElementById('fastingBS').value,
    maxHR: document.getElementById('maxHR').value,
    exerciseAngina: document.querySelector('input[name="exerciseAngina"]:checked')?.value,
    oldpeak: document.getElementById('oldpeak').value,
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    cp_TA: document.querySelector('input[name="cp"][value="0"]').checked ? 1 : 0,
    cp_ATA: document.querySelector('input[name="cp"][value="1"]').checked ? 1 : 0,
    cp_NAP: document.querySelector('input[name="cp"][value="2"]').checked ? 1 : 0,
    cp_ASY: document.querySelector('input[name="cp"][value="3"]').checked ? 1 : 0,
    ecg_Normal: document.querySelector('input[name="ecg"][value="0"]').checked ? 1 : 0,
    ecg_ST: document.querySelector('input[name="ecg"][value="1"]').checked ? 1 : 0,
    ecg_LVH: document.querySelector('input[name="ecg"][value="2"]').checked ? 1 : 0,
    st_Up: document.querySelector('input[name="st"][value="0"]').checked ? 1 : 0,
    st_Flat: document.querySelector('input[name="st"][value="1"]').checked ? 1 : 0,
    st_Down: document.querySelector('input[name="st"][value="2"]').checked ? 1 : 0,
  };

// Function to reset form values
function resetForm() {
  document.getElementById('age').value = '';
  document.getElementById('restingBP').value = '';
  document.getElementById('cholesterol').value = '';
  document.getElementById('fastingBS').value = '';
  document.getElementById('maxHR').value = '';
  document.getElementById('oldpeak').value = '';
  
  // Uncheck radio buttons
  document.querySelectorAll('input[name="exerciseAngina"]').forEach(radio => (radio.checked = false));
  document.querySelectorAll('input[name="gender"]').forEach(radio => (radio.checked = false));
  document.querySelectorAll('input[name="cp"]').forEach(radio => (radio.checked = false));
  document.querySelectorAll('input[name="ecg"]').forEach(radio => (radio.checked = false));
  document.querySelectorAll('input[name="st"]').forEach(radio => (radio.checked = false));
}

// Close the modal when the close button is clicked
document.querySelector('.close-btn').onclick = () => {
  document.getElementById('resultModal').style.display = 'none';
  resetForm(); // Reset the form when modal is closed
};

// Close the modal if the user clicks outside of it
window.onclick = (event) => {
  if (event.target === document.getElementById('resultModal')) {
    document.getElementById('resultModal').style.display = 'none';
    resetForm(); // Reset the form when modal is closed
  }
};

  // Validate that all required fields are filled
  const isFormComplete = Object.values(formData).every(value => value !== undefined && value !== '');
  if (!isFormComplete) {
    errorMessage.textContent = 'Please fill out all fields in the form.';
    errorMessage.style.display = 'block'; // Show the error message
    return; // Stop execution if the form is incomplete
  }

  errorMessage.style.display = 'none'; // Hide the error message if the form is valid
    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const resultMessage = document.getElementById("resultMessage");
      resultMessage.textContent = data.result;

      // Show the modal with the result message
      document.getElementById("resultModal").style.display = "flex";
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred, please try again!");
    }
  });


function showLogin() {
  document.getElementById("registerContainer").style.display = "none";
  document.getElementById("loginContainer").style.display = "block";
}
function logout() {
  window.location.href = "/login";
}

function showRegister() {
  document.getElementById("loginContainer").style.display = "none";
  document.getElementById("registerContainer").style.display = "block";
}

function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const regSuccess = document.getElementById("regSuccess");
  const regError = document.getElementById("regError");

  if (username && password) {
    localStorage.setItem(username, password);
    regSuccess.textContent = "Registration successful! Redirecting to login...";
    regError.textContent = "";
    document.getElementById("regUsername").value = "";
    document.getElementById("regPassword").value = "";

    // Redirect to login form after a delay
    setTimeout(() => {
      showLogin();
    }, 2000);
  } else {
    regError.textContent = "Please fill out both fields.";
    regSuccess.textContent = "";
  }
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const loginError = document.getElementById("loginError");

  const storedPassword = localStorage.getItem(username);

  if (storedPassword === password) {
    loginError.textContent = "Login successful! Redirecting...";
    loginError.style.color = "green";

    // Redirect to index2.html after a delay
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } else {
    loginError.textContent = "Invalid username or password.";
    loginError.style.color = "red";
  }
}

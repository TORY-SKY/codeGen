// Firestore init
const db = firebase.firestore();




//toast notification
function showToast(message, type = "success") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: type === "success" ? "#4caf50" : "#f44336", // green or red
    close: true
  }).showToast();
}

// Signup
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        return db.collection('users').doc(user.uid).set({
          uid: user.uid,
          name,
          username,
          email,
          phone,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .then(() => {
        showToast("user successfully created")
        window.location.href = "home.html";
      })
      .catch(err => showToast(err.message, 'error'));
  });
}

// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = "home.html")
      .catch(err => showToast(err.message, 'error'));
  });
}

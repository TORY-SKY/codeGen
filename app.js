// Firestore init
const db = firebase.firestore();

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
        window.location.href = "home.html";
      })
      .catch(err => alert(err.message));
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
      .catch(err => alert(err.message));
  });
}

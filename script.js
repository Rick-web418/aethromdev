// Kayıt
function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const message = document.getElementById("registerMessage");

  if (!email.includes("@") || !email.includes(".")) {
    message.textContent = "Geçerli bir e-posta giriniz.";
    message.className = "message error";
    return;
  }

  if (password.length < 4) {
    message.textContent = "Şifre en az 4 karakter olmalı.";
    message.className = "message error";
    return;
  }

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  localStorage.setItem("username", "Kullanıcı");
  localStorage.setItem("loggedIn", "false"); // ilk başta giriş yapılmamış

  message.textContent = "Kayıt başarılı! Giriş yapabilirsiniz.";
  message.className = "message success";
}

// Giriş
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (email === savedEmail && password === savedPassword) {
    localStorage.setItem("loggedIn", "true"); // giriş başarılı
    message.textContent = "Giriş başarılı!";
    message.className = "message success";
    window.location.href = "profil.html";
  } else {
    message.textContent = "E-posta veya şifre yanlış.";
    message.className = "message error";
  }
}

// Profil güncelle
function updateProfile() {
  const newName = document.getElementById("newName").value.trim();
  const message = document.getElementById("profileMessage");

  if (newName.length < 3) {
    message.textContent = "İsim en az 3 karakter olmalı!";
    message.className = "message error";
    return;
  }

  document.getElementById("profile-name").textContent = newName;
  localStorage.setItem("username", newName);

  message.textContent = "Profil güncellendi!";
  message.className = "message success";
}

// Sayfa yüklendiğinde çalışacak
window.onload = () => {
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("userEmail");
  const loggedIn = localStorage.getItem("loggedIn");

  // Eğer profil sayfasındaysak
  if (document.getElementById("profile-name")) {
    if (loggedIn !== "true") {
      alert("Profil sayfasını görmek için giriş yapmalısınız!");
      window.location.href = "login.html";
      return;
    }
    if (name) document.getElementById("profile-name").textContent = name;
    if (email) document.getElementById("profile-email").textContent = email;
  }
};
function toggleBot(botId) {
  const el = document.getElementById("bot-" + botId);
  el.style.display = el.style.display === "block" ? "none" : "block";
}
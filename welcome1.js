function signUp() {
  // will show registration window from the top
  // +add visible class to window outside of view port?
  let regButton = document.getElementById("regButton");
  let loginButton = document.getElementById("loginButton");

  if (regButton.classList.contains("chosen")) {
    return;
  } else {
    let regWin = document.createElement("div");

    document.getElementById("loginWin").classList.add("regWinFadeOut");
    document.getElementById("loginWin").parentNode.removeChild(document.getElementById("loginWin"));

    regButton.classList.toggle("chosen");
    loginButton.classList.toggle("chosen");
    regWin.id = "regWin";
    document.getElementById("container1").prepend(regWin);
    document.getElementById("regWin").innerHTML = '<form action="http://localhost:3300/newuser" method="POST" id="registrationForm" class="regLogForm" >'
      + '<img src="logo1.png" class="logo">'
      + '<p style="font-weight:600" class="center"> Rejestracja</p>'
      + '<label for=nameR style="display: inline-block">imie <input name=nameR type=text style="display:block"/>'
      + '</label>'
      + '<label for=email style="display: inline-block">email <input name=email type=email style="display:block"/>'
      + '</label>'
      + '<label for=psw style="display:inline-block">haslo <input name=psw type=password style="display:block"/>'
      + '</label>'
      + '<button type="submit" form="registrationForm" class="regButton center">rejestruj</button>'
      + '</form>';

    document.getElementById("regWin").classList.add("regWinFadeIn");

  }
}

function logIn() {
  // will show logIn window from the top
  // +add visible class to window outside of view port?
  let regButton = document.getElementById("regButton");
  let loginButton = document.getElementById("loginButton");

  if (loginButton.classList.contains("chosen")) {
    return;
  } else {
    let loginWin = document.createElement("div");

    document.getElementById("regWin").classList.add("regWinFadeOut");
    document.getElementById("regWin").parentNode.removeChild(document.getElementById("regWin"));

    regButton.classList.toggle("chosen");
    loginButton.classList.toggle("chosen");
    loginWin.id = "loginWin";

    document.getElementById("container1").prepend(loginWin);
    document.getElementById("loginWin").innerHTML = '<form action="http://localhost:3300/login" method="POST" id="registrationForm" class="regLogForm" >'
      + '<img src="logo1.png" class="logo">'
      + '<p style="font-weight:600" class="center"> Logowanie</p>'
      + '<label for=email style="display: inline-block">email <input name=email type=email style="display:block"/>'
      + '</label>'
      + '<label for=psw style="display:inline-block">haslo <input name=psw type=password style="display:block"/>'
      + '</label>'
      + '<button type="submit" form="registrationForm" class="regButton center">zaloguj</button>'
      + '</form>';

    document.getElementById("loginWin").classList.add("regWinFadeIn");
  }
}

var SUPABASE_URL = "https://你的專案代號.supabase.co";
var SUPABASE_ANON_KEY = "你的 anon key";

// 全站共用的 Supabase 連線
var db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 導覽列的登入／登出連結
(function () {
  var link = document.getElementById("auth-link");
  if (!link) {
    return;
  }

  function update(session) {
    if (session) {
      link.textContent = "登出";
      link.href = "#";
      link.dataset.loggedIn = "1";
    } else {
      link.textContent = "登入";
      link.href = "login.html";
      delete link.dataset.loggedIn;
    }
  }

  link.addEventListener("click", async function (event) {
    if (link.dataset.loggedIn) {
      event.preventDefault();
      await db.auth.signOut();
    }
  });

  db.auth.getSession().then(function (result) {
    update(result.data.session);
  });

  db.auth.onAuthStateChange(function (event, session) {
    update(session);
  });
})();

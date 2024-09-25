$(document).ready(function () {
  // ハンバーガーボタンをクリックしたときの処理
  $(".drawer_button").click(function () {
    // メニューの表示・非表示を切り替え
    $(".drawer_nav_wrapper").toggleClass("open");
    $(".drawer_bg").fadeToggle();  // 背景の表示・非表示を切り替え

    // ボタンの状態を切り替え
    $(this).toggleClass("active");

    // テキストの表示切り替え
    $(".drawer_menu_text").toggle();
    $(".drawer_close").toggle();
  });

  // 背景をクリックしたときの処理（メニューを閉じる）
  $(".drawer_bg").click(function () {
    $(".drawer_nav_wrapper").removeClass("open");
    $(".drawer_bg").fadeOut();
    $(".drawer_button").removeClass("active");
    $(".drawer_menu_text").show();
    $(".drawer_close").hide();
  });
});
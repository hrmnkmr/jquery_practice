$(document).ready(function () {
  // マウスがメニュー項目に入ったときにドロップダウンメニューを表示
  $('.dropdwn > li').mouseenter(function () {
    // アニメーションをストップし、現在の状態を維持してスライドダウン
    $(this).find('.dropdwn_menu').stop(true, false).slideDown('slow');
  });

  // マウスがメニュー項目から離れたときにドロップダウンメニューを非表示
  $('.dropdwn > li').mouseleave(function () {
    // アニメーションをストップし、現在の状態を維持してスライドアップ
    $(this).find('.dropdwn_menu').stop(true, false).slideUp('slow');
  });
});

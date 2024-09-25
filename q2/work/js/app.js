 // モーダルを開くボタンのクリックイベント
 $(".modal_open_button").click(function() {
  $(".modal_win").fadeIn(); // モーダルを表示
});
// モーダルの閉じるボタンのクリックイベント
$(".modal_close_button").click(function() {
  $(".modal_win").fadeOut(); // モーダルを非表示
});
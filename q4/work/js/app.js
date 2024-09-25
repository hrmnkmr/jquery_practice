$(document).ready(function () {
  // タブメニューの項目をクリックしたときの処理
  $('.nav-item').click(function () {
    let index = $(this).index(); // クリックされたタブのインデックスを取得

    // すべての説明を非表示にし、クリックされたタブの説明を表示
    $('.description li').addClass('is-hidden'); 
    $('.description li').eq(index).removeClass('is-hidden');

    // クリックされたタブのデザインを変更（オプション）
    $('.nav-item').removeClass('active'); // 他のタブからactiveクラスを外す
    $(this).addClass('active'); // クリックされたタブにactiveクラスを追加
  });
});

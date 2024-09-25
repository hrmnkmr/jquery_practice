$(document).ready(function () {
  // セレクトボックスの変更イベントを監視
  $('.select-box').on('change', function () {
    // 選択されたカテゴリーの値を取得
    const selectedCategory = $(this).val();

    // リスト項目の表示・非表示を切り替え
    if (selectedCategory === 'all') {
      // "全て"が選択された場合は全ての項目を表示
      $('.food-list > li').show();
    } else {
      // 選択されたカテゴリーに一致する項目だけを表示
      $('.food-list > li').each(function () {
        // data-category-typeが選択されたカテゴリーと一致するかどうかをチェック
        if ($(this).data('category-type') === selectedCategory) {
          $(this).show(); // 一致する場合は表示
        } else {
          $(this).hide(); // 一致しない場合は非表示
        }
      });
    }
  });
});
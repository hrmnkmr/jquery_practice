$(function () {
  // 初期設定
  var pageCount = 1;  // ページ番号
  var searchWord = ""; // 検索ワード

  // 検索結果を表示する関数
  function displayResult(result) {
    console.log("受け取ったデータ:", result); // 受け取ったデータ全体を確認

    if (result && result.length > 0) { // データがあるか確認
      $.each(result, function (index, item) {
        console.log("処理中のアイテム:", item); // 各アイテムのデータを確認

        var html = '<li class="lists-item"><div class="list-inner"><p>タイトル：' + (item.title || "タイトル不明") + '</p>' +
          '<p>作者：' + (item["dc:creator"] || "作者不明") + '</p>' +
          '<p>出版社：' + (item["dc:publisher"] || "出版社不明") + '</p>' +
          '<a href="' + (item.link?.["@id"] || "#") + '" target="_blank">書籍情報</a></div></li>';

        $(".lists").prepend(html);
      });
    } else {
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してみてください。</div>');
    }
  }

  // 検索ボタンがクリックされた時の処理
  $(".search-btn").on("click", function () {
    searchWord = $("#search-input").val();
    if (searchWord.trim() === "") { // キーワードが空かどうかをチェック
      $(".lists").empty();
      $(".message").remove();
      $(".lists").before('<div class="message">検索キーワードが有効ではありません。1文字以上で検索して下さい。</div>');
    } else {
      pageCount = 1; // 新しい検索ワードでページ番号をリセット
      $(".lists").empty(); // リセットして結果を表示
      $.ajax({
        url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
        method: "GET"
      }).done(function (response) {
        displayResult(response["@graph"][0].items); // 修正
      }).fail(function (err) {
        $(".lists").empty();
        $(".message").remove();
        $(".lists").before('<div class="message">通信に失敗しました。再度お試しください。</div>');
      });
    }
  });

  // リセットボタンがクリックされた時の処理
  $(".reset-btn").on("click", function () {
    pageCount = 1;
    searchWord = "";
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("");
  });

  // 次ページのボタンがクリックされた時の処理
  $(".next-btn").on("click", function () {
    pageCount++; // 次ページ
    $.ajax({
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      method: "GET"
    }).done(function (response) {
      displayResult(response["@graph"][0].items); // 修正
    }).fail(function (err) {
      $(".lists").before('<div class="message">通信に失敗しました。再度お試しください。</div>');
    });
  });
});

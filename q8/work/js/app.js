$(function () {
  let pageCount = 1;
  let searchWord = '';

  function displayBooks(books) {
    $(".message").remove();

    // デバッグ用のログ
    console.log(books);

    // itemsが存在しない場合の処理をelseのみにする
    if (books.items && books.items.length > 0) {
      $.each(books.items, function (index, book) {
        // 各bookオブジェクトを確認
        console.log(book);

        // タイトル、著者、出版社を取得
        const title = book.title || 'タイトル不明';
        const author = book["dc:creator"] || '著者不明';
        const publisher = book["dc:publisher"] || '出版社不明';
        const link = book.link?.["@id"] || '#'; // リンクがない場合は "#" に設定

        const bookItem = `
          <li class="lists-item">
            <div class="list-inner">
              <p>タイトル: ${title}</p>
              <p>著者: ${author}</p>
              <p>出版社: ${publisher}</p>
              <a href="${link}" target="_blank">書籍情報</a>
            </div>
          </li>`;
        $(".lists").append(bookItem); // 要素を最後に追加
      });
    } else {
      // 検索結果がない場合のエラーメッセージ表示
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
    }
  }

  function displayError(err) {
    $(".message").remove();
    
    let message = '';
  
    switch (err.status) {
      case 0:
        message = '正常に通信できませんでした。<br>インターネットの接続を確認してください。';
        break;
      case 400:
        message = '検索キーワードが有効ではありません。<br>1文字以上で検索してください。';
        break;
      default:
        message = '予期せぬエラーが起きました。<br>再読み込みを行ってください。';
    }
  
    $(".lists").before(`<div class="message">${message}</div>`);
  }
  
  function getBooks() {
    const settings = {
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      method: "GET",
    };
  
    $.ajax(settings)
      .done(function (response) {
        const result = response["@graph"][0];
        displayBooks(result);
      })
      .fail(function (err) {
        displayError(err);
      });
  }  

  $(".search-btn").on("click", function () {
    const newSearchWord = $("#search-input").val();
    
    // 検索キーワードが無効な場合、エラーメッセージを表示し、処理を中断
    if (!newSearchWord) {
      $(".message").remove(); // 既存のメッセージを削除
      $(".lists").before('<div class="message">検索キーワードが有効ではありません。<br>1文字以上で検索してください。</div>');
      return; // エラーメッセージを表示した後は処理を中断
    }
  
    // 新しい検索ワードの場合はページをリセット
    if (newSearchWord !== searchWord) {
      pageCount = 1;
      $(".lists").empty(); // 検索結果をクリア
      searchWord = newSearchWord;
    } else {
      pageCount++; // 同じキーワードなら次のページを取得
    }
  
    // API実行
  getBooks();
});
  

  $(".reset-btn").on("click", function () {
    pageCount = 1;
    searchWord = "";
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("");
  });
});

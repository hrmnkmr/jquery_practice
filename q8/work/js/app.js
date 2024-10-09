$(function () {
  let pageCount = 1;
  let searchWord = '';

  function displayBooks(books) {
    $(".message").remove();
    $(".lists").empty();

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
      $(".lists").before('<div class="message">\u691c\u7d22\u7d50\u679c\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002<br>\u5225\u306e\u30ad\u30fc\u30ef\u30fc\u30c9\u3067\u691c\u7d22\u3057\u3066\u4e0b\u3055\u3044\u3002</div>');
    }    
  }

  function displayError(err) {
    $(".lists").empty();
    $(".message").remove();
    
    const errorMessages = {
        0: '正常に通信できませんでした。<br>インターネットの接続を確認してください。',
        400: '検索キーワードが有効ではありません。<br>1文字以上で検索してください。',
        default: '予期せぬエラーが起きました。<br>再読み込みを行ってください。'
    };
    
    const message = errorMessages[err.status] || errorMessages.default;
    $(".lists").before(`<div class="message">${message}</div>`);
}


  function getBooks(searchWord, pageCount) {
    const settings = {
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      method: "GET",
    };

    $.ajax(settings)
    .done(function (response) {
      const result = response["@graph"][0]; // @graphの最初の要素
      displayBooks(result);  // 直接呼び出し
    })
  
      .fail(function (err) {
        displayError(err);
      });
  }

  $(".search-btn").on("click", function () {
    const newSearchWord = $("#search-input").val();
    if (newSearchWord !== searchWord) {
      pageCount = 1;
      $(".lists").empty();
      searchWord = newSearchWord;
    } else {
      pageCount++;
    }
    if (searchWord) {
      getBooks(searchWord, pageCount);
    }
  });

  $(".reset-btn").on("click", function () {
    pageCount = 1;
    searchWord = "";
    $(".lists").empty();
    $(".message").remove();
    $("#search-input").val("");
  });
});

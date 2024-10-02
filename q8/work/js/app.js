$(function () {
  let pageCount = 1;
  let searchWord = '';

  function displayBooks(books) {
    $(".message").remove();
    $(".lists").empty();
  
    // デバッグ用のログ
    console.log(books); // booksオブジェクト全体を確認
  
    if (books.items && books.items.length > 0) {
      $.each(books.items, function (index, book) {
        // 各bookオブジェクトを確認
        console.log(book); 

        // タイトル、著者、出版社を取得
        const title = book.title || 'タイトル不明';
        const author = Array.isArray(book["dc:creator"]) ? book["dc:creator"].join(', ') : book["dc:creator"] || '著者不明';
        const publisher = book["dc:publisher"] || '出版社不明';
        const link = book.link?.["@id"] || '#'; // リンクがない場合は "#" に設定

        // デバッグ用のログ
        console.log({ title, author, publisher, link });

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
      $(".lists").before('<div class="message">検索結果が見つかりませんでした。<br>別のキーワードで検索してください。</div>');
    }
  }

  function displayError(err) {
    $(".lists").empty();
    $(".message").remove();
    if (err.status === 0) {
      $(".lists").before('<div class="message">正常に通信できませんでした。<br>インターネットの接続を確認してください。</div>');
    } else if (err.status === 400) {
      $(".lists").before('<div class="message">検索キーワードが有効ではありません。<br>1文字以上で検索してください。</div>');
    } else {
      $(".lists").before('<div class="message">予期せぬエラーが起きました。<br>再読み込みを行ってください。</div>');
    }
  }

  function getBooks(searchWord, pageCount) {
    const settings = {
      url: `https://ci.nii.ac.jp/books/opensearch/search?title=${searchWord}&format=json&p=${pageCount}&count=20`,
      method: "GET",
    };

    $.ajax(settings)
      .done(function (response) {
        const result = response["@graph"][0]; // "@graph"が配列なら最初のオブジェクトを取得
        displayBooks(result); // "result"に"items"が含まれている
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

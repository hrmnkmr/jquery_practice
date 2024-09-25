$(document).ready(function () {
  $('.btn__submit').on('click', function () {
    // 名字と名前の取得
    const familyName = $('#family__name').val();
    const givenName = $('#given__name').val();
    console.log(`名字: ${familyName}`);
    console.log(`名前: ${givenName}`);

    // 生年月日を結合して表示
    const year = $('.year').val();
    const month = $('.month').val();
    const day = $('.day').val();
    if (year && month && day) {
      console.log(`生年月日: ${year}年${month}月${day}日`);
    } else {
      console.log('生年月日: 未入力');
    }

    // 性別の取得
    const gender = $('input[name="gender"]:checked').val();
    console.log(`性別: ${gender ? gender : '未選択'}`);

    // 職業の取得
    const occupation = $('.occupation').val();
    console.log(`職業: ${occupation ? occupation : '未選択'}`);

    // アカウント情報の取得
    const accountName = $('#account__name').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const duplicationPassword = $('#duplication__password').val();
    console.log(`アカウント名: ${accountName}`);
    console.log(`メールアドレス: ${email}`);
    console.log(`パスワード: ${password}`);
    console.log(`確認用パスワード: ${duplicationPassword}`);

    // 住所と電話番号の取得
    const address = $('#address').val();
    const tel = $('#tel').val();
    console.log(`住所: ${address}`);
    console.log(`電話番号: ${tel}`);

    // 購読情報（チェックボックス）の取得
    $('input[name="subscription"]:checked').each(function () {
      console.log(`購読情報: ${$(this).val()}`);
    });
  });
});
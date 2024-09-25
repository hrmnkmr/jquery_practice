$(function() {
  // Q1 ボタンがクリックされたときの動作
  $('#q1').css('color', 'yellow'); // 文字色を黄色に変更

  // Q2 ボタンがクリックされたときの動作
  $('#q2').on('click', function() {
    $(this).css("background-color", "pink"); // ボタンの色をピンクに変更
  });

  // Q3 ボタンがクリックされたときの動作
  $('#q3').on('click', function() {
    $(this).fadeOut(3000); // フェードアウトに3秒かける
  });

  // Q4 ボタンがクリックされたときの動作
  $("#q4").on("click", function () { 
    $(this).addClass("large") }); // ボタンクリック時に大きくする

 // Q5 ボタンがクリックされたときの動作
$('#q5').on('click', function() {
  // ボタンにテキストを追加する
  $(this).prepend("DOMの中の前").append("DOMの中の後").before("DOMの前").after("DOMの後");
  
  // #containerに新しい段落を追加する
  $("#container").append("<p>新しい段落が追加されました。</p>");
});

  // Q6 ボタンがクリックされたときの動作
  $('#q6').on('click', function() {
    $(this).animate({
      marginTop: "100px",  // 上のマージンを100pxに
      marginLeft: "100px"  // 左のマージンを100pxに
    }, 2000);  // 2秒でアニメーション
  });

  // Q7 ボタンがクリックされたときの動作
  $('#q7').on('click', function() {
    console.log(this.id);  // ボタンを押した時のIDをコンソールに表示
  });

  // Q8 ボタンがクリックされたときの動作
  $('#q8').on('mouseenter', function() {
    $(this).addClass("large"); // ホバー時にサイズを大きくするクラスを追加
  }).on('mouseleave', function() {
    $(this).removeClass("large"); // ホバー解除時に元に戻す
  });

  // Q9 ボタンがクリックされたときの動作
  $('#q9 li').on('click', function() {
    const index = $(this).index();
    alert(index);  // インデックスを表示
  });

  // Q10 ボタンがクリックされたときの動作
  $('#q10 li').on('click', function() {
    const index = $(this).index(); // クリックされた<li>のインデックスを取得
    $("#q11 li").eq(index).addClass("large-text"); // 対応するQ11の<li>の文字サイズを大きくする
  });
});

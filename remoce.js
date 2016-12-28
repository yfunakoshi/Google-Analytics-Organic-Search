/*
 * 削除 - 全自動（可視化）
 */

javascript:

(function(d){function l(){(function($){

if ( $('#ID-m-content-content h2._GAAn._GAjfb').text() === 'オーガニック検索ソース' ) {

if ( ! $('body').hasClass('ga_search_data_current') ) { // 連動[1] - 二度押し防止

$('body')
  .addClass('ga_search_data_current') // 連動[1] - 二度押し防止
  .css({'position': 'relative'})
  .append('<div style="background-color: rgba(0, 0, 0, .5); height: 100%; position: fixed; left: 0; top: 0; width: 99%; z-index: 999999999;"><div style="background-color: #fff; border-radius: 9px; border: 3px solid #333; padding: 20px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);"><h1 style="margin: 0; text-align: center">オーガニック検索ソース[削除]</h1><div id="ga_search_data_state" style="margin-top: 1em; text-align: center;">このまましばらくお待ちください。</div><div style="background-color: #fff; border: 1px solid #ccc; margin: 1em auto 0; overflow: hidden; position: relative; width: 300px;"><div id="ga_search_data_bar" style="background-color: #ddd; display: inline-block; height: 100%; position: absolute; left: 0; top: 0; transition: width .4s;"></div><div style="padding: .25em; position: relative; text-align: center; z-index: 9;"><span id="ga_search_data_now">1</span>/<span id="ga_search_data_max">35</span></div></div><div style="margin-top: 1em; text-align: center;"><a href="#" id="ga_search_data_cancel">キャンセル</a></div></div></div>')
;

var s = 1000, // 処理待機時間
    $e = $('#ga_search_data_state'),
    $r = $('#ga_search_data_bar'),
    $n = $('#ga_search_data_now'),
    $m = $('#ga_search_data_max'),
    $c = $('#ga_search_data_cancel'),
    i = 1,
    l = $('div._GAe.ACTION-delete._GAGh').length
;

var roop;
function roopDo() {
  roop = setInterval(function() { ikeike(); }, s);
}

ikeike();
function ikeike() {

clearInterval(roop);

if ( document.querySelector('input[value="+ 検索エンジンを追加"]') ) {

var $b = $('div._GAe.ACTION-delete._GAGh'),
    bi = i - 1,
    np = (i / l) * 100
;

$m.text(l);
$r.width(np + '%');
$n.text(i);

$c.click(function(e) {
  location.reload();
  e.preventDefault();
});

if ( l > 0  ) {
  $b[bi].click();
  setTimeout(function() {
    poporon();
    function poporon() {
      if ( $('button[data-name="actionFormButton"]').length === 0 ) {
        // 実行が早すぎた時の処理
        console.log('要素がないようそ');
        setTimeout(function() {
          poporon();
       0 }, s);
      } else
      {
        $('button[data-name="actionFormButton"]').click();
        roopDo();
      }
    }
  }, s);
} else
{
  $e.css({'color': '#23945C', 'font-weight': 'bold'}).text('削除が完了しました！');
  $n.text(mv);
  $c.text('閉じる');
}

i++;
  
} else
{
  // 実行が早すぎた時の処理
  console.log('はやい');
  setTimeout(function() {
    ikeike();
  }, s);
} // End - querySelector

} // End - ikeike

} // End - body hasClass

} else
{

alert('実行可能なページではありません。');

} // End - オーガニック検索ソース

})(jQuery)}if(typeof jQuery=='undefined'){var j=d.createElement('script');j.type='text/javascript';j.src='https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';d.body.appendChild(j);j.onload=l}else{l()}})(document);
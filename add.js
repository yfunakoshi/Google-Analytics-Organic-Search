/*
 * 登録 - 全自動（可視化）
 */

javascript:

(function (d){function l(){(function ($){
  'use strict';

  const $body = $('body');

  // アカウントによっては iframe ではないかもしれない...ので念のため。
  let $target = $body;
  if ($('#galaxyIframe').contents().length) {
    $target = $('#galaxyIframe').contents();
  }

  if (location.href.indexOf('/trackingorgainc-search-sources/') != -1 && $target.find('#ID-m-content-content > h2').text() === 'オーガニック検索ソース') {

    if (!$body.hasClass('ga_search_data_current')) { // 連動[1] - 二度押し防止

      // 設定
      const time = 1000, // 処理待機時間
            // max = 20 // 登録最大個数（クエリあり）
            max = 17 // 登録最大個数（クエリなし）
      ;

      $body
        .addClass('ga_search_data_current') // 連動[1] - 二度押し防止
        .css({'position': 'relative'})
        .append('<div style="background-color: rgba(0, 0, 0, .5); height: 100%; position: fixed; left: 0; top: 0; width: 99%; z-index: 999999999;"><div style="background-color: #fff; border-radius: 9px; border: 3px solid #333; padding: 20px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);"><h1 style="margin: 0; text-align: center">オーガニック検索ソース[登録]</h1><div id="ga_search_data_state" style="margin-top: 1em; text-align: center;">このまましばらくお待ちください。</div><div style="background-color: #fff; border: 1px solid #ccc; margin: 1em auto 0; overflow: hidden; position: relative; width: 300px;"><div id="ga_search_data_bar" style="background-color: #ddd; display: inline-block; height: 100%; position: absolute; left: 0; top: 0; transition: width .4s;"></div><div style="padding: .25em; position: relative; text-align: center; z-index: 9;"><span id="ga_search_data_now">1</span>/<span id="ga_search_data_max">' + max + '</span></div></div><div style="margin-top: 1em; text-align: center;"><a href="#" id="ga_search_data_cancel">キャンセル</a></div></div></div>')
      ;

      // 差し込みHTMLを取得
      const $ga_state  = $('#ga_search_data_state'),
            $ga_bar    = $('#ga_search_data_bar'),
            $ga_now    = $('#ga_search_data_now'),
            $ga_max    = $('#ga_search_data_max'),
            $ga_cancel = $('#ga_search_data_cancel')
      ;

      // ループ設定
      let roop;
      function roopContainer () {
        roop = setInterval(function () { action(); }, time);
      }

      // 登録処理
      function register (name, domain, query) {
        setTimeout(function () {
          insert(name, domain, query);
        }, time);
      }

      // 挿入
      function insert (name, domain, query) {
        if ($target.find('#ID-m-content-content input[type="text"]').length === 0) {
          // 実行が早すぎた時の処理
          setTimeout(function () {
            insert(name, domain, query);
          }, time);
        } else {
          $target.find('#ID-m-content-content input[data-name="displayName"]').val(name);
          $target.find('#ID-m-content-content input[data-name="domainName"]').val(domain);
          $target.find('#ID-m-content-content input[data-name="queryParam"]').val(query);
          $target.find('#ID-m-content-content button[data-name="actionFormButton"]').trigger('click');
          roopContainer();
        }
      }

      // 動作処理
      function action () {
        clearInterval(roop);

        if ($target.find('#ID-m-content-content input[value="+ 検索エンジンを追加"]') && $target.find('#ID-m-content-content input[value="+ 検索エンジンを追加"]').is(':visible')) {
          const $btn   = $target.find('#ID-m-content-content input[value="+ 検索エンジンを追加"]'),
                $tbody = $target.find('#ID-m-content-content tbody.ID-adminTableBody'),
                $tr    = $tbody.children('tr'),
                length = $tr.filter('[class*="ID-row-"]').length,
                rate   = Math.floor((length / max) * 100)
          ;

          $ga_max.text(max);
          $ga_bar.width(rate + '%');
          $ga_now.text(length);

          if (length > max) {
            $ga_state.css({'color': '#23945C', 'font-weight': 'bold'}).text('登録が完了しました！');
            $ga_now.text(max);
            $ga_cancel.text('閉じる');
          } else {
            $btn.trigger('click');
            switch (length) {
              /* 
              // クエリありの場合。Chrome v85からはクエリが送信されなくなり、クエリを含んでいるとオーガニック検索ソースに振り分けられなくなる
              case 0  : register("so-net", "so-net.ne.jp", "query"); break;
              case 1  : register("nifty", "nifty.com", "Text"); break;
              case 2  : register("nifty", "nifty.com", "q"); break;
              case 3  : register("excite", "excite.co.jp", "q"); break;
              case 4  : register("livedoor", "livedoor.com", "q"); break;
              case 5  : register("j:com", "search.myjcom.jp", "q"); break;
              case 6 : register("sleipnir", "fenrir-inc.com", "q"); break;
              case 7 : register("lunascape", "luna.tv", "q"); break;
              case 8 : register("fujitsu", "fmworld.net", "q"); break;
              case 9 : register("fujitsu", "fmworld.net", "Text"); break;
              case 10 : register("hao123", "hao123.com", "query"); break;
              case 11 : register("fooooo", "fooooo.com", "q"); break;
              case 12 : register("jword", "jword.jp", "name"); break;
              case 13 : register("jword", "jword.jp", "q"); break;
              case 14 : register("kingsoft", "kingsoft.jp", "keyword"); break;
              case 15 : register("ask", "ask.com", "searchFor"); break;
              case 16 : register("au", "search.auone.jp", "q"); break;
              case 17 : register("goo.ne", "green.search.goo.ne.jp", "MT"); break;
              case 18 : register("docomo", "docomo.ne.jp", "MT"); break;
              case 19 : register("rakuten", "websearch.rakuten.co.jp", "qt"); break;
              case 20 : register("biglobe", "biglobe.ne.jp ", "q"); break;
              */
              // クエリなしの場合
              case 0  : register("so-net", "so-net.ne.jp", ""); break;
              case 1  : register("nifty", "nifty.com", ""); break;
              case 2  : register("excite", "excite.co.jp", ""); break;
              case 3  : register("livedoor", "livedoor.com", ""); break;
              case 4  : register("j:com", "myjcom.jp", ""); break;
              case 5 : register("sleipnir", "fenrir-inc.com", ""); break;
              case 6 : register("lunascape", "luna.tv", ""); break;
              case 7 : register("fujitsu", "fmworld.net", ""); break;
              case 8 : register("hao123", "hao123.com", ""); break;
              case 9 : register("fooooo", "fooooo.com", ""); break;
              case 10 : register("jword", "jword.jp", ""); break;
              case 11 : register("kingsoft", "kingsoft.jp", ""); break;
              case 12 : register("ask", "ask.com", ""); break;
              case 13 : register("au", "search.auone.jp", ""); break;
              case 14 : register("goo.ne", "goo.ne.jp", ""); break;
              case 15 : register("docomo", "docomo.ne.jp", ""); break;
              case 16 : register("rakuten", "websearch.rakuten.co.jp", ""); break;
              case 17 : register("biglobe", "biglobe.ne.jp ", ""); break;
            }
          }
        } else {
          // 実行が早すぎた時の処理
          setTimeout(function () {
            action();
          }, time);
        }
      }

      // 動作開始
      action();

      // キャンセル処理
      $ga_cancel.on('click', function (e) {
        e.preventDefault();
        location.reload();
      });

    } // End - body hasClass

  } else {

    alert('実行可能なページではありません。');

  } // End - オーガニック検索ソース

})(jQuery)}if(typeof jQuery=='undefined'){var j=d.createElement('script');j.type='text/javascript';j.src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';d.body.appendChild(j);j.onload=l}else{l()}})(document);

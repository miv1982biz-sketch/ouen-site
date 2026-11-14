
"use strict";
var app = document.getElementById("app");
var lpFilter = { q:"", cat:"all" };

function surveyLink(label, extraClass){
  return '<a class="btn btn-ghost '+(extraClass||"")+'" href="'+SURVEY_URL+'" target="_blank" rel="noopener" data-survey>'+esc(label||"アンケートに答える")+'</a>';
}
function badgeRow(p){
  var h = '<div class="tagrow">';
  if(p.official) h += '<span class="tag badge-ok">公式</span>';
  if(p.claimed) h += '<span class="tag badge-ok">本人が管理中</span>';
  if(!p.claimed) h += '<span class="tag badge-fan">非公式・ファンが作成</span>';
  h += '<span class="tag sample">サンプル（架空）</span>';
  h += '</div>';
  return h;
}
function photoTag(p){
  if(p.photoStatus === "verified") return '<span class="tag">実物の写真（照合済み）</span>';
  if(p.photoStatus === "unconfirmed") return '<span class="tag">写真は未確認</span>';
  return "";
}

/* ================= LP ================= */
function renderLP(){
  document.body.classList.remove("has-mobile-bar");
  var ps = allPages().filter(function(p){ return !sessionState.hidden[p.id]; });
  var totalSupport = 0, totalMsg = 0;
  ps.forEach(function(p){ totalSupport += pageSupporters(p); totalMsg += pageMessages(p).length; });
  var h = "";
  h += '<div class="hero"><div class="hero-grid"><div>';
  h += '<h1>応援したい気持ちを、<br>届けよう。</h1>';
  h += '<p class="lead">好きなお店や人、残ってほしい場所へ。OUENは、応援の気持ちをメッセージと寄付という形で届けるための場所です。本人が呼びかけるクラウドファンディングでも、会員制のファンクラブでもありません。応援したいという気持ちの側から始まります。応援ページは本人より先に作ることもでき、引き取るか消すかは本人がいつでも決められます。</p>';
  h += '<a class="btn btn-primary" href="#/p/bakery" data-exp>架空のお店で体験してみる</a> ';
  h += '<a class="btn btn-ghost" href="#/create" data-exp2>ページを作ってみる</a>';
  h += '<div class="hero-stats">'
     + '<div><div class="num">'+ps.length+'</div><div class="lbl">公開中のサンプルページ</div></div>'
     + '<div><div class="num">'+totalSupport+'人</div><div class="lbl">集まった応援の気持ち</div></div>'
     + '<div><div class="num">'+totalMsg+'件</div><div class="lbl">応援メッセージ</div></div>'
     + '</div>';
  h += '<p class="small">※数字はすべて架空のサンプル表示です。実際のお金は動きません。</p>';
  h += '</div><div class="hero-strip"><img class="hs-main" src="/assets/hero-1.jpg" alt=""><img src="/assets/hero-2.jpg" alt=""><img src="/assets/hero-3.jpg" alt=""></div></div></div>';

  h += '<div class="steps">'
     + '<div class="step"><span class="no">1</span><h3>応援ページを作る</h3><p>応援したい対象のページを、本人に頼まれなくても作れます。載せられるのは公開情報の範囲だけです。</p></div>'
     + '<div class="step"><span class="no">2</span><h3>応援が集まる</h3><p>メッセージと「応援したい気持ち」が少しずつ貯まります。この段階ではお金は一切動きません。</p></div>'
     + '<div class="step"><span class="no">3</span><h3>本人が引き取る・消せる</h3><p>本人はページを引き取って公式の窓口にできます。いらない場合は、無料でいつでも削除できます。</p></div>'
     + '</div>';

  h += '<section class="block"><h2>応援ページのサンプル</h2><p class="sub">すべて架空の対象です。開くと、メッセージを書いたり「応援したい気持ち」を残したりできます。</p>';
  h += '<div class="toolbar"><div class="searchbox"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.8-3.8"/></svg><input type="text" id="q" placeholder="名前や地域でさがす" value="'+esc(lpFilter.q)+'"></div>';
  h += '<div class="chips" id="chips">';
  CATEGORIES.forEach(function(c){ h += '<button class="chip" data-cat="'+c.id+'" aria-pressed="'+(lpFilter.cat===c.id)+'">'+c.label+'</button>'; });
  h += '</div></div>';
  h += '<div class="cards" id="cards"></div></section>';

  h += '<section class="block"><h2>受け手の気持ちも、確かめています</h2><p class="sub">「勝手に作られたらどう感じるか」は、この仕組みでいちばん大切な点です。本人役になって、通知が届くところから引き取り・削除までを体験できます。</p>'
     + '<a class="btn btn-ghost" href="#/recipient">受け手の体験をしてみる</a></section>';

  h += '<div class="survey-band"><h2>感想を聞かせてください</h2><p>1分で終わります。体験の前後どちらでも構いません。</p>'+surveyLink("アンケートに答える","btn-primary")+'</div>';

  h += '<section class="block"><h2>読みもの</h2><p class="sub">OUENの考え方や使い方を、短い記事で紹介しています。</p>'
     + '<div class="reads">'
     + '<a class="read-item" href="/articles/about.html"><div><div class="t">OUENとは ― 応援したい気持ちを、届けよう。</div><div class="d">応援の気持ちを届ける場所、OUENの考え方を紹介します。</div></div><span class="arr" aria-hidden="true">→</span></a>'
     + '<a class="read-item" href="/articles/how-to-create.html"><div><div class="t">応援ページの作り方</div><div class="d">ページを作るときの流れと、載せられる情報の範囲をまとめました。</div></div><span class="arr" aria-hidden="true">→</span></a>'
     + '<a class="read-item" href="/articles/for-recipients.html"><div><div class="t">お店・受け手の方へ ― ページが作られていたら</div><div class="d">自分のページが作られていたときの引き取り方・消し方について。</div></div><span class="arr" aria-hidden="true">→</span></a>'
     + '<a class="read-item" href="/articles/safety.html"><div><div class="t">安心の仕組み ― お金を預からない理由</div><div class="d">なぜこのサービスはお金を預からないのか、その理由を説明します。</div></div><span class="arr" aria-hidden="true">→</span></a>'
     + '</div></section>';

  app.innerHTML = h;
  renderCards();
  var q = document.getElementById("q");
  q.addEventListener("input", function(){ lpFilter.q = q.value; renderCards(); });
  document.getElementById("chips").addEventListener("click", function(e){
    var b = e.target.closest("[data-cat]"); if(!b) return;
    lpFilter.cat = b.getAttribute("data-cat");
    var chips = document.querySelectorAll("#chips .chip");
    chips.forEach(function(c){ c.setAttribute("aria-pressed", c.getAttribute("data-cat")===lpFilter.cat ? "true":"false"); });
    renderCards();
  });
  var exp = document.querySelector("[data-exp]"); if(exp) exp.addEventListener("click", function(){ trackEvent("experience_start", {from:"hero"}); });
  var exp2 = document.querySelector("[data-exp2]"); if(exp2) exp2.addEventListener("click", function(){ trackEvent("experience_start", {from:"hero_create"}); });
}
function renderCards(){
  var box = document.getElementById("cards"); if(!box) return;
  var ps = allPages().filter(function(p){
    if(sessionState.hidden[p.id]) return false;
    if(lpFilter.cat !== "all" && p.category !== lpFilter.cat) return false;
    if(lpFilter.q){ var t = (p.name + " " + p.region); if(t.indexOf(lpFilter.q) === -1) return false; }
    return true;
  });
  ps.sort(function(a,b){ return (b.featured?1:0) - (a.featured?1:0); });
  if(!ps.length){ box.innerHTML = '<p class="sub">見つかりませんでした。言葉を変えて試してみてください。</p>'; return; }
  box.innerHTML = ps.map(function(p){
    var media = p.photo
      ? '<img class="ph" src="'+p.photo+'" alt="'+esc(p.photoAlt||"")+'" loading="lazy">'
      : '<div class="ph-text">写真なし（文字だけのページ）</div>';
    var count = p.messagesOnly
      ? '<div class="count">応援メッセージ <b>'+pageMessages(p).length+'</b> 件</div>'
      : '<div class="count">応援の気持ち <b>'+pageSupporters(p)+'</b> 人 ・ メッセージ '+pageMessages(p).length+'件</div>';
    return '<a class="card'+(p.featured?" featured":"")+'" href="#/p/'+p.id+'">'+media
      + '<div class="body">'+badgeRow(p)
      + '<h3>'+esc(p.name)+'</h3>'
      + '<div class="meta">'+esc(catLabel(p.category))+' ・ '+esc(p.region)+'</div>'
      + count + '</div></a>';
  }).join("");
}

/* ================= 詳細 ================= */
var pledgeState = { mode:"once", amount:null };
/* メール入力モックの状態（アドレス文字列は保持しない） */
var emailStepState = { active:false, pageId:null };
function fireEmailAbandon(){
  if(emailStepState.active){
    emailStepState.active = false;
    trackEvent("email_abandon", { pageId: emailStepState.pageId });
  }
}
window.addEventListener("hashchange", fireEmailAbandon);
window.addEventListener("pagehide", fireEmailAbandon);
window.addEventListener("beforeunload", fireEmailAbandon);
function renderDetail(id){
  var p = findPage(id);
  if(!p || sessionState.hidden[p.id]){ render404(); return; }
  trackEvent("page_view", { pageId:p.id, sample: !!p.sampleSeed || PAGES.indexOf(p) !== -1 });
  pledgeState = { mode:"once", amount:null };
  var h = '<div class="detail">';
  h += '<p style="margin:20px 0 0"><a href="#/">← 一覧にもどる</a></p>';
  if(p.photo) h += '<div class="detail-head"><img class="detail-photo" src="'+p.photo+'" alt="'+esc(p.photoAlt||"")+'"></div>';
  else h += '<div class="detail-head"><div class="detail-photo-text">'+(p.publicFigure ? 'このページは写真を使っていません（引き取り前の著名人・政治家のページは文字だけにしています）' : '写真はまだ登録されていません')+'</div></div>';
  h += '<h1>'+esc(p.name)+'</h1>';
  h += badgeRow(p);
  h += '<p class="meta" style="color:var(--ink-soft)">'+esc(catLabel(p.category))+' ・ '+esc(p.region)+(p.photoStatus!=="none" ? ' ・ ' : '')+(p.photoStatus==="verified"?"写真は実物と照合済み":(p.photoStatus==="unconfirmed"?"写真は未確認":""))+'</p>';
  if(!p.claimed) h += '<div class="alert alert-warn">このページは本人が運営する公式ページではありません。ファンが作った非公式の応援ページです。寄付や支払いの受付もしていません。</div>';
  else h += '<div class="alert alert-ok">このページは本人が引き取り、管理しています（サンプル表示）。</div>';
  if(p.publicFigure === "politician") h += '<div class="alert alert-warn">このページは選挙運動のためのものではありません。政治家・候補者のページでは、お金の応援は扱いません。</div>';
  if(p.privateSymbol) h += '<p class="small">私有地にある地域のシンボルです。正確な住所や所有者の情報は載せていません。見に行くときは、私有地に入らず、歩道など公共の場所から眺めてください。</p>';

  h += '<div class="detail-grid"><div>';
  h += '<p>'+esc(p.intro)+'</p>';
  h += '<p class="small">ページを作った人の言葉：'+esc(p.reason)+'</p>';

  if(p.ownerPosts){
    h += '<div class="ownerposts mt"><h2>本人からのお知らせ</h2>';
    p.ownerPosts.forEach(function(o){ h += '<div class="post"><h3>'+esc(o.title)+'</h3><p>'+esc(o.body)+'</p></div>'; });
    h += '</div>';
  }

  h += '<div class="facts mt"><h2>わかっていること</h2><ul style="margin:0; padding-left:20px">';
  p.facts.forEach(function(f){ h += '<li>'+esc(f.text)+'<br><span class="src">出典：'+esc(f.src)+'</span></li>'; });
  h += '</ul><p class="small" style="margin-bottom:0">事実として載せるのは、出典のある公開情報だけです。出典のない内容は公開されません。</p></div>';

  h += '<div class="msgs mt"><h2>応援メッセージ</h2><div id="msglist">';
  h += msgListHtml(p);
  h += '</div></div>';

  if(p.wall && p.wall.length){
    h += '<div class="mt"><h2 style="font-size:21px">応援している人たち（名前の掲載を希望した人）</h2><div class="wall">'
      + p.wall.map(function(n){ return '<span>'+esc(n)+'</span>'; }).join("") + '</div></div>';
  }

  h += '<div class="kit mt"><h2 style="font-size:21px; margin-top:0">本人に知らせる</h2>'
     + '<p>本人を知っている人は、このキットで伝えられます。運営から自動で送ることはしません。伝えるのは、あなたの言葉でお願いします。</p>'
     + '<div class="field"><label for="kit-tpl">文面の例</label><select id="kit-tpl">'
     + '<option value="direct">直接知っている人向け</option><option value="dm">SNSのDM・メンション用</option><option value="mail">公開の問い合わせ先・メール用</option></select></div>'
     + '<textarea id="kit-text" readonly></textarea>'
     + '<p class="mt"><button class="btn btn-ghost btn-small" id="kit-copy">文面をコピーする</button> <span class="small">リンク： https://ouen.globe-ent.com/#/p/'+p.id+'（QRコードは本番で用意します）</span></p>'
     + '<p class="small">同じ本人への連絡は一度までにしてください。しつこい連絡は、応援ではなく負担になります。</p></div>';

  h += '<div class="mt"><h2 style="font-size:21px">削除・修正の依頼</h2>'
     + '<p>本人の方は、無料でいつでもこのページの削除や修正を依頼できます。依頼があれば、確認の前にまず一時的に非表示にします。</p>'
     + '<button class="btn btn-ghost" id="del-open">削除・修正を依頼する（体験）</button>'
     + '<div id="del-box" class="hidden"><div class="alert alert-warn">これは体験用の画面です。実際に送信されることはありません。</div>'
     + '<button class="btn btn-primary" id="del-do">依頼を送る（疑似）</button></div></div>';

  h += '</div><div>'; /* 右カラム */
  h += supportPanelHtml(p);
  h += '</div></div></div>';

  /* スマホ下部バー */
  h += '<div class="mobile-bar"><button class="btn btn-primary" id="m-support">応援する</button><button class="btn btn-ghost" id="m-share">共有する</button></div>';
  app.innerHTML = h;
  document.body.classList.add("has-mobile-bar");
  bindDetail(p);
  fillKit(p, "direct");
}
function msgListHtml(p){
  return pageMessages(p).map(function(m){
    return '<div class="msg"><div class="who">'+esc(m.who)+'</div><p>'+esc(m.body)+'</p></div>';
  }).join("");
}
function supportPanelHtml(p){
  var h = '<aside class="panel" id="support-form"><h2>応援する</h2>';
  if(p.messagesOnly){
    h += '<p>このページでは、応援メッセージだけを受け付けています。</p>';
  } else {
    h += '<div class="big-count">'+pageSupporters(p)+'人</div><p class="note" style="margin-top:0">応援の気持ちを表明した人の数です。お金はまだかかっていません。</p>';
    if(p.program === "regular") h += '<p class="note">月額の定期応援を希望している人：<strong>'+(p.recurring||0)+'人</strong>（予約だけです。本人が引き取るまでは何も始まりません）</p>';
    if(p.program === "maintenance") h += '<p class="note">維持管理（剪定・診断・治療）への定期応援を希望している人：<strong>'+(p.recurring||0)+'人</strong>（予約だけです）</p>';
  }
  h += '<div id="support-done"></div>';
  if(!p.messagesOnly && !p.publicFigure){
    /* 連絡方法の選択モック（定期応援の予約ステップのみ・Stage B1 §40.8）
       入力文字列はネットワーク送信せず、trackEvent にも含めない。進んだら破棄する。 */
    h += '<div id="email-step" class="hidden" role="region" aria-label="連絡方法の選択（検証用のモック）">'
       + '<p style="margin:0 0 10px"><strong>本人が引き取ったら、参加確認をメールで送ります</strong></p>'
       + '<ul style="margin:0 0 16px; padding-left:20px; font-size:15.5px">'
       + '<li>引き取られたら、参加確認が確実に届きます</li>'
       + '<li>自分の予約や応援を、あとから見たり取り消したりできます</li>'
       + '<li>本人の活動報告やお礼が届きます</li>'
       + '</ul>'
       + '<button class="btn btn-ghost" id="id-google" style="width:100%">Googleで続ける</button>'
       + '<button class="btn btn-ghost" id="id-line" style="width:100%; margin-top:10px">LINEで続ける</button>'
       + '<button class="btn btn-ghost" id="id-apple" style="width:100%; margin-top:10px">Appleで続ける</button>'
       + '<button class="btn btn-ghost" id="id-x" style="width:100%; margin-top:10px">Xで続ける</button>'
       + '<button class="btn btn-ghost" id="id-email-open" style="width:100%; margin-top:10px">メールアドレスを入力する</button>'
       + '<div id="email-form" class="hidden" style="margin-top:14px">'
       + '<div class="field"><label for="sup-email">メールアドレス</label>'
       + '<input type="email" id="sup-email" inputmode="email" autocomplete="email" placeholder="例：you@example.jp">'
       + '<div id="email-alert"></div></div>'
       + '<button class="btn btn-primary" id="email-do" style="width:100%">このメールで予約する</button>'
       + '</div>'
       + '<button class="btn btn-ghost" id="email-skip" style="width:100%; margin-top:10px">登録せずに予約する</button>'
       + '<p class="note" style="margin-top:14px">検証用のモックです。メールは送信されません。アドレスは保存されません。外部サービスの確認画面も開きません</p>'
       + '</div>';
  }
  h += '<div id="support-fields">';
  h += '<div class="field"><label for="sup-name">名前（ニックネームでOK）</label><input type="text" id="sup-name" placeholder="例：近所の住人"></div>';
  h += '<div class="field"><label for="sup-msg">応援メッセージ</label><textarea id="sup-msg" placeholder="応援の言葉をどうぞ"></textarea>'
     + '<p class="hint">投稿の前に自動チェックが入ります。傷つける言葉・個人情報・勧誘・選挙運動の内容は公開されません。</p></div>';
  if(!p.messagesOnly && !p.publicFigure){
    h += '<div class="field"><label>もし応援の仕組みがあったら、いくらくらいなら応援したいですか？</label>'
       + '<div class="seg" role="group" aria-label="単発か月額か">'
       + '<button type="button" data-mode="once" aria-pressed="true">単発で</button>'
       + '<button type="button" data-mode="monthly" aria-pressed="false">月額で（定期）</button></div>'
       + '<div class="amounts" id="amounts"></div>'
       + '<input type="number" id="sup-free" min="0" step="100" placeholder="自由入力（円）">'
       + '<p class="hint" id="amount-hint">気持ちの表明だけです。支払いは発生しません。下限は単発500円・月額300円です（それ未満はメッセージのみの応援として受け付けます）。</p></div>';
  }
  if(p.publicFigure === "celebrity"){
    h += '<p class="note">著名人のページでは、引き取り前に金額の希望は聞きません。メッセージと人数だけが集まります。</p>';
  }
  h += '<button class="btn btn-primary" id="sup-send" style="width:100%">応援を送る</button>';
  h += '<div id="sup-alert"></div>';
  h += '<hr style="border:none; border-top:1px solid var(--line); margin:20px 0">';
  h += '<button class="btn btn-ghost" id="share-btn" style="width:100%">このページを共有する</button>';
  h += '<p class="note center">これまでに '+pageShares(p)+' 回共有されています（サンプル数を含む）</p>';
  h += '<div id="share-box"></div>';
  h += '</div>'; /* /#support-fields */
  h += '</aside>';
  return h;
}
function amountOptions(){
  var box = document.getElementById("amounts"); if(!box) return;
  var list = pledgeState.mode === "once" ? [500,1000,3000,5000,10000] : [300,500,1000,3000];
  box.innerHTML = list.map(function(v){
    return '<button type="button" class="amt" data-amt="'+v+'" aria-pressed="'+(pledgeState.amount===v)+'">'+v.toLocaleString()+'円</button>';
  }).join("");
}
function fillKit(p, kind){
  var ta = document.getElementById("kit-text"); if(!ta) return;
  var link = "https://ouen.globe-ent.com/#/p/" + p.id;
  var base = {
    direct: "「"+p.name+"」の応援ページが、ファンの手で作られています。\n"+link+"\nファンが作った非公式のページで、お金は集めていません。応援メッセージが"+pageMessages(p).length+"件集まっています。本人が引き取ることも、無料で削除・修正することもできます。よければ一度見てみてください。",
    dm: "突然すみません。ファンの方が「"+p.name+"」の応援ページを作っています（非公式・お金は集めていません）。\n"+link+"\n引き取りも削除も、本人の希望でいつでもできます。",
    mail: "お問い合わせ失礼いたします。「"+p.name+"」の応援ページがファンによって作成されています。\nページ： "+link+"\n・ファンが作った非公式のページです（公式ページではありません）\n・お金は一切集めていません\n・本人の方は、引き取り／修正／削除を無料でいつでも依頼できます\nご確認いただけますと幸いです。"
  };
  ta.value = base[kind] || base.direct;
}
function bindDetail(p){
  amountOptions();
  var seg = document.querySelectorAll(".seg button");
  seg.forEach(function(b){ b.addEventListener("click", function(){
    pledgeState.mode = b.getAttribute("data-mode"); pledgeState.amount = null;
    seg.forEach(function(x){ x.setAttribute("aria-pressed", x===b ? "true":"false"); });
    amountOptions();
  });});
  var amounts = document.getElementById("amounts");
  if(amounts) amounts.addEventListener("click", function(e){
    var b = e.target.closest("[data-amt]"); if(!b) return;
    pledgeState.amount = parseInt(b.getAttribute("data-amt"), 10);
    var free = document.getElementById("sup-free"); if(free) free.value = "";
    amountOptions();
  });
  var tpl = document.getElementById("kit-tpl");
  if(tpl) tpl.addEventListener("change", function(){ fillKit(p, tpl.value); });
  var kc = document.getElementById("kit-copy");
  if(kc) kc.addEventListener("click", function(){
    var ta = document.getElementById("kit-text");
    if(navigator.clipboard) navigator.clipboard.writeText(ta.value).catch(function(){});
    kc.textContent = "コピーしました";
    setTimeout(function(){ kc.textContent = "文面をコピーする"; }, 2000);
  });
  var delOpen = document.getElementById("del-open");
  if(delOpen) delOpen.addEventListener("click", function(){ document.getElementById("del-box").classList.remove("hidden"); });
  var delDo = document.getElementById("del-do");
  if(delDo) delDo.addEventListener("click", function(){
    sessionState.hidden[p.id] = true;
    app.innerHTML = '<div style="padding:44px 0"><h1 style="font-size:27px">依頼を受け付けました</h1>'
      + '<p>確認が済むまで、このページは一時的に非表示になりました（この体験では、このブラウザの中だけの動作です）。本人確認が取れなければ、ページは自動で元に戻ります。</p>'
      + '<p class="mt"><a class="btn btn-primary" href="#/">一覧にもどる</a></p></div>';
    document.body.classList.remove("has-mobile-bar");
    window.scrollTo(0,0);
  });
  var share = function(){
    trackEvent("share_click", { pageId:p.id });
    sessionState.extraShares[p.id] = (sessionState.extraShares[p.id]||0) + 1;
    var link = "https://ouen.globe-ent.com/#/p/" + p.id;
    if(navigator.clipboard) navigator.clipboard.writeText(link).catch(function(){});
    var box = document.getElementById("share-box");
    if(box) box.innerHTML = '<div class="alert alert-ok">共有リンクをコピーしました。<br><span class="small">'+link+'<br>※検証用の疑似リンクです。カード画像にも「非公式・寄付受付ではありません」と入ります。</span></div>';
  };
  var sb = document.getElementById("share-btn"); if(sb) sb.addEventListener("click", share);
  var ms = document.getElementById("m-share"); if(ms) ms.addEventListener("click", share);
  var msup = document.getElementById("m-support");
  if(msup) msup.addEventListener("click", function(){
    var panel = document.getElementById("support-form");
    if(panel) panel.scrollIntoView({ behavior:"smooth", block:"start" });
  });

  /* 応援の確定処理（単発は直接、定期予約は連絡方法の選択経由でもここに合流する）
     contactMethod: "google" / "line" / "apple" / "x" / "email" / null（登録せず） */
  function finalizeSupport(pending, contactMethod){
    if(pending.msg){
      if(!sessionState.extraMessages[p.id]) sessionState.extraMessages[p.id] = [];
      sessionState.extraMessages[p.id].unshift({ who:pending.name, body:pending.msg });
      var ml = document.getElementById("msglist");
      if(ml) ml.innerHTML = msgListHtml(p);
    }
    if(!sessionState.supported[p.id]){
      sessionState.supported[p.id] = true;
      sessionState.extraSupport[p.id] = (sessionState.extraSupport[p.id]||0) + 1;
    }
    trackEvent("support_action", { pageId:p.id, hasMessage: !!pending.msg, amount: pending.amount, mode: pending.mode });
    var done = document.getElementById("support-done");
    done.innerHTML = '<div class="alert alert-ok">応援を送りました。ありがとうございます。'
      + (pending.amount ? '<br>'+pending.amount.toLocaleString()+'円（'+(pending.mode==="once"?"単発":"月額")+'）の気持ちも記録しました。支払いは発生していません。' : '')
      + (contactMethod === "email" ? '<br>本番では、このアドレスに確認メールが届きます' : '')
      + (contactMethod === "google" ? '<br>本番では、ここで Google の確認画面が開きます' : '')
      + (contactMethod === "line" ? '<br>本番では、ここで LINE の確認画面が開きます' : '')
      + (contactMethod === "apple" ? '<br>本番では、ここで Apple の確認画面が開きます' : '')
      + (contactMethod === "x" ? '<br>本番では、ここで X の確認画面が開きます' : '')
      + '<br><span class="small">よければ感想を聞かせてください（1分）。</span><br><span class="mt" style="display:inline-block">'+surveyLink("アンケートに答える","btn-small")+'</span></div>';
    var alertBox = document.getElementById("sup-alert");
    if(alertBox) alertBox.innerHTML = "";
    var msgEl = document.getElementById("sup-msg");
    if(msgEl) msgEl.value = "";
    var cnt = document.querySelector(".panel .big-count");
    if(cnt) cnt.textContent = pageSupporters(p) + "人";
    done.scrollIntoView({ behavior:"smooth", block:"center" });
  }

  /* 連絡方法の選択モック：定期（月額）予約で金額が選ばれたときだけ出す（§40.8） */
  function showEmailStep(pending){
    var step = document.getElementById("email-step");
    var fields = document.getElementById("support-fields");
    if(!step || !fields){ finalizeSupport(pending, null); return; }
    emailStepState.active = true;
    emailStepState.pageId = p.id;
    fields.classList.add("hidden");
    step.classList.remove("hidden");
    var form0 = document.getElementById("email-form");
    if(form0) form0.classList.add("hidden");
    var open0 = document.getElementById("id-email-open");
    if(open0) open0.classList.remove("hidden");
    trackEvent("email_step_view", { pageId:p.id, mode:"monthly" });
    step.scrollIntoView({ behavior:"smooth", block:"center" });
    function closeStep(){
      emailStepState.active = false;
      var input = document.getElementById("sup-email");
      if(input) input.value = "";
      step.classList.add("hidden");
      fields.classList.remove("hidden");
    }
    var gBtn = document.getElementById("id-google");
    if(gBtn) gBtn.onclick = function(){
      trackEvent("identity_choice", { method:"google", pageId:p.id });
      closeStep();
      finalizeSupport(pending, "google");
    };
    var lBtn = document.getElementById("id-line");
    if(lBtn) lBtn.onclick = function(){
      trackEvent("identity_choice", { method:"line", pageId:p.id });
      closeStep();
      finalizeSupport(pending, "line");
    };
    var aBtn = document.getElementById("id-apple");
    if(aBtn) aBtn.onclick = function(){
      trackEvent("identity_choice", { method:"apple", pageId:p.id });
      closeStep();
      finalizeSupport(pending, "apple");
    };
    var xBtn = document.getElementById("id-x");
    if(xBtn) xBtn.onclick = function(){
      trackEvent("identity_choice", { method:"x", pageId:p.id });
      closeStep();
      finalizeSupport(pending, "x");
    };
    var openBtn = document.getElementById("id-email-open");
    if(openBtn) openBtn.onclick = function(){
      trackEvent("identity_choice", { method:"email", pageId:p.id });
      var form = document.getElementById("email-form");
      if(form) form.classList.remove("hidden");
      openBtn.classList.add("hidden");
      var em = document.getElementById("sup-email");
      if(em) em.focus();
    };
    var doBtn = document.getElementById("email-do");
    if(doBtn) doBtn.onclick = function(){
      var input = document.getElementById("sup-email");
      var val = input ? input.value.trim() : "";
      var ab = document.getElementById("email-alert");
      /* 形式チェックは端末内でのみ。文字列はこの場で破棄し、送信・保存・計測に一切含めない */
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)){
        if(ab) ab.innerHTML = '<div class="alert alert-warn">メールアドレスの形式を確認してください。</div>';
        return;
      }
      if(input) input.value = "";
      val = null;
      trackEvent("email_complete", { pageId:p.id, mode:"monthly" });
      closeStep();
      finalizeSupport(pending, "email");
    };
    var skipBtn = document.getElementById("email-skip");
    if(skipBtn) skipBtn.onclick = function(){
      trackEvent("identity_choice", { method:"none", pageId:p.id });
      trackEvent("email_skip", { pageId:p.id, mode:"monthly" });
      closeStep();
      finalizeSupport(pending, null);
    };
  }

  var send = document.getElementById("sup-send");
  send.addEventListener("click", function(){
    var name = document.getElementById("sup-name").value.trim() || "名無しの応援者";
    var msg = document.getElementById("sup-msg").value.trim();
    var alertBox = document.getElementById("sup-alert");
    var bad = screenText(name + " " + msg);
    if(bad){
      alertBox.innerHTML = '<div class="alert alert-warn">公開されませんでした。理由：'+esc(bad)+'。直してもう一度送ってみてください。</div>';
      return;
    }
    var amount = null, mode = null;
    if(!p.messagesOnly && !p.publicFigure){
      var free = document.getElementById("sup-free");
      var fv = free && free.value ? parseInt(free.value, 10) : null;
      amount = fv || pledgeState.amount;
      mode = pledgeState.mode;
      var min = mode === "once" ? 500 : 300;
      if(amount && amount < min) amount = null; /* 下限未満は金額なしの表明として扱う */
    }
    var pending = { name:name, msg:msg, amount:amount, mode:mode };
    /* 定期応援の予約（月額＋金額あり）のみメールステップを挟む。単発は対照として現状維持 */
    if(mode === "monthly" && amount){
      showEmailStep(pending);
      return;
    }
    finalizeSupport(pending, null);
  });
}

/* ================= 作成ウィザード ================= */
var wiz = null;
function renderCreate(){
  document.body.classList.remove("has-mobile-bar");
  trackEvent("creation_start", {});
  wiz = { step:1, category:"restaurant", name:"", region:"", relation:"fan", reason:"", candidate:null };
  drawWiz();
}
function wizStepsHtml(){
  var names = ["種類","名前と地域","候補の確認","関係と理由","確認"];
  return '<div class="wiz-steps">' + names.map(function(n,i){
    return '<span class="'+(wiz.step===i+1?"on":"")+'">'+(i+1)+'. '+n+'</span>';
  }).join("") + '</div>';
}
function drawWiz(){
  var h = '<div style="max-width:760px; margin:0 auto; padding:26px 0 40px">';
  h += '<h1 style="font-size:28px; margin:0 0 6px">応援ページを作る</h1>';
  h += '<p class="sub" style="color:var(--ink-soft)">この検証では、<strong>架空の対象だけ</strong>作れます。実在のお店や人の名前は使わないでください。作ったページは、このブラウザの中にだけ表示されます。</p>';
  h += wizStepsHtml();
  h += '<div id="wiz-body"></div></div>';
  app.innerHTML = h;
  var body = document.getElementById("wiz-body");
  if(wiz.step === 1){
    body.innerHTML = '<div class="field"><label>応援したい対象の種類</label>'
      + CATEGORIES.slice(1).map(function(c){
          return '<label class="radio-card'+(wiz.category===c.id?" sel":"")+'"><input type="radio" name="wcat" value="'+c.id+'"'+(wiz.category===c.id?" checked":"")+'>'+c.label+'</label>';
        }).join("") + '</div>'
      + '<div class="wiz-nav"><button class="btn btn-primary" id="w-next">次へ</button></div>';
    body.querySelectorAll("input[name=wcat]").forEach(function(r){ r.addEventListener("change", function(){
      wiz.category = r.value;
      body.querySelectorAll(".radio-card").forEach(function(c){ c.classList.toggle("sel", c.contains(r)); });
    });});
    document.getElementById("w-next").addEventListener("click", function(){ wiz.step = 2; drawWiz(); window.scrollTo(0,0); });
  }
  if(wiz.step === 2){
    body.innerHTML = '<div class="field"><label for="w-name">対象の名前（架空の名前で）</label>'
      + '<input type="text" id="w-name" placeholder="例：港川ベーカリー ひだまり" value="'+esc(wiz.name)+'">'
      + '<p class="hint">検証のため、実在の名前は使えません。架空の名前でお試しください。</p><div id="w-name-alert"></div></div>'
      + '<div class="field"><label for="w-region">地域</label><input type="text" id="w-region" placeholder="例：港川市" value="'+esc(wiz.region)+'"></div>'
      + '<div class="wiz-nav"><button class="btn btn-ghost" id="w-back">もどる</button><button class="btn btn-primary" id="w-next">次へ</button></div>';
    document.getElementById("w-back").addEventListener("click", function(){ wiz.step = 1; drawWiz(); });
    document.getElementById("w-next").addEventListener("click", function(){
      wiz.name = document.getElementById("w-name").value.trim();
      wiz.region = document.getElementById("w-region").value.trim() || "地域未設定";
      var ab = document.getElementById("w-name-alert");
      if(!wiz.name){ ab.innerHTML = '<div class="alert alert-warn">名前を入れてください。</div>'; return; }
      if(looksReal(wiz.name)){ ab.innerHTML = '<div class="alert alert-warn">実在のお店や人の名前のようです。検証のため、架空の名前でお試しください。</div>'; return; }
      var bad = screenText(wiz.name);
      if(bad){ ab.innerHTML = '<div class="alert alert-warn">その名前は使えませんでした。理由：'+esc(bad)+'</div>'; return; }
      wiz.step = 3; drawWiz(); window.scrollTo(0,0);
    });
  }
  if(wiz.step === 3){
    var cands = [
      { id:"c1", label: wiz.name + "（"+ wiz.region +"）", note:"名前と地域が一致。公式サイトらしきページあり", correct:true },
      { id:"c2", label: wiz.name.replace(/ /g,"") + " 別店舗（隣の市）", note:"名前は似ていますが、別の場所です", correct:false },
      { id:"c3", label:"該当なし（新しく作る）", note:"見つかりませんでした。情報が少ないページとして作ります", correct:false }
    ];
    wiz._cands = cands;
    body.innerHTML = '<p>その名前で見つかった候補です。応援したい対象はどれですか？</p>'
      + cands.map(function(c){ return '<label class="radio-card"><input type="radio" name="wcand" value="'+c.id+'"><strong>'+esc(c.label)+'</strong><br><span class="small">'+esc(c.note)+'</span></label>'; }).join("")
      + '<p class="small">まちがって選ぶと、別の対象のページになってしまいます。よく見て選んでください。</p>'
      + '<div class="wiz-nav"><button class="btn btn-ghost" id="w-back">もどる</button><button class="btn btn-primary" id="w-next">次へ</button></div>';
    document.getElementById("w-back").addEventListener("click", function(){ wiz.step = 2; drawWiz(); });
    document.getElementById("w-next").addEventListener("click", function(){
      var sel = body.querySelector("input[name=wcand]:checked");
      if(!sel){ alertInline(body, "候補を1つ選んでください。"); return; }
      wiz.candidate = cands.filter(function(c){ return c.id === sel.value; })[0];
      wiz.step = 4; drawWiz(); window.scrollTo(0,0);
    });
  }
  if(wiz.step === 4){
    body.innerHTML = '<div class="field"><label>対象との関係</label>'
      + '<label class="radio-card'+(wiz.relation==="fan"?" sel":"")+'"><input type="radio" name="wrel" value="fan"'+(wiz.relation==="fan"?" checked":"")+'>ファン・応援する側です（本人・経営者・従業員・取引先ではありません）</label>'
      + '<label class="radio-card'+(wiz.relation==="related"?" sel":"")+'"><input type="radio" name="wrel" value="related"'+(wiz.relation==="related"?" checked":"")+'>本人または関係者です（ページに「関係者により作成」と表示されます）</label></div>'
      + '<div class="field"><label for="w-reason">応援したい理由</label><textarea id="w-reason" placeholder="なぜ応援したいのか、一言どうぞ">'+esc(wiz.reason)+'</textarea><div id="w-reason-alert"></div></div>'
      + '<div class="wiz-nav"><button class="btn btn-ghost" id="w-back">もどる</button><button class="btn btn-primary" id="w-next">確認へ</button></div>';
    body.querySelectorAll("input[name=wrel]").forEach(function(r){ r.addEventListener("change", function(){ wiz.relation = r.value; }); });
    document.getElementById("w-back").addEventListener("click", function(){ wiz.step = 3; drawWiz(); });
    document.getElementById("w-next").addEventListener("click", function(){
      wiz.reason = document.getElementById("w-reason").value.trim();
      var bad = screenText(wiz.reason);
      var ab = document.getElementById("w-reason-alert");
      if(bad){ ab.innerHTML = '<div class="alert alert-warn">公開できない内容が含まれています。理由：'+esc(bad)+'</div>'; return; }
      wiz.step = 5; drawWiz(); window.scrollTo(0,0);
    });
  }
  if(wiz.step === 5){
    var unconfirmed = wiz.candidate && !wiz.candidate.correct;
    body.innerHTML = '<div class="facts"><h2 style="font-size:20px">この内容で作ります</h2>'
      + '<p><strong>'+esc(wiz.name)+'</strong>（'+esc(catLabel(wiz.category))+' ・ '+esc(wiz.region)+'）</p>'
      + '<p>関係：'+(wiz.relation==="fan" ? "ファン" : "関係者（ページに表示されます）")+'</p>'
      + '<p>理由：'+esc(wiz.reason || "（未記入）")+'</p>'
      + (unconfirmed ? '<div class="alert alert-warn">選んだ候補が対象と一致しているか確認できていません。このページは「未確認」として、名前と種類だけの最小限の表示で作られます。</div>' : '<p class="small">候補と一致しました。写真や事実は、出典のあるものだけが後から載せられます。</p>')
      + '<p class="small">作ったページには「ファンが作った非公式の応援ページです」と表示されます。本人が引き取ることも、無料で削除することもできます。</p></div>'
      + '<div class="wiz-nav"><button class="btn btn-ghost" id="w-back">もどる</button><button class="btn btn-primary" id="w-publish">この内容で作る</button></div>';
    document.getElementById("w-back").addEventListener("click", function(){ wiz.step = 4; drawWiz(); });
    document.getElementById("w-publish").addEventListener("click", function(){
      var id = "u" + Date.now().toString(36);
      var np = {
        id:id, name:wiz.name, category:wiz.category, region:wiz.region,
        photo:null, photoStatus:"none", claimed:false, official:false, sampleSeed:true, userMade:true,
        intro: unconfirmed ? "確認が取れていないため、最小限の情報だけを表示しています（あなたが作ったページ）。" : "あなたが作った応援ページです（このブラウザの中だけに表示されます）。",
        reason: wiz.reason || "応援したい気持ちで作りました。",
        supporters:0, shares:0, facts:[], messages:[], wall:[]
      };
      if(wiz.relation === "related") np.intro += " ※関係者により作成";
      sessionState.createdPages.unshift(np);
      trackEvent("creation_complete", { category: wiz.category, unconfirmed: !!unconfirmed, related: wiz.relation === "related" });
      location.hash = "#/p/" + id;
    });
  }
}
function alertInline(container, msg){
  var d = document.createElement("div");
  d.className = "alert alert-warn"; d.textContent = msg;
  container.appendChild(d);
}

/* ================= 受け手体験 ================= */
var recipStep = 0;
function renderRecipient(){
  document.body.classList.remove("has-mobile-bar");
  trackEvent("recipient_view", {});
  recipStep = 0;
  drawRecipient();
}
function drawRecipient(){
  var h = '<div style="max-width:820px; margin:0 auto; padding:26px 0 40px">';
  h += '<h1 style="font-size:28px; margin:0 0 6px">受け手の体験</h1>';
  h += '<p style="color:var(--ink-soft)">架空のパン屋「港川ベーカリー ひだまり」の店主になったつもりで体験してください。応援する人が作ったページに、ある日気づくところから始まります。</p>';
  if(recipStep === 0){
    h += '<div class="mock-mail"><div class="from">差出人：応援ページのお知らせ（架空のメール）<br>件名：あなたの店の応援ページが作られました</div>'
      + '<p>港川ベーカリー ひだまり 様</p>'
      + '<p>ファンの方が、あなたの店の応援ページを作りました。まだお金は1円も払われていません（「応援したい」という意思表示だけです）。</p>'
      + '<p>応援メッセージが3件、応援の気持ちを表明した人が25人集まっています。ページはファンが作った非公式のもので、公式ページではありません。</p>'
      + '<p>できること：そのままにする／引き取って公式の窓口にする／情報の訂正だけする／削除する（いつでも無料）。放置しても、困ることはありません。</p></div>'
      + '<p class="small">※本番では、運営が自動でメールを送ることはしません。公開された問い合わせ先への1回限りの連絡か、本人を知る応援者から直接伝わる形を想定しています。これは体験用の再現です。</p>'
      + '<div class="wiz-nav"><button class="btn btn-primary" id="r-next">ページを見てみる</button></div>';
  }
  if(recipStep === 1){
    h += '<p>届いたページは、サンプルのベーカリーのページです。まず眺めてみてください。</p>'
      + '<p><a class="btn btn-ghost" href="#/p/bakery">港川ベーカリー ひだまり のページを開く</a></p>'
      + '<div class="facts"><h2 style="font-size:20px">店主としてできること</h2><ul style="margin:0; padding-left:20px">'
      + '<li>引き取る：本人確認（公式SNSや公式サイトでの確認＋決済事業者の本人確認）のあと、管理できるようになります</li>'
      + '<li>公式にするかどうかは、引き取りとは別の選択です</li>'
      + '<li>訂正：まちがった情報は、引き取り前でも直せます</li>'
      + '<li>削除：無料でいつでも。依頼があればまず一時的に非表示になります</li>'
      + '<li>応援メッセージ欄は、引き取ったあとも本人が書き換えることはできません（ファンの声のままで残ります。中傷・スパムだけは非表示にできます）</li></ul></div>'
      + '<div class="wiz-nav"><button class="btn btn-ghost" id="r-back">もどる</button><button class="btn btn-primary" id="r-next">どうするか選ぶ</button></div>';
  }
  if(recipStep === 2){
    h += '<div class="field"><label>あなたなら、どうしますか？</label>'
      + '<label class="radio-card"><input type="radio" name="rchoice" value="claim">引き取りたい（管理して、公式の窓口にする）</label>'
      + '<label class="radio-card"><input type="radio" name="rchoice" value="light">まずは公式リンクを載せるだけにしたい</label>'
      + '<label class="radio-card"><input type="radio" name="rchoice" value="leave">このまま様子を見る</label>'
      + '<label class="radio-card"><input type="radio" name="rchoice" value="delete">削除してほしい</label></div>'
      + '<div id="r-result"></div>'
      + '<div class="wiz-nav"><button class="btn btn-ghost" id="r-back">もどる</button><button class="btn btn-primary" id="r-decide">決める</button></div>';
  }
  if(recipStep === 3){
    h += '<div class="alert alert-ok">体験ありがとうございました。引き取りの場合は、このあと本人確認の手続き（公式チャネルでの確認コード表示など）に進みます。ページには「引き取り申請中」と表示され、なりすましを防ぎます。</div>'
      + '<div class="survey-band"><h2>受け手として、どう感じましたか</h2><p>1分で終わります。「勝手に作られるのはどうだったか」を含め、感想を聞かせてください。</p>'
      + surveyLink("アンケートに答える","btn-primary") + '</div>'
      + '<p><a href="#/">一覧にもどる</a></p>';
  }
  h += '</div>';
  app.innerHTML = h;
  var nx = document.getElementById("r-next"); if(nx) nx.addEventListener("click", function(){ recipStep++; drawRecipient(); window.scrollTo(0,0); });
  var bk = document.getElementById("r-back"); if(bk) bk.addEventListener("click", function(){ recipStep--; drawRecipient(); window.scrollTo(0,0); });
  var dc = document.getElementById("r-decide");
  if(dc) dc.addEventListener("click", function(){
    var sel = document.querySelector("input[name=rchoice]:checked");
    var box = document.getElementById("r-result");
    if(!sel){ box.innerHTML = '<div class="alert alert-warn">1つ選んでください。</div>'; return; }
    trackEvent("recipient_complete", { choice: sel.value });
    recipStep = 3; drawRecipient(); window.scrollTo(0,0);
  });
}

/* ================= 404 ================= */
function render404(){
  document.body.classList.remove("has-mobile-bar");
  app.innerHTML = '<div style="padding:48px 0; max-width:640px"><h1 style="font-size:27px">ページが見つかりませんでした</h1>'
    + '<p>アドレスが変わったか、削除されたページかもしれません。応援ページの一覧から探してみてください。</p>'
    + '<p class="mt"><a class="btn btn-primary" href="#/">応援ページの一覧へ</a></p></div>';
}

/* ================= ルーター ================= */
function route(){
  var hash = location.hash || "#/";
  var parts = hash.replace(/^#\//, "").split("/");
  window.scrollTo(0,0);
  if(hash === "#/" || hash === "#" || hash === ""){ renderLP(); return; }
  if(parts[0] === "p" && parts[1]){ renderDetail(parts[1]); return; }
  if(parts[0] === "create"){ renderCreate(); return; }
  if(parts[0] === "recipient"){ renderRecipient(); return; }
  render404();
}
window.addEventListener("hashchange", route);
document.addEventListener("click", function(e){
  var a = e.target.closest("[data-survey]");
  if(a) trackEvent("survey_click", { from: location.hash });
});
trackEvent("lp_view", {});
route();

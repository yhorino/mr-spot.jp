// スキングレイッシュ独自機能
// ---------------------------------------------
// スマホなどのタッチデバイスで:hoverが微妙な見た目になることの対策
// 参考:https://www.webdesignleaves.com/pr/plugins/ontouchstart-event-handler.html
// ---------------------------------------------
// 空の ontouchstart 属性を body 要素に設定
document.getElementsByTagName('body')[0].setAttribute('ontouchstart', '');

// ---------------------------------------------
// navi sub-menu の表示OFF
// Front,Archives,Other
// .skin-grayish .navi-in>ul>li>.sub-menu
// ---------------------------------------------
let headerObserver;
let flagHeaderObserver;

// PC navi
const PCNaviIn = document.querySelector(".skin-grayish #navi-in");

// submenuがあるかどうか
const PCsubmenu = document.querySelectorAll(".skin-grayish .navi-in>ul>li:not(.header-snsicon-submenu)>.sub-menu");
const numberOfElements = PCsubmenu.length;

// bodyを監視してスクロールされたことを検知する
const body_border = 100;

const AllPageBodyObserve = (ActiveElement) => {
  const headerElement = ActiveElement;
  const targetElement = document.body;

  if (!headerElement || !targetElement) return;

  const observeHandler = (entries, obs) => {
    if (flagHeaderObserver === 'false') {
      obs.unobserve(entries[0].target);
    } else {

      headerElement.setAttribute(
        "data-active",
        String(!entries[0].isIntersecting)
      );
    }
  };
  const options = {
    root: null,
    rootMargin: `${body_border}px 0px ${document.body.clientHeight}px 0px`,
    threshold: 1
  };

  headerObserver = new IntersectionObserver(observeHandler, options);
  headerObserver.observe(targetElement);
};


// ---------------------------------------------
// 画面幅1023px以下ではIntersectionObserver監視しないようにする
// ---------------------------------------------

const mediaQueryList1023 = window.matchMedia('(max-width: 1023px)');
function headerSubmenuOffChange(e) {
  if (e.matches) {
    flagHeaderObserver = 'false';

  } else {
    flagHeaderObserver = 'true';

    AllPageBodyObserve(PCNaviIn);

  }
  mediaQueryList1023.addEventListener("change", headerSubmenuOffChange);
}
if (numberOfElements > 0) {
  headerSubmenuOffChange(mediaQueryList1023);
}

// ---------------------------------------------
// 投稿or固定ページのSNSシェアボタン
// 指定セクション(main)で表示
// ---------------------------------------------
let Ftobserver;
let flagObserver;

const scrolDispOff_snsshare = (dispOffSection, targetItem) => {

  const targetOffItem = targetItem;
  const targetSection = dispOffSection;

  if (!targetOffItem || !targetSection) return;

  const doWhenIntersect = (entries, obs) => {
    if (flagObserver === 'false') {
      obs.unobserve(entries[0].target);
    } else {
      if (entries[0].isIntersecting) {
        activateTargetOn();
      } else {
        activateTargetOff();
      }
    }
  };

  const options = {
    root: null,
    // rootMargin: "0%",
    rootMargin: "-50% 0px", // ビューポートの中心を判定基準にする
    threshold: 0
  };

  Ftobserver = new IntersectionObserver(doWhenIntersect, options);

  Ftobserver.observe(targetSection);

  const activateTargetOff = () => {
    if (targetOffItem.dataset.scroldisp === 'on') {
      targetOffItem.dataset.scroldisp = 'off';
    }
  };
  const activateTargetOn = () => {
    if (targetOffItem.dataset.scroldisp === 'off') {
      targetOffItem.dataset.scroldisp = 'on';
    }
  };

};
const footerOffItem = document.querySelector('.skin-grayish .article-header .sns-share');
// const scrolOffSection = document.getElementById('footer');
const scrolOffSection = document.getElementById('main');

// ---------------------------------------------
// 画面幅1400px以下ではIntersectionObserver監視しないようにする
// ---------------------------------------------

const mediaQueryList1400 = window.matchMedia('(max-width: 1400px)');
function footerOffChange(e) {
  if (e.matches) {
    footerOffItem.setAttribute('data-scroldisp', 'on');
    flagObserver = 'false';

  } else {
    footerOffItem.setAttribute('data-scroldisp', 'off');
    flagObserver = 'true';
    scrolDispOff_snsshare(scrolOffSection, footerOffItem);
  }
  mediaQueryList1400.addEventListener("change", footerOffChange);
}
if (footerOffItem) {
  footerOffChange(mediaQueryList1400);
}

// ---------------------------------------------
// 画面幅1023px以下のモバイルヘッダーメニュー
// カスタマイザーでFrontのみメニューボタンのみにするとき、
// その他の子要素を削除（検索ボタン対策）
// ---------------------------------------------
const mobileHeaderMenu = document.querySelector('.skin-grayish .mobile-header-menu-buttons');
// to functions.php
const mobileHeaderMenuChild = document.querySelectorAll('.skin-grayish.front-top-page .mobile-header-menu-buttons > li:not(:first-child)');
const mobileHeaderMenu_onlymenu = () => {
  if (mobileHeaderMenu && mobileHeaderMenuChild_remove_flg === 'on') {
    mobileHeaderMenuChild.forEach(liItem => {
      liItem.remove();
    });
  }
};
mobileHeaderMenu_onlymenu();
// ---------------------------------------------
// 画面幅1023px以下のモバイルヘッダーメニュー
// メニューが一つだけの場合は左端に表示flex-start
// 2つ以上はspace-aroundに変える（親テーマの設定）
// ---------------------------------------------
const mobileHeaderMenu_justifySet = () => {

  if (mobileHeaderMenu) {
    const mobileHeaderMenuCount = mobileHeaderMenu.childElementCount;

    if (mobileHeaderMenuCount < 2) {
      document.documentElement.style.setProperty('--mobileHeaderMenu_justifySet', `flex-start`);
    } else {
      document.documentElement.style.setProperty('--mobileHeaderMenu_justifySet', `space-around`);

    }
  } else { //モバイルメニューない時デフォルト
    document.documentElement.style.setProperty('--mobileHeaderMenu_justifySet', `space-around`);
  }

};

mobileHeaderMenu_justifySet();

// ---------------------------------------------
// breadcrumb 画面幅834px　〜　1400px以下
// ---------------------------------------------
const mediaQueryList834to1400 = window.matchMedia('(min-width: 835px) and (max-width: 1400px)');

const breadcrumb = document.querySelector('.skin-grayish .breadcrumb');
const mainContents = document.querySelector('.skin-grayish .content .main');
let mainContentsRect;
let timer_breadcrumb;

const breadcrumbLeftSet = () => {
  if (!breadcrumb) return;
  mainContentsRect = mainContents.getBoundingClientRect();
  mainContentsRect_x = Math.round(mainContentsRect.left);
  // for iPhone
  let safeLeft = getComputedStyle(document.documentElement).getPropertyValue('--safeareainsetleft');
  let safeLeftValue = safeLeft.split('px');

  mainContentsRect_x_after = mainContentsRect_x - safeLeftValue[0];
  breadcrumb.style.paddingLeft = mainContentsRect_x_after + 28 + 'px';

};

const breadcrumb_waitTime = 500;//for FireFox

const breadcrumbLeftReset = () => {
  if (!breadcrumb) return;
  breadcrumb.style.paddingLeft = '';
};

function breadcrumbLeftOn(e) {
  if (e.matches) {
    breadcrumbLeftSet();
    window.addEventListener('load', breadcrumbLeftSet);
    window.addEventListener('resize', breadcrumbLeftSet);

  } else {
    window.removeEventListener('load', breadcrumbLeftSet);
    window.removeEventListener('resize', breadcrumbLeftSet);

    setTimeout(breadcrumbLeftReset, breadcrumb_waitTime);

    // breadcrumbLeftReset();
  }
  mediaQueryList834to1400.addEventListener("change", breadcrumbLeftOn);
}

if (breadcrumb) {
  breadcrumbLeftOn(mediaQueryList834to1400);
}

// ---------------------------------------------
// フロントページタイプ：カテゴリーごと
// 表示カテゴリーが設定されていない場合疑似要素を非表示にする
// ---------------------------------------------
const listColumns_Category = document.querySelector('.skin-grayish .front-page-type-category .list-columns');
const listColumns_Category2col = document.querySelector('.skin-grayish .front-page-type-category-2-columns .list-columns');
const listColumns_Category3col = document.querySelector('.skin-grayish .front-page-type-category-3-columns .list-columns');

const listColumns_Selectors = [
  '.skin-grayish .front-page-type-category .list-columns',
  '.skin-grayish .front-page-type-category-2-columns .list-columns',
  '.skin-grayish .front-page-type-category-3-columns .list-columns'
];
const listColumns_CategoryType_childChk = () => {
  listColumns_Selectors.forEach((childChk_target) => {
    const listColumns_Category_target = document.querySelector(childChk_target);

    if (listColumns_Category_target) {
      const numberlistColumns_child = listColumns_Category_target.childElementCount;

      if (numberlistColumns_child < 1) {
        document.documentElement.style.setProperty('--listColumns_Category_displayOn', `none`);
        document.documentElement.style.setProperty('--listColumns_Category_23cols', `0rem`);
      } else {
        document.documentElement.style.setProperty('--listColumns_Category_displayOn', `block`);
        document.documentElement.style.setProperty('--listColumns_Category_23cols', `5rem`);
      }
    }
  });
};
if (listColumns_Category || listColumns_Category2col || listColumns_Category3col) {
  listColumns_CategoryType_childChk();
}


// ---------------------------------------------
// Front以外のページについて（PC時）
// グローバルメニューの折り返し時にメニューの高さを変更する
// ---------------------------------------------
const PCotherHeader = document.querySelector(".skin-grayish:not(.front-top-page) #header-in");

const PCotherNaviIn = document.querySelector(".skin-grayish:not(.front-top-page) .navi-in .menu-top.menu-header.menu-pc");

const PCotherNaviInList = document.querySelectorAll(".skin-grayish:not(.front-top-page) .navi-in>ul>li");

const otherPageHeaderWrap = () => {
  if (!PCotherNaviIn || !PCotherHeader) return;

  const PCotherHeader_Height = PCotherHeader.clientHeight;
  const PCotherNaviIn_Height = PCotherNaviIn.clientHeight;
  // console.log("PCotherHeader_Height: " + PCotherHeader_Height);
  // console.log("PCotherNaviIn_Height: " + PCotherNaviIn_Height);

  if (PCotherNaviIn_Height > PCotherHeader_Height) {
    // Naviの方がHeaderより高いとき : flex wrapしたとき
    PCotherNaviInList.forEach((item) => {
      item.style.height = 'auto';
    });
  } else {
    PCotherNaviInList.forEach((item) => {
      item.style.height = '100%';
    });
  }
};
const otherNavi_HeightResize = (flag) => {
  if (flag === 'true') {
    window.addEventListener('load', otherPageHeaderWrap);
    window.addEventListener('resize', otherPageHeaderWrap);
    otherPageHeaderWrap();
  } else {
    // 指定サイズ以下ではイベント削除
    window.removeEventListener('load', otherPageHeaderWrap);
    window.removeEventListener('resize', otherPageHeaderWrap);
  }
};

function otherNaviIn_Ctrl(e) {
  if (e.matches) {
    otherNavi_HeightResize('false');

  } else {
    otherNavi_HeightResize('true');

  }
  mediaQueryList1023.addEventListener("change", otherNaviIn_Ctrl);

}

if (PCotherHeader && PCotherNaviIn) {
  otherNaviIn_Ctrl(mediaQueryList1023);
}
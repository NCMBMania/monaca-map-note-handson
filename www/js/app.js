// Dom7を使うための短縮表記として$を設定
const $ = Dom7;

// NCMBの初期化を行う
// window.cordovaが存在する場合は'deviceready'、それ以外の場合は'DOMContentLoaded'イベントが発火した時に実行
const event = window.cordova ? 'deviceready' : 'DOMContentLoaded';
document.addEventListener(event, async (e) => {
  // 設定ファイルを非同期で取得
  const config = await (await fetch('./js/config.json')).json();
  // NCMBのインスタンスを作成
  // window.ncmb = new NCMB(config.applicationKey, config.clientKey);
  // Framework7のインスタンスを作成
  window.app = new Framework7({
    name: 'My App', // アプリ名
    theme: 'auto', // テーマの自動検出
    el: '#app', // アプリのルート要素
    store: store, // 状態管理ストア
    routes: routes, // ルーティング設定
  });
});

// 緯度と経度から地名を取得する関数
// https://memo.appri.me/programming/gsi-geocoding-api 参照
const reverseGeoCoding = async (lat, lng) => {
  const url = `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`;
  const res = await fetch(url);
  const json = await res.json();
  const params = GSI.MUNI_ARRAY[json.results.muniCd].split(',');
  return `${params[1]}${params[3]}${json.results.lv01Nm}`;
}

// 画像のリサイズを行う関数
const resizeImage = async (blob, maxWidth) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const ratio = img.width / img.height;
      canvas.width = maxWidth;
      canvas.height = maxWidth / ratio;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
    };
    img.src = URL.createObjectURL(blob);
  });
};

// 2点間の距離を求める関数（メートル単位で返す）
// https://qiita.com/kawanet/items/a2e111b17b8eb5ac859a 参照
const R = Math.PI / 180;
const distance = (lat1, lng1, lat2, lng2) => {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return parseInt(6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)) * 1000);
};

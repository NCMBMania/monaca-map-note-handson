// ルーティングの設定を行う配列
const routes = [
  {
    // pathはルーティングのパスを指定します。
    // '/'の場合はルート（ホーム）を意味します。
    path: '/',
    // urlはそのパスが指定された時にロードされるHTMLファイルの場所を指定します。
    url: './index.html',
  },
  {
    // '/map/'というパスが指定された時にロードされるコンポーネントのURL
    path: '/map/',
    componentUrl: './pages/map.html',
  },
  {
    // '/list/'というパスが指定された時にロードされるコンポーネントのURL
    path: '/list/',
    componentUrl: './pages/list.html',
  },
  {
    // '/note/:lat/:lng/'というパスが指定された時にロードされるコンポーネントのURL
    // この場合、:latと:lngはパラメータとなり、動的に値が入ります。
    path: '/note/:lat/:lng/',
    componentUrl: './pages/note.html',
  },
  // どのルートにもマッチしない場合（404）のルート定義
  // ルーティングの一番最後に配置しなければなりません（全てのルートがマッチしない場合にこのルートが使用されるため）
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];

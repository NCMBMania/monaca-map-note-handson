// Framework7のcreateStore関数を使ってストアを作成します
const createStore = Framework7.createStore;

// ストアを作成し、初期状態としてnotesとcoordsを設定します
const store = createStore({
  // stateはアプリケーションの状態を保存します
  state: {
    // notesはメモのリストを保存します。初期状態は空配列です
    notes: [],
    // coordsは現在の座標を保存します。初期状態は東京タワーの座標です
    coords: {
      lat: 35.6585805,
      lng: 139.7454329,
    },
  },
  // gettersはstateから特定のデータを取得するための関数を定義します
  getters: {
    // notesのゲッター。stateからnotesを取得します
    notes({ state }) {
      return state.notes;
    },
    // coordsのゲッター。stateからcoordsを取得します
    coords({ state }) {
      return state.coords;
    },
  },
  // actionsはstateを更新するための関数を定義します
  actions: {
    // coordsを更新するためのアクション
    setCoords({ state }, coords) {
      state.coords = coords;
    },
    // 新たなメモを追加するためのアクション
    addNote({ state }, note) {
      state.notes = [...state.notes, note];
    },
    // 複数のメモを一度に追加するためのアクション
    resetNote({ state }) {
      state.notes = [];
    },
  },
})

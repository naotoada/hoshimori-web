/**
 * 星守り90体の構造属性テーブル
 * 各キャラの詳細データ（強み・弱み・得意環境・苦手環境）から6次元スコアを精密に算出
 *
 * 各スコアは1〜10のスケール:
 * - social:    社交性（10=超外向的, 1=深い内向的）
 * - stability: 安定性（10=強い安定志向, 1=強い変化志向）
 * - sensitive: 感受性（10=極度に繊細, 1=鷹揚）
 * - action:    行動力（10=即行動, 1=深い熟考型）
 * - aesthetic: 美意識（10=極めて高い, 1=実務的）
 * - independent: 独立性（10=強い自立, 1=強い協調）
 */

export interface CharacterTraits {
  social: number;
  stability: number;
  sensitive: number;
  action: number;
  aesthetic: number;
  independent: number;
}

export const TRAITS_TABLE: Record<string, CharacterTraits> = {
  // ===== 一白水星（水の星）=====
  '1_甲': { social: 4, stability: 7, sensitive: 5, action: 4, aesthetic: 4, independent: 7 }, // アイス
  '1_乙': { social: 7, stability: 6, sensitive: 9, action: 4, aesthetic: 7, independent: 2 }, // タンブラー
  '1_丙': { social: 7, stability: 5, sensitive: 6, action: 6, aesthetic: 5, independent: 6 }, // ピクス
  '1_丁': { social: 2, stability: 6, sensitive: 10, action: 3, aesthetic: 8, independent: 5 }, // カーク
  '1_戊': { social: 3, stability: 10, sensitive: 4, action: 2, aesthetic: 3, independent: 7 }, // ゴードン
  '1_己': { social: 5, stability: 7, sensitive: 6, action: 5, aesthetic: 3, independent: 3 }, // ポレフ
  '1_庚': { social: 4, stability: 5, sensitive: 3, action: 7, aesthetic: 3, independent: 9 }, // リンガー
  '1_辛': { social: 2, stability: 6, sensitive: 8, action: 3, aesthetic: 10, independent: 8 }, // オルガ
  '1_壬': { social: 6, stability: 2, sensitive: 6, action: 7, aesthetic: 4, independent: 8 }, // アデュー
  '1_癸': { social: 3, stability: 7, sensitive: 10, action: 2, aesthetic: 6, independent: 2 }, // ウォルター

  // ===== 二黒土星（大地の星）=====
  '2_甲': { social: 6, stability: 7, sensitive: 5, action: 5, aesthetic: 3, independent: 4 }, // ホーリー
  '2_乙': { social: 6, stability: 7, sensitive: 8, action: 3, aesthetic: 6, independent: 2 }, // エマ
  '2_丙': { social: 7, stability: 6, sensitive: 4, action: 7, aesthetic: 3, independent: 4 }, // プーミー
  '2_丁': { social: 2, stability: 9, sensitive: 8, action: 3, aesthetic: 6, independent: 2 }, // コトン
  '2_戊': { social: 4, stability: 10, sensitive: 5, action: 2, aesthetic: 3, independent: 6 }, // タンタン
  '2_己': { social: 4, stability: 9, sensitive: 5, action: 2, aesthetic: 3, independent: 3 }, // ゴルトン
  '2_庚': { social: 5, stability: 6, sensitive: 4, action: 7, aesthetic: 3, independent: 8 }, // ダルリ
  '2_辛': { social: 2, stability: 7, sensitive: 9, action: 3, aesthetic: 9, independent: 5 }, // ポポ
  '2_壬': { social: 4, stability: 6, sensitive: 6, action: 4, aesthetic: 3, independent: 6 }, // イース
  '2_癸': { social: 3, stability: 8, sensitive: 10, action: 2, aesthetic: 5, independent: 2 }, // アリアナ

  // ===== 三碧木星（雷の星）=====
  '3_甲': { social: 6, stability: 2, sensitive: 2, action: 10, aesthetic: 2, independent: 9 }, // テント
  '3_乙': { social: 9, stability: 2, sensitive: 4, action: 7, aesthetic: 4, independent: 5 }, // オリー
  '3_丙': { social: 9, stability: 2, sensitive: 4, action: 9, aesthetic: 5, independent: 7 }, // レミー
  '3_丁': { social: 3, stability: 4, sensitive: 9, action: 5, aesthetic: 10, independent: 8 }, // ジャスパー
  '3_戊': { social: 5, stability: 4, sensitive: 4, action: 9, aesthetic: 2, independent: 10 }, // ムーチョ
  '3_己': { social: 6, stability: 5, sensitive: 5, action: 7, aesthetic: 4, independent: 5 }, // シケダ
  '3_庚': { social: 5, stability: 2, sensitive: 5, action: 9, aesthetic: 3, independent: 9 }, // マルファン
  '3_辛': { social: 4, stability: 4, sensitive: 7, action: 6, aesthetic: 9, independent: 7 }, // リンク
  '3_壬': { social: 6, stability: 1, sensitive: 3, action: 10, aesthetic: 2, independent: 10 }, // バン
  '3_癸': { social: 4, stability: 5, sensitive: 9, action: 4, aesthetic: 5, independent: 4 }, // ユルグ

  // ===== 四緑木星（風の星）=====
  '4_甲': { social: 7, stability: 6, sensitive: 5, action: 6, aesthetic: 4, independent: 6 }, // ペイジー
  '4_乙': { social: 10, stability: 5, sensitive: 8, action: 5, aesthetic: 4, independent: 2 }, // ナーム
  '4_丙': { social: 10, stability: 3, sensitive: 5, action: 8, aesthetic: 5, independent: 6 }, // サーシャ
  '4_丁': { social: 5, stability: 6, sensitive: 8, action: 3, aesthetic: 8, independent: 5 }, // アントニー
  '4_戊': { social: 5, stability: 8, sensitive: 4, action: 3, aesthetic: 3, independent: 6 }, // クラウディア
  '4_己': { social: 6, stability: 6, sensitive: 5, action: 5, aesthetic: 3, independent: 3 }, // ピット
  '4_庚': { social: 6, stability: 3, sensitive: 5, action: 8, aesthetic: 3, independent: 8 }, // ジャイロ
  '4_辛': { social: 7, stability: 5, sensitive: 6, action: 5, aesthetic: 9, independent: 6 }, // ペスカ
  '4_壬': { social: 8, stability: 2, sensitive: 3, action: 7, aesthetic: 3, independent: 7 }, // シーグル
  '4_癸': { social: 5, stability: 7, sensitive: 10, action: 3, aesthetic: 4, independent: 2 }, // カカオ

  // ===== 五黄土星（帝の星）=====
  '5_甲': { social: 5, stability: 4, sensitive: 3, action: 9, aesthetic: 3, independent: 10 }, // ファンタ
  '5_乙': { social: 4, stability: 7, sensitive: 5, action: 4, aesthetic: 4, independent: 8 }, // ヴァーナ
  '5_丙': { social: 7, stability: 2, sensitive: 3, action: 9, aesthetic: 4, independent: 10 }, // ソラリ
  '5_丁': { social: 2, stability: 5, sensitive: 9, action: 3, aesthetic: 7, independent: 9 }, // シスコ
  '5_戊': { social: 3, stability: 10, sensitive: 4, action: 3, aesthetic: 3, independent: 10 }, // シャーロット
  '5_己': { social: 4, stability: 6, sensitive: 7, action: 4, aesthetic: 4, independent: 6 }, // ロジャー
  '5_庚': { social: 4, stability: 5, sensitive: 2, action: 9, aesthetic: 2, independent: 10 }, // ドミノ
  '5_辛': { social: 2, stability: 5, sensitive: 8, action: 3, aesthetic: 10, independent: 9 }, // チップス
  '5_壬': { social: 4, stability: 1, sensitive: 4, action: 10, aesthetic: 2, independent: 10 }, // ペトン
  '5_癸': { social: 3, stability: 7, sensitive: 10, action: 3, aesthetic: 5, independent: 5 }, // アーナンダ

  // ===== 六白金星（天の星）=====
  '6_甲': { social: 4, stability: 7, sensitive: 6, action: 6, aesthetic: 5, independent: 8 }, // モーリス
  '6_乙': { social: 6, stability: 6, sensitive: 7, action: 5, aesthetic: 8, independent: 6 }, // カーラ
  '6_丙': { social: 6, stability: 4, sensitive: 3, action: 8, aesthetic: 4, independent: 9 }, // アデル
  '6_丁': { social: 2, stability: 6, sensitive: 7, action: 3, aesthetic: 7, independent: 10 }, // メルシー
  '6_戊': { social: 3, stability: 10, sensitive: 3, action: 3, aesthetic: 5, independent: 9 }, // ドンナ
  '6_己': { social: 4, stability: 7, sensitive: 5, action: 5, aesthetic: 6, independent: 6 }, // エイド
  '6_庚': { social: 3, stability: 5, sensitive: 2, action: 9, aesthetic: 3, independent: 10 }, // アイマン
  '6_辛': { social: 2, stability: 6, sensitive: 8, action: 3, aesthetic: 10, independent: 8 }, // ベロア
  '6_壬': { social: 6, stability: 3, sensitive: 4, action: 7, aesthetic: 3, independent: 7 }, // ワッチ
  '6_癸': { social: 2, stability: 7, sensitive: 9, action: 2, aesthetic: 7, independent: 6 }, // ダンテ

  // ===== 七赤金星（果実の星）=====
  '7_甲': { social: 7, stability: 4, sensitive: 4, action: 6, aesthetic: 4, independent: 5 }, // パット
  '7_乙': { social: 9, stability: 4, sensitive: 6, action: 5, aesthetic: 4, independent: 3 }, // チャーリー
  '7_丙': { social: 9, stability: 3, sensitive: 4, action: 7, aesthetic: 6, independent: 6 }, // ミラ
  '7_丁': { social: 3, stability: 5, sensitive: 9, action: 3, aesthetic: 10, independent: 7 }, // ステファニー
  '7_戊': { social: 5, stability: 8, sensitive: 4, action: 4, aesthetic: 5, independent: 5 }, // クッキー
  '7_己': { social: 6, stability: 6, sensitive: 5, action: 5, aesthetic: 5, independent: 3 }, // グミー
  '7_庚': { social: 7, stability: 4, sensitive: 3, action: 7, aesthetic: 3, independent: 8 }, // リック
  '7_辛': { social: 4, stability: 5, sensitive: 7, action: 4, aesthetic: 10, independent: 7 }, // マーガレット
  '7_壬': { social: 8, stability: 2, sensitive: 3, action: 7, aesthetic: 4, independent: 7 }, // ペインター
  '7_癸': { social: 4, stability: 7, sensitive: 9, action: 3, aesthetic: 5, independent: 3 }, // イーリア

  // ===== 八白土星（山の星）=====
  '8_甲': { social: 5, stability: 6, sensitive: 5, action: 8, aesthetic: 3, independent: 8 }, // ボタゴン
  '8_乙': { social: 5, stability: 6, sensitive: 6, action: 5, aesthetic: 5, independent: 5 }, // ミスト
  '8_丙': { social: 6, stability: 3, sensitive: 4, action: 8, aesthetic: 4, independent: 8 }, // ブランドン
  '8_丁': { social: 3, stability: 7, sensitive: 6, action: 3, aesthetic: 5, independent: 6 }, // グーニー
  '8_戊': { social: 3, stability: 10, sensitive: 4, action: 2, aesthetic: 3, independent: 7 }, // フラッフィー
  '8_己': { social: 5, stability: 7, sensitive: 5, action: 5, aesthetic: 4, independent: 5 }, // ウォル
  '8_庚': { social: 4, stability: 5, sensitive: 4, action: 8, aesthetic: 3, independent: 9 }, // グレース
  '8_辛': { social: 2, stability: 7, sensitive: 8, action: 3, aesthetic: 9, independent: 7 }, // メイソン
  '8_壬': { social: 4, stability: 5, sensitive: 5, action: 5, aesthetic: 3, independent: 6 }, // タジー
  '8_癸': { social: 3, stability: 7, sensitive: 9, action: 2, aesthetic: 5, independent: 4 }, // ポコ

  // ===== 九紫火星（火の星）=====
  '9_甲': { social: 6, stability: 5, sensitive: 5, action: 6, aesthetic: 5, independent: 6 }, // ヴェロニカ
  '9_乙': { social: 7, stability: 4, sensitive: 6, action: 5, aesthetic: 8, independent: 5 }, // エレフ
  '9_丙': { social: 7, stability: 2, sensitive: 3, action: 9, aesthetic: 5, independent: 9 }, // フィオナ
  '9_丁': { social: 2, stability: 5, sensitive: 10, action: 3, aesthetic: 8, independent: 9 }, // ニコール
  '9_戊': { social: 5, stability: 7, sensitive: 5, action: 5, aesthetic: 5, independent: 7 }, // バルモア
  '9_己': { social: 5, stability: 5, sensitive: 5, action: 6, aesthetic: 8, independent: 5 }, // シーザー
  '9_庚': { social: 4, stability: 3, sensitive: 4, action: 8, aesthetic: 5, independent: 8 }, // ピッカ
  '9_辛': { social: 2, stability: 5, sensitive: 8, action: 3, aesthetic: 10, independent: 8 }, // ステラ
  '9_壬': { social: 6, stability: 2, sensitive: 4, action: 8, aesthetic: 4, independent: 8 }, // ミンク
  '9_癸': { social: 3, stability: 6, sensitive: 10, action: 3, aesthetic: 7, independent: 4 }, // ウーパ
};

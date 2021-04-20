import { useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  DirectionalLight,
  MeshPhongMaterial,
  TextureLoader,
  DoubleSide,
  SphereGeometry,
  MathUtils,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  Vector3,
} from 'three'
import OrbitControls from 'three-orbitcontrols'

export default function Home() {
  useEffect( () => {
    // ページの読み込みを待つ
    window.addEventListener('load', init)
  })
  
  function init() {
    // サイズを指定
    const width = 960;
    const height = 540;
    let rot = 0; // 角度
    let mouseX = 0; // マウス座標
    
    // レンダラーを作成
    const renderer = new WebGLRenderer({
      canvas: document.querySelector('#myCanvas'),
    });
    renderer.setSize(width, height);
    
    // シーンを作成
    const scene = new Scene();
    
    // カメラを作成
    const camera = new PerspectiveCamera(45, width / height);
    
    // 平行光源を作成
    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // マテリアルを作成
    const material = new MeshPhongMaterial({
      map: new TextureLoader().load('earthmap1k.jpg'),
      side: DoubleSide,
    });
    
    // 球体の形状を作成します
    const geometry = new SphereGeometry(300, 30, 30);
    // 形状とマテリアルからメッシュを作成します
    const earthMesh = new Mesh(geometry, material);
    // シーンにメッシュを追加します
    scene.add(earthMesh);
    
    // 星屑を作成します (カメラの動きをわかりやすくするため)
    createStarField();
    
    /** 星屑を作成します */
    function createStarField() {
      // 頂点情報を格納する配列
      const vertices = [];
      // 1000 個の頂点を作成
      for (let i = 0; i < 1000; i++) {
        const x = MathUtils.randFloatSpread(
          3000 * (Math.random() - 0.5)
        );
        const y = MathUtils.randFloatSpread(
          3000 * (Math.random() - 0.5)
        );
        const z = MathUtils.randFloatSpread(
          3000 * (Math.random() - 0.5)
        );
        
        vertices.push(x, y, z);
      }
      
      // 形状データを作成
      const geometry = new BufferGeometry();
      geometry.setAttribute(
        'position',
        new Float32BufferAttribute(vertices, 3)
      );
      
      // マテリアルを作成
      const material = new PointsMaterial({
        size: 10,
        color: 0xffffff,
      });
      
      // 物体を作成
      const mesh = new Points(geometry, material);
      scene.add(mesh);
    }
    
    // マウス座標はマウスが動いた時のみ取得できる
    document.addEventListener('mousemove', (event) => {
      mouseX = event.pageX;
    });
    
    tick();
    
    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // マウスの位置に応じて角度を設定
      // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
      const targetRot = (mouseX / window.innerWidth) * 360;
      // イージングの公式を用いて滑らかにする
      // 値 += (目標値 - 現在の値) * 減速値
      rot += (targetRot - rot) * 0.02;
      
      // ラジアンに変換する
      const radian = (rot * Math.PI) / 180;
      // 角度に応じてカメラの位置を設定
      camera.position.x = 1000 * Math.sin(radian);
      camera.position.z = 1000 * Math.cos(radian);
      // 原点方向を見つめる
      camera.lookAt(new Vector3(0, 0, 0));
      // 地球は常に回転させておく
      earthMesh.rotation.y += 0.01;
      
      // レンダリング
      renderer.render(scene, camera);
      
      requestAnimationFrame(tick);
    }
  }
  return (
    <canvas id="myCanvas" />
  )
}

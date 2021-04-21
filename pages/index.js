import { useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  DirectionalLight,
  MeshPhongMaterial,
  TextureLoader,
  SphereGeometry,
  MathUtils,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
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
    
    const canvasElement = document.querySelector('#myCanvas')
    // レンダラーを作成
    const renderer = new WebGLRenderer({
      canvas: canvasElement,
    });
    renderer.setSize(width, height);
    
    // シーンを作成
    const scene = new Scene();
    
    // カメラを作成
    const camera = new PerspectiveCamera(45, width / height);
    // カメラの初期座標を設定
    camera.position.set(0, 0, 1000)
  
    // カメラコントローラーを作成
    const controls = new OrbitControls(camera, canvasElement)
  
    // 滑らかにカメラコントローラーを制御する
    controls.enableDamping = true
    controls.dampingFactor = 0.2
    
    // 平行光源を作成
    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // マテリアルを作成
    const material = new MeshPhongMaterial({
      map: new TextureLoader().load('earthmap1k.jpg'),
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
    
    tick();
    
    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // 地球は常に回転させておく
      earthMesh.rotation.y += 0.00001
  
      // カメラコントローラーを更新
      controls.update()
      
      // レンダリング
      renderer.render(scene, camera);
      
      requestAnimationFrame(tick);
    }
  }
  return (
    <canvas id="myCanvas" />
  )
}

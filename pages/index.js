import { useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  TorusGeometry,
  MeshNormalMaterial,
} from 'three'

export default function Home() {
  useEffect( () => {
    // ページの読み込みを待つ
    window.addEventListener('load', init)
  })
  
  function init() {
    // サイズを指定
    const width = 960
    const height = 540
    // レンダラーを作成
    const renderer = new WebGLRenderer({
      canvas: document.querySelector('#myCanvas'),
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    
    // シーンを作成
    const scene = new Scene()
    
    // カメラを作成
    const camera = new PerspectiveCamera(45, width / height)
    camera.position.set(0, 0, +1000)
  
    // ドーナツを作成
    const geometry = new TorusGeometry(300, 100, 64, 100)
    // マテリアルを作成
    const material = new MeshNormalMaterial()
    // メッシュを作成
    const mesh = new Mesh(geometry, material)
    // 3D空間にメッシュを追加
    scene.add(mesh)
    
    tick();
    
    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // メッシュを回転させる
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.01
      
      // レンダリング
      renderer.render(scene, camera)
      
      requestAnimationFrame(tick)
    }
  }
  return (
    <canvas id="myCanvas" />
  )
}

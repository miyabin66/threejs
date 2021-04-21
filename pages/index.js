import { useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  TorusGeometry,
  MeshLambertMaterial,
  DirectionalLight,
  PointLight,
  PointLightHelper,
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
    const material = new MeshLambertMaterial({ color: 0x6699ff })
    // メッシュを作成
    const mesh = new Mesh(geometry, material)
    // 3D空間にメッシュを追加
    scene.add(mesh)
  
    // 平行光源
    const directionalLight = new DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
  
    // ポイント光源
    const pointLight = new PointLight(0xffffff, 2, 1000)
    scene.add(pointLight)
    const pointLightHelper = new PointLightHelper(pointLight, 30)
    scene.add(pointLightHelper)
    
    tick()
    
    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // メッシュを回転させる
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.01
  
      // ライトを周回させる
      pointLight.position.set(
        500 * Math.sin(Date.now() / 500),
        500 * Math.sin(Date.now() / 1000),
        500 * Math.cos(Date.now() / 500)
      )
      
      // レンダリング
      renderer.render(scene, camera)
      
      requestAnimationFrame(tick)
    }
  }
  return (
    <canvas id="myCanvas" />
  )
}

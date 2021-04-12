import { useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight,
  Vector3,
  Object3D,
  DoubleSide,
  AmbientLight,
  BoxGeometry,
  PlaneGeometry,
  TetrahedronGeometry,
  ConeGeometry,
  CylinderGeometry,
  TorusGeometry
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
      canvas: document.querySelector('#myCanvas')
    })
    renderer.setSize(width, height)

    // シーンを作成
    const scene = new Scene()

    // カメラを作成
    const camera = new PerspectiveCamera(45, width / height)
    camera.position.set(0, 500, +1000)
    camera.lookAt(new Vector3(0, 0, 0))
    
    const container = new Object3D()
    scene.add(container)
  
    // マテリアルを作成
    const material = new MeshStandardMaterial({
      color: 0xff0000,
      side: DoubleSide
    })
  
    // 平行光源を作成
    const directionalLight = new DirectionalLight(0xFFFFFF)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
    // 環境光を作成
    const ambientLight = new AmbientLight(0x999999)
    scene.add(ambientLight)
  
    // ジオメトリを作成
    const geometryList = [
      new SphereGeometry(50), // 球体
      new BoxGeometry(100, 100, 100), // 直方体
      new PlaneGeometry(100, 100), // 平面
      new TetrahedronGeometry(100, 0), // カプセル形状
      new ConeGeometry(100, 100, 32), // 三角錐
      new CylinderGeometry(50, 50, 100, 32), // 円柱
      new TorusGeometry(50, 30, 16, 100) // ドーナツ形状
    ]
    
    geometryList.map((geometry, index) => {
      // 形状とマテリアルからメッシュを作成します
      const mesh = new Mesh(geometry, material)
  
      // 3D表示インスタンスのsceneプロパティーが3D表示空間となります
      container.add(mesh)
  
      // 円周上に配置
      mesh.position.x = 400 * Math.sin((index / geometryList.length) * Math.PI * 2)
      mesh.position.z = 400 * Math.cos((index / geometryList.length) * Math.PI * 2)
    })

    tick()

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      container.rotation.y += 0.01
      // レンダリング
      renderer.render(scene, camera)

      requestAnimationFrame(tick)
    }
  }
  return (
    <canvas id="myCanvas" />
  )
}

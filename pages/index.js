import { useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxGeometry,
  MeshNormalMaterial
} from 'three'
import OrbitControls from 'three-orbitcontrols'

export default function Home() {
  useEffect( () => {
    // ページの読み込みを待つ
    window.addEventListener('load', init)
  })

  function init() {

    // サイズを指定
    const width = 960
    const height = 540
    
    const canvas = document.querySelector('#myCanvas')

    // レンダラーを作成
    const renderer = new WebGLRenderer({
      canvas: document.querySelector('#myCanvas')
    })
    renderer.setSize(width, height)

    // シーンを作成
    const scene = new Scene()

    // カメラを作成
    const camera = new PerspectiveCamera(45, width / height)
    camera.position.set(0, 0, 1000)
  
    // カメラコントローラーを作成
    const controls = new OrbitControls(camera, canvas)
  
    // 形状とマテリアルからメッシュを作成します
    const mesh = new Mesh(
      new BoxGeometry(300, 300, 300),
      new MeshNormalMaterial()
    )
    scene.add(mesh)

    tick()

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
  }
  return (
    <canvas id="myCanvas" />
  )
}

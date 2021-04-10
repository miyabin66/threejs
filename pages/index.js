import { useEffect } from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshNormalMaterial, Mesh } from 'three'

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
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    // シーンを作成
    const scene = new Scene()

    // カメラを作成
    const camera = new PerspectiveCamera(45, width / height)
    camera.position.set(0, 0, +1000)

    // 箱を作成
    const geometry = new BoxGeometry(400, 400, 400)
    const material = new MeshNormalMaterial()
    const box = new Mesh(geometry, material)
    scene.add(box)

    tick()

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      box.rotation.y += 0.01
      renderer.render(scene, camera) // レンダリング

      requestAnimationFrame(tick)
    }
  }
  return (
    <canvas id="myCanvas"></canvas>
  )
}

import { useEffect } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight,
  TextureLoader
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
    camera.position.set(0, 0, +1000)

    // 球体を作成
    const geometry = new SphereGeometry(300, 30, 30)
    // 画像を読み込む
    const loader = new TextureLoader()
    const texture = loader.load('/earthmap1k.jpg')
    // マテリアルにテクスチャーを設定
    const material = new MeshStandardMaterial({
      map: texture
    })
    // メッシュを作成
    const mesh = new Mesh(geometry, material)
    // 3D空間にメッシュを追加
    scene.add(mesh)

    // 平行光源
    const directionalLight = new DirectionalLight(0xFFFFFF)
    directionalLight.position.set(1, 1, 1)
    // シーンに追加
    scene.add(directionalLight)

    tick()

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      mesh.rotation.y += 0.01
      // レンダリング
      renderer.render(scene, camera)

      requestAnimationFrame(tick)
    }
  }
  return (
    <canvas id="myCanvas"></canvas>
  )
}

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
  TextureLoader,
  DoubleSide,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points
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
    let rot = 0

    // レンダラーを作成
    const renderer = new WebGLRenderer({
      canvas: document.querySelector('#myCanvas')
    })
    renderer.setSize(width, height)

    // シーンを作成
    const scene = new Scene()

    // カメラを作成
    const camera = new PerspectiveCamera(45, width / height)
    
    const directionalLight = new DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)
  
    // マテリアルを作成
    const material = new MeshStandardMaterial({
      map: new TextureLoader().load('/earthmap1k.jpg'),
      side: DoubleSide
    })
  
    // 球体の形状を作成します
    const geometry = new SphereGeometry(300, 30, 30)
    // 形状とマテリアルからメッシュを作成します
    const earthMesh = new Mesh(geometry, material)
    // シーンにメッシュを追加します
    scene.add(earthMesh)
  
    // 星屑を作成します (カメラの動きをわかりやすくするため)
    createStarField()
    
    function createStarField() {
      // 形状データを作成
      const geometry = new BufferGeometry()
      const vertices = []
      for (let i = 0; i < 1000; i++) {
        vertices.push(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5)
        )
      }
      geometry.setAttribute( 'position', new BufferAttribute( new Float32Array(vertices), 3 ) )
      
      // マテリアルを作成
      const material = new PointsMaterial({
        size: 10,
        color: 0xffffff
      })
  
      // 物体を作成
      const mesh = new Points(geometry, material)
      scene.add(mesh)
    }

    tick()

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      rot += 0.5  // 毎フレーム角度を0.5度ずつ足していく
      // ラジアンに変換する
      const radian = (rot * Math.PI) / 180
      // 角度に応じてカメラの位置を設定
      camera.position.x = 1000 * Math.sin(radian)
      camera.position.z = 1000 * Math.cos(radian)
      // 原点方向を見つめる
      camera.lookAt(new Vector3(0, 0, 0))
      
      // レンダリング
      renderer.render(scene, camera)

      requestAnimationFrame(tick)
    }
  }
  return (
    <canvas id="myCanvas" />
  )
}

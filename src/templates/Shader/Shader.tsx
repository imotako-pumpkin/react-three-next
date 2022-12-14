// @ts-nocheck
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import * as THREE from 'three'

import fragment from './glsl/shader.frag'
import vertex from './glsl/shader.vert'

const ShaderImpl = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
  },
  vertex,
  fragment,
)

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
ShaderImpl.key = THREE.MathUtils.generateUUID()

extend({ ShaderImpl })

// eslint-disable-next-line react/display-name
const Shader = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  useFrame((_, delta) => (localRef.current.time += delta))
  return (
    <shaderImpl ref={mergeRefs([localRef, ref])} glsl={THREE.GLSL3} key={ShaderImpl.key} {...props} attach='material' />
  )
})

export default Shader

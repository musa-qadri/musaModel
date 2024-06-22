"use client"

import * as THREE from 'three';
import { Suspense, useRef , useState ,useEffect} from 'react'
import { Canvas  ,extend, useFrame , useThree} from '@react-three/fiber'
import {OrbitControls , useGLTF , PerspectiveCamera , OrthographicCamera ,   } from '@react-three/drei'
import { gsap  } from 'gsap';
import { Grid } from '@mui/material';


import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { ShaderMaterial } from 'three';



// import Navbar from '@/components/navbar';




function Model(props) {
 const ref = useRef(null);
 useFrame(({clock}) =>(ref.current.uTime = clock.getElapsedTime)) 
 
  useEffect(() => {
    console.log('Default position:', groupRef.current.position);
  }, []);

  const { nodes } = useGLTF('/lopoly_dna.gltf')

  const groupRef = useRef(); // Create a reference for the group
  
  useFrame(() => {
   if (groupRef.current) {
       // Rotation ko -0.004 se lekar 0.004 ke beech mein rakhein
       if (groupRef.current.rotation.y > -1 || groupRef.current.rotation.y < -0.004) {
        groupRef.current.rotation.x += 0.03;
        // groupRef.current.rotation.y -= 0.04;
      }
 
      const fixedPosition = new THREE.Vector3(0, 0, 0); 
  // Fixed position set kiya gaya hai (x, y, z)
    groupRef.current.position.copy(fixedPosition); // Model ki position ko fixed position par set kiya gaya hai
  
  // groupRef.current.rotation.z = 0;
    }
   });

   
   const customShader = new ShaderMaterial({
    uniforms: {
      uTime: { value: 1 }, // Initial value can be set here
      color2: { value: new THREE.Color('#FFFFFF') },
      color1: { value: new THREE.Color('#FFA500') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision mediump float;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(sin(vUv.y + uTime) * mix(color1, color2, vUv.y), 1.5);
      }
    `,
  
 
      });
      // Update material on mount
      useEffect(() => {      // Check if the material exists and then update it
        if (nodes && nodes.DNA3 && nodes.DNA3.material) {
          nodes.DNA3.material = customShader; // Use custom shader material
        }
      }, [  nodes  ,   customShader]);

  return (
    
  
    <group {...props} dispose={null} >
    <group ref={groupRef}  />
    <group ref={groupRef} {...props}  dispose={null}>
      <group scale={0.01}  ref={ref} > 
        <group position={[0, 0,0]} rotation={[0, 0, 0]} scale={15} >
          <mesh geometry={nodes.DNA3.geometry}  material={customShader} >
         
            <group position={[0 , 0, 0]} rotation={[0, 0, 0]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL.geometry} material={nodes.Sphere_CTRL.material} scale={0.7} />
            </group>
            <group position={[ 0,0,0]} rotation={[0, 0, 0]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_1.geometry} material={nodes.Sphere_CTRL_1.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[0, 0, 0]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_2.geometry} material={nodes.Sphere_CTRL_2.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[0, 0, 0.436]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_3.geometry} material={nodes.Sphere_CTRL_3.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[0, 0, 0]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_4.geometry} material={nodes.Sphere_CTRL_4.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[0, 0, 0.436]} scale={0}>
              <mesh  geometry={nodes.Sphere_CTRL_5.geometry} material={nodes.Sphere_CTRL_5.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[1, 1, 0]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_6.geometry} material={nodes.Sphere_CTRL_6.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[1, 1, 0]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_7.geometry} material={nodes.Sphere_CTRL_7.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[1, 1, 0.436]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_8.geometry} material={nodes.Sphere_CTRL_8.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[1, 1, 10]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_9.geometry} material={nodes.Sphere_CTRL_9.material} scale={0.7} />
            </group>
            <group position={[0,0,0]} rotation={[1, 1, 10]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_10.geometry} material={nodes.Sphere_CTRL_10.material} scale={0.7} />
            </group>
            <group position={[0, 0, 2.401]} rotation={[1, 1, 0]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_11.geometry} material={nodes.Sphere_CTRL_11.material} scale={0.7} />
            </group>
            <group position={[0, 2.552, 0]} rotation={[1, 1, 0]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_12.geometry} material={nodes.Sphere_CTRL_12.material} scale={0.7} />
            </group>
            <group position={[0, 1.939, 0]} rotation ={[0,0,1]} scale={0}>
              <mesh geometry={nodes.Sphere_CTRL_13.geometry} material={nodes.Sphere_CTRL_13.material}  scale={0.7} />
            </group>
          </mesh>
          <mesh geometry={nodes.Cube.geometry} material={nodes}   />
                    
        </group>
        <PerspectiveCamera makeDefault={false} far={100000} near={70} fov={5} position={[0, 20, 513.86]} rotation={[-0.03, 0.023, 0.001]} />
        {/* <OrthographicCamera makeDefault={false} far={100000} near={0} position={[-965.593, -1742.45, 188.687]} rotation={[1.569, -0.629, 1.568 + Math.PI * (280 / 180)]} /> */}

        <OrthographicCamera makeDefault={false} far={100000} near={0} position={[-965.593, -1742.45, 188.687]} rotation = {[1.569, -0.629, 1.568]} />
      </group>
    </group>
    </group>
    
  )
}


function Appp() {
 
  const imgref = useRef(null);

  useEffect(() =>{
    const el = imgref.current ;
gsap.fromTo(el,{rotation: 0},{rotation: 90,   
  scrollTrigger:{
 trigger : el,
 start: 'top center ',
 end: 'bottom  center',
 duration : 6 ,
 markers:false ,
 scrub : true,
 toggleActions : 'play , none , none , reverse '
}})

  } , [])
   
 
 
  
  return (
   
     


<div className=''>
<Grid container justifyContent="start">
<Grid item xs={12} md={4}> {/* Adjust the column width as per your requirement */}


        {/* MODEL */}

        <Canvas
    ref={imgref}
    
    style={{ width: '100vw', height: '110vh' ,
   minHeight : '10vh' }} // Adjust as per your requirements
    >
         <OrbitControls
          // autoRotate // Auto-rotate on
          autoRotateSpeed={7} // Auto-rotate speed
          enableZoom={false} // Disable zoom
          enablePan={true} // Disable pan
          // enableRotate={true} // Disable manual rotation
          target={[ 0 , 0 , 0]} // Target position
    
        />
            
         <Suspense fallback = {null}>
        
        {/* <ambientLight intensity={1.2}/> */}
        <directionalLight position={[1, 1, 1]} intensity={0.2} />
        <spotLight position={[1, 1,1]} angle={35} penumbra={10} />


          {/* <pointLight position={[10, 10,10]} />  */}
                 <mesh >
                <Model  />
                  </mesh>  


        
         </Suspense>
          </Canvas>
          </Grid>
  </Grid>
          
          
    </div>
  
    
   
    );
  }

  export default Appp;
"""
AeroSentinal — Programmatic 3D Aircraft Model Generator
=======================================================
Generates a lightweight .glb file containing the necessary anatomical
groups required by the AeroSentinal frontend.

Groups:
- fuselage_skin (Main body, which will be clipped)
- zone_engine (Engines on wings)
- zone_hydraulics (Hydraulic lines/reservoirs)
- zone_landing_gear (Wheels)
- zone_apu (Tail cone APU)
- zone_ecs (Air packs along belly/spine)
"""

import trimesh
import numpy as np

def create_model():
    scene = trimesh.Scene()
    
    # --- Fuselage (Cylinder) ---
    fuselage = trimesh.creation.cylinder(radius=2.0, height=20.0)
    # Rotate to lie along Z axis
    fuselage.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [1, 0, 0]))
    scene.add_geometry(fuselage, node_name="fuselage_skin")
    
    # Wings (Boxes)
    wings = trimesh.creation.box(extents=[16.0, 0.5, 4.0])
    wings.apply_translation([0, -0.5, 2.0])
    scene.add_geometry(wings, node_name="fuselage_wings")
    
    # --- Engine (Cylinders on wings) ---
    engine_geom = trimesh.creation.cylinder(radius=1.0, height=3.0)
    engine_geom.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [1, 0, 0]))
    engine_l = engine_geom.copy()
    engine_l.apply_translation([-4.0, -1.0, 3.0])
    
    engine_r = engine_geom.copy()
    engine_r.apply_translation([4.0, -1.0, 3.0])
    
    # Merge engines to a single mesh for the zone
    engine_mesh = trimesh.util.concatenate([engine_l, engine_r])
    scene.add_geometry(engine_mesh, node_name="zone_engine")
    
    # --- Landing Gear (Spheres/Boxes) ---
    gear_geom = trimesh.creation.box(extents=[0.8, 2.0, 0.8])
    gear_l = gear_geom.copy()
    gear_l.apply_translation([-2.0, -2.5, 3.0])
    
    gear_r = gear_geom.copy()
    gear_r.apply_translation([2.0, -2.5, 3.0])
    
    gear_nose = gear_geom.copy()
    gear_nose.apply_translation([0.0, -2.5, -7.0])
    
    lg_mesh = trimesh.util.concatenate([gear_l, gear_r, gear_nose])
    scene.add_geometry(lg_mesh, node_name="zone_landing_gear")
    
    # --- APU (Cone/Box at tail) ---
    apu_mesh = trimesh.creation.cone(radius=0.8, height=2.0)
    apu_mesh.apply_transform(trimesh.transformations.rotation_matrix(np.pi/2, [1, 0, 0]))
    apu_mesh.apply_translation([0, 0, 10.5])
    scene.add_geometry(apu_mesh, node_name="zone_apu")
    
    # --- ECS (Packs on belly) ---
    ecs_mesh = trimesh.creation.box(extents=[1.5, 0.5, 4.0])
    ecs_mesh.apply_translation([0, -1.8, 0.0])
    scene.add_geometry(ecs_mesh, node_name="zone_ecs")
    
    # --- Hydraulics (Pipes/Manifolds near gear bays) ---
    hyd_mesh = trimesh.creation.box(extents=[6.0, 0.2, 0.2])
    hyd_mesh.apply_translation([0, -1.5, 2.5])
    scene.add_geometry(hyd_mesh, node_name="zone_hydraulics")

    # Export to frontend public directory
    output_path = "frontend/public/aircraft.glb"
    scene.export(output_path)
    print(f"Exported 3D model to {output_path}")

if __name__ == "__main__":
    create_model()

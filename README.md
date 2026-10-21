# Material Museum

A small Three.js scene for exploring 3D objects and materials. The museum includes a floor, pedestals, nine animated objects, and mouse-controlled orbit, pan, and zoom.

## Run the Project

The page loads Three.js as browser modules from a CDN, so open it through a local web server rather than directly from the file system. From the project directory, run:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000/materialMuseum.html](http://localhost:8000/materialMuseum.html) in a browser. An internet connection is required to load Three.js from the CDN.

## Controls

- Orbit: left mouse button and drag
- Pan: right mouse button and drag
- Zoom: scroll wheel

## Project Files

- `materialMuseum.html` contains the page, scene instructions, and import map.
- `materialMuseum.js` creates the Three.js scene, objects, materials, controls, and animation.

## Student Challenges

- Change the materials on the objects.
- Experiment with roughness and metalness.
- Create a gold trophy and an ice sculpture.
- Add your own object and a mystery object with a material of your choice.

The displayed objects currently use `MeshBasicMaterial`, which is unaffected by scene lighting and does not use roughness or metalness. To experiment with those properties, try `MeshStandardMaterial` or `MeshPhysicalMaterial` on an object.

## Questions:
### What material is currently used throughout the museum?
Basic material
### Why do the objects appear flat and similar?
They all use the same basic material [very basic]
### Which object looks the most realistic?
Probably the metal ball. It feels the most realistic in terms of reflection to a real light-source.
### Which object is the shiniest?
It's between the pyramid & sphere, though I lean towards sphere. Shinier & more reflective.
### Which object looks cartoon-like?
The cell-shaded cone as it has simple one-color shadows 
### Which object looks best for a natural scene?
Probably the tree as it has the most natural shading.
## Reflection:
### Which material looked the most realistic?
Either the metal ball or the pyramid. Especially the sphere, as it looks reflective & shiny like a real life metal.
### Which material looked the most cartoon-like?
The cell-shaded cone of course as the shading isn't as gradiant-y.
### Which material would you use for a metal robot?
MeshStandardMaterial with the proper metalness & roughness.
### How did adding the spotlight affect the scene?
It made the objects' reflections appear more realistic than before as there's visible changes in the lighting, especially for the shinier ones.
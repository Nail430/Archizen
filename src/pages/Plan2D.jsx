import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

const Editor = () => {
  const [activeTool, setActiveTool] = useState('wall');
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [tempWall, setTempWall] = useState(null);
  const [gridSize, setGridSize] = useState(1);
  const [zoom, setZoom] = useState(50);
  const [showGrid, setShowGrid] = useState(true);
  const [viewMode, setViewMode] = useState('2D'); // '2D' or '3D'
  const canvasRef = useRef();

  // Catalogue d'objets étendu
  const OBJECT_LIBRARY = [
    { id: 'chair', name: 'Chaise', type: 'furniture', icon: '🪑', size: [0.5, 0.5], shape: 'rectangle' },
    { id: 'table', name: 'Table', type: 'furniture', icon: '🪑', size: [1, 1], shape: 'rectangle' },
    { id: 'sofa', name: 'Canapé', type: 'furniture', icon: '🛋️', size: [1.8, 0.8], shape: 'rectangle' },
    { id: 'bed', name: 'Lit', type: 'furniture', icon: '🛏️', size: [2, 1.5], shape: 'rectangle' },
    { id: 'wardrobe', name: 'Armoire', type: 'furniture', icon: '🚪', size: [0.8, 0.6], shape: 'rectangle' },
    { id: 'desk', name: 'Bureau', type: 'furniture', icon: '🪑', size: [1.2, 0.6], shape: 'rectangle' },
    { id: 'fridge', name: 'Réfrigérateur', type: 'appliance', icon: '❄️', size: [0.7, 0.7], shape: 'rectangle' },
    { id: 'oven', name: 'Four', type: 'appliance', icon: '🔥', size: [0.6, 0.6], shape: 'rectangle' },
    { id: 'sink', name: 'Évier', type: 'appliance', icon: '🚰', size: [0.8, 0.5], shape: 'rectangle' },
    { id: 'door1', name: 'Porte simple', type: 'door', icon: '🚪', size: [0.8, 0.1], shape: 'arc' },
    { id: 'door2', name: 'Porte double', type: 'door', icon: '🚪', size: [1.6, 0.1], shape: 'arc' },
    { id: 'window1', name: 'Fenêtre simple', type: 'window', icon: '🪟', size: [1.2, 0.1], shape: 'rectangle' },
    { id: 'window2', name: 'Baie vitrée', type: 'window', icon: '🪟', size: [2.4, 0.1], shape: 'rectangle' },
    { id: 'plant1', name: 'Plante verte', type: 'decoration', icon: '🪴', size: [0.4, 0.4], shape: 'circle' },
    { id: 'plant2', name: 'Arbre', type: 'decoration', icon: '🌳', size: [0.6, 0.6], shape: 'circle' },
    { id: 'lamp', name: 'Lampe', type: 'decoration', icon: '💡', size: [0.3, 0.3], shape: 'circle' },
    { id: 'painting', name: 'Tableau', type: 'decoration', icon: '🖼️', size: [0.8, 0.6], shape: 'rectangle' },
    { id: 'bathtub', name: 'Baignoire', type: 'bathroom', icon: '🛁', size: [1.7, 0.7], shape: 'rectangle' },
    { id: 'toilet', name: 'Toilettes', type: 'bathroom', icon: '🚽', size: [0.7, 0.5], shape: 'rectangle' },
    { id: 'shower', name: 'Douche', type: 'bathroom', icon: '🚿', size: [0.9, 0.9], shape: 'rectangle' },
  ];

  // Outils disponibles
  const TOOLS = [
    { id: 'select', name: 'Sélection', icon: '↖️' },
    { id: 'wall', name: 'Mur', icon: '🧱' },
    { id: 'door', name: 'Porte', icon: '🚪' },
    { id: 'window', name: 'Fenêtre', icon: '🪟' },
    { id: 'furniture', name: 'Meuble', icon: '🛋️' },
    { id: 'appliance', name: 'Électroménager', icon: '❄️' },
    { id: 'bathroom', name: 'Salle de bain', icon: '🚽' },
    { id: 'decoration', name: 'Décoration', icon: '🖼️' },
    { id: 'delete', name: 'Supprimer', icon: '🗑️' },
  ];

  // Catégories d'objets
  const CATEGORIES = [
    { id: 'furniture', name: 'Meubles', icon: '🛋️' },
    { id: 'door', name: 'Portes', icon: '🚪' },
    { id: 'window', name: 'Fenêtres', icon: '🪟' },
    { id: 'appliance', name: 'Électroménager', icon: '❄️' },
    { id: 'bathroom', name: 'Salle de bain', icon: '🚽' },
    { id: 'decoration', name: 'Décoration', icon: '🖼️' },
  ];

  // Gestion du dessin de murs
  const handleCanvasClick = (e) => {
    const point = e.point;
    const snappedPoint = [
      Math.round(point.x / gridSize) * gridSize,
      0,
      Math.round(point.z / gridSize) * gridSize
    ];

    if (activeTool === 'wall') {
      if (!tempWall) {
        // Premier point du mur
        setTempWall({ start: snappedPoint, end: snappedPoint });
      } else {
        // Finaliser le mur
        const newWall = {
          id: `wall-${Date.now()}`,
          type: 'wall',
          start: tempWall.start,
          end: snappedPoint
        };
        setElements([...elements, newWall]);
        setTempWall(null);
      }
    } else if (CATEGORIES.map(cat => cat.id).includes(activeTool)) {
      // Ajouter un objet
      const objectType = activeTool;
      const template = OBJECT_LIBRARY.find(obj => obj.type === objectType);
      
      if (template) {
        const newObject = {
          id: `${objectType}-${Date.now()}`,
          type: objectType,
          shape: template.shape,
          position: snappedPoint,
          rotation: 0,
          size: template.size
        };
        setElements([...elements, newObject]);
      }
    } else if (activeTool === 'delete' && selectedElement) {
      // Supprimer l'élément sélectionné
      setElements(elements.filter(el => el.id !== selectedElement));
      setSelectedElement(null);
    }
  };

  // Gestion du mouvement de souris pour les murs temporaires
  const handleMouseMove = (e) => {
    if (tempWall && activeTool === 'wall') {
      const point = e.point;
      const snappedPoint = [
        Math.round(point.x / gridSize) * gridSize,
        0,
        Math.round(point.z / gridSize) * gridSize
      ];
      setTempWall({ ...tempWall, end: snappedPoint });
    }
  };

  // Rotation d'un objet
  const rotateSelectedObject = () => {
    if (!selectedElement) return;
    
    setElements(elements.map(el => {
      if (el.id === selectedElement && el.type !== 'wall') {
        return { ...el, rotation: (el.rotation + Math.PI/2) % (Math.PI * 2) };
      }
      return el;
    }));
  };

  // Rendu d'un mur
  const Wall = ({ start, end, isSelected }) => {
    return (
      <Line
        points={[new THREE.Vector3(...start), new THREE.Vector3(...end)]}
        color={isSelected ? '#4287f5' : '#333333'}
        lineWidth={8}
        dashed={false}
      />
    );
  };

  // Rendu d'une porte
  const Door = ({ position, rotation, isSelected }) => {
    return (
      <group position={position} rotation={[0, rotation, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.1, 0.1]} />
          <meshBasicMaterial color={isSelected ? '#FFD700' : '#8B4513'} />
        </mesh>
        <mesh position={[0.4, 0, 0]}>
          <circleGeometry args={[0.4, 16, 0, Math.PI/2]} />
          <meshBasicMaterial color={isSelected ? '#FFD700' : '#8B4513'} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  };

  // Rendu d'une fenêtre
  const Window = ({ position, rotation, isSelected }) => {
    return (
      <group position={position} rotation={[0, rotation, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.1, 0.1]} />
          <meshBasicMaterial color={isSelected ? '#FFD700' : '#87CEEB'} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.2, 0.02, 0.02]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.2, 0.02, 0.02]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
    );
  };

  // Rendu d'un meuble
  const Furniture = ({ position, size, isSelected, icon }) => {
    return (
      <group position={position}>
        <mesh>
          <boxGeometry args={[...size, 0.1]} />
          <meshBasicMaterial color={isSelected ? '#FFD700' : '#8B4513'} transparent opacity={0.8} />
        </mesh>
        {icon && (
          <Text
            position={[0, 0, 0.06]}
            fontSize={Math.min(...size) * 0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        )}
        {isSelected && (
          <mesh>
            <boxGeometry args={[size[0] + 0.1, size[1] + 0.1, 0.11]} />
            <meshBasicMaterial color="#FF0000" wireframe />
          </mesh>
        )}
      </group>
    );
  };

  // Rendu d'un appareil électroménager
  const Appliance = ({ position, size, isSelected, icon }) => {
    return (
      <group position={position}>
        <mesh>
          <boxGeometry args={[...size, 0.1]} />
          <meshBasicMaterial color={isSelected ? '#FFD700' : '#C0C0C0'} transparent opacity={0.8} />
        </mesh>
        {icon && (
          <Text
            position={[0, 0, 0.06]}
            fontSize={Math.min(...size) * 0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        )}
        {isSelected && (
          <mesh>
            <boxGeometry args={[size[0] + 0.1, size[1] + 0.1, 0.11]} />
            <meshBasicMaterial color="#FF0000" wireframe />
          </mesh>
        )}
      </group>
    );
  };

  // Rendu d'un élément de salle de bain
  const BathroomItem = ({ position, size, isSelected, icon }) => {
    return (
      <group position={position}>
        <mesh>
          <boxGeometry args={[...size, 0.1]} />
          <meshBasicMaterial color={isSelected ? '#FFD700' : '#87CEEB'} transparent opacity={0.8} />
        </mesh>
        {icon && (
          <Text
            position={[0, 0, 0.06]}
            fontSize={Math.min(...size) * 0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        )}
        {isSelected && (
          <mesh>
            <boxGeometry args={[size[0] + 0.1, size[1] + 0.1, 0.11]} />
            <meshBasicMaterial color="#FF0000" wireframe />
          </mesh>
        )}
      </group>
    );
  };

  // Rendu d'une décoration
  const Decoration = ({ position, size, isSelected, icon }) => {
    return (
      <group position={position}>
        <mesh>
          <boxGeometry args={[...size, 0.1]} />
          <meshBasicMaterial color={isSelected ? '#FFD700' : '#32CD32'} transparent opacity={0.8} />
        </mesh>
        {icon && (
          <Text
            position={[0, 0, 0.06]}
            fontSize={Math.min(...size) * 0.5}
            color="#000000"
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        )}
        {isSelected && (
          <mesh>
            <boxGeometry args={[size[0] + 0.1, size[1] + 0.1, 0.11]} />
            <meshBasicMaterial color="#FF0000" wireframe />
          </mesh>
        )}
      </group>
    );
  };

  // Rendu de la grille
  const Grid = () => {
    if (!showGrid) return null;
    
    const size = 20;
    const divisions = 20;
    const gridHelper = new THREE.GridHelper(size, divisions, '#CCCCCC', '#EEEEEE');
    
    return <primitive object={gridHelper} />;
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 font-sans">
      {/* Barre supérieure */}
      <div className="bg-white shadow-sm p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          <span className={`${viewMode === '2D' ? 'bg-blue-600' : 'bg-purple-600'} text-white rounded-lg px-3 py-1 mr-2`}>
            {viewMode}
          </span>
          Éditeur de Plan Architecte
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            className={`px-4 py-2 rounded-lg transition ${
              viewMode === '2D' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setViewMode('2D')}
          >
            Vue 2D
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition ${
              viewMode === '3D' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setViewMode('3D')}
          >
            Vue 3D
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Nouveau Projet
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Sauvegarder
          </button>
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Grille:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={showGrid}
                onChange={() => setShowGrid(!showGrid)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Barre d'outils à gauche */}
        <div className="w-16 bg-gray-800 text-white flex flex-col items-center py-4">
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              className={`w-12 h-12 flex items-center justify-center rounded-lg mb-4 text-2xl ${
                activeTool === tool.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTool(tool.id)}
              title={tool.name}
            >
              {tool.icon}
            </button>
          ))}
          
          <div className="mt-auto">
            <div className="text-center text-xs mb-2">Zoom</div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={zoom} 
              onChange={(e) => setZoom(parseInt(e.target.value))}
              className="w-full"
              orient="vertical"
            />
            <div className="text-center text-xs mt-2">{zoom}%</div>
          </div>
        </div>
        
        {/* Zone de dessin principale */}
        <div className="flex-1 relative bg-gray-100">
          <Canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onPointerMove={handleMouseMove}
            className="bg-white"
          >
            <OrthographicCamera
              makeDefault
              zoom={zoom}
              position={[0, 10, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <ambientLight intensity={0.5} />
            
            <Grid />
            
            {/* Rendu des éléments existants */}
            {elements.map(element => {
              const isSelected = selectedElement === element.id;
              const objectTemplate = OBJECT_LIBRARY.find(obj => obj.type === element.type);
              
              if (element.type === 'wall') {
                return (
                  <Wall 
                    key={element.id}
                    start={element.start}
                    end={element.end}
                    isSelected={isSelected}
                  />
                );
              }
              
              if (element.type === 'door') {
                return (
                  <Door 
                    key={element.id}
                    position={element.position}
                    rotation={element.rotation}
                    isSelected={isSelected}
                  />
                );
              }
              
              if (element.type === 'window') {
                return (
                  <Window 
                    key={element.id}
                    position={element.position}
                    rotation={element.rotation}
                    isSelected={isSelected}
                  />
                );
              }
              
              if (element.type === 'furniture') {
                return (
                  <Furniture 
                    key={element.id}
                    position={element.position}
                    size={element.size}
                    isSelected={isSelected}
                    icon={objectTemplate?.icon}
                  />
                );
              }
              
              if (element.type === 'appliance') {
                return (
                  <Appliance 
                    key={element.id}
                    position={element.position}
                    size={element.size}
                    isSelected={isSelected}
                    icon={objectTemplate?.icon}
                  />
                );
              }
              
              if (element.type === 'bathroom') {
                return (
                  <BathroomItem 
                    key={element.id}
                    position={element.position}
                    size={element.size}
                    isSelected={isSelected}
                    icon={objectTemplate?.icon}
                  />
                );
              }
              
              if (element.type === 'decoration') {
                return (
                  <Decoration 
                    key={element.id}
                    position={element.position}
                    size={element.size}
                    isSelected={isSelected}
                    icon={objectTemplate?.icon}
                  />
                );
              }
              
              return null;
            })}
            
            {/* Mur temporaire en cours de dessin */}
            {tempWall && (
              <Line
                points={[
                  new THREE.Vector3(...tempWall.start),
                  new THREE.Vector3(...tempWall.end)
                ]}
                color="#4287f5"
                lineWidth={8}
                dashed={true}
                dashSize={0.2}
                gapSize={0.1}
              />
            )}
          </Canvas>
          
          {/* Contrôles de sélection en bas à gauche */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg flex items-center space-x-3">
            <div>
              <span className="text-xl mr-2">{TOOLS.find(t => t.id === activeTool)?.icon}</span>
              <span className="font-medium">{TOOLS.find(t => t.id === activeTool)?.name}</span>
            </div>
            
            {selectedElement && elements.find(el => el.id === selectedElement)?.type !== 'wall' && (
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={rotateSelectedObject}
              >
                Rotation
              </button>
            )}
          </div>
          
          {/* Aide contextuelle */}
          <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-semibold mb-2">Conseils :</h3>
            <ul className="text-sm space-y-1">
              {activeTool === 'wall' && (
                <>
                  <li>• Cliquez pour définir le point de départ</li>
                  <li>• Cliquez à nouveau pour terminer le mur</li>
                  <li>• Déplacez la souris pour prévisualiser</li>
                </>
              )}
              {CATEGORIES.map(cat => cat.id).includes(activeTool) && (
                <li>• Cliquez pour placer l'objet sur la grille</li>
              )}
              {activeTool === 'select' && (
                <li>• Cliquez sur un élément pour le sélectionner</li>
              )}
              {activeTool === 'delete' && (
                <li>• Cliquez sur un élément pour le supprimer</li>
              )}
              <li>• Utilisez la molette pour zoomer/dézoomer</li>
              {selectedElement && (
                <li>• Utilisez le bouton Rotation pour pivoter les objets</li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Panneau de bibliothèque à droite */}
        <div className="w-64 bg-white p-4 shadow-inner overflow-y-auto flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Bibliothèque d'Objets</h2>
          
          {/* Catégories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeTool === category.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTool(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* Liste d'objets avec recherche */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Rechercher un objet..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          
          {/* Liste d'objets */}
          <div className="overflow-y-auto flex-1">
            {OBJECT_LIBRARY
              .filter(obj => obj.type === activeTool)
              .map(obj => (
                <div 
                  key={obj.id}
                  className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all ${
                    activeTool === obj.type ? 'border border-blue-500 bg-blue-50' : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTool(obj.type)}
                >
                  <div className="text-2xl mr-3">{obj.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium">{obj.name}</div>
                    <div className="text-xs text-gray-500">{obj.size[0]}m × {obj.size[1]}m</div>
                  </div>
                </div>
              ))
            }
          </div>
          
          {/* Objets récemment utilisés */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium mb-2 text-gray-700">Récemment utilisés</h3>
            <div className="flex flex-wrap gap-2">
              {OBJECT_LIBRARY.slice(0, 4).map(obj => (
                <div 
                  key={obj.id}
                  className="p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setActiveTool(obj.type)}
                  title={obj.name}
                >
                  <div className="text-2xl">{obj.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Barre d'état en bas */}
      <div className="bg-gray-800 text-white p-2 flex justify-between text-sm">
        <div>
          <span className="mr-4">Éléments: {elements.length}</span>
          <span>Grille: {gridSize}m</span>
        </div>
        <div>
          <span className="mr-4">Outils: {TOOLS.find(t => t.id === activeTool)?.name}</span>
          <span>Zoom: {zoom}%</span>
        </div>
      </div>
    </div>
  );
};

export default Editor;
# Problem 1
import React from 'react';
import { SimulationParameters } from '@/lib/simulation';
import { presets } from '@/lib/presets';

interface ParameterControlsProps {
  parameters: SimulationParameters;
  onParameterChange: (newParams: Partial<SimulationParameters>) => void;
  onRunSimulation: () => void;
  onExportData: () => void;
  onPresetSelect: (presetIndex: number) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  parameters,
  onParameterChange,
  onRunSimulation,
  onExportData,
  onPresetSelect
}) => {
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SimulationParameters) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      onParameterChange({ [field]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SimulationParameters) => {
    onParameterChange({ [field]: e.target.checked });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof SimulationParameters) => {
    onParameterChange({ [field]: e.target.value });
  };

  return (
    <div className="lg:w-1/3 bg-surface p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Simulation Parameters</h2>
      
      {/* Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Presets</label>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => onPresetSelect(index)}
              className="text-sm py-2 px-3 bg-primary-light text-primary rounded hover:bg-primary hover:text-white transition-colors"
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Field Parameters */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Fields</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Magnetic Field (T)</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={parameters.magneticField}
            onChange={(e) => handleNumberChange(e, 'magneticField')}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>{parameters.magneticField.toFixed(1)}</span>
            <span>2</span>
          </div>
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">B Direction</label>
            <select
              value={parameters.bDirection}
              onChange={(e) => handleSelectChange(e, 'bDirection')}
              className="w-full p-2 border rounded"
            >
              <option value="x">X-axis</option>
              <option value="y">Y-axis</option>
              <option value="z">Z-axis</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Electric Field (V/m)</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={parameters.electricField}
            onChange={(e) => handleNumberChange(e, 'electricField')}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>{parameters.electricField.toFixed(1)}</span>
            <span>5</span>
          </div>
        </div>
        
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">E Direction</label>
            <select
              value={parameters.eDirection}
              onChange={(e) => handleSelectChange(e, 'eDirection')}
              className="w-full p-2 border rounded"
            >
              <option value="x">X-axis</option>
              <option value="y">Y-axis</option>
              <option value="z">Z-axis</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Particle Parameters */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Particle</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Velocity (m/s)</label>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={parameters.particleVelocity}
            onChange={(e) => handleNumberChange(e, 'particleVelocity')}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10</span>
            <span>{parameters.particleVelocity}</span>
            <span>500</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Time Step
            <span className="ml-1 text-xs text-gray-500">(smaller = more accurate but slower)</span>
          </label>
          <input
            type="range"
            min="0.0001"
            max="0.01"
            step="0.0001"
            value={parameters.timeStep}
            onChange={(e) => handleNumberChange(e, 'timeStep')}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.0001</span>
            <span>{parameters.timeStep.toFixed(4)}</span>
            <span>0.01</span>
          </div>
        </div>
      </div>
      
      {/* Visualization Options */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Visualization</h3>
        
        <div className="flex flex-col gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={parameters.showAxes}
              onChange={(e) => handleCheckboxChange(e, 'showAxes')}
              className="mr-2"
            />
            <span>Show Axes</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={parameters.showFieldVectors}
              onChange={(e) => handleCheckboxChange(e, 'showFieldVectors')}
              className="mr-2"
            />
            <span>Show Field Vectors</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={parameters.showVelocityVector}
              onChange={(e) => handleCheckboxChange(e, 'showVelocityVector')}
              className="mr-2"
            />
            <span>Show Velocity Vector</span>
          </label>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onRunSimulation}
          className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Run Simulation
        </button>
        
        <button
          onClick={onExportData}
          className="w-full py-2 px-4 border border-primary text-primary rounded hover:bg-primary-light transition-colors"
        >
          Export Data
        </button>
      </div>
    </div>
  );
};

export default ParameterControls;
import React, { useState } from 'react';

const FormularBuilder = () => {
  const [fields, setFields] = useState([
    { id: 'f_vor', label: 'Vorname', value: 'Max' },
    { id: 'f_nach', label: 'Nachname', value: 'Mustermann' },
    { id: 'f_wohn', label: 'Wohnort', value: 'München' },
    { id: 'f_alt', label: 'Alter', value: '25' }
  ]);

  const [slots, setSlots] = useState({
    Vorname: '',
    Nachname: '',
    Wohnort: '',
    Alter: ''
  });

  const [dragged, setDragged] = useState(null);
  const [activeSelection, setActiveSelection] = useState(null);

  const handleDragStart = (field) => {
    setDragged(field);
    setActiveSelection(field);
  };

  const handleFieldClick = (field) => {
    if (activeSelection?.id === field.id) {
      setActiveSelection(null);
      setDragged(null);
    } else {
      setActiveSelection(field);
      setDragged(field);
    }
  };

  const handleDrop = (slotName) => {
    const itemToPlace = dragged || activeSelection;
    if (!itemToPlace) return;
    setSlots({
      ...slots,
      [slotName]: itemToPlace.value
    });
    setFields(fields.filter(f => f.id !== itemToPlace.id));
    setDragged(null);
    setActiveSelection(null);
  };

  const handleReset = () => {
    setFields([
      { id: 'f_vor', label: 'Vorname', value: 'Max' },
      { id: 'f_nach', label: 'Nachname', value: 'Mustermann' },
      { id: 'f_wohn', label: 'Wohnort', value: 'München' },
      { id: 'f_alt', label: 'Alter', value: '25' }
    ]);
    setSlots({
      Vorname: '',
      Nachname: '',
      Wohnort: '',
      Alter: ''
    });
    setDragged(null);
    setActiveSelection(null);
  };

  const isCompleted = Object.values(slots).every(v => v !== '');

  return (
    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 shadow-xl max-w-lg mx-auto">
      <div className="mb-4 text-center">
        <h4 className="text-lg font-bold text-emerald-800">Formular-Inskription (Teil 1)</h4>
        <p className="text-xs text-emerald-600">Arrastra o toca los valores para colocarlos en los campos correctos</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {fields.map(f => (
          <div 
            key={f.id}
            draggable
            onDragStart={() => handleDragStart(f)}
            onClick={() => handleFieldClick(f)}
            className={`font-bold text-sm px-3.5 py-2 rounded-xl cursor-pointer hover:scale-102 transition-all shadow-md ${
              activeSelection?.id === f.id
                ? 'bg-emerald-800 text-white ring-4 ring-emerald-300 scale-105'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/10'
            }`}
          >
            {f.value} <span className="text-[10px] opacity-75 font-normal">({f.label})</span>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm relative">
        <div className="text-[10px] font-mono text-slate-400 absolute top-2 right-3 uppercase">Anmeldeformular</div>
        
        {Object.keys(slots).map((slotName) => (
          <div key={slotName} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-600 text-sm">{slotName}:</span>
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(slotName)}
              onClick={() => handleDrop(slotName)}
              className={`w-full sm:w-48 h-10 border-2 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                slots[slotName] 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold text-sm' 
                  : activeSelection
                    ? 'bg-emerald-50/30 border-dashed border-emerald-300 text-emerald-600 animate-pulse text-xs font-semibold'
                    : 'bg-slate-50 border-dashed border-slate-300 text-slate-400 text-xs'
              }`}
            >
              {slots[slotName] || (activeSelection ? 'Toca para colocar 🎯' : 'Arrastra o toca aquí')}
            </div>
          </div>
        ))}
      </div>

      {isCompleted && (
        <div className="mt-4 text-center animate-bounce">
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-sm py-1.5 px-4 rounded-full">
            🎉 Formulario Completado
          </span>
        </div>
      )}

      {isCompleted && (
        <button 
          onClick={handleReset}
          className="w-full mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline text-center"
        >
          Reiniciar Juego
        </button>
      )}
    </div>
  );
};

export default FormularBuilder;

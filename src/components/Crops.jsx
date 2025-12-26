// FarmerCalendarApp.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

/**
 * UP Farmer Training & Crop Calendar - Full featured single-file React app
 *
 * Features:
 * - Month cards + list view
 * - Scenario filter + search + legend
 * - Edit month detail modal (persist to localStorage)
 * - Add / delete entries
 * - Export PDF (multi-page)
 * - Export CSV
 * - Print friendly layout
 *
 * NOTE: keep this as a single file for easy copy/paste. For production split into smaller components/files.
 */

/* ----------------------------- Sample Data ----------------------------- */
const DEFAULT_MONTHS = [
  { id: "2025-01", month: "Jan", scenario: "All", crop: "Rabi crops (wheat, gram, mustard, lentils)", action: "Soil testing, fertilizer application, pest/disease monitoring, irrigation scheduling; workshop on soil health and record-keeping" },
  { id: "2025-02-irrig", month: "Feb", scenario: "Irrigated", crop: "Rabi harvest (wheat/gram)", action: "Harvest management, storage practices, post-harvest handling; training on marketing and cost-benefit analysis" },
  { id: "2025-02-rain", month: "Feb", scenario: "Rain-fed", crop: "Rabi crops", action: "Monitor soil moisture, minimal irrigation; prepare land for Zaid crops if feasible" },
  { id: "2025-03-irrig", month: "Mar", scenario: "Irrigated", crop: "Zaid crops: vegetables, short-duration pulses", action: "Nursery preparation, sowing short-duration pulses; hands-on training on seed treatment and planting techniques" },
  { id: "2025-03-rain", month: "Mar", scenario: "Rain-fed", crop: "Fallow / minimal Zaid crops", action: "Land preparation for Kharif, moisture conservation techniques, water harvesting options" },
  { id: "2025-04-irrig", month: "Apr", scenario: "Irrigated", crop: "Zaid crops continuation", action: "Pest and weed management, irrigation scheduling; training on crop rotation benefits" },
  { id: "2025-04-rain", month: "Apr", scenario: "Rain-fed", crop: "Fallow", action: "Community-level planning for monsoon cropping, prepare for Kharif inputs" },
  { id: "2025-05-irrig", month: "May", scenario: "Irrigated", crop: "Zaid harvest / preparation for Kharif", action: "Harvest management, soil replenishment; training on crop economics and diversification" },
  { id: "2025-05-rain", month: "May", scenario: "Rain-fed", crop: "Pre-Kharif preparation", action: "Seed selection, land preparation, moisture conservation, community workshops on cropping decisions" },
  { id: "2025-06", month: "Jun", scenario: "All", crop: "Kharif sowing begins", action: "Proper sowing techniques, spacing, irrigation and water-use efficiency; pest scouting introduction" },
  { id: "2025-07", month: "Jul", scenario: "All", crop: "Kharif crop growth", action: "Fertilizer application, weed management, irrigation scheduling, integrated pest management" },
  { id: "2025-08", month: "Aug", scenario: "All", crop: "Kharif crop growth", action: "Pest/disease monitoring, crop nutrition management; mid-season review workshops for farmers’ groups" },
  { id: "2025-09", month: "Sep", scenario: "All", crop: "Kharif harvest (early crops)", action: "Harvest timing, storage practices, minimizing post-harvest losses, market awareness sessions" },
  { id: "2025-10", month: "Oct", scenario: "All", crop: "Prepare for Rabi sowing", action: "Land preparation, soil testing, planning crop rotation; training on risk management" },
  { id: "2025-11-irrig", month: "Nov", scenario: "Irrigated", crop: "Rabi sowing (wheat, gram, mustard)", action: "Seed treatment, sowing, irrigation scheduling, nutrient management; training on small farm machinery" },
  { id: "2025-11-rain", month: "Nov", scenario: "Rain-fed", crop: "Rabi sowing (limited areas)", action: "Choose crops suited to residual moisture, sowing and soil conservation techniques" },
  { id: "2025-12", month: "Dec", scenario: "All", crop: "Rabi crop growth", action: "Monitor growth, apply nutrients, disease/pest management; refresher workshops on soil fertility and farm planning" },
];

/* -------------------------- Scenario Color Map ------------------------- */
const SCENARIO_COLORS = {
  "All": "#16a34a",        // green
  "Irrigated": "#0ea5e9",  // blue
  "Rain-fed": "#f59e0b",   // amber
  "Small": "#8b5cf6"       // purple (for small landholding)
};

/* -------------------------- Utility Helpers --------------------------- */
const STORAGE_KEY = "up_farmer_calendar_v1";

function generateId() {
  return "id-" + Math.random().toString(36).slice(2, 9);
}

function downloadCSV(items) {
  const header = ["id","month","scenario","crop","action"];
  const csvRows = [header.join(",")];
  items.forEach(item => {
    const row = [
      `"${item.id}"`,
      `"${item.month}"`,
      `"${item.scenario}"`,
      `"${item.crop.replace(/"/g,'""')}"`,
      `"${item.action.replace(/"/g,'""')}"`
    ];
    csvRows.push(row.join(","));
  });
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "UP_Farmer_Calendar.csv");
}

/* ------------------------------ Components ---------------------------- */

/* Icon components (small inline SVGs) */
function IconPDF() {
  return (
    <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m0 0l3-3m-3 3l-3-3M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" />
    </svg>
  );
}
function IconCSV() {
  return (
    <svg className="w-5 h-5 inline-block mr-1" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M3 3h18v18H3z" opacity="0.08"></path>
      <path fill="currentColor" d="M7 7h10v2H7zM7 11h10v2H7zM7 15h6v2H7z"></path>
    </svg>
  );
}

/* Header */
function Header({ title }) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 pb-4 border-b mb-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 text-sm mt-1">Interactive, printable farmer training & crop calendar for Uttar Pradesh — editable & exportable.</p>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-500">Built for trainers • print & distribute</span>
      </div>
    </header>
  );
}

/* FilterBar */
function FilterBar({ filterScenario, setFilterScenario, viewMode, setViewMode, query, setQuery, onExportPDF, onExportCSV, onReset, onAdd }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between mb-4">
      <div className="flex gap-3 items-center w-full md:w-auto">
        <label htmlFor="scenario" className="sr-only">Scenario</label>
        <select id="scenario" value={filterScenario} onChange={e => setFilterScenario(e.target.value)} className="border rounded px-3 py-2 text-sm">
          <option value="All">All scenarios</option>
          <option value="AllOnly">Only 'All'</option>
          <option value="Irrigated">Irrigated</option>
          <option value="Rain-fed">Rain-fed</option>
          <option value="Small">Small landholding</option>
        </select>

        <div className="hidden md:block border-l h-6"></div>

        <label htmlFor="view" className="sr-only">View Mode</label>
        <select id="view" value={viewMode} onChange={e => setViewMode(e.target.value)} className="border rounded px-3 py-2 text-sm">
          <option value="grid">Grid view</option>
          <option value="list">List view</option>
          <option value="print">Print preview</option>
        </select>
      </div>

      <div className="flex gap-2 items-center w-full md:w-auto">
        <input aria-label="Search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search month, crop or action..." className="flex-1 md:flex-none border px-3 py-2 rounded text-sm" />

        <button onClick={onAdd} className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700">+ Add</button>

        <button onClick={onExportCSV} title="Export CSV" className="bg-white border px-3 py-2 rounded text-sm hover:bg-gray-50">
          <IconCSV /> CSV
        </button>

        <button onClick={onExportPDF} title="Export PDF (multi-page)" className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
          <IconPDF /> PDF
        </button>

        <button onClick={onReset} title="Reset to defaults" className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700">Reset</button>
      </div>
    </div>
  );
}

/* Legend */
function Legend({ showSmall }) {
  return (
    <div className="flex gap-3 items-center flex-wrap text-sm">
      {Object.keys(SCENARIO_COLORS).map(key => {
        if (key === "Small" && !showSmall) return null;
        return (
          <div key={key} className="flex gap-2 items-center">
            <span aria-hidden style={{ backgroundColor: SCENARIO_COLORS[key] }} className="w-4 h-4 rounded inline-block border"></span>
            <span>{key}</span>
          </div>
        );
      })}
      <div className="text-gray-500 ml-2">• Click a card to view / edit details</div>
    </div>
  );
}

/* MonthCard - small presentational card */
function MonthCard({ item, onOpen, onDelete }) {
  const borderColor = SCENARIO_COLORS[item.scenario] || "#94a3b8";
  return (
    <article role="button" tabIndex={0} onClick={() => onOpen(item)} onKeyDown={(e) => { if (e.key === "Enter") onOpen(item); }} className="bg-white rounded shadow hover:shadow-md transition transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2">
      <div className="p-4 border-l-8" style={{ borderColor }}>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{item.month} <span className="text-xs text-gray-500 ml-2">({item.scenario})</span></h3>
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="text-xs text-red-600 hover:underline" aria-label={`Delete ${item.month}`}>Delete</button>
          </div>
        </div>
        <p className="text-sm mt-2"><strong>Crop:</strong> {item.crop}</p>
        <p className="text-sm mt-1 text-gray-700"><strong>Training / Action:</strong> {item.action.length > 120 ? item.action.slice(0, 120) + "…" : item.action}</p>
      </div>
    </article>
  );
}

/* Modal component */
function Modal({ open, onClose, children, title, ariaId = "modal" }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby={ariaId} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full p-4 z-10">
        <div className="flex justify-between items-center mb-2">
          <h2 id={ariaId} className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close dialog" className="text-gray-600 hover:text-gray-900">✕</button>
        </div>
        <div className="overflow-auto max-h-[60vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Main App ------------------------------ */

export default function FarmerCalendarApp() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to parse stored months", e);
    }
    return DEFAULT_MONTHS;
  });

  const [filterScenario, setFilterScenario] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid, list, print
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showSmall, setShowSmall] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const printRef = useRef(null);

  /* Persist to localStorage on change */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save calendar", e);
    }
  }, [items]);

  /* Filtering & searching */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(it => {
      // scenario filter
      if (filterScenario !== "All") {
        if (filterScenario === "AllOnly" && it.scenario !== "All") return false;
        if (filterScenario !== "AllOnly" && it.scenario !== filterScenario) return false;
      }
      if (!q) return true;
      // search month, crop, action
      return (
        it.month.toLowerCase().includes(q) ||
        it.scenario.toLowerCase().includes(q) ||
        it.crop.toLowerCase().includes(q) ||
        it.action.toLowerCase().includes(q)
      );
    }).sort((a, b) => a.id.localeCompare(b.id));
  }, [items, filterScenario, query]);

  /* Handlers */
  function openItem(item) {
    setSelected(item);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setSelected(null);
  }
  function updateItem(updated) {
    setItems(prev => prev.map(it => (it.id === updated.id ? { ...it, ...updated } : it)));
    closeModal();
  }
  function addNew() {
    const newItem = {
      id: generateId(),
      month: "New Month",
      scenario: "All",
      crop: "New crop focus",
      action: "Training / action details..."
    };
    setItems(prev => [...prev, newItem]);
    setTimeout(() => openItem(newItem), 120);
  }
  function removeItem(id) {
    if (!confirm("Delete this entry? This action cannot be undone.")) return;
    setItems(prev => prev.filter(it => it.id !== id));
  }
  function resetToDefault() {
    if (!confirm("Reset calendar to default data? This will overwrite your changes.")) return;
    setItems(DEFAULT_MONTHS);
    localStorage.removeItem(STORAGE_KEY);
  }

  /* Export PDF (multi-page) */
  async function exportPDF() {
    // create a cloned DOM element and render full width grid for capture for consistent layout
    if (!printRef.current) {
      alert("Print ref not available");
      return;
    }
    const element = printRef.current;
    const originalWidth = element.style.width;
    // Set width to A4 printable width approx 794 px at 96dpi? We use scale in html2canvas anyway.
    element.style.width = "794px";

    // We will render canvas at high resolution
    const canvas = await html2canvas(element, { scale: 2, useCORS: true, scrollY: -window.scrollY });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height] // start with size of canvas
    });

    // Multi-page logic: split canvas if height larger than a single page
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Scale factor to fit page width
    const ratio = pageWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;

    // If scaledHeight <= pageHeight -> single page
    if (scaledHeight <= pageHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, scaledHeight);
    } else {
      // Calculate how many pages
      let remainingHeight = imgHeight;
      let offsetY = 0;
      // We'll use canvas cropping technique to slice pages
      const sliceCanvas = document.createElement("canvas");
      const sliceCtx = sliceCanvas.getContext("2d");
      const sliceWidth = canvas.width;
      // Height in canvas pixels that fit one PDF page after scaling
      const sliceHeight = Math.floor(pageHeight / ratio);

      while (remainingHeight > 0) {
        sliceCanvas.width = sliceWidth;
        sliceCanvas.height = Math.min(sliceHeight, remainingHeight);
        sliceCtx.clearRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        sliceCtx.drawImage(canvas, 0, offsetY, sliceWidth, sliceCanvas.height, 0, 0, sliceCanvas.width, sliceCanvas.height);
        const sliceData = sliceCanvas.toDataURL("image/png");
        // Add to pdf (scale to page width)
        if (offsetY > 0) pdf.addPage();
        pdf.addImage(sliceData, "PNG", 0, 0, pageWidth, sliceCanvas.height * ratio);
        remainingHeight -= sliceCanvas.height;
        offsetY += sliceCanvas.height;
      }
    }

    // restore width
    element.style.width = originalWidth || "";

    pdf.save("UP_Farmer_Calendar.pdf");
  }

  /* Export CSV */
  function exportCSV() {
    downloadCSV(items);
  }

  /* Print (open browser print) */
  function doPrint() {
    window.print();
  }

  /* Save to file (JSON) */
  function exportJSON() {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json;charset=utf-8" });
    saveAs(blob, "UP_Farmer_Calendar.json");
  }

  /* Import JSON */
  function importJSON(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!Array.isArray(parsed)) throw new Error("Invalid format - expected array");
        setItems(parsed);
        alert("Imported calendar OK.");
      } catch (err) {
        alert("Failed to import JSON: " + (err.message || err));
      }
    };
    reader.readAsText(file);
    // clear input
    e.target.value = "";
  }

  /* Editing form inside modal */
  function EditForm({ item }) {
    const [draft, setDraft] = useState(item || {});

    useEffect(() => setDraft(item || {}), [item]);

    if (!item) return null;
    return (
      <form onSubmit={(e) => { e.preventDefault(); updateItem(draft); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs text-gray-700 mb-1">Month</div>
            <input value={draft.month || ""} onChange={(e) => setDraft({ ...draft, month: e.target.value })} className="w-full border rounded px-2 py-1" />
          </label>
          <label className="block">
            <div className="text-xs text-gray-700 mb-1">Scenario</div>
            <select value={draft.scenario || "All"} onChange={(e) => setDraft({ ...draft, scenario: e.target.value })} className="w-full border rounded px-2 py-1">
              <option>All</option>
              <option>Irrigated</option>
              <option>Rain-fed</option>
              <option>Small</option>
            </select>
          </label>
        </div>

        <label className="block mt-3">
          <div className="text-xs text-gray-700 mb-1">Crop Focus</div>
          <input value={draft.crop || ""} onChange={(e) => setDraft({ ...draft, crop: e.target.value })} className="w-full border rounded px-2 py-1" />
        </label>

        <label className="block mt-3">
          <div className="text-xs text-gray-700 mb-1">Training / Action</div>
          <textarea value={draft.action || ""} onChange={(e) => setDraft({ ...draft, action: e.target.value })} rows={6} className="w-full border rounded px-2 py-1" />
        </label>

        <div className="mt-3 flex gap-2 justify-end">
          <button type="button" onClick={() => { setDraft(item); }} className="px-3 py-2 border rounded text-sm">Reset</button>
          <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded text-sm">Save changes</button>
        </div>
      </form>
    );
  }

  /* Print-friendly markup: we render a hidden printable DOM that exportPDF uses */
  const Printable = () => (
    <div ref={printRef} className="p-6 bg-white text-black" style={{ width: "794px" }}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">UP Farmer Training & Crop Calendar</h1>
        <p className="text-sm text-gray-700">Generated: {new Date().toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filtered.map(item => (
          <div key={item.id} style={{ borderLeft: `8px solid ${SCENARIO_COLORS[item.scenario] || "#94a3b8"}` }} className="p-3">
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold">{item.month} <span className="text-sm text-gray-600">({item.scenario})</span></h2>
                <p className="text-sm mt-1"><strong>Crop:</strong> {item.crop}</p>
                <p className="text-sm mt-1"><strong>Training / Action:</strong> {item.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* Help text */
  const Help = () => (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Quick tips</h3>
      <ul className="list-disc list-inside text-sm mt-2 text-gray-700">
        <li>Click any card to view or edit the month details.</li>
        <li>Use <strong>Export PDF</strong> to generate a multi-page printable calendar (ready for distribution).</li>
        <li>Use <strong>Export CSV</strong> to bring data into Excel for local printing or bulk editing.</li>
        <li>Reset will clear your custom edits and restore the default dataset.</li>
      </ul>
    </div>
  );

  /* ------------------------------- Render ------------------------------- */
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <Header title="UP Farmer Training & Crop Calendar" />

      <FilterBar
        filterScenario={filterScenario}
        setFilterScenario={setFilterScenario}
        viewMode={viewMode}
        setViewMode={setViewMode}
        query={query}
        setQuery={setQuery}
        onExportPDF={exportPDF}
        onExportCSV={exportCSV}
        onReset={resetToDefault}
        onAdd={addNew}
      />

      <div className="mb-4 flex items-center justify-between gap-4">
        <Legend showSmall={showSmall} />
        <div className="flex items-center gap-2">
          <button onClick={exportJSON} className="text-sm border px-3 py-2 rounded">Export JSON</button>
          <label className="text-sm border px-3 py-2 rounded cursor-pointer bg-white">
            Import JSON
            <input onChange={importJSON} type="file" accept="application/json" className="hidden" />
          </label>
          <button onClick={doPrint} className="text-sm border px-3 py-2 rounded">Print</button>
          <button onClick={() => setHelpOpen(true)} className="text-sm border px-3 py-2 rounded">Help</button>
        </div>
      </div>

      <main>
        {/* Print preview mode uses Printable layout */}
        {viewMode === "print" ? (
          <div className="bg-white p-4 rounded shadow">
            <Printable />
            <div className="mt-4 flex gap-2">
              <button onClick={exportPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Export PDF</button>
              <button onClick={doPrint} className="bg-gray-800 text-white px-4 py-2 rounded">Browser Print</button>
            </div>
          </div>
        ) : (
          <>
            {/* Grid / List selectors */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(item => (
                  <MonthCard key={item.id} item={item} onOpen={openItem} onDelete={removeItem} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(item => (
                  <div key={item.id} className="bg-white p-3 rounded shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.month} <span className="text-sm text-gray-500">({item.scenario})</span></h3>
                        <p className="text-sm mt-1"><strong>Crop:</strong> {item.crop}</p>
                        <p className="text-sm text-gray-700 mt-1"><strong>Action:</strong> {item.action}</p>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <button onClick={() => openItem(item)} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">View / Edit</button>
                        <button onClick={() => removeItem(item.id)} className="text-sm text-red-600">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Hidden printable DOM for html2canvas/pdf - keep visually hidden but in DOM */}
      <div style={{ position: "absolute", left: -10000, top: 0, opacity: 0 }} aria-hidden>
        <Printable />
      </div>

      {/* Modal editing */}
      <Modal open={isModalOpen} onClose={closeModal} title={selected ? `${selected.month} — Edit` : "Edit"}>
        {selected ? <EditForm item={selected} /> : <div>Loading...</div>}
      </Modal>

      {/* Help modal */}
      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} title="Help & Tips">
        <Help />
      </Modal>

      {/* Footer */}
      <footer className="mt-8 text-sm text-gray-600">
        <div>Tip: Use the filter and search to tailor a printable calendar for the specific group of farmers (irrigated vs rain-fed).</div>
        <div className="mt-2">Made for Uttar Pradesh — adjust month text to match your district's variety & cropping calendar.</div>
      </footer>
    </div>
  );
}


import React, { useState, useMemo } from "react";
/**
 * GovtSchemeMatcher
 *
 * Form fields:
 * - age (number)
 * - landSize (acres, number)
 * - farmerType (string)
 * - state (string)
 * - crop (string)
 * - hasBankAccount (bool)
 * - hasIrrigation (bool)
 *
 * Matching rules:
 * Each scheme has an `eligibility` object:
 * { minAge, maxAge, minLand, maxLand, farmerTypes, states, crops, requiresBank, requiresIrrigation }
 *
 * A scheme matches if all specified eligibility constraints are satisfied.
 */

// ============ 20 Scheme Objects ============
const schemes = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    short:
      "Direct income support of ₹6000/year to eligible farmer families in 3 instalments.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["₹6,000 / year (3 instalments)"],
    docs: ["Aadhaar", "Land record / ownership proof", "Bank account"],
    link: "https://pmkisan.gov.in/",
  },
  {
    id: "kcc",
    name: "Kisan Credit Card (KCC)",
    short: "Short-term credit to farmers for crop cultivation at concessional rates.",
    eligibility: {
      minAge: 18,
      maxAge: 70,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Working capital loan", "Low interest", "Crop loans"],
    docs: ["Aadhaar", "Land record / tenancy proof", "KYC", "Bank account"],
    link: "https://www.rbi.org.in/",
  },
  {
    id: "pmfby",
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    short: "Crop insurance to protect farmers against yield losses from natural calamities.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: false,
      requiresIrrigation: false,
    },
    benefits: ["Crop insurance payout", "Subsidised premium"],
    docs: ["Aadhaar", "Crop details", "Land record"],
    link: "https://pmfby.gov.in/",
  },
  {
    id: "pmksy",
    name: "PMKSY (Pradhan Mantri Krishi Sinchai Yojana)",
    short: "Irrigation-focused scheme to expand water usage efficiency and coverage.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: false,
      requiresIrrigation: false,
    },
    benefits: ["Irrigation infrastructure", "Water-saving tech"],
    docs: ["Land record", "Project proposal (for large schemes)"],
    link: "https://pmksy.gov.in/",
  },
  {
    id: "kisan-credit-insurance",
    name: "KCC Crop Loan Insurance",
    short: "Insurance cover linked with Kisan Credit Card (for loan waiver/protection).",
    eligibility: {
      minAge: 18,
      maxAge: 70,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Loan protection", "Lower risk for lenders"],
    docs: ["KCC account details", "KYC"],
    link: "https://www.nabard.org/",
  },
  {
    id: "necc",
    name: "National e-Governance Plan in Agriculture (NeGP-A)",
    short: "Digital yield and market access support for farmers via e-platforms.",
    eligibility: {
      minAge: 0,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: false,
      requiresIrrigation: false,
    },
    benefits: ["Market linkages", "Data-driven advisory"],
    docs: ["Aadhaar optional", "Mobile number"],
    link: "#",
  },
  {
    id: "national-agri-development",
    name: "National Horticulture Mission",
    short: "Support for horticulture—fruits, vegetables, flowers—through subsidies and training.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0.1,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["Tomato","Potato","Cabbage","Cauliflower","Onion","Garlic","Carrot"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Subsidies on saplings", "Training", "Post-harvest support"],
    docs: ["Land record", "Aadhaar", "Bank account"],
    link: "#",
  },
  {
    id: "per-drop",
    name: "Per Drop More Crop (Micro-irrigation)",
    short: "Subsidy for drip and sprinkler systems for efficient water usage.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0.05,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Subsidized installation of micro-irrigation systems"],
    docs: ["Land record", "Aadhaar", "Project plan"],
    link: "#",
  },
  {
    id: "national-agri-insurance",
    name: "State Agriculture Infrastructure Fund",
    short: "Financing infrastructure for cold storage, warehouse, and market yards.",
    eligibility: {
      minAge: 21,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["farmer","agripreneur","cooperative"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Low-cost loans", "Infrastructure grants"],
    docs: ["Business plan", "Land/lease documents", "KYC"],
    link: "#",
  },
  {
    id: "nhm-floriculture",
    name: "Floriculture & Medicinal Plants Support",
    short: "Support for farmers growing flowers and medicinal plants.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0.05,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["Flower","Medicinal"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Subsidies, technical assistance"],
    docs: ["Land record", "Aadhaar"],
    link: "#",
  },
  {
    id: "farm-mechanization",
    name: "Sub-Mission on Agricultural Mechanization",
    short: "Subsidies & support to adopt farm machinery (custom hiring centers).",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Subsidy for machinery", "Training"],
    docs: ["Aadhaar", "Land record", "Bank account"],
    link: "#",
  },
  {
    id: "organic",
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    short: "Support for organic farming clusters including certification and premium prices.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0.2,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Training, certification, market linkage"],
    docs: ["Land record", "Aadhaar"],
    link: "#",
  },
  {
    id: "dairy-support",
    name: "National Dairy Development Programme (Support)",
    short: "Assistance for small dairy farmers for breed improvement & infrastructure.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["dairy_farmer"],
      states: ["all"],
      crops: ["Dairy"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Breed improvement", "Cold chain"],
    docs: ["Livestock proof", "Aadhaar", "Bank account"],
    link: "#",
  },
  {
    id: "fpo-promotion",
    name: "Formation and Promotion of Farmer Producer Organisations (FPO)",
    short: "Support to form FPOs for better bargaining power and market linkages.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Grants, capacity building"],
    docs: ["Member details", "Aadhaar"],
    link: "#",
  },
  {
    id: "young-farmer",
    name: "Rashtriya Yuva Sashaktikaran Karyakram (RYSK) - Youth in Agriculture",
    short: "Special support and training for young farmers/agripreneurs.",
    eligibility: {
      minAge: 18,
      maxAge: 45,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["young_farmer","agripreneur"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Training, seed funding, incubation support"],
    docs: ["Aadhaar", "Business plan"],
    link: "#",
  },
  {
    id: "bee-keeping",
    name: "Beekeeping & Honey Mission",
    short: "Support for beekeeping units and honey processing.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["BeeKeeping","Honey"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Subsidy for equipment", "Training"],
    docs: ["Aadhaar", "Project plan"],
    link: "#",
  },
  {
    id: "cold-storage",
    name: "Cold Chain & Value Addition Support",
    short: "Loans and grants for cold storage, controlled atmosphere storage.",
    eligibility: {
      minAge: 21,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["entrepreneur","cooperative"],
      states: ["all"],
      crops: ["perishable"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Low-interest loan", "Grant-in-aid"],
    docs: ["Business plan", "Land/lease", "KYC"],
    link: "#",
  },
  {
    id: "fishery",
    name: "Blue Revolution - Fisheries Support",
    short: "Financial & technical support for fisheries and aquaculture.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["fisherman","aquaculture"],
      states: ["coastal_states","inland_states"],
      crops: ["Fish","Prawn"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Infrastructure subsidy", "Training"],
    docs: ["Fisher ID", "Aadhaar", "Bank account"],
    link: "#",
  },
  {
    id: "soil-health-card",
    name: "Soil Health Card (SHC) Scheme",
    short: "Free soil testing and recommendations for balanced fertilizer use.",
    eligibility: {
      minAge: 0,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: false,
      requiresIrrigation: false,
    },
    benefits: ["Free soil testing", "Fertilizer recommendations"],
    docs: ["Land record", "Aadhaar"],
    link: "https://soilhealth.dac.gov.in/",
  },
  {
    id: "womens-empower",
    name: "Women Farmer Support Scheme",
    short: "Targeted support for women farmers: finance, training and technology.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["women"],
      states: ["all"],
      crops: ["all"],
      requiresBank: true,
      requiresIrrigation: false,
    },
    benefits: ["Training, preferential grants"],
    docs: ["Aadhaar", "Land record", "Bank account"],
    link: "#",
  },
  {
    id: "climate-resilience",
    name: "Climate Resilient Agriculture (CRA) Support",
    short: "Support for practices and inputs that improve resilience to climate stress.",
    eligibility: {
      minAge: 18,
      maxAge: null,
      minLand: 0,
      maxLand: null,
      farmerTypes: ["all"],
      states: ["all"],
      crops: ["all"],
      requiresBank: false,
      requiresIrrigation: false,
    },
    benefits: ["Subsidies for resilient seeds/inputs"],
    docs: ["Aadhaar", "Land record"],
    link: "#",
  }
];

// ============ Helper: scheme matches form input ============
function schemeMatches(scheme, form) {
  const e = scheme.eligibility;
  // age
  if (e.minAge != null && form.age != null && form.age < e.minAge) return false;
  if (e.maxAge != null && form.age != null && form.age > e.maxAge) return false;
  // land
  if (e.minLand != null && form.landSize != null && form.landSize < e.minLand) return false;
  if (e.maxLand != null && form.landSize != null && form.landSize > e.maxLand) return false;
  // farmer type
  if (e.farmerTypes && !e.farmerTypes.includes("all")) {
    if (!form.farmerType) return false;
    if (!e.farmerTypes.includes(form.farmerType)) return false;
  }
  // state
  if (e.states && !e.states.includes("all")) {
    if (!form.state) return false;
    if (!e.states.includes(form.state) && !e.states.includes("all")) return false;
  }
  // crop
  if (e.crops && !e.crops.includes("all")) {
    if (!form.crop) return false;
    if (!e.crops.map(c=>c.toLowerCase()).includes(form.crop.toLowerCase())) return false;
  }
  // bank
  if (e.requiresBank && !form.hasBankAccount) return false;
  // irrigation
  if (e.requiresIrrigation && !form.hasIrrigation) return false;
  return true;
}

// ============ Component ============
export default function GovtSchemeMatcher() {
  const [age, setAge] = useState("");
  const [landSize, setLandSize] = useState("");
  const [farmerType, setFarmerType] = useState("");
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [hasIrrigation, setHasIrrigation] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState({}); // track open details

  const form = useMemo(() => ({
    age: age ? Number(age) : null,
    landSize: landSize ? Number(landSize) : null,
    farmerType: farmerType || null,
    state: state || null,
    crop: crop || null,
    hasBankAccount,
    hasIrrigation
  }), [age, landSize, farmerType, state, crop, hasBankAccount, hasIrrigation]);

  // compute matches (memoized)
  const scored = useMemo(() => {
    // For each scheme compute boolean match and simple score (more criteria matched => higher)
    return schemes
      .map(s => {
        const match = schemeMatches(s, form);
        // Score: count how many non-null constraints passed (simple)
        let score = 0;
        // check each eligibility field and give points
        const e = s.eligibility;
        if (form.age != null && e.minAge==null && e.maxAge==null) score += 0; // nothing
        if (form.age != null && e.minAge!=null && form.age >= e.minAge) score++;
        if (form.age != null && e.maxAge!=null && form.age <= e.maxAge) score++;
        if (form.landSize != null && e.minLand!=null && form.landSize >= e.minLand) score++;
        if (form.landSize != null && e.maxLand!=null && form.landSize <= e.maxLand) score++;
        if (form.farmerType && e.farmerTypes && (e.farmerTypes.includes("all") || e.farmerTypes.includes(form.farmerType))) score++;
        if (form.state && e.states && (e.states.includes("all") || e.states.includes(form.state))) score++;
        if (form.crop && e.crops && (e.crops.includes("all") || e.crops.map(c=>c.toLowerCase()).includes(form.crop.toLowerCase()))) score++;
        if (!e.requiresBank || form.hasBankAccount) score++;
        if (!e.requiresIrrigation || form.hasIrrigation) score++;
        return { scheme: s, match, score };
      })
      .filter(item => {
        // apply search filter
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          item.scheme.name.toLowerCase().includes(q) ||
          item.scheme.short.toLowerCase().includes(q) ||
          (item.scheme.benefits && item.scheme.benefits.join(" ").toLowerCase().includes(q))
        );
      })
      .sort((a,b) => {
        // sort by match first, then score desc, then name
        if (a.match === b.match) {
          if (b.score === a.score) return a.scheme.name.localeCompare(b.scheme.name);
          return b.score - a.score;
        }
        return a.match ? -1 : 1;
      });
  }, [form, query]);

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="scheme-container">
      <h2>🏛️ Govt Scheme Auto-Matcher</h2>

      <div className="scheme-form">
        <div className="row">
          <label>Age</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 35" />
        </div>

        <div className="row">
          <label>Land (acres)</label>
          <input type="number" value={landSize} onChange={e => setLandSize(e.target.value)} placeholder="e.g. 2.5" />
        </div>

        <div className="row">
          <label>Farmer Type</label>
          <select value={farmerType} onChange={e => setFarmerType(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="all">Any</option>
            <option value="small">Small</option>
            <option value="marginal">Marginal</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="women">Women</option>
            <option value="dairy_farmer">Dairy Farmer</option>
            <option value="agripreneur">Agripreneur</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="cooperative">Cooperative</option>
          </select>
        </div>

        <div className="row">
          <label>State</label>
          <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="e.g. Uttar Pradesh" />
        </div>

        <div className="row">
          <label>Crop</label>
          <input type="text" value={crop} onChange={e => setCrop(e.target.value)} placeholder="e.g. Wheat" />
        </div>

        <div className="row checkbox-row">
          <label><input type="checkbox" checked={hasBankAccount} onChange={e => setHasBankAccount(e.target.checked)} /> Has Bank Account</label>
          <label><input type="checkbox" checked={hasIrrigation} onChange={e => setHasIrrigation(e.target.checked)} /> Has Irrigation</label>
        </div>

        <div className="row">
          <label>Search / Filter</label>
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="search scheme name, benefit..." />
        </div>
      </div>

      <div className="scheme-stats">
        <div>Total schemes: <strong>{schemes.length}</strong></div>
        <div>Matching: <strong>{scored.filter(s=>s.match).length}</strong></div>
      </div>

      <div className="scheme-list">
        {scored.map(item => {
          const s = item.scheme;
          const isMatch = item.match;
          return (
            <div key={s.id} className={`scheme-card ${isMatch ? "match" : "no-match"}`}>
              <div className="scheme-header">
                <div>
                  <h3>{s.name}</h3>
                  <p className="scheme-short">{s.short}</p>
                </div>
                <div className="scheme-badges">
                  {isMatch ? <span className="badge match-badge">Eligible</span> : <span className="badge no-badge">Not Eligible</span>}
                  <button className="details-btn" onClick={() => toggleExpand(s.id)}>{expanded[s.id] ? "Hide" : "Details"}</button>
                </div>
              </div>

              {expanded[s.id] && (
                <div className="scheme-details">
                  <div className="details-grid">
                    <div><strong>Eligibility</strong></div>
                    <div>
                      Age: {s.eligibility.minAge ?? "any"} - {s.eligibility.maxAge ?? "any"}<br />
                      Land: {s.eligibility.minLand ?? "any"} - {s.eligibility.maxLand ?? "any"} acres<br />
                      Farmer Types: {(s.eligibility.farmerTypes || ["all"]).join(", ")}<br />
                      States: {(s.eligibility.states || ["all"]).join(", ")}<br />
                      Crops: {(s.eligibility.crops || ["all"]).join(", ")}<br />
                      Requires Bank: {s.eligibility.requiresBank ? "Yes" : "No"}<br />
                      Requires Irrigation: {s.eligibility.requiresIrrigation ? "Yes" : "No"}
                    </div>

                    <div><strong>Benefits</strong></div>
                    <div>{(s.benefits || []).map((b,i)=><div key={i}>• {b}</div>)}</div>

                    <div><strong>Documents</strong></div>
                    <div>{(s.docs || []).map((d,i)=><div key={i}>• {d}</div>)}</div>
                  </div>

                  <div className="scheme-link-row">
                    <a href={s.link} target="_blank" rel="noreferrer">More info / Apply</a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="disclaimer">
        <strong>Note:</strong> Scheme rules and availability vary by state and year — always verify with official government portals.
      </div>
    </div>
  );
}




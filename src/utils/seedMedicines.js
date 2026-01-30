const medicinesData = [
  {"name":"Paracetamol","category":"Pain Relief","price":25,"quantity":100},
  {"name":"Ibuprofen","category":"Pain Relief","price":40,"quantity":80},
  {"name":"Aspirin","category":"Pain Relief","price":30,"quantity":70},
  {"name":"Diclofenac","category":"Pain Relief","price":45,"quantity":60},
  {"name":"Combiflam","category":"Pain Relief","price":35,"quantity":90},
  {"name":"Amoxicillin","category":"Antibiotic","price":120,"quantity":50},
  {"name":"Azithromycin","category":"Antibiotic","price":150,"quantity":40},
  {"name":"Ciprofloxacin","category":"Antibiotic","price":110,"quantity":45},
  {"name":"Doxycycline","category":"Antibiotic","price":90,"quantity":55},
  {"name":"Metronidazole","category":"Antibiotic","price":60,"quantity":65},
  {"name":"Cetirizine","category":"Allergy","price":25,"quantity":120},
  {"name":"Loratadine","category":"Allergy","price":30,"quantity":100},
  {"name":"Montelukast","category":"Allergy","price":70,"quantity":60},
  {"name":"Levocetirizine","category":"Allergy","price":35,"quantity":90},
  {"name":"Fexofenadine","category":"Allergy","price":50,"quantity":70},
  {"name":"Pantoprazole","category":"Gastric","price":45,"quantity":110},
  {"name":"Omeprazole","category":"Gastric","price":40,"quantity":95},
  {"name":"Ranitidine","category":"Gastric","price":30,"quantity":80},
  {"name":"Domperidone","category":"Gastric","price":35,"quantity":75},
  {"name":"Digene","category":"Gastric","price":20,"quantity":130},
  {"name":"Metformin","category":"Diabetes","price":60,"quantity":85},
  {"name":"Glibenclamide","category":"Diabetes","price":55,"quantity":70},
  {"name":"Insulin","category":"Diabetes","price":450,"quantity":25},
  {"name":"Glimepiride","category":"Diabetes","price":90,"quantity":60},
  {"name":"Sitagliptin","category":"Diabetes","price":180,"quantity":40},
  {"name":"Amlodipine","category":"Blood Pressure","price":45,"quantity":75},
  {"name":"Losartan","category":"Blood Pressure","price":70,"quantity":65},
  {"name":"Telmisartan","category":"Blood Pressure","price":95,"quantity":55},
  {"name":"Atenolol","category":"Blood Pressure","price":40,"quantity":80},
  {"name":"Metoprolol","category":"Blood Pressure","price":60,"quantity":70},
  {"name":"Vitamin C","category":"Supplements","price":25,"quantity":150},
  {"name":"Vitamin D3","category":"Supplements","price":90,"quantity":90},
  {"name":"Calcium Tablets","category":"Supplements","price":110,"quantity":85},
  {"name":"Iron Tablets","category":"Supplements","price":50,"quantity":100},
  {"name":"Multivitamin","category":"Supplements","price":75,"quantity":120},
  {"name":"ORS Powder","category":"Hydration","price":20,"quantity":200},
  {"name":"Electral","category":"Hydration","price":22,"quantity":180},
  {"name":"Cough Syrup","category":"Cold & Cough","price":85,"quantity":60},
  {"name":"Benadryl","category":"Cold & Cough","price":95,"quantity":55},
  {"name":"Vicks Action 500","category":"Cold & Cough","price":30,"quantity":100},
  {"name":"Dextromethorphan","category":"Cold & Cough","price":70,"quantity":65},
  {"name":"Salbutamol Inhaler","category":"Respiratory","price":180,"quantity":40},
  {"name":"Budesonide Inhaler","category":"Respiratory","price":220,"quantity":35},
  {"name":"Betadine Ointment","category":"First Aid","price":60,"quantity":70},
  {"name":"Cotton Roll","category":"First Aid","price":40,"quantity":100},
  {"name":"Crepe Bandage","category":"First Aid","price":75,"quantity":60},
  {"name":"Dettol","category":"First Aid","price":95,"quantity":50},
  {"name":"Loperamide","category":"Diarrhea","price":30,"quantity":80},
  {"name":"Racecadotril","category":"Diarrhea","price":85,"quantity":60},
  {"name":"Ondansetron","category":"Anti Vomiting","price":45,"quantity":70},
  {"name":"Meclizine","category":"Anti Vomiting","price":40,"quantity":65},
  {"name":"Clotrimazole Cream","category":"Skin","price":55,"quantity":60},
  {"name":"Mupirocin Ointment","category":"Skin","price":90,"quantity":50},
  {"name":"Calamine Lotion","category":"Skin","price":45,"quantity":75},
  {"name":"Eye Drops","category":"Eye Care","price":60,"quantity":70},
  {"name":"Ear Drops","category":"ENT","price":55,"quantity":60},
  {"name":"Pregnancy Test Kit","category":"Diagnostics","price":60,"quantity":40},
  {"name":"Glucometer Strips","category":"Diagnostics","price":350,"quantity":30}
];

export const seedMedicines = async () => {
  const API_BASE_URL = 'https://medfind-backend.onrender.com/api';
  
  try {
    const response = await fetch(`${API_BASE_URL}/medicines/seed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ medicines: medicinesData })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Medicines seeded successfully:', result);
    return result;
  } catch (error) {
    console.error('Error seeding medicines:', error);
    throw error;
  }
};

export default medicinesData;
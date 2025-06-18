const API_USER = '680302845';
const API_SECRET = 'SZAEGEWmcfD4EdMaH7eB54pxBydQFEQB';
const MODELS = 'nudity-2.1,weapon,alcohol,recreational_drug,faces,offensive-2.0';

const resultDiv = document.getElementById('resultBars');
const dropZone = document.getElementById('dropZone');
const hiddenInput = document.getElementById('imageFileInput');

const translations = {
  // === NUDITY ===
  'nudity.none': 'Çıplaklık Yok',
  'nudity.sexual_activity': 'Cinsel Aktivite',
  'nudity.sexual_display': 'Cinsel Gösterim',
  'nudity.erotica': 'Erotik',
  'nudity.very_suggestive': 'Çok Müstehcen',
  'nudity.suggestive': 'Müstehcen',
  'nudity.mildly_suggestive': 'Hafif Müstehcen',
  'nudity.context.sea_lake_pool': 'Deniz / Havuz',
  'nudity.context.outdoor_other': 'Açık Alan',
  'nudity.context.indoor_other': 'Kapalı Alan',

  // Suggestive classes
  'nudity.suggestive_classes.bikini': 'Bikini',
  'nudity.suggestive_classes.lingerie': 'İç Çamaşırı',
  'nudity.suggestive_classes.male_chest': 'Erkek Göğsü',
  'nudity.suggestive_classes.male_underwear': 'Erkek İç Çamaşırı',
  'nudity.suggestive_classes.miniskirt': 'Mini Etek',
  'nudity.suggestive_classes.minishort': 'Mini Şort',
  'nudity.suggestive_classes.nudity_art': 'Sanatsal Çıplaklık',
  'nudity.suggestive_classes.schematic': 'Şematik Görsel',
  'nudity.suggestive_classes.sextoy': 'Cinsel Oyuncak',
  'nudity.suggestive_classes.suggestive_focus': 'Müstehcen Odak',
  'nudity.suggestive_classes.suggestive_pose': 'Müstehcen Poz',
  'nudity.suggestive_classes.swimwear_male': 'Erkek Mayo',
  'nudity.suggestive_classes.swimwear_one_piece': 'Tek Parça Mayo',
  'nudity.suggestive_classes.visibly_undressed': 'Belirgin Açıklık',
  'nudity.suggestive_classes.other': 'Diğer',

  // Cleavage categories
  'nudity.suggestive_classes.cleavage': 'Dekolte',
  'nudity.suggestive_classes.cleavage_categories.none': 'Dekolte Yok',
  'nudity.suggestive_classes.cleavage_categories.revealing': 'Dekolte (Orta)',
  'nudity.suggestive_classes.cleavage_categories.very_revealing': 'Dekolte (Fazla)',

  // Male chest categories
  'nudity.suggestive_classes.male_chest_categories.none': 'Erkek Göğüs Yok',
  'nudity.suggestive_classes.male_chest_categories.slightly_revealing': 'Erkek Göğüs (Hafif)',
  'nudity.suggestive_classes.male_chest_categories.revealing': 'Erkek Göğüs (Orta)',
  'nudity.suggestive_classes.male_chest_categories.very_revealing': 'Erkek Göğüs (Fazla)',

  // === WEAPON ===
  'weapon.classes.firearm': 'Ateşli Silah',
  'weapon.classes.knife': 'Bıçak',
  'weapon.classes.firearm_gesture': 'Silah İmgesi',
  'weapon.classes.firearm_toy': 'Oyuncak Silah',

  'weapon.firearm_type.animated': 'Animasyon Silah',

  'weapon.firearm_action.aiming_threat': 'Tehdit Amaçlı Nişan',
  'weapon.firearm_action.aiming_camera': 'Kameraya Nişan',
  'weapon.firearm_action.aiming_safe': 'Güvenli Nişan',
  'weapon.firearm_action.in_hand_not_aiming': 'Elde, Nişan Almıyor',
  'weapon.firearm_action.worn_not_in_hand': 'Taşınıyor (Elde Değil)',
  'weapon.firearm_action.not_worn': 'Taşınmıyor',

  // === DRUG ===
  'recreational_drug.prob': 'Uyuşturucu Olasılığı',
  'recreational_drug.classes.cannabis': 'Esrar',
  'recreational_drug.classes.cannabis_logo_only': 'Esrar Logosu',
  'recreational_drug.classes.cannabis_plant': 'Esrar Bitkisi',
  'recreational_drug.classes.cannabis_drug': 'Esrar Ürünü',
  'recreational_drug.classes.recreational_drugs_not_cannabis': 'Diğer Uyuşturucular',

  // === ALCOHOL ===
  'alcohol.prob': 'Alkol Olasılığı',

  // === OFFENSIVE ===
  'offensive.nazi': 'Nazi Sembolü',
  'offensive.asian_swastika': 'Asya Swastika',
  'offensive.confederate': 'Konfederasyon Bayrağı',
  'offensive.supremacist': 'Irkçı Sembol',
  'offensive.terrorist': 'Terörist Sembol',
  'offensive.middle_finger': 'Orta Parmak',

  // === FACES === (face özellikleri)
  'faces.0.x1': 'Yüz Sol Üst X',
  'faces.0.y1': 'Yüz Sol Üst Y',
  'faces.0.x2': 'Yüz Sağ Alt X',
  'faces.0.y2': 'Yüz Sağ Alt Y',

  'faces.0.features.left_eye.x': 'Sol Göz X',
  'faces.0.features.left_eye.y': 'Sol Göz Y',
  'faces.0.features.right_eye.x': 'Sağ Göz X',
  'faces.0.features.right_eye.y': 'Sağ Göz Y',
  'faces.0.features.nose_tip.x': 'Burun Ucu X',
  'faces.0.features.nose_tip.y': 'Burun Ucu Y',
  'faces.0.features.left_mouth_corner.x': 'Ağız Sol Köşe X',
  'faces.0.features.left_mouth_corner.y': 'Ağız Sol Köşe Y',
  'faces.0.features.right_mouth_corner.x': 'Ağız Sağ Köşe X',
  'faces.0.features.right_mouth_corner.y': 'Ağız Sağ Köşe Y',

  // === Other generic ===
  'faces.length': 'Yüz Sayısı',
};



function extractProbs(obj, prefix = '') {
  let arr = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'number' && value >= 0 && value <= 1) {
      arr.push({ label: fullKey, prob: value });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        arr = arr.concat(extractProbs(item, `${fullKey}.${index}`));
      });
    } else if (typeof value === 'object' && value !== null) {
      arr = arr.concat(extractProbs(value, fullKey));
    }
  }

  return arr;
}



function renderBars(data) {
  const probs = extractProbs(data);
  resultDiv.innerHTML = '';

  if (!probs.length) {
    resultDiv.textContent = 'Gösterilecek veri bulunamadı.';
    return;
  }

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
  grid.style.gap = '20px';

  probs.forEach(({ label, prob }) => {
    const translated = translations[label] || label;

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '4px';

    const name = document.createElement('div');
    name.textContent = translated;
    name.style.fontSize = '14px';
    name.style.fontWeight = '500';

    const track = document.createElement('div');
    track.style.background = '#e0e0e0';
    track.style.height = '10px';
    track.style.borderRadius = '4px';
    track.style.overflow = 'hidden';

    const fill = document.createElement('div');
    fill.style.height = '100%';
    fill.style.background = '#2196f3';
    fill.style.width = `${(prob * 100).toFixed(1)}%`;

    const percent = document.createElement('div');
    percent.textContent = `${(prob * 100).toFixed(1)}%`;
    percent.style.fontSize = '13px';
    percent.style.textAlign = 'right';

    track.appendChild(fill);
    container.appendChild(name);
    container.appendChild(track);
    container.appendChild(percent);

    grid.appendChild(container);
  });

  resultDiv.appendChild(grid);
}


async function analyzeFile(file) {
  if (!file) return;
  resultDiv.textContent = 'Analiz yapılıyor...';

  const formData = new FormData();
  formData.append('media', file);
  formData.append('models', MODELS);
  formData.append('api_user', API_USER);
  formData.append('api_secret', API_SECRET);

  try {
    const res = await fetch('https://api.sightengine.com/1.0/check.json', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    renderBars(data);
  } catch (err) {
    resultDiv.textContent = 'Hata: ' + err.message;
  }
}

// URL ile analiz
document.getElementById('analyzeUrlBtn').addEventListener('click', async () => {
  const url = document.getElementById('imageUrlInput').value.trim();
  if (!url) return alert('Lütfen URL girin');
  resultDiv.textContent = 'Analiz yapılıyor...';

  const params = new URLSearchParams({
    url,
    models: MODELS,
    api_user: API_USER,
    api_secret: API_SECRET
  });

  try {
    const res = await fetch(`https://api.sightengine.com/1.0/check.json?${params}`);
    const data = await res.json();
    renderBars(data);
  } catch (err) {
    resultDiv.textContent = 'Hata: ' + err.message;
  }
});

// Sürükle bırak
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    analyzeFile(file);
  } else {
    alert('Sadece görsel dosyalar desteklenir.');
  }
});

dropZone.addEventListener('click', () => {
  hiddenInput.click();
});

hiddenInput.addEventListener('change', () => {
  const file = hiddenInput.files[0];
  if (file && file.type.startsWith('image/')) {
    analyzeFile(file);
  }
});

import { Plus, Trash2, Edit2, Mail, Calendar, Building2, Globe, AlertCircle, Check, Moon, Sun, ExternalLink } from 'lucide-react';

const DomainManager = () => {
  const [domains, setDomains] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    registrar: '',
    registrationDate: '',
    renewalDate: '',
    email: 'hakanterman@gmail.com'
  });

  useEffect(() => {
    initializeWithExcelData();
  }, []);

  const initializeWithExcelData = async () => {
    const excelData = [
      { name: 'Hakanterman.net', registrationDate: '2024-06-04', renewalDate: '2026-06-04', registrar: 'Spaceship' },
      { name: 'Hakanterman.org', registrationDate: '2024-06-04', renewalDate: '2026-06-04', registrar: 'Spaceship' },
      { name: 'hakanterman.com', registrationDate: '2018-06-30', renewalDate: '2026-06-30', registrar: 'Spaceship' },
      { name: 'terman.com.tr', registrationDate: '2023-08-26', renewalDate: '2026-08-26', registrar: 'Metunic' },
      { name: 'hakanterman.com.tr', registrationDate: '2023-08-26', renewalDate: '2026-08-26', registrar: 'Metunic' },
      { name: 'hakanterman.xyz', registrationDate: '2023-08-27', renewalDate: '2026-08-27', registrar: 'Spaceship' },
      { name: 'Hakanterman.tr', registrationDate: '2024-08-28', renewalDate: '2026-09-11', registrar: 'Metunic' },
      { name: 'mekanomi.tr', registrationDate: '2024-05-28', renewalDate: '2026-09-11', registrar: 'Metunic' },
      { name: 'ta4hkn.tr', registrationDate: '2024-05-28', renewalDate: '2026-09-11', registrar: 'Metunic' },
      { name: 'Tacallbook.tr', registrationDate: '2024-05-28', renewalDate: '2026-09-11', registrar: 'Metunic' },
      { name: 'terman.tr', registrationDate: '2023-12-11', renewalDate: '2026-09-11', registrar: 'Metunic' },
      { name: 'mekanomi.com.tr', registrationDate: '2023-09-26', renewalDate: '2026-09-26', registrar: 'Metunic' },
      { name: 'mekanomi.xyz', registrationDate: '2023-09-27', renewalDate: '2026-09-27', registrar: 'Spaceship' },
      { name: 'mekanomi.net', registrationDate: '2023-09-27', renewalDate: '2026-09-27', registrar: 'Spaceship' },
      { name: 'mekanomi.com', registrationDate: '2023-10-13', renewalDate: '2026-10-13', registrar: 'Spaceship' },
      { name: 'mekanomi.org', registrationDate: '2024-10-25', renewalDate: '2026-10-25', registrar: 'Spaceship' },
      { name: 'ataturk.cc', registrationDate: '2024-10-25', renewalDate: '2026-10-25', registrar: 'Spaceship' },
      { name: 'aprs.tr', registrationDate: '2024-12-17', renewalDate: '2025-12-17', registrar: 'Atastyr' },
      { name: 'aprs.com.tr', registrationDate: '2024-12-17', renewalDate: '2025-12-17', registrar: 'Atastyr' },
      { name: 'terman.net', registrationDate: '2023-12-23', renewalDate: '2025-12-23', registrar: 'Spaceship' },
      { name: 'hakan.pw', registrationDate: '2023-12-23', renewalDate: '2025-12-23', registrar: 'Hostinger' },
      { name: 'tacallbook.com.tr', registrationDate: '2024-01-06', renewalDate: '2026-01-06', registrar: 'Metunic' },
      { name: 'tacallbook.net', registrationDate: '2024-01-07', renewalDate: '2026-01-07', registrar: 'Spaceship' },
      { name: 'tacallbook.com', registrationDate: '2024-01-07', renewalDate: '2026-01-07', registrar: 'Spaceship' },
      { name: 'ta4hkn.com', registrationDate: '2024-01-16', renewalDate: '2026-01-16', registrar: 'Spaceship' },
      { name: 'ta4hkn.com.tr', registrationDate: '2024-01-16', renewalDate: '2026-01-16', registrar: 'Metunic' },
      { name: 'ozguramatorler.com.tr', registrationDate: '2024-01-20', renewalDate: '2026-01-20', registrar: 'Metunic' },
      { name: 'ariss.com.tr', registrationDate: '2024-02-04', renewalDate: '2026-02-04', registrar: 'Metunic' },
      { name: 'ariss.org.tr', registrationDate: '2024-02-04', renewalDate: '2026-02-04', registrar: 'Metunic' },
      { name: 'guansheng.com.tr', registrationDate: '2024-02-04', renewalDate: '2026-02-04', registrar: 'Metunic' },
      { name: 'radioid.com.tr', registrationDate: '2024-02-04', renewalDate: '2026-02-04', registrar: 'Metunic' },
      { name: 'radioid.org.tr', registrationDate: '2024-02-04', renewalDate: '2026-02-04', registrar: 'Metunic' },
      { name: 'trmn.com.tr', registrationDate: '2024-02-04', renewalDate: '2026-02-04', registrar: 'Metunic' },
      { name: 'hamradio.com.tr', registrationDate: '2024-02-11', renewalDate: '2026-02-11', registrar: 'Metunic' },
      { name: 'hakan.cc', registrationDate: '2025-03-24', renewalDate: '2025-03-24', registrar: 'Spaceship' },
      { name: 'sheratonusak.com', registrationDate: '2024-05-03', renewalDate: '2026-05-03', registrar: 'Spaceship' },
      { name: 'agiz.net', registrationDate: '2025-10-24', renewalDate: '2026-10-24', registrar: 'Spaceship' }
    ];

    try {
      const keys = await window.localStorage.list('domain:');
      
      if (!keys || !keys.keys || keys.keys.length === 0) {
        for (const domain of excelData) {
          const domainData = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: domain.name,
            registrar: domain.registrar,
            registrationDate: domain.registrationDate,
            renewalDate: domain.renewalDate,
            email: 'hakanterman@gmail.com'
          };
          await window.localStorage.set(`domain:${domainData.id}`, JSON.stringify(domainData));
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }
      
      await loadDomains();
    } catch (error) {
      console.log('Başlangıç verisi yükleme hatası:', error);
      await loadDomains();
    }
  };

  const loadDomains = async () => {
    try {
      const keys = await window.localStorage.list('domain:');
      if (keys && keys.keys) {
        const loadedDomains = await Promise.all(
          keys.keys.map(async (key) => {
            const result = await window.localStorage.get(key);
            return result ? JSON.parse(result.value) : null;
          })
        );
        setDomains(loadedDomains.filter(d => d !== null));
      }
    } catch (error) {
      console.log('Domain yükleme hatası:', error);
    }
  };

  const saveDomain = async (domain) => {
    try {
      await window.localStorage.set(`domain:${domain.id}`, JSON.stringify(domain));
      await loadDomains();
      showNotification('Domain başarıyla kaydedildi!', 'success');
    } catch (error) {
      showNotification('Kayıt hatası: ' + error.message, 'error');
    }
  };

  const deleteDomain = async (id) => {
    if (window.confirm('Bu domaini silmek istediğinize emin misiniz?')) {
      try {
        await window.localStorage.delete(`domain:${id}`);
        await loadDomains();
        showNotification('Domain silindi', 'success');
      } catch (error) {
        showNotification('Silme hatası: ' + error.message, 'error');
      }
    }
  };

  const sendEmailNotification = (domain, daysLeft) => {
    const subject = `Domain Yenileme Hatırlatması: ${domain.name}`;
    const body = `
Merhaba,

${domain.name} domaininizin yenileme tarihi yaklaşıyor!

Domain: ${domain.name}
Firma: ${domain.registrar}
Yenileme Tarihi: ${new Date(domain.renewalDate).toLocaleDateString('tr-TR')}
Kalan Gün: ${daysLeft}

Lütfen yenileme işlemini zamanında yapınız.

İyi günler dileriz.
    `.trim();

    window.location.href = `mailto:${domain.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.registrar || !formData.registrationDate || !formData.renewalDate || !formData.email) {
      showNotification('Lütfen tüm alanları doldurun', 'error');
      return;
    }
    
    const domain = {
      id: editingId || Date.now().toString(),
      ...formData
    };

    saveDomain(domain);
    resetForm();
  };

  const handleEdit = (domain) => {
    setFormData(domain);
    setEditingId(domain.id);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      registrar: '',
      registrationDate: '',
      renewalDate: '',
      email: 'hakanterman@gmail.com'
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getDaysUntilRenewal = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRegistrarUrl = (registrar) => {
    const urls = {
      'Spaceship': 'https://www.spaceship.com',
      'Metunic': 'https://www.metunic.com',
      'Atastyr': 'https://www.atastyr.com',
      'Hostinger': 'https://www.hostinger.com'
    };
    return urls[registrar] || '#';
  };

  const getRenewalPercentage = (renewalDate) => {
    const daysLeft = getDaysUntilRenewal(renewalDate);
    const percentage = Math.min(Math.max((daysLeft / 365) * 100, 0), 100);
    return percentage;
  };

  const getProgressColor = (percentage) => {
    if (percentage < 10) return darkMode ? 'bg-red-400' : 'bg-red-500';
    if (percentage < 30) return darkMode ? 'bg-orange-400' : 'bg-orange-500';
    return darkMode ? 'bg-rose-400' : 'bg-rose-500';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-rose-50 to-pink-100'} p-6 transition-colors duration-300`}>
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-6 transition-colors duration-300`}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-3`}>
                <Globe className={darkMode ? 'text-rose-400' : 'text-rose-600'} size={40} />
                Hakan Terman - Kayıtlı Domainler
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>Aktif Domainleriniz listelenmektedir</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} p-3 rounded-lg transition-all`}
              >
                {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-700" />}
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className={`${darkMode ? 'bg-rose-600 hover:bg-rose-700' : 'bg-rose-600 hover:bg-rose-700'} text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg`}
              >
                <Plus size={20} />
                Yeni Domain Ekle
              </button>
            </div>
          </div>

          {showAddForm && (
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-rose-50 to-pink-50'} p-6 rounded-xl mb-6 border-2 ${darkMode ? 'border-rose-500' : 'border-rose-200'}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {editingId ? 'Domain Düzenle' : 'Yeni Domain Ekle'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Domain Adı *
                  </label>
                  <input
                    type="text"
                    placeholder="ornek.com"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Kayıt Firması *
                  </label>
                  <input
                    type="text"
                    placeholder="Spaceship, Metunic, vb."
                    value={formData.registrar}
                    onChange={(e) => setFormData({...formData, registrar: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Kayıt Tarihi *
                  </label>
                  <input
                    type="date"
                    value={formData.registrationDate}
                    onChange={(e) => setFormData({...formData, registrationDate: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Yenileme Tarihi *
                  </label>
                  <input
                    type="date"
                    value={formData.renewalDate}
                    onChange={(e) => setFormData({...formData, renewalDate: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Bildirim E-posta Adresi *
                  </label>
                  <input
                    type="email"
                    placeholder="hakanterman@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-2 border ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'} rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent`}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  className={`${darkMode ? 'bg-rose-600 hover:bg-rose-700' : 'bg-rose-600 hover:bg-rose-700'} text-white px-6 py-2 rounded-lg transition-all`}
                >
                  {editingId ? 'Güncelle' : 'Kaydet'}
                </button>
                <button
                  onClick={resetForm}
                  className={`${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} ${darkMode ? 'text-white' : 'text-gray-800'} px-6 py-2 rounded-lg transition-all`}
                >
                  İptal
                </button>
              </div>
            </div>
          )}

          {domains.length === 0 ? (
            <div className="text-center py-12">
              <Globe size={64} className={`mx-auto ${darkMode ? 'text-gray-600' : 'text-gray-300'} mb-4`} />
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>Henüz domain eklenmemiş</p>
              <p className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Başlamak için "Yeni Domain Ekle" butonuna tıklayın</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-rose-600 to-pink-600'} text-white`}>
                    <th className="px-6 py-4 text-left rounded-tl-lg">Domain</th>
                    <th className="px-6 py-4 text-left">Firma</th>
                    <th className="px-6 py-4 text-left">Kayıt Tarihi</th>
                    <th className="px-6 py-4 text-left">Yenileme Tarihi</th>
                    <th className="px-6 py-4 text-left">Durum</th>
                    <th className="px-6 py-4 text-left">İşlemler</th>
                    <th className="px-6 py-4 text-left rounded-tr-lg">DNS</th>
                  </tr>
                </thead>
                <tbody>
                  {domains.map((domain, index) => {
                    const daysLeft = getDaysUntilRenewal(domain.renewalDate);
                    const percentage = getRenewalPercentage(domain.renewalDate);
                    return (
                      <tr key={domain.id} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'hover:bg-gray-50'} ${index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-750' : 'bg-gray-50')}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Globe size={18} className={darkMode ? 'text-rose-400' : 'text-rose-600'} />
                            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{domain.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <a 
                            href={getRegistrarUrl(domain.registrar)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 ${darkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'} transition-colors`}
                          >
                            <Building2 size={16} />
                            <span>{domain.registrar}</span>
                            <ExternalLink size={12} />
                          </a>
                        </td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {new Date(domain.registrationDate).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className={darkMode ? 'text-gray-400' : 'text-gray-400'} />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {new Date(domain.renewalDate).toLocaleDateString('tr-TR')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-xs font-medium mb-1">
                              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{daysLeft}/365 gün</span>
                            </div>
                            <div className={`w-32 h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                              <div 
                                className={`h-full ${getProgressColor(percentage)} transition-all duration-1000 ease-out rounded-full`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => sendEmailNotification(domain, daysLeft)}
                              className={`p-2 ${darkMode ? 'text-blue-400 hover:bg-gray-600' : 'text-blue-600 hover:bg-blue-100'} rounded-lg transition-all`}
                              title="E-posta Gönder"
                            >
                              <Mail size={18} />
                            </button>
                            <button
                              onClick={() => handleEdit(domain)}
                              className={`p-2 ${darkMode ? 'text-rose-400 hover:bg-gray-600' : 'text-rose-600 hover:bg-rose-100'} rounded-lg transition-all`}
                              title="Düzenle"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteDomain(domain.id)}
                              className={`p-2 ${darkMode ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-red-100'} rounded-lg transition-all`}
                              title="Sil"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <a
                              href={`https://intodns.com/${domain.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded transition-all`}
                            >
                              Into
                            </a>
                            <a
                              href={`https://dnsbil.com/${domain.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded transition-all`}
                            >
                              DNS
                            </a>
                            <a
                              href={`https://who.is/whois/${domain.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded transition-all`}
                            >
                              Whois
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className={`mt-6 p-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-rose-50 border-rose-200'} rounded-lg border`}>
            <div className="flex items-start gap-2">
              <AlertCircle size={20} className={darkMode ? 'text-rose-400' : 'text-rose-600'} />
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-rose-800'}`}>
                <strong>Bilgilendirme:</strong> Yenileme tarihi 30 gün veya daha az olan domainler için otomatik e-posta hatırlatıcısı gönderilir. 
                E-posta bildirimleri tarayıcınızın varsayılan e-posta uygulaması üzerinden çalışır.
              </div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>İstatistikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`${darkMode ? 'bg-gradient-to-br from-rose-600 to-rose-700' : 'bg-gradient-to-br from-rose-500 to-rose-600'} text-white p-4 rounded-lg`}>
              <div className="text-3xl font-bold">{domains.length}</div>
              <div className="text-sm opacity-90">Toplam Domain</div>
            </div>
            <div className={`${darkMode ? 'bg-gradient-to-br from-green-600 to-green-700' : 'bg-gradient-to-br from-green-500 to-green-600'} text-white p-4 rounded-lg`}>
              <div className="text-3xl font-bold">
                {domains.filter(d => getDaysUntilRenewal(d.renewalDate) > 30).length}
              </div>
              <div className="text-sm opacity-90">Aktif</div>
            </div>
            <div className={`${darkMode ? 'bg-gradient-to-br from-yellow-600 to-yellow-700' : 'bg-gradient-to-br from-yellow-500 to-yellow-600'} text-white p-4 rounded-lg`}>
              <div className="text-3xl font-bold">
                {domains.filter(d => {
                  const days = getDaysUntilRenewal(d.renewalDate);
                  return days > 0 && days <= 30;
                }).length}
              </div>
              <div className="text-sm opacity-90">Yaklaşan Yenileme</div>
            </div>
            <div className={`${darkMode ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-red-500 to-red-600'} text-white p-4 rounded-lg`}>
              <div className="text-3xl font-bold">
                {domains.filter(d => getDaysUntilRenewal(d.renewalDate) < 0).length}
              </div>
              <div className="text-sm opacity-90">Süresi Dolmuş</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainManager;
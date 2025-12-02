import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Mail, Calendar, Building2, Globe, AlertCircle, Check, Moon, Sun, ExternalLink } from 'lucide-react';

const DomainManager = () => {
  const [domains, setDomains] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<any>(null);
  const [notification, setNotification] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: '',
    registrar: '',
    registrationDate: '',
    renewalDate: '',
    email: 'hakanterman@gmail.com'
  });

  useEffect(() => {
    initializeWithExcelData();
  }, []);

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

  const initializeWithExcelData = async () => {
    try {
      const keys = Object.keys(window.localStorage).filter(k => k.startsWith('domain:'));
      
      if (!keys || keys.length === 0) {
        for (const domain of excelData) {
          const domainData = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            ...domain,
            email: 'hakanterman@gmail.com'
          };
          window.localStorage.setItem(`domain:${domainData.id}`, JSON.stringify(domainData));
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }

      await loadDomains();
    } catch (error: any) {
      console.log('Başlangıç verisi yükleme hatası:', error);
      await loadDomains();
    }
  };

  const loadDomains = async () => {
    try {
      const keys = Object.keys(window.localStorage).filter(k => k.startsWith('domain:'));
      const loadedDomains = keys.map(key => {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      }).filter(d => d !== null);
      setDomains(loadedDomains);
    } catch (error: any) {
      console.log('Domain yükleme hatası:', error);
    }
  };

  const saveDomain = async (domain: any) => {
    try {
      window.localStorage.setItem(`domain:${domain.id}`, JSON.stringify(domain));
      await loadDomains();
      showNotification('Domain başarıyla kaydedildi!', 'success');
    } catch (error: any) {
      showNotification('Kayıt hatası: ' + error.message, 'error');
    }
  };

  const deleteDomain = async (id: any) => {
    if (window.confirm('Bu domaini silmek istediğinize emin misiniz?')) {
      try {
        window.localStorage.removeItem(`domain:${id}`);
        await loadDomains();
        showNotification('Domain silindi', 'success');
      } catch (error: any) {
        showNotification('Silme hatası: ' + error.message, 'error');
      }
    }
  };

  const sendEmailNotification = (domain: any, daysLeft: any) => {
    const subject = `Domain Yenileme Hatırlatması: ${domain.name}`;
    const body = `Merhaba,\n\n${domain.name} domaininizin yenileme tarihi yaklaşıyor!\n\nDomain: ${domain.name}\nFirma: ${domain.registrar}\nYenileme Tarihi: ${new Date(domain.renewalDate).toLocaleDateString('tr-TR')}\nKalan Gün: ${daysLeft}\n\nLütfen yenileme işlemini zamanında yapınız.`;
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

  const handleEdit = (domain: any) => {
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

  const showNotification = (message: any, type: any) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getDaysUntilRenewal = (renewalDate: any) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRegistrarUrl = (registrar: any) => {
    const urls: any = {
      'Spaceship': 'https://www.spaceship.com',
      'Metunic': 'https://www.metunic.com',
      'Atastyr': 'https://www.atastyr.com',
      'Hostinger': 'https://www.hostinger.com'
    };
    return urls[registrar] || '#';
  };

  const getRenewalPercentage = (renewalDate: any) => {
    const daysLeft = getDaysUntilRenewal(renewalDate);
    const percentage = Math.min(Math.max((daysLeft / 365) * 100, 0), 100);
    return percentage;
  };

  const getProgressColor = (percentage: any) => {
    if (percentage < 10) return darkMode ? 'bg-red-400' : 'bg-red-500';
    if (percentage < 30) return darkMode ? 'bg-orange-400' : 'bg-orange-500';
    return darkMode ? 'bg-rose-400' : 'bg-rose-500';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-rose-50 to-pink-100'} p-6 transition-colors duration-300`}>
      {/* UI kodları burada, sen build edebilirsin */}
      <h1 className="text-2xl font-bold">Domain Manager</h1>
    </div>
  );
};

export default DomainManager;

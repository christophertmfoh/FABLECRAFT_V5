// Simple i18n composable for handling translations
// This can be replaced with @nuxtjs/i18n module later for full functionality

interface Translations {
  [key: string]: {
    [lang: string]: string
  }
}

// Define your translations here
const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    es: 'Inicio',
    fr: 'Accueil',
    de: 'Startseite',
    it: 'Home',
    pt: 'Início',
    ja: 'ホーム',
    zh: '首页',
    ko: '홈'
  },
  'nav.account': {
    en: 'Account',
    es: 'Cuenta',
    fr: 'Compte',
    de: 'Konto',
    it: 'Account',
    pt: 'Conta',
    ja: 'アカウント',
    zh: '账户',
    ko: '계정'
  },
  'nav.settings': {
    en: 'Settings',
    es: 'Configuración',
    fr: 'Paramètres',
    de: 'Einstellungen',
    it: 'Impostazioni',
    pt: 'Configurações',
    ja: '設定',
    zh: '设置',
    ko: '설정'
  },
  
  // Account Page
  'account.title': {
    en: 'Account Settings',
    es: 'Configuración de Cuenta',
    fr: 'Paramètres du Compte',
    de: 'Kontoeinstellungen',
    it: 'Impostazioni Account',
    pt: 'Configurações da Conta',
    ja: 'アカウント設定',
    zh: '账户设置',
    ko: '계정 설정'
  },
  'account.subtitle': {
    en: 'Manage your profile and preferences',
    es: 'Administra tu perfil y preferencias',
    fr: 'Gérez votre profil et vos préférences',
    de: 'Verwalten Sie Ihr Profil und Ihre Einstellungen',
    it: 'Gestisci il tuo profilo e le preferenze',
    pt: 'Gerencie seu perfil e preferências',
    ja: 'プロフィールと設定を管理',
    zh: '管理您的个人资料和偏好设置',
    ko: '프로필 및 환경설정 관리'
  },
  
  // Profile Tab
  'profile.title': {
    en: 'Profile',
    es: 'Perfil',
    fr: 'Profil',
    de: 'Profil',
    it: 'Profilo',
    pt: 'Perfil',
    ja: 'プロフィール',
    zh: '个人资料',
    ko: '프로필'
  },
  'profile.information': {
    en: 'Profile Information',
    es: 'Información del Perfil',
    fr: 'Informations du Profil',
    de: 'Profilinformationen',
    it: 'Informazioni Profilo',
    pt: 'Informações do Perfil',
    ja: 'プロフィール情報',
    zh: '个人信息',
    ko: '프로필 정보'
  },
  'profile.fullName': {
    en: 'Full Name',
    es: 'Nombre Completo',
    fr: 'Nom Complet',
    de: 'Vollständiger Name',
    it: 'Nome Completo',
    pt: 'Nome Completo',
    ja: 'フルネーム',
    zh: '全名',
    ko: '전체 이름'
  },
  'profile.username': {
    en: 'Username',
    es: 'Nombre de Usuario',
    fr: "Nom d'utilisateur",
    de: 'Benutzername',
    it: 'Nome Utente',
    pt: 'Nome de Usuário',
    ja: 'ユーザー名',
    zh: '用户名',
    ko: '사용자명'
  },
  'profile.email': {
    en: 'Email',
    es: 'Correo Electrónico',
    fr: 'Email',
    de: 'E-Mail',
    it: 'Email',
    pt: 'E-mail',
    ja: 'メール',
    zh: '电子邮件',
    ko: '이메일'
  },
  'profile.bio': {
    en: 'Bio',
    es: 'Biografía',
    fr: 'Bio',
    de: 'Biografie',
    it: 'Biografia',
    pt: 'Biografia',
    ja: '自己紹介',
    zh: '简介',
    ko: '소개'
  },
  
  // Buttons
  'button.save': {
    en: 'Save Changes',
    es: 'Guardar Cambios',
    fr: 'Enregistrer les Modifications',
    de: 'Änderungen Speichern',
    it: 'Salva Modifiche',
    pt: 'Salvar Alterações',
    ja: '変更を保存',
    zh: '保存更改',
    ko: '변경사항 저장'
  },
  'button.cancel': {
    en: 'Cancel',
    es: 'Cancelar',
    fr: 'Annuler',
    de: 'Abbrechen',
    it: 'Annulla',
    pt: 'Cancelar',
    ja: 'キャンセル',
    zh: '取消',
    ko: '취소'
  },
  'button.changePassword': {
    en: 'Change Password',
    es: 'Cambiar Contraseña',
    fr: 'Changer le Mot de Passe',
    de: 'Passwort Ändern',
    it: 'Cambia Password',
    pt: 'Alterar Senha',
    ja: 'パスワードを変更',
    zh: '更改密码',
    ko: '비밀번호 변경'
  },
  
  // Preferences
  'preferences.title': {
    en: 'Preferences',
    es: 'Preferencias',
    fr: 'Préférences',
    de: 'Einstellungen',
    it: 'Preferenze',
    pt: 'Preferências',
    ja: '設定',
    zh: '偏好设置',
    ko: '환경설정'
  },
  'preferences.language': {
    en: 'Language',
    es: 'Idioma',
    fr: 'Langue',
    de: 'Sprache',
    it: 'Lingua',
    pt: 'Idioma',
    ja: '言語',
    zh: '语言',
    ko: '언어'
  },
  'preferences.theme': {
    en: 'Theme',
    es: 'Tema',
    fr: 'Thème',
    de: 'Design',
    it: 'Tema',
    pt: 'Tema',
    ja: 'テーマ',
    zh: '主题',
    ko: '테마'
  },
  'preferences.timezone': {
    en: 'Timezone',
    es: 'Zona Horaria',
    fr: 'Fuseau Horaire',
    de: 'Zeitzone',
    it: 'Fuso Orario',
    pt: 'Fuso Horário',
    ja: 'タイムゾーン',
    zh: '时区',
    ko: '시간대'
  },
  
  // Security
  'security.title': {
    en: 'Security',
    es: 'Seguridad',
    fr: 'Sécurité',
    de: 'Sicherheit',
    it: 'Sicurezza',
    pt: 'Segurança',
    ja: 'セキュリティ',
    zh: '安全',
    ko: '보안'
  },
  'security.password': {
    en: 'Password',
    es: 'Contraseña',
    fr: 'Mot de Passe',
    de: 'Passwort',
    it: 'Password',
    pt: 'Senha',
    ja: 'パスワード',
    zh: '密码',
    ko: '비밀번호'
  },
  'security.currentPassword': {
    en: 'Current Password',
    es: 'Contraseña Actual',
    fr: 'Mot de Passe Actuel',
    de: 'Aktuelles Passwort',
    it: 'Password Attuale',
    pt: 'Senha Atual',
    ja: '現在のパスワード',
    zh: '当前密码',
    ko: '현재 비밀번호'
  },
  'security.newPassword': {
    en: 'New Password',
    es: 'Nueva Contraseña',
    fr: 'Nouveau Mot de Passe',
    de: 'Neues Passwort',
    it: 'Nuova Password',
    pt: 'Nova Senha',
    ja: '新しいパスワード',
    zh: '新密码',
    ko: '새 비밀번호'
  },
  'security.confirmPassword': {
    en: 'Confirm New Password',
    es: 'Confirmar Nueva Contraseña',
    fr: 'Confirmer le Nouveau Mot de Passe',
    de: 'Neues Passwort Bestätigen',
    it: 'Conferma Nuova Password',
    pt: 'Confirmar Nova Senha',
    ja: '新しいパスワードを確認',
    zh: '确认新密码',
    ko: '새 비밀번호 확인'
  }
}

export const useI18n = () => {
  // Get current language from localStorage or default to 'en'
  const currentLang = useState('locale', () => {
    if (process.client) {
      return localStorage.getItem('preferred-language') || 'en'
    }
    return 'en'
  })

  // Translation function
  const t = (key: string, fallback?: string): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`)
      return fallback || key
    }
    
    return translation[currentLang.value] || translation['en'] || fallback || key
  }

  // Set language function
  const setLocale = (lang: string) => {
    currentLang.value = lang
    if (process.client) {
      localStorage.setItem('preferred-language', lang)
      // Update HTML lang attribute
      document.documentElement.lang = lang
    }
  }

  // Get current locale
  const locale = computed(() => currentLang.value)

  // Get available locales
  const locales = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'ko', name: '한국어' }
  ]

  return {
    t,
    locale,
    locales,
    setLocale
  }
}
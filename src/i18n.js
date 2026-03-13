import { computed } from 'vue'
import { useLanguage } from './composables/useLanguage'

const translations = {
  en: {
    // Header
    active: 'Active',
    addApplication: 'Add Application',
    signIn: 'Sign in',
    signOut: 'Sign out',

    // Login
    tagline: 'Track your job applications in one place',
    signInWithGoogle: 'Sign in with Google',
    skipToPreview: 'Skip to preview',

    // Filter
    all: 'All',

    // Empty state
    noApplicationsYet: 'No applications yet',
    clickAddToStart: 'Click "Add Application" to get started',

    // Pipeline
    pipeline: 'Pipeline',
    total: 'Total',
    applied: 'Applied',
    phoneScreen: 'Phone Screen',
    interviews: 'Interviews',
    offer: 'Offer',
    rejected: 'Rejected',
    ghosted: 'Ghosted',

    // Upcoming Events
    upcoming: 'Upcoming',
    addEvent: '+ Add Event',
    noUpcomingEvents: 'No upcoming events',

    // Application Modal
    editApplication: 'Edit Application',
    newApplication: 'New Application',
    jobTitle: 'Job Title *',
    jobTitlePlaceholder: 'e.g. Senior Frontend Engineer',
    company: 'Company *',
    companyPlaceholder: 'e.g. Stripe',
    status: 'Status',
    tags: 'Tags',
    addTagPlaceholder: 'Add a tag and press Enter',
    add: 'Add',
    minSalary: 'Min Salary',
    maxSalary: 'Max Salary',
    jobUrl: 'Job URL',
    notes: 'Notes',
    notesPlaceholder: 'Any notes about this application...',
    deleteApplication: 'Delete Application',
    cancel: 'Cancel',
    update: 'Update',

    // Event Modal
    newEvent: 'New Event',
    eventType: 'Event Type *',
    selectCompany: 'Select company',
    companyName: 'Company name',
    date: 'Date *',
    time: 'Time *',
    noteOptional: 'Note (optional)',
    addNotePlaceholder: 'Add a note...',
    addEventBtn: 'Add Event',

    // Event types
    technicalInterview: 'Technical Interview',
    behavioralInterview: 'Behavioral Interview',
    designRound: 'Design Round',
    finalRound: 'Final Round',
    takeHome: 'Take Home',
    other: 'Other',
  },

  az: {
    // Header
    active: 'Aktiv',
    addApplication: 'Müraciət əlavə et',
    signIn: 'Daxil ol',
    signOut: 'Çıxış',

    // Login
    tagline: 'İş müraciətlərinizi bir yerdə izləyin',
    signInWithGoogle: 'Google ilə daxil ol',
    skipToPreview: 'Baxışa keç',

    // Filter
    all: 'Hamısı',

    // Empty state
    noApplicationsYet: 'Hələ müraciət yoxdur',
    clickAddToStart: 'Başlamaq üçün "Müraciət əlavə et" düyməsinə klikləyin',

    // Pipeline
    pipeline: 'Mərhələlər',
    total: 'Ümumi',
    applied: 'Müraciət edildi',
    phoneScreen: 'Telefon müsahibəsi',
    interviews: 'Müsahibələr',
    offer: 'Təklif',
    rejected: 'Rədd edildi',
    ghosted: 'Cavabsız',

    // Upcoming Events
    upcoming: 'Yaxınlaşan',
    addEvent: '+ Tədbir əlavə et',
    noUpcomingEvents: 'Yaxınlaşan tədbir yoxdur',

    // Application Modal
    editApplication: 'Müraciəti redaktə et',
    newApplication: 'Yeni müraciət',
    jobTitle: 'Vəzifə *',
    jobTitlePlaceholder: 'məs. Baş Frontend Mühəndis',
    company: 'Şirkət *',
    companyPlaceholder: 'məs. Stripe',
    status: 'Status',
    tags: 'Teqlər',
    addTagPlaceholder: 'Teq yazın və Enter basın',
    add: 'Əlavə et',
    minSalary: 'Min Maaş',
    maxSalary: 'Maks Maaş',
    jobUrl: 'İş linki',
    notes: 'Qeydlər',
    notesPlaceholder: 'Bu müraciət haqqında qeydlər...',
    deleteApplication: 'Müraciəti sil',
    cancel: 'Ləğv et',
    update: 'Yenilə',

    // Event Modal
    newEvent: 'Yeni tədbir',
    eventType: 'Tədbir növü *',
    selectCompany: 'Şirkət seçin',
    companyName: 'Şirkət adı',
    date: 'Tarix *',
    time: 'Vaxt *',
    noteOptional: 'Qeyd (istəyə bağlı)',
    addNotePlaceholder: 'Qeyd əlavə edin...',
    addEventBtn: 'Tədbir əlavə et',

    // Event types
    technicalInterview: 'Texniki müsahibə',
    behavioralInterview: 'Davranış müsahibəsi',
    designRound: 'Dizayn mərhələsi',
    finalRound: 'Son mərhələ',
    takeHome: 'Ev tapşırığı',
    other: 'Digər',
  },
}

export function useI18n() {
  const { lang } = useLanguage()

  function t(key) {
    return translations[lang.value]?.[key] || translations.en[key] || key
  }

  return { t, lang }
}

export default translations

import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    home: 'Home',
    favorites: 'Favorites',
    weather: 'Weather',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    wind: 'Wind',
    tab1: 'Day',
    tab2: 'Week',
    cardTitle: 'Weather Card',
    inputPlaceholder: 'Choose location',
    confirm: 'Confirm',
    cancel: 'Cancel',
    removeMessage: 'Are you sure you want to delete this card?',
    emptyCard: 'Empty Card',
  },
  ua: {
    home: 'Головна',
    favorites: 'Обране',
    weather: 'Погода',
    humidity: 'Вологість',
    windSpeed: 'Швидкість вітру',
    wind: 'Вітер',
    tab1: 'День',
    tab2: 'Тиждень',
    cardTitle: 'Картка погоди',
    inputPlaceholder: 'Оберіть місто',
    confirm: 'Підтвердити',
    cancel: 'Скасувати',
    removeMessage: 'Ви впевнені, що хочете видалити цю картку?',
    emptyCard: 'Порожня картка',
  },
};

const i18n = createI18n( {
  locale: 'ua',
  messages,
} );

export default i18n;

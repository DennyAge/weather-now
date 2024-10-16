export const formatDate = ( unixTimestamp, type = 'short' ) => {
  const lang = localStorage.getItem( 'language' ) || 'en';
  const date = new Date( unixTimestamp * 1000 );

  if ( isNaN( date ) ) {
    return 'Invalid Date';
  }

  const formatTypes = {
    short: { weekday: 'short', month: 'short', day: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric' },
  };

  const options = formatTypes[type] || formatTypes['short'];

  return lang === 'ua'
    ? date.toLocaleDateString( 'uk-UA', options )
    : date.toLocaleDateString( 'en-US', options );
};

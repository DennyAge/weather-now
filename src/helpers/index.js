export const formatDate = ( dateTimeString, type ) => {
  const typeOptions = type || 'short';
  const lang = localStorage.getItem( 'language' );
  const date = new Date( dateTimeString );

  const options = {
    weekday: typeOptions,
    month: typeOptions,
    day: 'numeric',
  };
  if ( lang === 'ua' ) {
    return date.toLocaleDateString( 'uk-UA', options );
  } else {
    return date.toLocaleDateString( 'en-US', options );
  }
};
import React, { useEffect, useState, memo } from 'react';
import {  useFetchApiResp, useCommonTranslation, i18next } from "shared";
import './styles.css'

const UserCard = memo(({ item, isRTL ,translate}) => (
  <div className="card">
    <div className={`card__inner ${isRTL ? 'card__inner--rtl' : ''}`}>
      <div className="card__avatar">
        <span className="card__avatar-text">
          {item.title[0].toUpperCase()}
        </span>
      </div>
      <div className="card__content">
        <h3 className={`card__title ${isRTL ? 'card__title--rtl' : ''}`}>
          {item.title}
        </h3>
        <p className={`card__subtitle ${isRTL ? 'card__subtitle--rtl' : ''}`}>
          ID: {translate(`${item.id}`)}
        </p>
      </div>
    </div>
  </div>
));

const LanguageSwitch = memo(({ currentLang, onLanguageChange }) => (
  <button
    onClick={onLanguageChange}
    className="language-button"
    aria-label="Change Language"
  >
    <span className="language-button__icon">🌐</span>
    <span className="language-button__text">
      {currentLang === 'en' ? 'عربي' : 'English'}
    </span>
  </button>
));

export default function HomeScreen() {
  const { posts, hasMore, loadMore, loading } = useFetchApiResp();
  const [language, setLanguage] = useState(i18next.language || "en");
  const { t } = useCommonTranslation();
  const isRTL = language === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const handleLanguageChange = async () => {
    try {
      const newLang = language === 'en' ? 'ar' : 'en';
      setLanguage(newLang);
      await i18next.changeLanguage(newLang);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header__logo-wrapper">
          <img
            src="/assets/images/partial-react-logo.png"
            alt="React Logo"
            className={`header__logo ${isRTL ? 'header__logo--rtl' : ''}`}
          />
        </div>

        <div className="header__content">
          <div className={`header__welcome ${isRTL ? 'header__welcome--rtl' : ''}`}>
            <h1 className="header__title">
              {t('Welcome')}!
            </h1>
            <span className="header__wave" role="img" aria-label="wave">
              👋
            </span>
          </div>
          
          <LanguageSwitch 
            currentLang={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </header>

      <main className="main">
        <section className="section">
          <div className="section__header">
            <h2 className={`section__title ${isRTL ? 'section__title--rtl' : ''}`}>
              {t('List of User')}
            </h2>
            <div className={`section__line ${isRTL ? 'section__line--rtl' : ''}`} />
          </div>

          <div className="section__grid">
            {posts.map((post) => (
              <UserCard 
                key={post.id} 
                item={post} 
                isRTL={isRTL}
                translate={t}
              />
            ))}
          </div>

          <div className="section__footer">
            {loading && (
              <div className="loader" />
            )}
            {hasMore && !loading && (
              <button
                onClick={loadMore}
                className="load-more"
              >
                {t('Load More')}
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
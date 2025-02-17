import React, { useEffect, useState } from 'react';
import { shared, useFetchApiResp, useCommonTranslation, i18next } from "shared";
import './styles.css'

export default function HomeScreen() {
  const { posts, hasMore, loadMore, loading } = useFetchApiResp();
  const [language, setLanguage] = useState(i18next.language || "en");
  const { t } = useCommonTranslation();
  const isRTL = language === "ar";

  useEffect(() => {
    console.log('Translated:', t('greeting'));
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const changeLanguage = async (lng) => {
    try {
      setLanguage(lng);
      await i18next.changeLanguage(lng);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const UserCard = ({ item }) => (
    <div className={`bg-[#282c34] rounded-xl p-4 mb-3 shadow-md ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-10 h-10 rounded-full bg-[#61dafb] flex items-center justify-center 
          ${isRTL ? 'ml-3' : 'mr-3'}`}>
          <span className="text-[#282c34] text-lg font-bold">
            {item.title[0].toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h3 className={`text-white text-base font-semibold mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            {item.title}
          </h3>
          <p className={`text-gray-400 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('User ID')}: {item.id}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark-bg-gray-900">
      <div className="bg-gradient-to-b from-[#A1CEDC] to-[#1D3D47] dark:from-[#1D3D47] dark:to-[#0D1F24]">
        {/* Header Section */}
        <div className="relative h-44">
          <img
            src="/assets/images/partial-react-logo.png"
            alt="React Logo"
            className={`absolute bottom-0 h-[178px] w-[290px] ${isRTL ? 'right-0' : 'left-0'}`}
          />
        </div>

        {/* Title and Language Switch */}
        <div className="px-4 py-4 flex justify-between items-center">
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <h1 className="text-2xl font-bold text-white dark:text-white">
              {t('welcome')}!
            </h1>
            {/* Simple wave emoji instead of HelloWave component */}
            <span className="text-2xl animate-pulse">👋</span>
          </div>
          <button
            onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 bg-[#61dafb] text-white px-3 py-2 rounded-full hover:bg-[#4fa8c9] transition-colors"
          >
            {/* Simple globe icon using emoji instead of Lucide icon */}
            <span className="text-lg">🌐</span>
            <span>{language === 'en' ? 'عربي' : 'English'}</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6">
          <div className="mb-4">
            <h2 className={`text-[#61dafb] text-2xl font-bold mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('List of User')}
            </h2>
            <div className={`h-0.5 w-16 bg-[#61dafb] ${isRTL ? 'mr-0' : 'ml-0'}`} />
          </div>

          {/* User List */}
          <div className="space-y-3">
            {posts.map((post) => (
              <UserCard key={post.id} item={post} />
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-center items-center py-5">
            {loading && (
              <div className="loader w-8 h-8 border-4 border-[#61dafb] border-t-transparent rounded-full animate-spin" />
            )}
            {hasMore && (
              <button
                onClick={loadMore}
                className="bg-[#61dafb] text-white px-6 py-3 rounded-lg hover:bg-[#4fa8c9] transition-colors"
              >
                {t('Load More')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
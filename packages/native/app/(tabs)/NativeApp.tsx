import React from 'react'
import { Image, StyleSheet, Platform, FlatList, View, Text, ActivityIndicator, TouchableOpacity, I18nManager } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFetchApiResp, useCommonTranslation, i18next, encryptDataAesCbc, decryptDataAesCbc } from "shared";
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function NativeApp() {
  const { posts, hasMore, loadMore, loading } = useFetchApiResp();
  const [language, setLanguage] = useState(i18next.language || "en");
  const [isRTL, setIsRTL] = useState(I18nManager.isRTL)
  const { t } = useCommonTranslation();
  const [encryDecryNum, setEncryDecryNum] = useState(encryptDataAesCbc('8452067674'))
  // const {error,setGlobalError} = useGlobalError();




  useEffect(() => {
    console.log('Translated:', t('greeting'));
    // const caller :any= setGlobalError
    // caller('error')
    const impData = '8452067674';
    const encryptValue = encryptDataAesCbc(impData)
    const decryptValue = decryptDataAesCbc(encryptValue)
    console.log('encryptValue', encryptValue);
    console.log('decryptValue', decryptValue);
  }, [language]);

  const changeLanguage = async (lng: string) => {
    try {
      setLanguage(lng);
      await i18next.changeLanguage(lng);
      const shouldBeRTL = lng === "ar";
      setIsRTL(shouldBeRTL);
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
        // RNRestart.Restart(); 
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };



  const renderUserCard = ({ item }: any) => {


    return (

      <View style={styles.card}>
        <View style={[styles.cardHeader, isRTL && styles.cardHeaderRTL]}>
          <View style={[styles.userIcon, isRTL && styles.userIconRTL]}>
            <Text style={styles.userInitial}>{item.title[0].toUpperCase()}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
              {item.title}
            </Text>
            <Text style={[styles.cardSubtitle, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t('User ID')}: {t(`${item.id}`)}
            </Text>

          </View>
        </View>
      </View>
    )
  };

  const handleEncrDecr = () => {
    const toencr = Number(encryDecryNum)
    console.log('----->>>r',encryDecryNum)
    if(toencr){
      setEncryDecryNum(encryptDataAesCbc(encryDecryNum))
      return
    }
    setEncryDecryNum(decryptDataAesCbc(encryDecryNum))

    
  }

  const ListHeaderComponent = () => (

    <>
      <ThemedView style={styles.headerImage}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={[styles.reactLogo, isRTL && styles.reactLogoRTL]}
        />
      </ThemedView>

      <View style={styles.header}>
        <View style={[styles.titleContainer, isRTL && styles.titleContainerRTL]}>
          <ThemedText type="title" style={styles.mainTitle}>{t('Welcome')} !</ThemedText>
          <View style={{
            flexDirection: 'column'
          }}>
            <Text style={styles.phoneNum}>{encryDecryNum} !</Text>
            <TouchableOpacity
              style={styles.encrydecryBtn}
              onPress={handleEncrDecr}
            >
              <Text style={styles.loadMoreText}>{t('Encry/Decry')}</Text>
            </TouchableOpacity>

          </View>
          {/* <HelloWave /> */}
        </View>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
        >
          <Ionicons name="language" size={24} color="#fff" />
          <Text style={styles.languageButtonText}>
            {language === 'en' ? 'عربي' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.listHeader}>
        <Text style={[styles.listTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
          {t('List of User')}
        </Text>
        <View style={[styles.divider, isRTL && styles.dividerRTL]} />
      </ThemedView>
    </>
  );


  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post: any) => post.id.toString()}
        renderItem={renderUserCard}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={
          <View style={styles.footer}>
            {loading && (
              <ActivityIndicator size="large" color="#61dafb" />
            )}
            {hasMore && (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={loadMore}
              >
                <Text style={styles.loadMoreText}>{t('Load More')}</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 200,
    width: '100%',
    position: 'relative',
    backgroundColor: Platform.select({
      ios: '#A1CEDC',
      android: '#A1CEDC',
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  titleContainerRTL: {
    flexDirection: 'row-reverse',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#61dafb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  languageButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  listHeader: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#61dafb',
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: '#61dafb',
    width: 60,
    alignSelf: 'flex-start',
  },
  dividerRTL: {
    alignSelf: 'flex-end',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#282c34',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userIconRTL: {
    marginRight: 0,
    marginLeft: 12,
  },
  userInitial: {
    color: '#282c34',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#8a8f98',
    fontSize: 14,
  },
  loadMoreButton: {
    backgroundColor: '#61dafb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  reactLogoRTL: {
    left: undefined,
    right: 0,
  },
  phoneNum: {
    fontSize: 10,
    color: 'white'
  },
  encrydecryBtn: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    paddingVertical: 0,
  }
});
